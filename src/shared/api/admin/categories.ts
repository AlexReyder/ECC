"use server";

import { SpecificationType } from "@/shared/context/specifications-context";
import { SpecForm } from "@/shared/shadcnui/specification-table/dialogs/specification-action-dialog";
import { revalidatePath } from "next/cache";
import slug from "slug";
import { prisma } from "../prismaInstance";

export async function getAllCategories() {
  try {
    const spec = await prisma.category.findMany();

    return {
      success: spec,
      error: null,
    };
  } catch (e) {
    return {
      success: null,
      error: e as string,
    };
  }
}

export async function upsertCategory(data: SpecForm) {
  console.log(data);
  try {
    const spec = await prisma.category.upsert({
      where: {
        //@ts-ignore:next-line
        id: data.id,
      },
      create: {
        name: data.name,
        slug: slug(data.name) + (data.gender === "MAN" ? "-m" : "-w"),
        gender: data.gender,
      },
      update: {
        name: data.name,
        slug: slug(data.name),
        gender: data.gender,
      },
    });
    revalidatePath(`admin/categories`);
    return {
      success: spec,
      error: null,
    };
  } catch (e) {
    return {
      success: null,
      error: e as string,
    };
  }
}

export async function removeCategory(id: string) {
  try {
    const spec = await prisma.category.delete({ where: { id } });
    revalidatePath(`admin/categories`);
    return {
      success: spec,
      error: null,
    };
  } catch (e) {
    return {
      success: null,
      error: e as string,
    };
  }
}
