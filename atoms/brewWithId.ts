import memoizee from "memoizee";
import { atom } from "recoil";
const brewWithId = memoizee((id: string) => {
  return atom({
    key: id,
    default: {
      name: "",
      brewery: "",
      style: "",
      rating: 0,
    },
  });
});

export default brewWithId;
