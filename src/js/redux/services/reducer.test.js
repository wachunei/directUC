import createServiceReducer from "./reducer";
import { actions as userActions } from "../user";

const initialState = {
  display: true,
  email: undefined,
};
const actions = {
  setOption: "setOption",
  resetOption: "resetOption",
};

describe("createServiceReducer", () => {
  test("should create reducer", () => {
    const reducer = createServiceReducer(initialState, actions);
    expect(reducer).not.toBeNull();
    expect(reducer).toBeInstanceOf(Function);
  });

  describe("reducer", () => {
    test("should return initial state", () => {
      const reducer = createServiceReducer(initialState, actions);
      const state = reducer(undefined, {});

      expect(state).toStrictEqual(initialState);
    });

    test("should return same state", () => {
      const reducer = createServiceReducer(initialState, actions);
      const currentState = {
        display: false,
        email: "mycurrent@state.com",
      };
      const state = reducer(currentState, {});

      expect(state).toStrictEqual(currentState);
    });

    test("should setOption", () => {
      const reducer = createServiceReducer(initialState, actions);

      const state = reducer(initialState, {
        type: actions.setOption,
        payload: { option: "email", value: "mynew@email.com" },
      });

      expect(state).toStrictEqual({
        display: true,
        email: "mynew@email.com",
      });
    });

    test("should resetOption", () => {
      const reducer = createServiceReducer(initialState, actions);

      const currentState = {
        display: false,
        email: "myInitialEmail@email.com",
      };

      const state = reducer(currentState, {
        type: actions.resetOption,
        payload: { option: "email" },
      });

      expect(state).toStrictEqual({
        ...currentState,
        email: initialState.email,
      });

      const lastState = reducer(state, {
        type: actions.resetOption,
        payload: { option: "display" },
      });

      expect(lastState).toStrictEqual(initialState);
    });

    test("should return initial when clearing user", () => {
      const reducer = createServiceReducer(initialState, actions);

      const state = reducer(initialState, {
        type: actions.setOption,
        payload: { option: "email", value: "mynew@email.com" },
      });

      const clearedState = reducer(state, {
        type: userActions.clearUser,
      });

      expect(clearedState).toStrictEqual(initialState);
    });
  });
});
