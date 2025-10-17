"use client";
import Link from "next/link";
import { useState } from "react";
import "./MenuMobile.scss";

interface MenuProps {
  className?: string;
  items: any;
}

export const MenuMobile = ({ className, items }: MenuProps) => {
  const [menu, toggleMenu] = useState(false);
  const wItems =
    items && items.length > 0
      ? items.filter((item) => item.gender === "WOMEN")
      : [];
  const mItems =
    items && items.length > 0
      ? items.filter((item) => item.gender === "MAN")
      : [];
  const onToggle = () => {
    // if (!menu) {
    // 	document.body.querySelector('#sidebar').classList.add('hideEl')
    // 	document.body.style.overflow = 'hidden'
    // } else {
    // 	document.body.querySelector('#sidebar').classList.remove('hideEl')
    // 	document.body.style.overflow = ''
    // }
    toggleMenu(!menu);
  };

  return (
    <div className={`navigation ${menu ? "nav-active" : ""} f-c`}>
      <div className="nav-but-wrap" onClick={onToggle}>
        <div className="menu-icon hover-target">
          <span className="menu-icon__line menu-icon__line-left"></span>
          <span className="menu-icon__line"></span>
          <span className="menu-icon__line menu-icon__line-right"></span>
        </div>
      </div>

      <nav className="nav">
        <div className="nav__content">
          <ul className="nav__list">
            {wItems.map((item) => {
              return (
                <li className="nav__list-item">
                  <Link href={`/catalog/${item.slug}`} onClick={onToggle}>
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <ul className="nav__list">
            {mItems.map((item) => {
              return (
                <li className="nav__list-item">
                  <Link href={`/catalog/${item.slug}`} onClick={onToggle}>
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
};
