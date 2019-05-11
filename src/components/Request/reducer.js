import { FETCHING, SUCCESS, ERROR } from "./constants";

export const initialState = {
  status: null,
  response: null,
  exception: null,
  body: null
};

const reducer = (
  state = initialState,
  { type, response, exception, body } = {}
) => {
  switch (type) {
    case FETCHING:
      return { ...initialState, status: FETCHING };
    case SUCCESS:
      return { ...state, status: SUCCESS, response, body };
    case ERROR:
      return {
        ...state,
        status: ERROR,
        response,
        exception
      };
    default:
      return state;
  }
};

export default reducer;
