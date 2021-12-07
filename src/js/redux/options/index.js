import KeyMirror from "keymirror";
import { actions as userActions } from "../user";

export const actions = KeyMirror({
  setOption: null,
});

export const initialState = {
  sameTab: false,
  directMode: false,
  directModeService: "",
  colorScheme: "auto",
  primaryColor: "blue",
  order: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.setOption: {
      const { option, value } = action.payload;
      if (!Object.keys(initialState).includes(option)) {
        return state;
      }
      return {
        ...state,
        [option]: value,
      };
    }
    case userActions.clearUser: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
