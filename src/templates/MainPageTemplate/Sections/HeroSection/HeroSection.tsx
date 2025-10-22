"use client";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { useId } from "react";
import s from "./HeroSection.module.scss";
export const HeroSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ playOnInit: true, delay: 3000 }),
  ]);
  const data = ["/img/hero/1.png", "/img/hero/2.png", "/img/hero/3.png"];
  return (
    <section className={s.Carousel}>
      <div className={s.embla}>
        <div className={s.viewport} ref={emblaRef}>
          <div className={s.embla__container}>
            {data.map((item: any) => (
              <div className={s.Slide} key={useId()}>
                <img
                  src={item}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                  }}
                  alt="Новая коллекция"
                />
                <Link href={"/catalog"} className={s.Link}></Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

