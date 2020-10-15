import { render } from "react-dom";
import { Store } from "webext-redux";

import Providers from "./providers";
import OptionsPage from "../containers/OptionsPage";

const store = new Store();

store.ready().then(() => {
  render(
    <Providers store={store}>
      <OptionsPage />
    </Providers>,
    document.querySelector("#app")
  );
});
