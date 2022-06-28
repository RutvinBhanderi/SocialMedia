export const auth = (state = { authData: null }, action) => {
  switch (action.type) {
    case "AUTH":
      localStorage.setItem("profile", JSON.stringify(action.payload));
      return { ...state, authData: action.payload };

    case "LOGOUT":
      localStorage.clear();
    default:
      return state;
  }
};
