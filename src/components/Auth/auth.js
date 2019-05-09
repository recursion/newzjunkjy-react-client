import { useState, useEffect } from "react";

function useAuth(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const storage = window.localStorage;

  useEffect(() => {
    function handleAuthenticationChange(status) {
      setIsAuthenticated(status);
    }

    const token = storage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    window.addEventListener("storage", e => {
      if (e.key === "authToken") {
        if (e.newValue === "") {
          // logged out
          handleAuthenticationChange(false);
        } else {
          // logged in
          handleAuthenticationChange(true);
        }
      }
    });
  }, [storage]);
  return isAuthenticated ? true : false;
}

export const logIn = (email, password) => {
  fetch("http://192.168.88.205:4000/api/v1/sign_in", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  })
    .then(r => r.json())
    .then(r => console.log(r));
};

export default useAuth;
