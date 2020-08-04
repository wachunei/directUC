import KeyMirror from "keymirror";
import { actions as userActions } from "../user";

export const actions = KeyMirror({
  setOption: null,
});

const initialState = {
  sameTab: false,
  directMode: false,
  directModeService: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.setOption: {
      const { option, value } = action.payload;
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
