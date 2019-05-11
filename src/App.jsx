import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import useAuth from "./components/Auth/auth";
import News from "./components/News";
import Header from "./components/Header";

// const apiServer = "http://192.168.88.205:4000";

const App = () => {
  const authData = useAuth();

  return (
    <Router>
      <Header authData={authData} />
      <section>
        <Route exact={true} path="/" component={News} />
        <Route
          path="/signIn"
          component={() => <SignIn authData={authData} />}
        />
        <Route path="/signUp" component={SignUp} />
      </section>
    </Router>
  );
};

export default App;
