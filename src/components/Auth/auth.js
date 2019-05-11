import { useReducer, useEffect } from "react";
import { LOGGING_IN, LOG_IN, LOG_OUT } from "./constants";
import { reducer, initialState } from "./reducer";
import { error, success } from "./actions";
const apiServer = "http://192.168.88.200:4000/api/v1/";

function useAuth(props) {
  //const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authentication, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const handleAuthenticationChange = e => {
      if (e.detail.key === "authToken") {
        if (e.detail.newValue === "") {
          // logged out
          dispatch({ type: LOG_OUT });
        } else {
          // logged in
          dispatch({ type: LOG_IN });
        }
      }
    };

    const token = window.localStorage.getItem("authToken");
    if (token) {
      dispatch({ type: LOG_IN });
    } else {
      dispatch({ type: LOG_OUT });
    }

    window.addEventListener("storage", handleAuthenticationChange);
    return () => {
      return window.removeEventListener("storage", handleAuthenticationChange);
    };
  }, []);

  const logIn = async (email, password) => {
    dispatch({ type: LOGGING_IN });
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
        dispatch(error(result));
      } else {
        window.localStorage.setItem("authToken", result.jwt);
        window.dispatchEvent(
          new CustomEvent("storage", {
            detail: { key: "authToken", newValue: result.jwt }
          })
        );
        dispatch(success(result.response));
      }
    } catch (e) {
      dispatch(error(null, e));
    }
  };

  const logOut = () => {
    dispatch({ type: LOG_OUT });
    window.localStorage.setItem("authToken", "");
    window.dispatchEvent(
      new CustomEvent("storage", {
        detail: { key: "authToken", newValue: "" }
      })
    );
  };
  return [authentication, logIn, logOut];
}

export default useAuth;
