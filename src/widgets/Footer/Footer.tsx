import { Typography } from "@/shared/ui/Typography/Typography";
import cls from "./Footer.module.scss";

import { MessangerLink } from "@/shared/ui/Link/MessangerLink/MessangerLink";

import { Logo, Section } from "@/shared/ui";

import { TelegramIcon } from "@/shared/ui/Icons/TelegramIcon/TelegramIcon";
import { VkIcon } from "@/shared/ui/Icons/VkIcon/VkIcon";
import { WhatsAppIcon } from "@/shared/ui/Icons/WhatsAppIcon/WhatsAppIcon";
import Link from "next/link";
interface FooterProps {}

export const Footer = ({}: FooterProps) => {
  return (
    <footer className={cls.Footer}>
      <Section className={cls.Prefooter}>
        <div className={cls.General}>
          <Logo />
          <Typography variant="text">
            «Scappa» - dамый большой ассортимент одежды, обуви и аксессуаров для
            мужчин и женщин.
          </Typography>
        </div>
        <div className={cls.Navigation}>
          <Typography variant="text" size="s24" className={cls.Heading}>
            О компании
          </Typography>
          <ul>
            <li className={cls.Item}>
              <Link href="/">
                <Typography variant="text">Главная</Typography>
              </Link>
            </li>
            <li className={cls.Item}>
              <Link href="/catalog">
                <Typography variant="text">Каталог</Typography>
              </Link>
            </li>
            <li className={cls.Item}>
              <Link href="/agreement">
                <Typography variant="text">
                  Пользовательское соглашение
                </Typography>
              </Link>
            </li>
            <li className={cls.Item}>
              <Link href="/policy">
                <Typography variant="text">
                  Политика конфиденциальности
                </Typography>
              </Link>
            </li>
          </ul>
        </div>
        <div className={cls.Contacts}>
          <Typography variant="text" size="s24" className={cls.Heading}>
            Свяжитесь с нами
          </Typography>
          <ul>
            <li className={cls.Item}>
              <Link href="tel:+799999999">
                <Typography variant="text">+7 (999) 999 99 99</Typography>
              </Link>
            </li>

            <li className={cls.Item}>
              <Link href="mailto:sappa@sappa.ru">
                <Typography variant="text">sappa@sappa.ru</Typography>
              </Link>
            </li>
          </ul>
          <div className={cls.Messangers}>
            <MessangerLink
              to="https://wa.me/7999999999"
              className="f-c"
              icon={<WhatsAppIcon className="nav__list-icon" />}
            />
            <MessangerLink
              to="https://t.me/+7999999999"
              className="f-c"
              icon={<TelegramIcon className="nav__list-icon" />}
            />
            <MessangerLink
              to="https://vk.com/sappasappa"
              className="f-c"
              icon={<VkIcon className="nav__list-icon" />}
            />
          </div>
        </div>
      </Section>
      <Typography variant="text" className={cls.Copyright}>
        2025 © Все права защищены.
      </Typography>
    </footer>
  );
};
