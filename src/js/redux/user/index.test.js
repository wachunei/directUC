import reducer, { initialState, actions } from ".";

describe("user reducer", () => {
  test("returns initial state", () => {
    const state = reducer(undefined, {});
    expect(state).toStrictEqual(initialState);
  });

  test("returns given initial state", () => {
    const existingInitialState = {
      username: "testusername",
      password: "testpassword",
      fullName: "Test Name",
    };
    const state = reducer(existingInitialState, {});
    expect(state).toStrictEqual(existingInitialState);
  });

  test("should setUser", () => {
    const user = {
      username: "testusername",
      password: "testpassword",
      fullName: "Test Name",
    };
    const state = reducer(undefined, {
      type: actions.setUser,
      payload: user,
    });

    expect(state).toStrictEqual(user);
  });

  test("should clearUser", () => {
    const existingInitialState = {
      username: "testusername",
      password: "testpassword",
      fullName: "Test Name",
    };
    const state = reducer(existingInitialState, {});
    const clearState = reducer(state, { type: actions.clearUser });
    expect(clearState).toStrictEqual(initialState);
  });
});
