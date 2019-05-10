import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import useAuth from "./components/Auth/auth";
// const apiServer = "http://192.168.88.205:4000";

const App = () => {
  const [isAuthenticated, logIn, logOut] = useAuth();

  return (
    <Router>
      <header>
        <Link to="/">
          <h1>NewzJunky</h1>
        </Link>
        <nav>
          {!isAuthenticated ? (
            <>
              <Link to="signIn">{"Sign In"}</Link>
              <Link to="signUp">{"Sign Up"}</Link>
            </>
          ) : (
            <button onClick={() => logOut()}>Sign Out</button>
          )}
        </nav>
      </header>
      <section>
        <Route exact={true} path="/" render={() => <h1>News and Stuff</h1>} />
        <Route path="/signIn" component={() => <SignIn logIn={logIn} />} />
        <Route path="/signUp" component={SignUp} />
      </section>
    </Router>
  );
};

export default App;
