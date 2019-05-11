import React from "react";
import { Link } from "react-router-dom";
import { LOGGED_IN } from "../Auth/constants";

const Header = ({ authData }) => {
  const [auth, , logOut] = authData;
  return (
    <header className="flex flex-col justify-between">
      <div className="flex flex-row justify-between">
        <Link className="no-underline font-sans text-grey-darker" to="/">
          <h1 className="shadow-basic">NewzJunky</h1>
        </Link>
        <nav className="flex flex-col justify-around text-xs mr-2">
          {auth.status !== LOGGED_IN ? (
            <>
              <Link className="no-underline" to="signIn">
                {"Sign In"}
              </Link>
              <Link className="no-underline" to="signUp">
                {"Sign Up"}
              </Link>
            </>
          ) : (
            <button onClick={() => logOut()}>Sign Out</button>
          )}
        </nav>
      </div>
      <nav className="flex flex-row justify-around">
        <Link
          className="no-underline text-white bg-grey shadow-basic w-full text-center border border-black"
          to="search"
        >
          {"Search"}
        </Link>
        <Link
          className="no-underline text-white shadow-basic bg-grey w-full text-center border border-black"
          to="submit"
        >
          {"Submit"}
        </Link>
      </nav>
    </header>
  );
};
export default Header;
