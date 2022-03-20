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
  const [formError, setFormError] = useState("");

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
      case "firstName":
        return { ...state, firstName: payload };
      case "lastName":
        return { ...state, lastName: payload };
      case "password":
        return { ...state, password: payload };
      case "isPasswordVisible":
        return { ...state, isPasswordVisible: payload };
      case "confirmPassword":
        return { ...state, confirmPassword: payload };
      case "isConfirmPasswordVisible":
        return { ...state, isConfirmPasswordVisible: payload };
      case "acceptAllTC":
        return { ...state, acceptAllTC: payload };
      default:
        throw new Error("Invalid action type");
    }
  };

  const initialState = {
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    acceptAllTC: false,
    isPasswordVisible: false,
    isConfirmPasswordVisible: false,
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

  const handleSignup = async (event) => {
    event.preventDefault();

    if (state.password !== state.confirmPassword) {
      console.log("in");
      setFormError("Both Passwords dont match");
      return;
    }

    dispatch({ type: "RESET" });

    const { firstName, lastName, email, password } = state;

    let error = null;
    try {
      error = await signup({ firstName, lastName, email, password });
    } catch (err) {
      error = err.message;
    }

    // Display snackbar of 4seconds, if error occured.
    if (error) {
      setIsSnackbarVisible(true);
      setTimeout(() => {
        setIsSnackbarVisible((isVisible) => !isVisible);
      }, 4000);
    } else {
      navigate("/");
    }
  };

  return (
    <main className="container">
      <div className="wrapper">
        <form className="login" onSubmit={handleSignup}>
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
            <label htmlFor="firstName">First name</label>
            <input
              id="firstName"
              name="firstName"
              className="input"
              type="text"
              value={state.firstName}
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="lastName">Last name</label>
            <input
              id="lastName"
              name="lastName"
              className="input"
              type="text"
              value={state.lastName}
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
          <div className="input-container have-icon-right">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              className="input"
              type={`${state.isConfirmPasswordVisible ? "text" : "password"}`}
              value={state.confirmPassword}
              required
              onChange={handleInputChange}
            />
            <span
              className="icon is-right"
              onClick={() =>
                togglePasswordVisibility("isConfirmPasswordVisible")
              }
            >
              <i
                className={`fas fa-eye${
                  state.isConfirmPasswordVisible ? "-slash" : ""
                }`}
              ></i>{" "}
            </span>
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
            disabled={isSubmitting}
          >
            Create New Account
          </button>
          {formError && <div className="formError">{formError}</div>}
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
