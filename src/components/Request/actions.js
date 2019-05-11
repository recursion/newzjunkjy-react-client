import { FETCHING, SUCCESS, ERROR } from "./constants";

export const fetching = () => ({ type: FETCHING });
export const success = (response, body) => ({ type: SUCCESS, response, body });
export const error = (response, exception) => ({
  type: ERROR,
  response,
  exception
});
