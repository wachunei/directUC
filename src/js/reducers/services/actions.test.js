import createServicesActions from "./actions";

describe("createServicesActions", () => {
  test("should create actions object with constants", () => {
    const services = {
      x: {},
      y: {},
      z: {},
    };

    const result = {
      x: {
        setOption: `servicesActions.x.setOption`,
        resetOption: `servicesActions.x.resetOption`,
        callAction: `servicesActions.x.callAction`,
      },
      y: {
        setOption: `servicesActions.y.setOption`,
        resetOption: `servicesActions.y.resetOption`,
        callAction: `servicesActions.y.callAction`,
      },
      z: {
        setOption: `servicesActions.z.setOption`,
        resetOption: `servicesActions.z.resetOption`,
        callAction: `servicesActions.z.callAction`,
      },
    };

    expect(createServicesActions(services)).toStrictEqual(result);
  });
});
