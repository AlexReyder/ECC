import { prisma } from "@/shared/api/prismaInstance";

export async function GET(request: Request) {
  const colorsDb = await prisma.colors.findMany();
  const colors = colorsDb.map((color) => color.name);

  const sizesDb = await prisma.sizes.findMany();
  const sizes = sizesDb.map((color) => color.name);

  const result = {
    success: {
      colors,
      sizes,
    },
    error: null,
  };

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
