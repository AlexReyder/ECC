"use server";

import { UserForm } from "@/shared/shadcnui/user-table/dialogs/users-action-dialog";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { hashPassword } from "../auth";
import { prisma } from "../prismaInstance";

export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany();
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

