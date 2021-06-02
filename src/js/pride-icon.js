import browser from "webextension-polyfill";
import frame00 from "../img/pride/element-00.png";
import frame01 from "../img/pride/element-01.png";
import frame02 from "../img/pride/element-02.png";
import frame03 from "../img/pride/element-03.png";
import frame04 from "../img/pride/element-04.png";
import frame05 from "../img/pride/element-05.png";
import frame06 from "../img/pride/element-06.png";
import frame07 from "../img/pride/element-07.png";
import frame08 from "../img/pride/element-08.png";
import frame09 from "../img/pride/element-09.png";
import frame10 from "../img/pride/element-10.png";
import frame11 from "../img/pride/element-11.png";
import frame12 from "../img/pride/element-12.png";
import frame13 from "../img/pride/element-13.png";
import frame14 from "../img/pride/element-14.png";
import frame15 from "../img/pride/element-15.png";
import frame16 from "../img/pride/element-16.png";
import frame17 from "../img/pride/element-17.png";
import frame18 from "../img/pride/element-18.png";
import frame19 from "../img/pride/element-19.png";
import frame20 from "../img/pride/element-20.png";
import frame21 from "../img/pride/element-21.png";
import frame22 from "../img/pride/element-22.png";
import frame23 from "../img/pride/element-23.png";
import frame24 from "../img/pride/element-24.png";
import frame25 from "../img/pride/element-25.png";
import frame26 from "../img/pride/element-26.png";
import frame27 from "../img/pride/element-27.png";
import frame28 from "../img/pride/element-28.png";
import frame29 from "../img/pride/element-29.png";
import frame30 from "../img/pride/element-30.png";
import frame31 from "../img/pride/element-31.png";
import frame32 from "../img/pride/element-32.png";
import frame33 from "../img/pride/element-33.png";
import frame34 from "../img/pride/element-34.png";
import frame35 from "../img/pride/element-35.png";
import frame36 from "../img/pride/element-36.png";
import frame37 from "../img/pride/element-37.png";
import frame38 from "../img/pride/element-38.png";
import frame39 from "../img/pride/element-39.png";
import frame40 from "../img/pride/element-40.png";
import frame41 from "../img/pride/element-41.png";
import frame42 from "../img/pride/element-42.png";
import frame43 from "../img/pride/element-43.png";
import frame44 from "../img/pride/element-44.png";
import frame45 from "../img/pride/element-45.png";
import frame46 from "../img/pride/element-46.png";
import frame47 from "../img/pride/element-47.png";
import frame48 from "../img/pride/element-48.png";
import frame49 from "../img/pride/element-49.png";
import frame50 from "../img/pride/element-50.png";
import frame51 from "../img/pride/element-51.png";
import frame52 from "../img/pride/element-52.png";
import frame53 from "../img/pride/element-53.png";
import frame54 from "../img/pride/element-54.png";
import frame55 from "../img/pride/element-55.png";
import frame56 from "../img/pride/element-56.png";
import frame57 from "../img/pride/element-57.png";
import frame58 from "../img/pride/element-58.png";
import frame59 from "../img/pride/element-59.png";
import frame60 from "../img/pride/element-60.png";
import frame61 from "../img/pride/element-61.png";
import frame62 from "../img/pride/element-62.png";
import frame63 from "../img/pride/element-63.png";
import frame64 from "../img/pride/element-64.png";
import frame65 from "../img/pride/element-65.png";
import frame66 from "../img/pride/element-66.png";
import frame67 from "../img/pride/element-67.png";
import frame68 from "../img/pride/element-68.png";
import frame69 from "../img/pride/element-69.png";
import frame70 from "../img/pride/element-70.png";
import frame71 from "../img/pride/element-71.png";
import frame72 from "../img/pride/element-72.png";
import frame73 from "../img/pride/element-73.png";
import frame74 from "../img/pride/element-74.png";

const FRAMES = {
  0: frame00,
  1: frame01,
  2: frame02,
  3: frame03,
  4: frame04,
  5: frame05,
  6: frame06,
  7: frame07,
  8: frame08,
  9: frame09,
  10: frame10,
  11: frame11,
  12: frame12,
  13: frame13,
  14: frame14,
  15: frame15,
  16: frame16,
  17: frame17,
  18: frame18,
  19: frame19,
  20: frame20,
  21: frame21,
  22: frame22,
  23: frame23,
  24: frame24,
  25: frame25,
  26: frame26,
  27: frame27,
  28: frame28,
  29: frame29,
  30: frame30,
  31: frame31,
  32: frame32,
  33: frame33,
  34: frame34,
  35: frame35,
  36: frame36,
  37: frame37,
  38: frame38,
  39: frame39,
  40: frame40,
  41: frame41,
  42: frame42,
  43: frame43,
  44: frame44,
  45: frame45,
  46: frame46,
  47: frame47,
  48: frame48,
  49: frame49,
  50: frame50,
  51: frame51,
  52: frame52,
  53: frame53,
  54: frame54,
  55: frame55,
  56: frame56,
  57: frame57,
  58: frame58,
  59: frame59,
  60: frame60,
  61: frame61,
  62: frame62,
  63: frame63,
  64: frame64,
  65: frame65,
  66: frame66,
  67: frame67,
  68: frame68,
  69: frame69,
  70: frame70,
  71: frame71,
  72: frame72,
  73: frame73,
  74: frame74,
};

class PrideIcon {
  static async animate() {
    if (this.animating) {
      return;
    }

    this.animating = true;
    for (let i = 0; i <= 74; i += 1) {
      browser.browserAction.setIcon({ path: FRAMES[i] });
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    browser.browserAction.setIcon({ path: frame74 });
    this.animating = false;
  }
}

export default PrideIcon;
