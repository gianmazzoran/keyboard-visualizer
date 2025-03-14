export interface LayoutConfig {
  layout: string;
  layers: SplitSide;
}

export interface LayoutComponentProps {
  layout: LayoutConfig;
}

export interface Layout {
  isSplit: boolean;
  rows: number;
  columns: number;
  layerButtons: number;
}

export type KeyName = string;
export type KeyCode = string;
export type KeyLabel = string;
export type KeyInput = string;

export type Layer = KeyCode[];

export interface Key {
  name: KeyName;
  code: KeyCode;
  keys: KeyLabel;
  input: KeyInput;
}

export type KeyKeys = keyof Key;

export interface Sides {
  leftSide: Layer[];
  rightSide: Layer[];
}

export interface Coordinate {
  x: number;
  y: number;
}

export interface Keycap {
  keyChar: string;
  coordinates: Coordinate;
  isLayerKey: boolean;
}
