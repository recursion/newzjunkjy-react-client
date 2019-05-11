import React from "react";
import { Link } from "react-router-dom";
import { LOGGED_IN } from "../Auth/constants";

const Header = ({ authData }) => {
  const [auth, logIn, logOut] = authData;
  return (
    <header className="flex flex-row justify-between">
      <Link className="no-underline font-sans text-grey-darker" to="/">
        <h1>NewzJunky</h1>
      </Link>
      <nav className="flex flex-col justify-around text-xs mr-2">
        {auth.status !== LOGGED_IN ? (
          <>
            <Link to="signIn">{"Sign In"}</Link>
            <Link to="signUp">{"Sign Up"}</Link>
          </>
        ) : (
          <button onClick={() => logOut()}>Sign Out</button>
        )}
      </nav>
    </header>
  );
};
export default Header;
