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
  const [gender, setGender] = useState("women");
  const wItems =
    items && items.length > 0
      ? items.filter((item) => item.gender === "WOMEN")
      : [];
  const mItems =
    items && items.length > 0
      ? items.filter((item) => item.gender === "MAN")
      : [];
  const onToggle = () => {
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
          <div className="foo__container">
            <button
              className={`nav__list-item for ${gender === "women" ? "foo__active" : ""}`}
              onClick={() => setGender("women")}
            >
              Женщинам
            </button>

            <button
              className={`nav__list-item for ${gender === "men" ? "foo__active" : ""}`}
              onClick={() => setGender("men")}
            >
              Мужчинам
            </button>
          </div>
          <ul className="nav__list">
            {(gender === "women" ? wItems : mItems).map((item) => {
              return (
                <li className="nav__list-item" key={item.slug}>
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
