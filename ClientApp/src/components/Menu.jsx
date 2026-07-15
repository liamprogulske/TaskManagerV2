import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isLoggedIn, logout, getUser } from "../../auth";

const user = getUser();

export function Menu(props) {
  const [isActive, setisActive] = useState(false);

  function handleLogout() {
    logout();

    window.location.assign("/");
  }

  return (
    <>
      <nav
        className={`navbar is-fixed-top ${props.color}`}
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <h1 className="is-title navbar-item">{props.message}</h1>
          <button
            onClick={() => {
              setisActive(!isActive);
            }}
            className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>

        <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
          <div className="navbar-start ">
            {/* <figure className="image is-64x64 profile-picture">
              <img
                className="is-rounded "
                src={`${user.photoURL}`}
                alt="profile"
              />
            </figure> */}

            <Link className="navbar-item is-large" to="/projects">
              Projects
            </Link>

            <Link className="navbar-item" to="/profile">
              Profile
            </Link>

            <span className="navbar-item is-small">Report an issue</span>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              {isLoggedIn() && user.photoURL ? (
                <figure className="image is-1by1">
                  <img
                    className="is-rounded "
                    src={user.photoURL}
                    alt={`${user.name}'s Profile'`}
                    height="32"
                  />
                </figure>
              ) : null}
            </div>
            <div className="navbar-item">
              <div className="buttons">
                {isLoggedIn() ? (
                  <span className="button is-light" onClick={handleLogout}>
                    Log Out
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
