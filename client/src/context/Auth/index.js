import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import { API_URL, HTTP_STATUS } from "../../util/constants";
import { AuthReducer, initialState } from "./reducer";

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

const useAuthState = () => useContext(AuthStateContext);

const useAuthDispatch = () => useContext(AuthDispatchContext);

const handleError = (error) => {
  let errMsg = "";
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    errMsg = error.response.data;
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
    errMsg = error.request;
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message);
    errMsg = error.message;
  }
  console.log(error.config);
  return errMsg;
};

const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(AuthReducer, initialState);

  const login = async (payload) => {
    try {
      dispatch({ type: "LOGIN_REQUEST" });
      const { data, status } = await axios.post(`${API_URL}/v1/login`, payload);
      console.log(data, status);
      if (status === HTTP_STATUS.OK) {
        dispatch({ type: "LOGIN_SUCCESS", payload: { ...data } });
        return null;
      } else {
        dispatch({ type: "LOGIN_ERROR", payload: { ...data } });
        return { ...data };
      }
    } catch (error) {
      const errMsg = handleError(error);
      dispatch({ type: "LOGIN_ERROR", payload: errMsg });
      throw new Error(errMsg);
    }
  };

  const signup = async (payload) => {
    try {
      dispatch({ type: "SIGNUP_REQUEST" });
      const { data, status } = await axios.post(
        `${API_URL}/v1/signup`,
        payload
      );
      console.log(data, status);
      if (status === HTTP_STATUS.CREATED) {
        dispatch({ type: "SIGNUP_SUCCESS", payload: { ...data } });
        return null;
      } else {
        console.log("erorororor");
        dispatch({ type: "SIGNUP_ERROR", payload: { ...data } });
        return { ...data };
      }
    } catch (error) {
      const errMsg = handleError(error);
      dispatch({ type: "SIGNUP_ERROR", payload: errMsg });
      throw new Error(errMsg);
    }
  };

  const logout = async (dispatch) => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    axios.defaults.headers.common["Authorization"] = null;
  };

  return (
    <AuthStateContext.Provider value={{ user, login, logout, signup }}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export { useAuthState, useAuthDispatch, AuthProvider };
