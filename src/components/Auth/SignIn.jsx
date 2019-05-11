import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { LOGGED_IN, ERROR, LOGGING_IN } from "./constants";

const SignIn = ({ authData }) => {
  const [auth, logIn] = authData;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const error = auth.status === ERROR;

  const renderAuthError = auth => {
    if (auth.exception) {
      console.error(auth.exception);
      return <div>{auth.exception}</div>;
    }
    return auth.response ? (
      <div className="text-red text-center">{auth.response.statusText}</div>
    ) : (
      <div className="text-red text-center">Error</div>
    );
  };

  const submit = e => {
    if (e.key === "Enter") logIn(email, password);
  };

  if (auth.status === LOGGED_IN) return <Redirect to="/" />;
  const inputBorderColor =
    auth.status === ERROR ? "border-red" : "border-grey-light";

  return (
    <div className="bg-grey-lighter min-h-ch flex flex-col justify-center items-center">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign In</h1>
          <input
            type="text"
            className={`block border ${inputBorderColor} w-full p-3 rounded mb-4`}
            name="email"
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            className={`block border ${inputBorderColor} w-full p-3 rounded mb-4`}
            name="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            onKeyPress={submit}
          />
          {error ? renderAuthError(auth) : <div />}
          <button
            type="submit"
            onClick={e => {
              e.preventDefault();
              logIn(email, password);
            }}
            className={`w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1`}
          >
            {auth.status === LOGGING_IN ? (
              <span className="spinner block m-auto" />
            ) : (
              "Sign In"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
