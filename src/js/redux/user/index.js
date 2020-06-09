import KeyMirror from "keymirror";

export const actions = KeyMirror({
  login: null,
  logout: null,
});

const initialState = {
  username: null,
  password: null,
  fullName: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.login: {
      const { username, password, fullName } = action.payload;
      return {
        username,
        password,
        fullName,
      };
    }
    case actions.logout: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
