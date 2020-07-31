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
            type: "checkbox",
            default: false,
            options: {
              hola: {},
            },
          },
          "otherOption-WithWeirdName": {
            type: "text",
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
      a: { ...createServiceOptionsState(services.a), ...DEFAULT_OPTIONS },
      b: { ...createServiceOptionsState(services.b), ...DEFAULT_OPTIONS },
      c: { ...createServiceOptionsState(services.c), ...DEFAULT_OPTIONS },
    };

    expect(createInitialStates(services)).toStrictEqual(result);
  });
});
