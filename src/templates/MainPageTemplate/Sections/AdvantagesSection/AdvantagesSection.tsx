import { Section } from "@/shared/ui";
import Image from "next/image";
import s from "./AdvantagesSection.module.scss";
export const AdvantagesSection = ({ title }: { title: string }) => {
  return (
    <Section className={s.Section}>
      <h2 className={s.Title}>{title}</h2>
      <ul className={s.List}>
        <li className={s.Item}>
          <Image
            src="/img/advantages/assortment.png"
            alt="Самый большой ассортимент в России"
            width={64}
            height={64}
          />
          <p className={s.Text}>Самый большой ассортимент в России</p>
        </li>
        <li className={s.Item}>
          <Image
            src="/img/advantages/cotton.png"
            alt="Только 100% хлопок и шелкография"
            width={64}
            height={64}
          />
          <p className={s.Text}>Только 100% хлопок и шелкография</p>
        </li>
        <li className={s.Item}>
          <Image
            src="/img/advantages/peru.png"
            alt="Производство Перу"
            width={64}
            height={64}
          />
          <p className={s.Text}>Производство в России</p>
        </li>
        <li className={s.Item}>
          <Image
            src="/img/advantages/feedback.png"
            alt=" Более 700 реальных положительных отзывов на Авито"
            width={64}
            height={64}
          />
          <p className={s.Text}>
            {" "}
            Более 700 реальных положительных отзывов на Авито
          </p>
        </li>
        <li className={s.Item}>
          <Image
            src="/img/advantages/day.png"
            alt="Нам 14 лет!
"
            width={64}
            height={64}
          />
          <p className={s.Text}>Нам 14 лет!</p>
        </li>
      </ul>
    </Section>
  );
};

