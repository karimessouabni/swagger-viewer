import { getDocument } from "./Document";

export const querySelectorAll = (
  selector: string,
): ReadonlyArray<HTMLElement> => {
  return Array.prototype.slice.call(getDocument().querySelectorAll(selector))
};
/**
 */
export const querySelector = (selector: string): HTMLElement | null => {
  const founds = querySelectorAll(selector);

  if (founds.length === 0) {
    return null
  }
  if (founds.length === 1) {
    return founds[0]
  }
  throw new Error(`Logic Failure: "${selector}" found multiple elements`)
}



export const querySelectorStrict = <T extends HTMLElement>(
  selector: string,
): T => {
  const founds = querySelectorAll(selector)
  if (founds.length === 1) {
    return founds[0] as any
  }
  throw new Error(`Logic Failure: "${selector}" is always 1 element exists`)
}

export const exQuerySelectorStrict = <T extends HTMLElement>(
  dom: HTMLElement,
  selector: string,
): T => {
  const founds = dom.querySelectorAll(selector)
  if (founds.length === 1) {
    return founds[0] as any
  }
  throw new Error(`Logic Failure: "${selector}" is always 1 element exists`)
};
