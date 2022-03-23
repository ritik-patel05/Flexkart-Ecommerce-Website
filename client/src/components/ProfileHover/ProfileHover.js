import { Link, useNavigate } from "react-router-dom";
import { useAuthDispatch, useAuthState } from "../../context/Auth";
import "./ProfileHover.css";

const ProfileHover = ({ isProfileHoverVisible }) => {
  const { user, logout } = useAuthState();
  const navigate = useNavigate();
  console.log(user);
  const handleLogout = () => {
    logout();
    console.log("Successfully logged out.");
    navigate("/");
    console.log("finished");
  };

  return (
    <div
      className={`${isProfileHoverVisible ? "profile-wrapper" : "invisible"}`}
    >
      {!user.user && (
        <>
          <div className="profile-title">Welcome</div>
          <div className="profile-subtitle">
            {" "}
            To access account and manage orders{" "}
          </div>
        </>
      )}
      {user.user && (
        <div className="profile-title">Hello {user.user.firstName} </div>
      )}
      {!user.user && (
        <div className="buttons">
          <Link to="/login" className="btn is-primary">
            <span className="has-text-weight-semibold">Login</span>
          </Link>
          <Link to="/signup" className="btn is-secondary">
            <span className="has-text-weight-semibold">Sign Up</span>
          </Link>
        </div>
      )}
      <hr className="navbar-divider" />
      <div className="profile-items">
        <div>Orders</div>
        <div>Wishlist</div>
        <div>Contact Us</div>
      </div>
      <hr className="navbar-divider" />
      <div className="profile-items">
        <div>Coupons</div>
        <div>Saved Addresses</div>
      </div>
      {user.user && (
        <>
          <hr className="navbar-divider" />
          <div className="profile-items">
            <div>Edit Profile</div>
            <div onClick={handleLogout}>Logout</div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileHover;
