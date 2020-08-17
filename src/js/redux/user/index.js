import KeyMirror from "keymirror";

export const actions = KeyMirror({
  setUser: null,
  clearUser: null,
});

export const initialState = {
  username: null,
  password: null,
  fullName: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.setUser: {
      const { username, password, fullName } = action.payload;
      return {
        username,
        password,
        fullName,
      };
    }
    case actions.clearUser: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
