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
        redirect: `servicesActions.x.redirect`,
        callActionAndRedirect: `servicesActions.x.callActionAndRedirect`,
      },
      y: {
        setOption: `servicesActions.y.setOption`,
        resetOption: `servicesActions.y.resetOption`,
        callAction: `servicesActions.y.callAction`,
        redirect: `servicesActions.y.redirect`,
        callActionAndRedirect: `servicesActions.y.callActionAndRedirect`,
      },
      z: {
        setOption: `servicesActions.z.setOption`,
        resetOption: `servicesActions.z.resetOption`,
        callAction: `servicesActions.z.callAction`,
        redirect: `servicesActions.z.redirect`,
        callActionAndRedirect: `servicesActions.z.callActionAndRedirect`,
      },
    };

    expect(createServicesActions(services)).toStrictEqual(result);
  });
});
