export const post = (state = { posts: [], isLoading: true }, action) => {
  switch (action.type) {
    case "CREATE":
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case "FETCH__ALL":
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPage: action.payload.totalNoOfPage,
      };
    case "FETCH__BY__SEARCH":
      return {
        ...state,
        posts: action.payload,
      };
    case "FETCH__POST":
      return {
        ...state,
        post: action.payload,
      };
    case "UPDATE__POST":
    case "LIKE__POST":
      return {
        ...state,
        posts: state.posts.map((post) => {
          return post._id === action.payload._id ? action.payload : post;
        }),
      };
    case "DELETE__POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case "START__LOADING":
      return { ...state, isLoading: true };
    case "END__LOADING":
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
