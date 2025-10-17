"use server";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import { z } from "zod";
import { profilePassword, updateUserProfileSchema } from "../types/schemas";
import { UserProfileDTO } from "../types/user";
import { hashPassword } from "./auth";
import { prisma } from "./prismaInstance";
import { verifySession } from "./session";

export async function getProfileData(): Promise<UserProfileDTO> {
  const { userId } = await verifySession();
  if (!userId) redirect("/signin");

  const userData = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!userData) redirect("/signin");

  return {
    name: userData.name,
    surname: userData.surname,
    patronymic: userData.patronymic,
    email: userData.email,
    phone: userData.phone,
    whatsapp: userData.whatsapp,
    telegram: userData.telegram,
  };
}

export async function changePassword(
  unsafeData: z.infer<typeof profilePassword>,
) {
  const { success, data } = profilePassword.safeParse(unsafeData);
  if (!success)
    return {
      success: null,
      error: "Не удалось обновить пароль",
    };

  const { isAuth, userId } = await verifySession();
  if (!isAuth || !userId) redirect("/signin");

  const existingUser = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
  if (!existingUser) redirect("/signin");

  try {
    const hashedPassword = hashPassword(data.password);
    const savedUser = await prisma.user.update({
      where: {
        email: existingUser.email,
      },
      data: {
        password: await hashedPassword,
      },
    });
    return {
      success: true,
      error: null,
    };
  } catch (e) {
    return {
      success: null,
      error: "Не удалось обновить пароль",
    };
  }
}

export async function updateUserProfile(
  unsafeData: z.infer<typeof updateUserProfileSchema>,
) {
  const { success, data } = updateUserProfileSchema.safeParse(unsafeData);
  if (!success)
    return {
      success: null,
      error: "Неверно введенные данные",
    };

  const { isAuth, userId } = await verifySession();
  if (!isAuth || !userId) redirect("/signin");

  const existingUser = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!existingUser) redirect("/signin");
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return {
      success: null,
      error: "Пользователя не существует",
    };
  }

  try {
    await prisma.user.update({
      where: {
        id: userId as string,
      },
      data: {
        name: data.name,
        surname: data.surname,
        patronymic: data.patronymic,
        email: data.email,
        phone: data.phone,
        whatsapp: data.whatsapp,
        telegram: data.telegram,
      },
    });
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
}

export async function updateUserPurchasesAmount(
  userId: string,
  plusAmount: number,
) {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return {
      success: null,
      error: "USER NOT FOUND",
    };
  }

  const amount = user.purchasesAmount + plusAmount;

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        purchasesAmount: amount,
        firstBuy: false,
      },
    });
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
}

export async function isProtected() {
  const { isAuth } = await verifySession();
  //  if (!isAuth) {
  //   console.log("FAILDDDDD");
  //   redirect("/signin");
  // }
}

export async function isAdmin() {
  console.log("ADMIN");
  const { isAuth, userId } = await verifySession();
  /*
		if(!isAuth){
			console.log('AUTH')
			redirect('/signin')
		}

		const user = await prisma.user.findFirst({
			where:{
				id: userId as string
			}
		})
	
		if(!user){
			redirect('/signin')
		}
	
		if(user.role !== Role.ADMIN){
			console.log('USER')
			redirect('/signin')
		}
*/
}

export async function getUserRole() {
  const { isAuth, userId } = await verifySession();

  if (isAuth) {
    const user = await prisma.user.findFirst({
      where: {
        id: userId as string,
      },
    });
    return user.role === "ADMIN";
  }
  return false;
}
