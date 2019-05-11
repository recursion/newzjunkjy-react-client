import {
  ERROR,
  LOGGED_IN,
  LOGGED_OUT,
  LOGGING_IN,
  LOG_IN,
  LOG_OUT
} from "./constants";

export const initialState = {
  status: LOGGED_OUT,
  response: null,
  exception: null
};

export const reducer = (state, action) => {
  switch (action.type) {
    case LOGGING_IN:
      return { ...state, status: LOGGING_IN };

    case LOG_IN:
      return { ...state, status: LOGGED_IN, response: action.response };

    case LOG_OUT:
      return { ...state, status: LOGGED_OUT };

    case ERROR:
      return {
        ...state,
        status: ERROR,
        exception: action.exception,
        response: action.response
      };

    default:
      return state;
  }
};
