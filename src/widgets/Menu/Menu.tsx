import Link from "next/link";
import { MenuMobile } from "../MenuMobile/MenuMobile";

export const Menu = ({ items }: { items: any }) => {
  return <MenuMobile items={items.success} />;
};
