"use server";

import {
  profilePassword,
  signInSchema,
  signUpSchema,
} from "@/shared/types/schemas";
import { compareSync, genSaltSync, hash } from "bcrypt";
import { redirect } from "next/navigation";
import { v4 as uuid } from "uuid";
import { z } from "zod";
import { removeLocalCart, syncCart } from "./cart";
import { mailConfirmSignUp } from "./mail";
import { prisma } from "./prismaInstance";
import { createSession, deleteSession } from "./session";

export async function signIn(unsafeData: z.infer<typeof signInSchema>) {
  const { success, data } = signInSchema.safeParse(unsafeData);

  if (!success) {
    return {
      success: null,
      error: "Неправильно введенные данные.",
    };
  }

  const user = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });

  if (!user || !compareSync(data.password, user.password)) {
    return {
      success: null,
      error: "Неправильно введенная электронная почта или пароль.",
    };
  }

  await createSession(user.id, user.name);
  await syncCart(user.id);
  return {
    success: true,
    error: null,
  };
}

export async function signUp(unsafeData: z.infer<typeof signUpSchema>) {
  const { success, data } = signUpSchema.safeParse(unsafeData);
  if (!success) {
    return {
      success: null,
      error: "Неправильно введенные данные.",
    };
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });

  if (existingUser !== null) {
    return {
      success: null,
      error: "Пользователь с такой электронной почтой уже существует.",
    };
  }

  try {
    const hashedPassword = await hashPassword(data.password);
    const savedUser = await prisma.user.create({
      data: {
        name: data.name,
        surname: data.surname,
        patronymic: data.patronymic,
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
        whatsapp: data.whatsapp,
        telegram: data.telegram,
      },
    });

    mailConfirmSignUp(data.email, savedUser.emailToken);
    return {
      success: true,
      error: null,
    };
  } catch (e) {
    return {
      success: null,
      error: e as string,
    };
  }

  // redirect("/profile/general")
}

export async function logOut() {
  await deleteSession();
  await removeLocalCart();
  redirect("/");
}

export async function confirmEmail(email: string, token: string) {
  const existingUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (existingUser === null)
    return {
      success: null,
      error: "Пользователь с такой электронной почтой не найден.",
    };

  if (existingUser.emailToken !== token)
    return {
      success: null,
      error: "Неправильный верификационный ключ.",
    };

  try {
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        emailVerified: true,
      },
    });
    return {
      success: true,
      error: null,
    };
  } catch (error) {
    return {
      success: null,
      error: error as string,
    };
  }
}

export async function resetPassword(
  email: string,
  token: string,
  unsafeData: z.infer<typeof profilePassword>,
) {
  const { success, data } = profilePassword.safeParse(unsafeData);
  if (!success)
    return {
      success: null,
      error: "Неправильно введенные данные.",
    };

  const existingUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (existingUser === null)
    return {
      success: null,
      error: "Пользователь с такой электронной почтой не найден.",
    };

  if (existingUser.recoveryToken !== token)
    return {
      success: null,
      error: "Неправильный верификационный ключ.",
    };

  try {
    const hashedPassword = await hashPassword(data.password);
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        password: hashedPassword,
        recoveryToken: uuid(),
      },
    });

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    return {
      success: null,
      error: error as string,
    };
  }
}

export async function hashPassword(password: string) {
  return await hash(password, genSaltSync(10));
}
