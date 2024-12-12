const initialState = {
  Loading: false,
  error: null,
  userData: {},
};

const apiReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, Loading: action.payload };
    case "SET_ERROR":
      return { ...state, Loading: false, error: action.payload };
    case "SET_USER_DATA":
      return { ...state, Loading: false, userData: action.payload };
    default:
      return state;
  }
};

export { apiReducer, initialState };
