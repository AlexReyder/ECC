"use server";

import { ProductsDbAdd } from "@/shared/types/validation/products";
import { revalidatePath } from "next/cache";
import slug from "slug";
import { prisma } from "../prismaInstance";
import { deleteFiles } from "./upload";

export async function getAvailableSpecsAndFilters() {
  const categories = await prisma.category.findMany();
  const colors = await prisma.colors.findMany();
  const sizes = await prisma.sizes.findMany();
  const materials = await prisma.material.findMany();

  return {
    categories,
    colors,
    sizes,
    materials,
  };
}

export async function getAllProducts() {
  try {
    const products = await prisma.shoppingCard.findMany();
    return {
      success: products,
      error: null,
    };
  } catch (e) {
    return {
      success: null,
      error: e as string,
    };
  }
}

export async function addProduct(data: ProductsDbAdd) {
  try {
    const product = await prisma.shoppingCard.upsert({
      where: {
        id: data.id,
      },
      create: {
        name: data.name,
        slug: slug(data.name),
        isActive: data.isActive,
        isNew: data.labelAd === "new",
        isBestseller: data.labelAd === "bestseller",
        isInStock: true,
        articleNumber: data.articleNumber,
        description: data.description,
        price: data.price,
        adPrice: data.adPrice,
        category: data.category,
        images: data.images,
        colors: data.colors,
        sizes: data.sizes,
        material: data.material,
        categoryFilter: data.categoryFilter,
        colorsFilter: data.colorsFilter,
        sizesFilter: data.sizesFilter,
        materialFilter: data.materialFilter,
      },
      update: {
        name: data.name,
        slug: slug(data.name),
        isActive: data.isActive,
        isNew: data.labelAd === "new",
        isBestseller: data.labelAd === "bestseller",
        isInStock: true,
        articleNumber: data.articleNumber,
        description: data.description,
        price: data.price,
        adPrice: data.adPrice,
        category: data.category,
        images: data.images,
        colors: data.colors,
        sizes: data.sizes,
        material: data.material,
        categoryFilter: data.categoryFilter,
        colorsFilter: data.colorsFilter,
        sizesFilter: data.sizesFilter,
        materialFilter: data.materialFilter,
      },
    });
    revalidatePath("/admin/products");
    return {
      success: product,
      error: null,
    };
  } catch (e) {
    return {
      success: null,
      error: e as string,
    };
  }
}

export async function removeProduct(id: string) {
  try {
    const product = await prisma.shoppingCard.findFirst({
      where: {
        id,
      },
    });
    if (!product) {
      return {
        success: null,
        error: "NOT FOUND",
      };
    }
    const productImages = product.images as Record<string, []>;
    if (Object.keys(productImages).length > 0) {
      const images: string[] = [];
      for (let color in productImages) {
        for (let type in productImages[color]) {
          productImages[color][type].forEach((item: any) =>
            images.push(item.url),
          );
        }
      }
      await deleteFiles(images);
    }

    const deletedProduct = await prisma.shoppingCard.delete({ where: { id } });
    revalidatePath("/admin/products");
    return {
      success: deletedProduct,
      error: null,
    };
  } catch (e) {
    return {
      success: null,
      error: e as string,
    };
  }
}

// function checkIfIsInStock({data, colors}: {data: any[], colors: any[]}){
// 	let isInStock = false;
// 	data.forEach((item:any, i: number) => {
// 		const color = slug(colors[i].label)
// 		for(property in item[color])
// 	})
// }
