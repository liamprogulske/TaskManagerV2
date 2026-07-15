import React, { useState } from "react";
import { Menu } from "../components/Menu";
import { Footer } from "../components/Footer";
import { Link } from "react-router-dom";
import { recordAuthentication } from "../../auth";

export function LogIn() {
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function handleStringFieldChange(event) {
    const value = event.target.value;
    const fieldName = event.target.name;
    const updatedUser = { ...user, [fieldName]: value };
    setUser(updatedUser);
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/Sessions", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    });
    const apiResponse = await response.json();
    if (apiResponse.status === 400) {
      setErrorMessage(Object.values(apiResponse.errors).join(" "));
    } else {
      recordAuthentication(apiResponse);
      window.location.assign("/projects");
    }
  }
  return (
    <>
      <Menu message="Welcome, please Log In!" color="is-link" />
      <div className="login-main">
        {errorMessage && (
          <article className="message is-warning">
            <div className="message-body">{errorMessage}</div>
          </article>
        )}
        <section className="hero has-text-centered">
          <div className="hero-body">
            <p className="title">Task Tracker</p>
          </div>
        </section>
        <h1 className="has-text-centered login-text">Please Log In!</h1>
        <form className="box login-box" onSubmit={handleFormSubmit}>
          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <input
                className="input"
                name="email"
                type="email"
                placeholder="Email"
                value={user.email}
                onChange={handleStringFieldChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-check"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="password"
                name="password"
                placeholder="Password"
                value={user.password}
                onChange={handleStringFieldChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control login-buttons has-text-centered">
              <Link className="button is-link is-light" to="/signUp">
                Register
              </Link>

              <button className="button is-link" type="submit">
                Login
              </button>
            </p>
          </div>
          <div>
            <a className="password-reset" href="https://google.com">
              Forget your password?
            </a>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
