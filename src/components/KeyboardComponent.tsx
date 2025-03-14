import { useState, useEffect } from "react";
import type { Layout, LayoutConfig, Sides } from "../models";
import { findLayout, splitKeyboardKeys } from "../utils";
import { SideComponent } from "./SideComponent";

export const KeyboardComponent = ({ layout, layers }: LayoutConfig) => {
  const [keyboardLayout, setKeyboardLayout] = useState<Layout | null>(null);
  const [splitLayout, setSplitLayout] = useState<Sides | null>(null);
  const [currentLayer, setCurrentLayer] = useState<number>(0);

  useEffect(() => {
    setKeyboardLayout(findLayout(layout));
  }, [layout]);

  const handleChangeLayout = (layer: number) => {
    setCurrentLayer(layer);
  };

  useEffect(() => {
    if (keyboardLayout) {
      setSplitLayout(splitKeyboardKeys(layers, keyboardLayout));
    }
  }, [keyboardLayout]);

  if (keyboardLayout && keyboardLayout.isSplit && splitLayout) {
    return (
      <div className="grid grid-cols-2 gap-8">
        <SideComponent
          onChangeLayout={handleChangeLayout}
          layer={splitLayout.leftSide[currentLayer]}
          currentLayer={currentLayer}
        />
        <SideComponent
          onChangeLayout={handleChangeLayout}
          layer={splitLayout.rightSide[currentLayer]}
          currentLayer={currentLayer}
        />
      </div>
    );
  }

  return <div></div>;
};
