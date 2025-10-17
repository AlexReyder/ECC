import Link from "next/link";
import { MenuMobile } from "../MenuMobile/MenuMobile";
import s from "./Menu.module.scss";

export const Menu = ({ items }: { items: any }) => {
  return <MenuMobile items={items.success} />;
};
