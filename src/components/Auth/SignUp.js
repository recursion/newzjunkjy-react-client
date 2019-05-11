import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import useRequest from "../Request";
import { apiServer } from "../../config";
import { FETCHING, SUCCESS } from "../Request/constants";
import { setToken } from "./auth";

const options = {
  method: "POST",
  mode: "cors",
  headers: {
    "Content-Type": "application/json"
  }
};

const addBody = (fullName, email, password, password_confirmation) => {
  return {
    ...options,
    body: JSON.stringify({
      user: {
        fullName,
        email,
        password,
        password_confirmation
      }
    })
  };
};

const SignUp = () => {
  const [fullName, setFullName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [password_confirmation, setPasswordConfirmation] = useState(null);

  const [requestState, makeRequest] = useRequest(apiServer);

  if (requestState.status === SUCCESS) {
    setToken(requestState.response.jwt);
    return <Redirect to="/" />;
  }

  return (
    <div className="bg-grey-lighter min-h-ch flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="fullname"
            placeholder="Full Name"
            onChange={e => setFullName(e.target.value)}
          />

          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
          />
          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="confirm_password"
            placeholder="Confirm Password"
            onChange={e => setPasswordConfirmation(e.target.value)}
          />

          <button
            type="submit"
            onClick={() => {
              const r = addBody(
                fullName,
                email,
                password,
                password_confirmation
              );
              makeRequest(r);
            }}
            className={`w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1`}
          >
            {requestState.status === FETCHING ? (
              <span className="spinner block m-auto" />
            ) : (
              "Create Account"
            )}
          </button>

          <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="/terms"
            >
              Terms of Service
            </a>{" "}
            and
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="/privacy"
            >
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="text-grey-dark mt-6">
          Already have an account?
          <Link
            to="signIn"
            className="no-underline border-b border-blue text-blue ml-2"
          >
            {"Log in"}
          </Link>
          .
        </div>
      </div>
    </div>
  );
};

export default SignUp;
