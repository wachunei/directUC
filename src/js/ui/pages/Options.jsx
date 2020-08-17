import React from "react";
import { render } from "react-dom";
import { Store } from "webext-redux";

import Providers from "./providers";
import Options from "../containers/Options";

const store = new Store();

store.ready().then(() => {
  render(
    <Providers store={store}>
      <Options />
    </Providers>,
    document.querySelector("#app")
  );
});
