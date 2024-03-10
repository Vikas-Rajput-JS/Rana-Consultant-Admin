const initialState = {
  user: {},
  search: "",
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
      };
      break;

    case "LOGOUT_SUCCESS":
      return state;
      break;

    case "SEARCH_STATE":
      return {
        ...state,
        search: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
