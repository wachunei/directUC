import React from "react";
import { render } from "react-dom";
import { Store } from "webext-redux";
import { Provider } from "react-redux";

import Popup from "../containers/Popup";

const store = new Store();

store.ready().then(() => {
  render(
    <Provider store={store}>
      <Popup />
    </Provider>,
    document.querySelector("#app")
  );
});
