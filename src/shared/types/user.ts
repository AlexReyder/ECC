import { Role } from "@prisma/client";
import { IconShield, IconUser } from "@tabler/icons-react";
import { UserStatus } from "./schemas";

export interface UserProfileDTO {
  name: string | null;
  surname: string | null;
  email: string;
  phone: string;
}

export const userTypes = [
  {
    label: "Администратор",
    value: Role.ADMIN,
    icon: IconShield,
  },

  {
    label: "Клиент",
    value: Role.USER,
    icon: IconUser,
  },
] as const;

