import { atom } from "recoil";

export type BrewImage = {
  localURI: string;
  height: number;
  width: number;
};

export type Brew = {
  name: string;
  brewery: string;
  rating: number;
  style: string;
  brewImage?: BrewImage;
};

export type BrewMap = {
  [id: string]: Brew;
}

const fallbackBrews: BrewMap = {
};

const brewListState = atom({
  key: "brewListState",
  default: fallbackBrews,
});

export default brewListState;
