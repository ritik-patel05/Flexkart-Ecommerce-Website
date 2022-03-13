import { useReducer } from "react";
import "./Login.css";

const Login = () => {
  const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
      case "email":
        return { ...state, email: payload };
      case "password":
        return { ...state, password: payload };
      case "rememberMe":
        return { ...state, rememberMe: payload };
      default:
        throw new Error("Invalid action type");
    }
  };

  const initialState = { email: "", password: "", rememberMe: false };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleInputChange = (event) => {
    const { target } = event;
    let { type, checked, value, name } = target;
    value = type === "checkbox" ? checked : value;

    dispatch({ type: name, payload: value });
  };

  const handleLogin = () => {
    // Todo: call server
  };

  return (
    <main className="container">
      <div className="nouse"></div>
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
          >
            Login
          </button>
          <a className="input-container account">Create New Account &gt;</a>
        </form>
      </div>
    </main>
  );
};

export default Login;
