import React from "react";
import { render } from "react-dom";
import { Store } from "webext-redux";
import { Provider } from "react-redux";

import Options from "../containers/OptionsPage";

const store = new Store();

store.ready().then(() => {
  render(
    <Provider store={store}>
      <Options />
    </Provider>,
    document.querySelector("#app")
  );
});
