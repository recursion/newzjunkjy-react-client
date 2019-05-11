import { useReducer } from "react";
import reducer, { initialState } from "./reducer";
import { fetching, success, error } from "./actions";

const Request = endpoint => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const makeRequest = async options => {
    dispatch(fetching());
    try {
      const response = await fetch(`${endpoint}sign_up`, options);
      dispatch(success(response));
    } catch ({ response = null, ...exception }) {
      dispatch(error(response, exception));
    }
  };

  return [state, makeRequest];
};

export default Request;
