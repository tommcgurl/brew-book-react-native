import { atom } from "recoil";
import { BrewMap } from '../types';

const fallbackBrews: BrewMap = {};

const brewListState = atom({
  key: "brewListState",
  default: fallbackBrews,
});

export default brewListState;
