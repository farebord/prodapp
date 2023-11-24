import { productSchema, productSchemaArray } from "../types/product";

export const validateProducts = (product: unknown | unknown[]) => {
  try {
    if (Array.isArray(product)) {
      productSchemaArray.parse(product);
    } else {
      productSchema.parse(product);
    }
  } catch (error) {
    throw new Error("Failed to validate products: " + error);
  }
  return true;
};
