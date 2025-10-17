import Link from "next/link";
import { MenuMobile } from "../MenuMobile/MenuMobile";
import s from "./Menu.module.scss";

export const Menu = ({ items }: { items: any }) => {
  console.log(items);
  const links = [
    {
      id: 11,
      text: "Каталог",
      href: "/catalog",
    },
    {
      id: 1,
      text: "Футболки",
      href: "/catalog/futbolki",
    },
    {
      id: 2,
      text: "Лонгсливы",
      href: "/catalog/longslivy",
    },
    {
      id: 3,
      text: "Флаги",
      href: "/catalog/flagi",
    },
    {
      id: 4,
      text: "Нашивки",
      href: "/catalog/nashivki",
    },
    {
      id: 9,
      text: "О нас",
      href: "/about",
    },
    {
      id: 5,
      text: "Контакты",
      href: "/contacts",
    },
    {
      id: 6,
      text: "Доставка / Оплата",
      href: "/delivery",
    },
    {
      id: 7,
      text: "Обмен / Возврат",
      href: "/return",
    },
    {
      id: 8,
      text: "FAQ",
      href: "/faq",
    },
  ];
  return (
    <nav className={s.Nav}>
      <ul className={s.MenuLinks}>
        <MenuMobile items={items.success} />
        {links.map((link: any) => {
          return (
            <li className={s.MenuItem} key={link.id}>
              <Link href={link.href} className={s.MenuLink}>
                {link.text}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
