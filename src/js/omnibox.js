import browser from "webextension-polyfill";
import Fuse from "fuse.js";

function omnibox(services, { getState, dispatch }) {
  const servicesList = Object.entries(services)
    .filter(([, service]) => service.display)
    .map(([key, service]) => ({
      id: key,
      ...service,
    }));

  const resultToSuggestion = ({ item: service }) => ({
    content: service.name || service.display,
    description: `<match>${service.name || service.display}</match> <dim>Ir a ${
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
/* Omnibox

let suggestedItem;
let omniRequest = false;
let omniTabId;
const omniPortal = {
  content: "Portal UC",
  description: "<match>Portal UC</match> <dim>Ir a tu Portal UC</dim>",
  matchStrings: ["portal"],
};
const omniCanvas = {
  content: "Canvas",
  description: "<match>Canvas</match> <dim>Ir a Canvas</dim>",
  matchStrings: ["canvas"],
};
const omniSiding = {
  content: "SIDING",
  description: "<match>SIDING</match> <dim>Ir a tu SIDING</dim>",
  matchStrings: ["siding"],
};
const omniLabmat = {
  content: "LABMAT",
  description: "<match>LABMAT</match> <dim>Ir a LABMAT</dim>",
  matchStrings: ["labmat"],
};
const omniAleph = {
  content: "SIBUC",
  description: "<match>SIBUC</match> <dim>Ir a SIBUC</dim>",
  matchStrings: ["aleph", "sibuc"],
};
const omniWebcursos = {
  content: "Webcursos",
  description: "<match>Webcursos UC</match> <dim>Ir a Webcursos UC</dim>",
  matchStrings: ["webcursos"],
};
const omniMailuc = {
  content: "Correo UC",
  description: "<match>Correo UC</match> <dim>Ir a Correo UC</dim>",
  matchStrings: ["correo", "mail"],
};

chrome.omnibox.onInputChanged.addListener(function (text, _suggest) {
  const suggestions = [];
  if (activatePortal() === true) {
    suggestions.push(omniPortal);
  }
  if (activateCanvas() === true) {
    suggestions.push(omniCanvas);
  }
  if (activateSiding() === true) {
    suggestions.push(omniSiding);
  }
  if (activateLabmat() === true) {
    suggestions.push(omniLabmat);
  }
  if (activateAleph() === true) {
    suggestions.push(omniAleph);
  }
  if (activateWebcursos() === true) {
    suggestions.push(omniWebcursos);
  }
  if (activateMailUC() === true) {
    suggestions.push(omniMailuc);
  }

  let suggested = false;

  suggestions.forEach(function (item) {
    const simpleText = text.toLowerCase().replace(/\s+/g, "");
    item.matchStrings.forEach(function (matchString) {
      if (matchString.indexOf(simpleText) != -1 && !suggested) {
        suggested = true;
        suggestedItem = item;
        chrome.omnibox.setDefaultSuggestion({
          description: item.description,
        });
      }
    });
  });

  if (suggested) {
    const index = suggestions.indexOf(suggestedItem);
    suggestions.splice(index, 1);
  }

  // suggest(suggestions);
});

chrome.omnibox.onInputEntered.addListener(function (_text) {
  let service;
  switch (suggestedItem) {
    case omniPortal:
      service = "portal";
      break;
    case omniCanvas:
      service = "canvas";
      break;
    case omniSiding:
      service = "siding";
      break;
    case omniLabmat:
      service = "labmat";
      break;
    case omniAleph:
      service = "aleph";
      break;
    case omniWebcursos:
      service = "webcursos";
      break;
    case omniMailuc:
      service = "mailuc";
      break;
  }
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    _gaq.push(["_trackEvent", "Omnibox", "clicked", service]);
    omniRequest = true;
    omniTabId = tabs[0].id;
    directUC.login(user(), pass(), service, false);
  });
});
*/
