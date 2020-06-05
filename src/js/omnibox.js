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
