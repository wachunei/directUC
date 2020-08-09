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
          display: false,
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
          numberWithoutType: {
            default: 1,
            depends: (options) => options.exampleOption,
          },
          number: {
            type: "number",
            default: 42,
            depends: (options) => options.exampleOption,
          },
          numberWithoutDefault: {
            type: "number",
          },
          aCheckbox: {
            type: "checkbox",
          },
        },
      },
      {
        display: false,
        exampleOption: false,
        "otherOption-WithWeirdName": "",
        undefinedOption: undefined,
        number: 42,
        numberWithoutDefault: 0,
        aCheckbox: false,
      },
    ],
    [{ options: { display: true } }, { display: true }],
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
            type: "number",
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
