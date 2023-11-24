import * as z from "zod";

export const productSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
  category: z.string().optional(),
  description: z.string(),
  price: z.number().positive(),
});

export const productSchemaArray = z.array(productSchema);

export interface IProduct extends z.infer<typeof productSchema> {}
