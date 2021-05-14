import { actions as userActions } from "../user";

const createServiceReducer =
  (initialState, actions) =>
  (state = initialState, action) => {
    switch (action.type) {
      case actions.setOption: {
        const { option, value } = action.payload;
        return {
          ...state,
          [option]: value,
        };
      }
      case actions.resetOption: {
        const { option } = action.payload;
        return {
          ...state,
          [option]: initialState[option],
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

export default createServiceReducer;
