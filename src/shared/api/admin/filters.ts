"use server";

import { FilterType } from "@/shared/context/filters-context";
import { FilterAdminForm } from "@/shared/shadcnui/filter-table/dialogs/filter-action-dialog";
import { revalidatePath } from "next/cache";
import slug from "slug";
import { prisma } from "../prismaInstance";

export async function getAllFilters(specType: FilterType) {
  try {
    const spec = await (prisma[specType] as any).findMany();
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

export async function upsertFilter(
  data: FilterAdminForm,
  specType: FilterType,
) {
  try {
    const users = await (prisma[specType] as any).upsert({
      where: {
        //@ts-ignore:next-line
        id: data.id,
      },
      create: {
        name: data.name,
        slug: slug(data.name),
      },
      update: {
        name: data.name,
        slug: slug(data.name),
      },
    });
    revalidatePath(`admin/filters/${specType}`);
    return {
      success: users,
      error: null,
    };
  } catch (e) {
    return {
      success: null,
      error: e as string,
    };
  }
}

export async function removeFilter(id: string, specType: FilterType) {
  try {
    const spec = await (prisma[specType] as any).delete({ where: { id } });
    revalidatePath(`admin/filters/${specType}`);
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

