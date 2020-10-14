import browser from "webextension-polyfill";
import Fuse from "fuse.js";
import { isFirefox } from "./utils";

const strings = {
  goTo: "Ir a",
  openOptions: "Presiona enter para iniciar sesión en directUC",
  typeToSearch: "Escribe para buscar un servicio",
  notFound: "No encontramos servicios 😕",
};

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
    a.score === b.score ? (a.idx < b.idx ? -1 : 1) : a.score < b.score ? 1 : -1,
};

const getServicesList = (services, servicesOptions) =>
  Object.entries(services)
    .filter(
      ([key, service]) =>
        service.display && servicesOptions[key] && servicesOptions[key].display
    )
    .map(([key, service]) => ({
      id: key,
      ...service,
    }));

const resultToSuggestion = ({ item: service }) => ({
  content: service.name || service.display,
  description: isFirefox
    ? `directUC - ${service.name || service.display} - ${strings.goTo} ${
        service.name
      }`
    : `<match>${service.name || service.display}</match> <dim>${strings.goTo} ${
        service.name
      }</dim>`,
});

const resultToDefaultSuggestion = (result) => {
  const { content, ...suggestion } = resultToSuggestion(result);
  return suggestion;
};

function omnibox(services, { getState, dispatch }) {
  let latestSuggestion = null;
  let servicesFuse = null;

  browser.omnibox.onInputStarted.addListener(() => {
    const {
      user: { username },
      services: servicesOptions,
    } = getState();
    if (!username) {
      latestSuggestion = null;
      browser.omnibox.setDefaultSuggestion({
        description: strings.openOptions,
      });
    }

    servicesFuse = new Fuse(
      getServicesList(services, servicesOptions),
      fuseOptions
    );
  });

  browser.omnibox.onInputChanged.addListener((text, suggest) => {
    const {
      user: { username },
    } = getState();

    if (!username || !servicesFuse) {
      return;
    }

    if (text.length === 0) {
      latestSuggestion = null;
      browser.omnibox.setDefaultSuggestion({
        description: strings.typeToSearch,
      });
      return;
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
      return;
    }

    browser.omnibox.setDefaultSuggestion({
      description: strings.notFound,
    });
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
