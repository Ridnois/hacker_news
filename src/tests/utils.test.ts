import { keyOnElement } from '../utils';

describe("elementHasKey", () => {

  const arr = [
    {
      [1234]: {
        foo: "foo2",
        bar: "bar2",
      }
    },
  ];

  test("finds [key: string | number]: any", () => {
    expect(keyOnElement(1234)(arr[0])).toBe(true)
  })
  
  test("Finds {key: value}", () => {
    expect(keyOnElement("foo")(arr[0][1234])).toBe(true)
  })

  test("useful to find elements on array", () => {
    const expected = arr[0];
    expect(arr.find(keyOnElement(1234))).toEqual(expected)
  })
  test("returns false when there isnt given key", () => {
    expect(keyOnElement("lol")(arr[0])).toBe(false)
  })

  test("return true even if the value of key is falsy", () => {
    const nullObj = { foo: null }
    expect(keyOnElement("foo")(nullObj)).toBe(true)
  })
})
