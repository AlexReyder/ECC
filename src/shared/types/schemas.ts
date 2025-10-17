import { Role, Gender } from "@prisma/client";
import { z } from "zod";

const userRoleSchema = z.nativeEnum(Role);
export const categoryGenderSchema = z.nativeEnum(Gender);

export const signInSchema = z.object({
  email: z
    .string()
    .email("Неккоректно введен Email.")
    .nonempty("Обязательное поле."),
  password: z
    .string()
    .min(8, "Минимальная длинна пароля 8 символом")
    .max(20, "Максимальная длинна пароля 20 символов.")
    .nonempty("Обязательное поле."),
});

export const signUpSchema = z.object({
  email: z.string().email("Неккоректно введен Email").nonempty(),
  name: z.string().min(1).max(30).optional(),
  surname: z.string().min(1).max(30).optional(),
  password: z
    .string()
    .min(8, "Минимальная длинна пароля 8 символом")
    .max(20, "Максимальная длинна пароля 20 символов")
    .nonempty(),
  phone: z.string().min(11).max(11).nonempty("Обязательное поле"),
});

export const recoveryEmail = z.object({
  email: z
    .string()
    .email("Неккоректно введен Email")
    .nonempty("Обязательное поле"),
});

export const updateUserProfileSchema = z.object({
  email: z.string().email("Неккоректно введен Email").nonempty(),
  name: z.string().default(""),
  surname: z.string().default(""),
  phone: z
    .string()
    .min(11, "Минимальная длинна пароля 11 символом")
    .max(20, "Максимальная длинна 20 символов")
    .optional(),
});

export const profilePassword = z
  .object({
    password: z
      .string()
      .min(8, { message: "Минимальная длинна пароля 8" })
      .max(20, { message: "Максимальная длинна пароля 20 символов" })
      .nonempty({ message: "Поле не может быть пустым" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Минимальная длинна пароля 8" })
      .max(20, { message: "Максимальная длинна пароля 20 символов" })
      .nonempty({ message: "Поле не может быть пустым" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export const productFormSchema = z.object({
  productId: z.string(),
  name: z.string(),
  price: z.number(),
  image: z.string(),
  color: z.string(),
  size: z.string(),
  quantity: z.number(),
});

const userStatusSchema = z.union([
  z.literal("active"),
  z.literal("inactive"),
  z.literal("invited"),
  z.literal("suspended"),
]);
export type UserStatus = z.infer<typeof userStatusSchema>;

export const userSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  surname: z.string().nullable(),
  email: z.string(),
  phone: z.string(),
  role: userRoleSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export type User = z.infer<typeof userSchema>;
export const userListSchema = z.array(userSchema);

export const specificationAdminSchema = z.object({
  id: z.string(),
  name: z.string(),
  gender: categoryGenderSchema,
  slug: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export type SpecificationAdmin = z.infer<typeof specificationAdminSchema>;
export const specificationListSchema = z
  .array(specificationAdminSchema)
  .nullable();

export const filterAdminSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export type FilterAdmin = z.infer<typeof filterAdminSchema>;
export const filterListSchema = z.array(filterAdminSchema).nullable();

export const productAdminSchema = z.object({
  id: z.string().default(""),
  name: z.string(),
  slug: z.string(),
  isActive: z.boolean().default(true),
  isNew: z.boolean().default(false),
  isBestseller: z.boolean().default(false),
  isInStock: z.boolean().default(true),
  articleNumber: z.string(),
  description: z.string(),
  adPrice: z.number(),
  price: z.number(),
  images: z.any(),
  details: z.any(),
  category: z.any(),
  band: z.any(),
  genre: z.any(),
  manufacturer: z.any(),
  colors: z.any(),
  sizes: z.any(),
  material: z.any(),
  print: z.any(),
  country: z.any(),
  createdAt: z.coerce.date().nullish(),
  updatedAt: z.coerce.date().nullish(),
});
export type ProductAdmin = z.infer<typeof productAdminSchema>;
export const productListSchema = z.array(productAdminSchema);
