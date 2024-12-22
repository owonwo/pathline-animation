import "jest";

test("should return 2", () => {
  function fn(a: number, b: number) {
    return a + b;
  }

  expect(fn(1, 1)).toBe(2);
});
