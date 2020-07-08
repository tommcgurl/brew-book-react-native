import { atom } from 'recoil';
const brewItemRatingState = atom({
  key: "brewItemRatingState",
  default: 0,
});

export default brewItemRatingState;