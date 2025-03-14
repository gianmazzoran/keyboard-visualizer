import { Layer } from "../models";
import { KeycapComponent } from "./KeycapComponent";

interface SideProps {
  layer: Layer;
  currentLayer: number;
  onChangeLayout: (layer: number) => void;
}

export const SideComponent = ({
  layer,
  currentLayer,
  onChangeLayout,
}: SideProps) => {
  return (
    <div className="inline-grid gap-2 items-center justify-center grid-cols-5 grid-rows-4">
      {layer &&
        layer.map((key, keyIndex) => (
          <KeycapComponent
            key={`${currentLayer}-${keyIndex}`}
            keyChar={key}
            coordinates={{ x: currentLayer, y: keyIndex }}
            isLayerKey={key.startsWith("LT")}
            onChangeLayout={onChangeLayout}
            holdDuration={400}
          />
        ))}
    </div>
  );
};
