import KeyMirror from "keymirror";

const actions = KeyMirror({
  login: null,
  logout: null,
});

const initialState = {
  username: "testeando",
  password: "testing",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.login: {
      return {
        username: action.payload.username,
        password: action.payload.password,
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
