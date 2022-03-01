export { timePassed } from './timePassed';

/**
 * @description returns true when object has key
 * @argument key: the key the object must possess
 * @argument element: element to search the key inside of.
 *
 * @returns boolean
 */
export const keyOnElement = <T extends {[key: string]: any}>(key: string | number) => (element: T) => {
  if (key in element) {
    return true;
  };
  return false;
}

export const removeFromArr = (arr: any, key: any) => {
  return [...arr.filter(!keyOnElement(key))]
}
