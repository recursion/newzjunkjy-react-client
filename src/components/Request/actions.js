import { FETCHING, SUCCESS, ERROR } from "./constants";

export const fetching = () => ({ type: FETCHING });
export const success = response => ({ type: SUCCESS, response });
export const error = (response, exception) => ({
  type: ERROR,
  response,
  exception
});
