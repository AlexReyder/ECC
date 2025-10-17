import { NavItem } from "@/shared/types/admin";

export const navItems: NavItem[] = [
  {
    title: "Товары",
    slug: "products",
    url: "/admin/products",
    icon: "product",
    shortcut: ["p", "p"],
    isActive: false,
    items: [],
  },
  {
    title: "Пользователи",
    slug: "users",
    url: "/admin/users",
    icon: "users",
    shortcut: ["p", "p"],
    isActive: false,
    items: [],
  },
  {
    title: "Категории",
    slug: "categories",
    url: "/admin/categories",
    icon: "categories",
    shortcut: ["p", "p"],
    isActive: false,
    items: [],
  },
  {
    title: "Фильтры",
    url: "#",
    icon: "filter",
    isActive: true,

    items: [
      {
        title: "Материалы",
        url: "/admin/filters/materials",
        shortcut: ["m", "m"],
      },
      {
        title: "Цвета",
        url: "/admin/filters/colors",
        shortcut: ["m", "m"],
      },
      {
        title: "Размеры",
        url: "/admin/filters/sizes",
        shortcut: ["m", "m"],
      },
    ],
  },
];
