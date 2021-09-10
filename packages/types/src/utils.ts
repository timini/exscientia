import { AssayResult } from ".";
import { Compound, Maybe } from "./types";

export const isDefinitelyCompound = (c: Maybe<Compound>): c is Compound => {
  if (c === null) return false;
  return true;
};

export const isDefinitelyAssayResult = (
  c: Maybe<AssayResult>
): c is AssayResult => {
  if (c === null) return false;
  return true;
};
