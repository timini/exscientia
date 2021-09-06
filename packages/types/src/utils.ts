import { Compound, Maybe } from "./types";

export const isCompound = (c: Maybe<Compound>): c is Compound => {
  if (c === null) return false;
  return true;
};
