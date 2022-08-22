const initialState = {
  isLoading: false,
};

export default (state = initialState, aciotn) => {
  switch (aciotn.type) {
    case "DISPLAY_LOADING":
      state.isLoading = true;
      return { ...state };
    case "HIDE_LOADING": {
      state.isLoading = false;
      return { ...state };
    }

    default:
      return state;
  }
};
