import { useState, useEffect } from "react";
const apiServer = "http://192.168.88.200:4000/api/v1/";

function useAuth(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleAuthenticationChange = e => {
      if (e.detail.key === "authToken") {
        if (e.detail.newValue === "") {
          // logged out
          setIsAuthenticated(false);
        } else {
          // logged in
          setIsAuthenticated(true);
        }
      }
    };

    const token = window.localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    window.addEventListener("storage", handleAuthenticationChange);
    return () => {
      return window.removeEventListener("storage", handleAuthenticationChange);
    };
  }, []);

  const logIn = async (email, password) => {
    try {
      const result = await fetch(`${apiServer}sign_in`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });
      if (result.status !== 200) {
        console.log(result.status);
        console.log(result.statusText);
      } else {
        window.localStorage.setItem("authToken", result.jwt);
        window.dispatchEvent(
          new CustomEvent("storage", {
            detail: { key: "authToken", newValue: result.jwt }
          })
        );
      }
    } catch (e) {
      console.error("Tough Nuggies: ", e);
    }
  };

  const logOut = () => {
    window.localStorage.setItem("authToken", "");
    window.dispatchEvent(
      new CustomEvent("storage", { detail: { key: "authToken", newValue: "" } })
    );
  };
  return [isAuthenticated, logIn, logOut];
}

export default useAuth;
