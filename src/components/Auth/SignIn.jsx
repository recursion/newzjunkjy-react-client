import React, { useState } from "react";
import { logIn } from "./auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign In</h1>
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
          <button
            type="submit"
            onClick={e => {
              e.preventDefault();
              logIn(email, password);
            }}
            className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
