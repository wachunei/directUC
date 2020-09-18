import reducer, { initialState, actions } from ".";
import { actions as userActions } from "../user";

const existingInitialState = {
  sameTab: true,
  directMode: true,
  directModeService: "siding",
  colorScheme: "auto",
  order: null,
};
describe("options reducer", () => {
  test("returns initial state", () => {
    const state = reducer(undefined, {});
    expect(state).toStrictEqual(initialState);
  });

  test("returns given initial state", () => {
    const state = reducer(existingInitialState, {});
    expect(state).toStrictEqual(existingInitialState);
  });

  test("sets option value", () => {
    const state = reducer(existingInitialState, {});
    const changedState = reducer(state, {
      type: actions.setOption,
      payload: {
        option: "directMode",
        value: false,
      },
    });
    expect(changedState).toStrictEqual({
      ...existingInitialState,
      directMode: false,
    });
  });

  test("does not set unallowed option value", () => {
    const state = reducer(existingInitialState, {});
    const changedState = reducer(state, {
      type: actions.setOption,
      payload: {
        option: "unallowedOption",
        value: "unallowedValue",
      },
    });
    expect(changedState).toStrictEqual(existingInitialState);
  });

  test("returns to initial state on clearUser", () => {
    const state = reducer(existingInitialState, {});
    const changedState = reducer(state, {
      type: userActions.clearUser,
    });

    expect(changedState).toStrictEqual(initialState);
  });
});
