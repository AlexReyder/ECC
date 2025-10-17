import { prisma } from "@/shared/api/prismaInstance";
import { ValidateProductsDbSchema } from "@/shared/types/validation/products";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ categorySlug: string }> },
) {
  const { categorySlug } = await params;
  const searchParams = request.nextUrl.searchParams;
  const offset = searchParams.get("offset") as string;
  const colors = searchParams.get("colors") as string;
  const sizes = searchParams.get("sizes") as string;
  const skip = (+offset - 1) * 12;
  const take = 12;
  const where: any = {};

  if (categorySlug) {
    where.categoryFilter = {
      has: categorySlug,
    };
  }

  if (colors) {
    where.colorsFilter = {
      hasEvery: colors.split(";"),
    };
  }
  if (sizes) {
    where.sizesFilter = {
      hasEvery: sizes.split(";"),
    };
  }

  const products = await prisma.shoppingCard.findMany({
    skip,
    take,
    where,
  });
  const { data } = await ValidateProductsDbSchema.safeParseAsync(products);
  const productsCount =
    Object.keys(where).length > 0
      ? data?.length
      : await prisma.shoppingCard.count();

  const result = {
    success: {
      products: data,
      categoryName:
        products.length > 0
          ? products[0].category[0]?.label.slice(4)
          : "Каталог",
      length: productsCount,
    },
    error: null,
  };

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

