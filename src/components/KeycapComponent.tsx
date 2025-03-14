import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";
import { findKeyInDict } from "../utils";
import { Key, Keycap } from "../models";

interface KeyCapComponentProps extends Keycap {
  onChangeLayout: (layer: number) => void;
  holdDuration: number;
}

export const KeycapComponent = ({
  keyChar,
  isLayerKey,
  onChangeLayout,
  holdDuration = 400,
}: KeyCapComponentProps) => {
  const [keyPressed, setKeyPressed] = useState<string | null>(null);
  const [layerKey, setLayerKey] = useState<string | null>(null);
  const [layerKeyLevel, setLayerKeyLevel] = useState<number | null>(null);
  const [key, setKey] = useState<Key | null>(null);
  const [holdTimeout, setHoldTimeout] = useState<number | null>(null);

  useEffect(() => {
    if (!keyChar) {
      return;
    }

    const normalizedKeyChar = keyChar.trim().toUpperCase();

    if (isLayerKey) {
      const layerMatch = normalizedKeyChar.match(/LT\((\d+),\s*(KC_[A-Z_]+)\)/);

      if (layerMatch) {
        const [, layerNumber, keyCode] = layerMatch;

        setKey(findKeyInDict(keyCode));
        setLayerKey(`LT_${layerNumber}`);
        setLayerKeyLevel(parseInt(layerNumber));
      } else {
        console.warn(`Invalid layer key format: ${normalizedKeyChar}`);
      }
    } else {
      const keyObj = findKeyInDict(normalizedKeyChar);
      setKey(keyObj);
    }
  }, [keyChar, isLayerKey]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const pressedKey = event.key;
      const keyToSearch = findKeyInDict(pressedKey, "input");
      const isCurrentKey = key?.input === keyToSearch?.input;

      if (!isCurrentKey) {
        return;
      }

      setKeyPressed(keyToSearch.code);

      if (isLayerKey && layerKeyLevel) {
        const timeout = window.setTimeout(() => {
          onChangeLayout(layerKeyLevel);
        }, holdDuration);
        setHoldTimeout(timeout);
      }

      const handleKeyUp = (event: KeyboardEvent) => {
        const key = event.key;
        const keyToSearch = findKeyInDict(key, "input");
        if (key === keyToSearch?.input) {
          setKeyPressed(null);
          onChangeLayout(0);
        }

        if (holdTimeout) {
          console.log("qui entra");
          setHoldTimeout(null);
        }
        window.removeEventListener("keyup", handleKeyUp);
      };

      window.addEventListener("keyup", handleKeyUp);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [key]);

  return (
    <div
      className={twMerge(
        keyPressed === key?.code
          ? "bg-neutral-200 dark:bg-neutral-900 shadow-keycap-pressed dark:shadow-keycap-pressed dark:border-neutral-800 translate-y-0.5"
          : "bg-white dark:bg-neutral-800 shadow-keycap dark:shadow-keycap border-neutral-200 dark:border-neutral-600",
        keyChar &&
          "font-mono text-center flex whitespace-pre-line p-1 shadow-inner dark:text-white hover:cursor-pointer items-center justify-center size-16 text-sm font-semibold text-neutral-900 border rounded-lg",
      )}
    >
      {isLayerKey ? (
        <div className="flex flex-col">
          {layerKey}
          <span className="text-xs flex items-center justify-center border border-neutral-300 size-9 dark:border-neutral-600 rounded-sm">
            {key?.name?.toUpperCase()}
          </span>
        </div>
      ) : (
        <>{key?.name?.toUpperCase()}</>
      )}
    </div>
  );
};
