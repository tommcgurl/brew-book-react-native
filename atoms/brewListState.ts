import { atom } from "recoil";

const fallbackBrews = {
  "carton-brewing-boat": {
    name: "Boat",
    brewery: "Carton Brewing",
    rating: 0,
    style: "Session IPA",
  },
  "kane-brewing-head-high": {
    name: "Head High",
    brewery: "Kane Brewing",
    rating: 0,
    style: "IPA",
  },
  "red-tank-darth-malt": {
    name: "Darth Malt",
    brewery: "Red Tank",
    rating: 0,
    style: "Black Saison",
  },
  "sixpoint-the-crisp": {
    name: "The Crisp",
    brewery: "Sixpoint",
    rating: 0,
    style: "Pilsner",
  },
  "jester-king-le-petit-prince": {
    name: "le petit prince",
    brewery: "Jester King",
    rating: 0,
    style: "Table beer",
  },
  "carton-brewing-this-town": {
    name: "This Town",
    brewery: "Carton Brewing",
    rating: 0,
    style: "Lager",
  },
};
const defaultBrewsString = localStorage.getItem("brews");
const defaultBrews = defaultBrewsString
  ? JSON.parse(defaultBrewsString)
  : fallbackBrews;
const brewListState = atom({
  key: "brewListState",
  default: defaultBrews,
});

export default brewListState;
