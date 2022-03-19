import { useEffect, useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthDispatch, useAuthState } from "../../context/Auth";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import "../Login/Login.css";

const Signup = () => {
  useDocumentTitle("Sign up");

  const { user, signup } = useAuthState();
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
      case "acceptAllTC":
        return { ...state, acceptAllTC: payload };
      default:
        throw new Error("Invalid action type");
    }
  };

  const initialState = { email: "", password: "", acceptAllTC: false };

  const [state, formDispatch] = useReducer(reducer, initialState);

  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);

  const handleInputChange = (event) => {
    const { target } = event;
    let { type, checked, value, name } = target;
    value = type === "checkbox" ? checked : value;

    formDispatch({ type: name, payload: value });
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    dispatch({ type: "RESET" });

    let error = null;
    try {
      error = await signup(state);
    } catch (err) {
      error = err.message;
    }

    // Display snackbar of 2seconds, if error occured.
    if (error) {
      setIsSnackbarVisible(true);
      setTimeout(() => {
        setIsSnackbarVisible((isVisible) => !isVisible);
      }, 2000);
    } else {
      navigate("/");
    }
  };

  return (
    <main className="container">
      <div className="nouse"></div>
      <div className="wrapper">
        <form className="login">
          <h2 className="title">Signup</h2>
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
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              className="input"
              type="password"
              value={state.password}
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container is-extra-fields">
            <div className="">
              <input
                id="remember-me"
                name="acceptAllTC"
                type="checkbox"
                checked={state.acceptAllTC}
                onChange={handleInputChange}
              />
              <label htmlFor="remember-me">
                I accept all Terms & Conditions
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="btn input-container is-primary"
            onClick={handleSignup}
            disabled={isSubmitting}
          >
            Create New Account
          </button>
          <Link to="/login" className="input-container account">
            Already have an account &gt;
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

export default Signup;
