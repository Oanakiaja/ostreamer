import { Atom } from "jotai";
import { store } from ".";

export const jGet = function <T = unknown>(atom: Atom<T>) {
  return store.get(atom);
};
