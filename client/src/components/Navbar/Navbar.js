import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "../../context/Auth";
import ProfileHover from "../ProfileHover";
import "./Navbar.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileHoverVisible, setIsProfileHoverVisible] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((isOpen) => !isOpen);
  };

  const { user } = useAuthState();
  return (
    <div className="navbar-fk">
      <div className="navbar-container">
        <div className="navbar-title">
          <a
            href="#"
            id="navbarBurger"
            role="button"
            className={`navbar-burger ${isMobileMenuOpen ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded="false"
            onClick={toggleMobileMenu}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
          <Link to="/" className="is-title" href="#">
            <span className="has-text-weight-bold is-size-5">Flexkart</span>
          </Link>
        </div>
        <div className="search-field">
          <form>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Search for products"
              />
              <button className="btn is-secondary">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </form>
        </div>
        <nav className="navbar-actions desktop">
          <div
            className="action-item is-profile"
            onMouseEnter={(e) => setIsProfileHoverVisible(true)}
            onMouseLeave={(e) => setIsProfileHoverVisible(false)}
          >
            <div className="profile-item">
              <div className="icon">
                <i className="fas fa-user"></i>
              </div>
              <div className="icon-name">Profile</div>
            </div>
            <ProfileHover isProfileHoverVisible={isProfileHoverVisible} />
          </div>

          <a className="action-item">
            <div className="icon">
              <i className="fas fa-heart"></i>
            </div>
            <div className="icon-name">Wishlist</div>
          </a>
          <a className="action-item">
            <div className="icon">
              <i className="fas fa-shopping-cart"></i>
            </div>
            <div className="icon-name">Store</div>
          </a>
        </nav>
      </div>
      <nav className={`navbar-mobile ${isMobileMenuOpen ? "is-active" : ""}`}>
        <a className="action-item">
          <div className="icon">
            <i className="fas fa-heart"></i>
          </div>
          <div className="icon-name">Wishlist</div>
        </a>
        <a className="action-item">
          <div className="icon">
            <i className="fas fa-shopping-cart"></i>
          </div>
          <div className="icon-name">Store</div>
        </a>
        <hr />
        <a className="action-item">
          <div className="icon">
            <i className="fas fa-user"></i>
          </div>
          <div className="icon-name">Profile</div>
        </a>
        {!user.user && (
          <div className="action-item buttons">
            <Link to="/login" className="btn is-primary">
              <span className="has-text-weight-semibold">Login</span>
            </Link>
            <Link to="/signup" className="btn is-secondary">
              <span className="has-text-weight-semibold">Sign Up</span>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
