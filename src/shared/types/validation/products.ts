import { z } from "zod";

export const FiltersNSpecsDbSchema = z
  .object({
    label: z.string(),
    value: z.string(),
  })
  .array();

export type FiltersNSpecDb = z.infer<typeof FiltersNSpecsDbSchema>;

export const ProductsDbSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  isActive: z.boolean(),
  isNew: z.boolean(),
  isBestseller: z.boolean(),
  isInStock: z.boolean(),
  articleNumber: z.string(),
  description: z.string(),
  adPrice: z.coerce.number(),
  price: z.coerce.number(),
  images: z.any(),
  category: FiltersNSpecsDbSchema,
  categoryFilter: z.string().array(),
  colorsFilter: z.string().array(),
  sizesFilter: z.string().array(),
  materialFilter: z.string().array(),
  colors: FiltersNSpecsDbSchema,
  sizes: FiltersNSpecsDbSchema,
  material: FiltersNSpecsDbSchema,
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export type ProductsDb = z.infer<typeof ProductsDbSchema>;
export const ValidateProductsDbSchema = z.array(ProductsDbSchema);

export const ProductsDbAddSchema = z.object({
  id: z.string().default(""),
  name: z.string().nonempty({ message: "Обязательное поле." }).default(""),
  isActive: z.boolean().default(true),
  isInStock: z.boolean().default(true),
  articleNumber: z.string().nonempty({ message: "Обязательно поле" }),
  description: z.string().nonempty({ message: "Обязательное поле." }),
  adPrice: z.coerce.number(),
  price: z.coerce.number(),
  images: z.any(),
  categoryFilter: z.string().array(),
  colorsFilter: z.string().array(),
  sizesFilter: z.string().array(),
  materialFilter: z.string().array(),
  category: FiltersNSpecsDbSchema.length(1, { message: "Обязательно поле" }),
  colors: FiltersNSpecsDbSchema.min(1, { message: "Обязательно поле" }),
  sizes: FiltersNSpecsDbSchema.min(1, { message: "Обязательно поле" }),
  material: FiltersNSpecsDbSchema,
  labelAd: z.string().default("none"),
});

export type ProductsDbAdd = z.infer<typeof ProductsDbAddSchema>;
export const ValidateProductsDbAdd = z.array(ProductsDbAddSchema);
