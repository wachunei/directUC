/* eslint-disable */
// This function is adapted from autoMergeLevel2.js from redux-persist module

'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = autoMergeLevel3;
// inboundState is the state that was persisted from before
// reducedState is the latest clean/initialState object
function autoMergeLevel3(inboundState, originalState, reducedState, _ref) {
  var debug = _ref.debug;

  var newState = _extends({}, reducedState);
  // only rehydrate if inboundState exists and is an object
  if (inboundState && (typeof inboundState === 'undefined' ? 'undefined' : _typeof(inboundState)) === 'object') {
    Object.keys(inboundState).forEach(function (key) {
      // ignore _persist data
      if (key === '_persist') return;
      // if reducer modifies substate, skip auto rehydration
      if (originalState[key] !== reducedState[key]) {
        if (process.env.NODE_ENV !== 'production' && debug) console.log('redux-persist/stateReconciler: sub state for key `%s` modified, skipping.', key);
        return;
      }
      if (isPlainEnoughObject(reducedState[key])) {
        // 3rd level
        newState[key] = {
          ...reducedState[key]
        };
        Object.keys(inboundState[key]).forEach(function (key3) {
          // ignore _persist data
          if (key3 === '_persist') return;
          // if reducer modifies substate, skip auto rehydration
          if (originalState[key][key3] !== reducedState[key][key3]) {
            if (process.env.NODE_ENV !== 'production' && debug) console.log('redux-persist/stateReconciler: sub state for key3 `%s` modified, skipping.', key3);
            return;
          }
          if (isPlainEnoughObject(reducedState[key][key3])) {
            // if object is plain enough shallow merge the new values (hence "Level3")
            newState[key][key3] = {
              ...reducedState[key][key3],
              ...inboundState[key][key3]
            };
          }
          else {
            newState[key][key3] = inboundState[key][key3];
          }
        });
        return;
      }
      // otherwise hard set
      newState[key] = inboundState[key];
    });
  }

  if (process.env.NODE_ENV !== 'production' && debug && inboundState && (typeof inboundState === 'undefined' ? 'undefined' : _typeof(inboundState)) === 'object') console.log('redux-persist/stateReconciler: rehydrated keys \'' + Object.keys(inboundState).join(', ') + '\'');

  return newState;
}

/*
  autoMergeLevel3:
    - merges 3 level of substate
    - skips substate if already modified
    - this is essentially redux-perist v4 behavior
*/

function isPlainEnoughObject(o) {
  return o !== null && !Array.isArray(o) && (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object';
}