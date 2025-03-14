import { ERRORS, KEYS_DICT, SPLIT } from "../constants";
import { Key, KeyKeys, Layout, Sides, SplitSide } from "../models";

const findKeyInDict = (char: string, key: KeyKeys = "code"): Key => {
  const keySearched = Object.values(KEYS_DICT as Key[]).find((keyObj) => {
    if (char === " " && key === "name") {
      return keyObj.name === "Space";
    }
    return keyObj[key].toLowerCase() === char.toLowerCase();
  });

  if (!keySearched) {
    throw Error("Unknown key in JSON file");
  }

  return keySearched;
};

const findLayout = (layout: string) => {
  const isSplit = Boolean(layout.search(SPLIT));
  const layoutRegex = /(\d+)x(\d+)_(\d+)/;
  const match = layout.match(layoutRegex);
  if (!match) {
    throw Error(ERRORS.INVALID_LAYOUT);
  }

  const layoutFound: Layout = {
    isSplit: isSplit,
    rows: parseInt(match[1]),
    columns: parseInt(match[2]),
    layerButtons: parseInt(match[3]),
  };

  return layoutFound;
};

const splitKeyboardKeys = (
  propLayers: SplitSide,
  propLayout: Layout,
): Sides => {
  const layers = propLayers;
  const layout = propLayout;

  const leftSide: SplitSide = [];
  const rightSide: SplitSide = [];
  const emptyItemsCounter = layout.columns - layout.layerButtons;
  let leftLayer: string[] = [];
  let rightLayer: string[] = [];

  for (const layer of layers) {
    for (let i = 0; i < layout.rows; i++) {
      leftLayer.push(...layer.splice(0, layout.columns));
      rightLayer.push(...layer.splice(0, layout.columns));
    }

    // Fill empty spots for render purpose only
    for (let x = 0; x < emptyItemsCounter; x++) {
      leftLayer.push("");
    }

    // Add layer button to relative sides
    leftLayer.push(...layer.splice(0, layout.layerButtons));
    rightLayer.push(...layer.splice(0, layout.layerButtons));

    // Fill empty spots for render purpose only
    for (let x = 0; x < emptyItemsCounter; x++) {
      rightLayer.push("");
    }

    leftSide.push(leftLayer);
    rightSide.push(rightLayer);
    leftLayer = [];
    rightLayer = [];
  }

  return { leftSide, rightSide };
};

export { findKeyInDict, findLayout, splitKeyboardKeys };
