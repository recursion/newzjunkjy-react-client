import { useState, useEffect } from "react";

function useAuth(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    function handleAuthenticationChange(status) {
      setIsAuthenticated(status);
    }

    const token = window.localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    window.addEventListener("storage", e => {
      if (e.detail.key === "authToken") {
        if (e.detail.newValue === "") {
          // logged out
          handleAuthenticationChange(false);
        } else {
          // logged in
          handleAuthenticationChange(true);
        }
      }
    });
  }, []);
  return isAuthenticated ? true : false;
}

/* possible states?:
  logged out
  logged in
  logging in
  error
*/
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
    .then(r => {
      if (r.error) {
      } else {
        window.localStorage.setItem("authToken", r.jwt);
        window.dispatchEvent(
          new CustomEvent("storage", {
            detail: { key: "authToken", newValue: r.jwt }
          })
        );
      }
    });
};

export const logOut = () => {
  window.localStorage.setItem("authToken", "");
  window.dispatchEvent(
    new CustomEvent("storage", { detail: { key: "authToken", newValue: "" } })
  );
};

export default useAuth;
