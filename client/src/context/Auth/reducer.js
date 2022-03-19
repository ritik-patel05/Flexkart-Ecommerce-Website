import axios from "axios";

let user = null,
  token = null;
if (localStorage.getItem("user")) {
  user = JSON.parse(localStorage.getItem("user"));
}

if (localStorage.getItem("token")) {
  token = JSON.parse(localStorage.getItem("token"));
  axios.defaults.headers.common["Authorization"] = token;
}

export const initialState = {
  user: user,
  token: token,
  isSubmitting: false,
  errorMsg: null,
};

export const AuthReducer = (state, action) => {
  const { type, payload } = action;
  console.log(type, payload, state);
  switch (type) {
    case "LOGIN_REQUEST":
      return { ...state, isSubmitting: true };
    case "LOGIN_SUCCESS":
      console.log(state, payload);
      axios.defaults.headers.common["Authorization"] = payload.token;
      localStorage?.setItem("user", JSON.stringify(payload.user));
      localStorage?.setItem("token", JSON.stringify(payload.token));
      return {
        ...state,
        isSubmitting: false,
        user: payload.user,
        token: payload.token,
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        isSubmitting: false,
        errorMsg: payload,
      };
    case "SIGNUP_REQUEST":
      return { ...state, isSubmitting: true };
    case "SIGNUP_SUCCESS":
      console.log(state, payload);
      axios.defaults.headers.common["Authorization"] = payload.token;
      localStorage?.setItem("user", JSON.stringify(payload.user));
      localStorage?.setItem("token", JSON.stringify(payload.token));
      return {
        ...state,
        isSubmitting: false,
        user: payload.user,
        token: payload.token,
      };
    case "SIGNUP_ERROR":
      console.log("in", payload);
      return {
        ...state,
        isSubmitting: "heyyy",
        errorMsg: payload,
      };
    case "RESET":
      return {
        ...state,
        isSubmitting: false,
        errorMsg: null,
      };
    case "LOGOUT":
      return { isSubmitting: false, user: null, token: null };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};
