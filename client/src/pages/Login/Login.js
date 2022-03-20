import { useEffect, useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthDispatch, useAuthState } from "../../context/Auth";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import "./Login.css";

const Login = () => {
  useDocumentTitle("Log in");

  const { user, login } = useAuthState();
  const dispatch = useAuthDispatch();
  const { isSubmitting, errorMsg } = user;

  const navigate = useNavigate();

  useEffect(() => {
    // if user is already authenticated
    if (user.user) {
      navigate("/");
    }
  }, []);

  const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
      case "email":
        return { ...state, email: payload };
      case "password":
        return { ...state, password: payload };
      case "isPasswordVisible":
        return { ...state, isPasswordVisible: payload };
      case "rememberMe":
        return { ...state, rememberMe: payload };
      default:
        throw new Error("Invalid action type");
    }
  };

  const initialState = {
    email: "",
    password: "",
    rememberMe: false,
    isPasswordVisible: false,
  };

  const [state, formDispatch] = useReducer(reducer, initialState);

  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);

  const handleInputChange = (event) => {
    const { target } = event;
    let { type, checked, value, name } = target;
    value = type === "checkbox" ? checked : value;

    formDispatch({ type: name, payload: value });
  };

  const togglePasswordVisibility = (type) => {
    formDispatch({ type, payload: !state[type] });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch({ type: "RESET" });

    let error = null;
    try {
      error = await login(state);
    } catch (err) {
      error = err.message;
    }

    // Display snackbar of 4seconds, if error occured.
    if (error) {
      setIsSnackbarVisible(true);
      setTimeout(() => {
        setIsSnackbarVisible((isVisible) => !isVisible);
      }, 3000);
    } else {
      navigate("/");
    }
  };

  return (
    <main className="container">
      <div className="wrapper">
        <form className="login">
          <h2 className="title">Login</h2>
          <div className="input-container">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              className="input"
              type="email"
              value={state.email}
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container have-icon-right">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              className="input"
              type={`${state.isPasswordVisible ? "text" : "password"}`}
              value={state.password}
              required
              onChange={handleInputChange}
            />
            <span
              className="icon is-right"
              onClick={() => togglePasswordVisibility("isPasswordVisible")}
            >
              <i
                className={`fas fa-eye${
                  state.isPasswordVisible ? "-slash" : ""
                }`}
              ></i>{" "}
            </span>
          </div>
          <div className="input-container is-extra-fields">
            <div className="">
              <input
                id="remember-me"
                name="rememberMe"
                type="checkbox"
                checked={state.rememberMe}
                onChange={handleInputChange}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <a href="">Forget your Password?</a>
          </div>
          <button
            type="submit"
            className="btn input-container is-primary"
            onClick={handleLogin}
            disabled={isSubmitting}
          >
            Login
          </button>
          <Link to="/signup" className="input-container account">
            Create New Account &gt;
          </Link>
        </form>
        {isSnackbarVisible && (
          <div className="snackbar is-danger">
            <span className="icon is-left">
              <i className="fas fa-info-circle"></i>
            </span>
            <div className="is-msg">{errorMsg}</div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Login;
