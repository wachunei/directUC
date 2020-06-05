import {
  createServiceOptionsState,
  createInitialStates,
  DEFAULT_OPTIONS,
} from "./initialStates";

describe("createServiceOptionsState", () => {
  test.each([
    [
      {
        options: {
          exampleOption: {
            type: "boolean",
            default: false,
          },
          "otherOption-WithWeirdName": {
            type: "string",
            default: null,
          },
          undefinedOption: {
            type: "date",
          },
          number: {
            default: 1,
            depends: (options) => options.exampleOption,
          },
        },
      },
      {
        exampleOption: false,
        "otherOption-WithWeirdName": null,
        undefinedOption: undefined,
        number: 1,
      },
    ],
    [
      {
        options: {
          shouldNotAppear: undefined,
          "otherOption.WithWeirdName": {
            type: "string",
          },
        },
      },
      { "otherOption.WithWeirdName": undefined },
    ],
  ])("creates right object", (service, state) =>
    expect(createServiceOptionsState(service)).toStrictEqual(state)
  );

  test.each([
    [
      {
        name: "Service With Name",
      },
      {},
    ],
    [{}, {}],
    [{ options: undefined }, {}],
    [{ options: "ignore me" }, {}],
  ])("creates empty object", (service, state) =>
    expect(createServiceOptionsState(service)).toStrictEqual(state)
  );
});

describe("createInitialStates", () => {
  test("should create services options", () => {
    const services = {
      a: { options: {} },
      b: {
        name: "My test service",
        options: {
          number: {
            default: 1,
            depends: (options) => options.exampleOption,
          },
        },
      },
      c: {},
    };

    const result = {
      a: { ...DEFAULT_OPTIONS, ...createServiceOptionsState(services.a) },
      b: { ...DEFAULT_OPTIONS, ...createServiceOptionsState(services.b) },
      c: { ...DEFAULT_OPTIONS, ...createServiceOptionsState(services.c) },
    };

    expect(createInitialStates(services)).toStrictEqual(result);
  });
});
