import { ERROR, LOGGED_IN } from "./constants";

export const success = response => ({ type: LOGGED_IN, response });
export const error = (response, exception) => ({
  type: ERROR,
  response,
  exception
});
