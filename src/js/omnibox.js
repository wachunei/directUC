import browser from "webextension-polyfill";
import Fuse from "fuse.js";
import { isFirefox } from "./utils";

function omnibox(services, { getState, dispatch }) {
  const servicesList = Object.entries(services)
    .filter(([, service]) => service.display)
    .map(([key, service]) => ({
      id: key,
      ...service,
    }));

  const resultToSuggestion = ({ item: service }) => ({
    content: service.name || service.display,
    description: isFirefox
      ? `directUC - ${service.name || service.display} - Ir a ${service.name}`
      : `<match>${service.name || service.display}</match> <dim>Ir a ${
          service.name
        }</dim>`,
  });

  const resultToDefaultSuggestion = (result) => {
    const { content, ...suggestion } = resultToSuggestion(result);
    return suggestion;
  };

  let latestSuggestion = null;

  const fuseOptions = {
    // isCaseSensitive: false,
    // includeScore: true,
    // shouldSort: true,
    // includeMatches: true,
    // findAllMatches: true,
    // minMatchCharLength: 1,
    // location: 0,
    threshold: 0.3,
    distance: 10,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: true,
    keys: ["omnibox", "name", "display"],
    sortFn: (a, b) =>
      // eslint-disable-next-line no-nested-ternary
      a.score === b.score
        ? a.idx < b.idx
          ? -1
          : 1
        : a.score < b.score
        ? 1
        : -1,
  };

  const servicesFuse = new Fuse(servicesList, fuseOptions);

  browser.omnibox.onInputStarted.addListener(() => {
    const {
      user: { username },
    } = getState();
    if (!username) {
      latestSuggestion = null;
      browser.omnibox.setDefaultSuggestion({
        description: "Presiona enter para iniciar sesión en directUC",
      });
    }
  });

  browser.omnibox.onInputChanged.addListener((text, suggest) => {
    const {
      user: { username },
    } = getState();

    if (!username) {
      return;
    }

    if (text.length === 0) {
      latestSuggestion = null;
      browser.omnibox.setDefaultSuggestion({
        description: "Escribe para buscar un servicio",
      });
    }

    const fuseResults = servicesFuse.search(text);
    const [defaultResult, ...results] = fuseResults;
    if (defaultResult) {
      latestSuggestion = defaultResult;
      browser.omnibox.setDefaultSuggestion(
        resultToDefaultSuggestion(defaultResult)
      );
      if (results.length > 0) {
        suggest(results.map(resultToSuggestion));
      }
    }
  });

  browser.omnibox.onInputEntered.addListener((text, disposition) => {
    const {
      user: { username },
    } = getState();

    if (!username) {
      browser.runtime.openOptionsPage();
    }

    const [selectedResult] = servicesFuse.search(text);
    const suggestion = selectedResult || latestSuggestion;
    if (suggestion) {
      dispatch({
        type: "omnibox",
        payload: { service: suggestion.item.id, disposition },
      });
    }
  });
}

export default omnibox;
