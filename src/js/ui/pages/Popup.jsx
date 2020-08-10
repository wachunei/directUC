import React from "react";
import { render } from "react-dom";
import { Store } from "webext-redux";

import Providers from "./providers";
import Popup from "../containers/Popup";

const store = new Store();

store.ready().then(() => {
  render(
    <Providers store={store}>
      <Popup />
    </Providers>,
    document.querySelector("#app")
  );
});
