"use client";
import { IUploadedFile } from "@/shared/types/file";
import { getQueryParamValue } from "@/shared/utils/search-params";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import "photoswipe/dist/photoswipe.css";
import React, { useCallback, useEffect, useState } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import s from "./ProductSlider.module.scss";

const ProductImages = ({
  images,
  className,
}: {
  images: any;
  className: string;
}) => {
  const isImages = images.length > 0;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel();
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className={`${s.embla} ${className}`}>
      <div className={s.embla__viewport} ref={emblaMainRef}>
        {isImages ? (
          <Gallery>
            <div className={s.embla__container}>
              {images.map((item: IUploadedFile, i: number) => (
                <div className={s.Slide} key={item.url + "overview"}>
                  <div className={s.SlideWrapper}>
                    <Item
                      original={item.url}
                      thumbnail={item.url}
                      width={item.dimension.width}
                      height={item.dimension.height}
                    >
                      {({ ref, open }) => (
                        <Image
                          src={item.url}
                          alt={item.url}
                          fill
                          style={{ objectFit: "scale-down" }}
                          onClick={open}
                          ref={ref}
                        />
                      )}
                    </Item>
                  </div>
                </div>
              ))}
            </div>
          </Gallery>
        ) : (
          <Image
            src="/img/no-image.png"
            alt="Изображения не найдены"
            height={400}
            width={300}
            style={{ objectFit: "contain" }}
          />
        )}
      </div>
      {isImages ? (
        <div className="embla-thumbs">
          <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
            <div className={s.ThumbWrapper}>
              {images.map((item: IUploadedFile, i: number) => (
                <Thumb
                  key={item.url}
                  onClick={() => onThumbClick(i)}
                  selected={i === selectedIndex}
                  index={i}
                  image={item.url}
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default ProductImages;

type PropType = {
  selected: boolean;
  index: number;
  onClick: () => void;
  image: any;
};

const Thumb: React.FC<PropType> = (props) => {
  const { selected, index, onClick, image } = props;

  return (
    <div
      className={`${s.ThumbContainer}
        ${selected ? s.ThumbSelected : ""} `}
    >
      <button onClick={onClick} type="button" className={s.ThumbBtn}>
        <Image src={image} alt={image} fill style={{ objectFit: "cover" }} />
      </button>
    </div>
  );
};
// {"chernyj":
//   [
//     {"url": "https://s3.ru1.storage.beget.cloud/b1b38ea06b5c-intelligent-elder/longsleeve_cannibal_corpse_sacrifice_confessions_hb_l9-Photoroom.png", "name": "longsleeve_cannibal_corpse_sacrifice_confessions_hb_l9-Photoroom.png", "dimension": {"type": "png", "width": 1280, "height": 963}}
//     , {"url": "https://s3.ru1.storage.beget.cloud/b1b38ea06b5c-intelligent-elder/longsleeve_entombed_left_hand_path_hb_l10-Photoroom.png", "name": "longsleeve_entombed_left_hand_path_hb_l10-Photoroom.png", "dimension": {"type": "png", "width": 1280, "height": 963}},
//     {"url": "https://s3.ru1.storage.beget.cloud/b1b38ea06b5c-intelligent-elder/longsleeve_cannibal_corpse_sacrifice_confessions_hb_l-Photoroom.png", "name": "longsleeve_cannibal_corpse_sacrifice_confessions_hb_l-Photoroom.png", "dimension": {"type": "png", "width": 1280, "height": 963}},
//     {"url": "https://s3.ru1.storage.beget.cloud/b1b38ea06b5c-intelligent-elder/tshirt_bathory_bathory_mald_l8.JPG", "name": "tshirt_bathory_bathory_mald_l8.JPG", "dimension": {"type": "jpg", "width": 5328, "height": 4000, "orientation": 1}}
//   ]}

