import React from "react";
import "./App.css";
function Succes() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-warning mb-5">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            StripeStore
          </a>
        </div>
      </nav>

      <div className="success">
        <div
          className="alert alert-success d-flex align-items-center"
          role="alert"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="bi flex-shrink-0 me-2"
            width="24"
            height="24"
            role="img"
            aria-label="Success:"
          >
            <symbol
              id="check-circle-fill"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </symbol>
            <use href="#check-circle-fill" />
          </svg>
          <div>your purchase was successful</div>
        </div>
        <a href="/" className="btn btn-primary small">
          Keep buying
        </a>
      </div>
    </>
  );
}

export default Succes;
