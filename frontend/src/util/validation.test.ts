import { describe, expect, test } from "vitest";
import { validateProducts } from "./validation";

describe("validation", () => {
  test("should validate a correct object schema", () => {
    const product = {
      title: "test",
      price: 12.2,
      description: "test",
    };
    expect(validateProducts(product)).toBe(true);
  });

  test("should throw if schema is not correct", () => {
    const product = {
      title: "test",
      something: "test",
      description: "test",
    };
    expect(() => validateProducts(product)).toThrowError();
  });
});
