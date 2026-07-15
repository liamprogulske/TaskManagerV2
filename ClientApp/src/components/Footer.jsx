import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

export function Footer() {
  let history = useHistory();
  return (
    <>
      <footer className="footer">
        <div className="content has-text-centered footer-content">
          <span className="back-arrow">
            <i
              className=" fas fa-arrow-alt-circle-left fa-2x "
              onClick={() => history.goBack()}
            ></i>
          </span>
          <p className="footer-text">
            <strong>Task Tracker</strong> by{" "}
            <a href="https://joeywoey.com">Joe M</a>.
          </p>
        </div>
      </footer>
    </>
  );
}
