"use client";
import { addProductToCart } from "@/shared/api/cart";
import { ProductsDb } from "@/shared/types/validation/products";
import { formatPrice } from "@/shared/utils/common";
import ProductAvailable from "@/widgets/Products/ProductAvailable";
import Image from "next/image";
import Link from "next/link";
import slug from "slug";
import s from "./CatalogCardItem.module.scss";
import { useState } from "react";

export const CatalogCardItem = ({ item }: { item: ProductsDb }) => {
  const [isInCart, setIsInCart] = useState(false);
  let {
    id,
    name,
    price,
    images,
    categoryFilter,
    colorsFilter,
    colors,
    sizes,
    isNew,
    isBestseller,
    articleNumber,
    isInStock,
    adPrice,
  } = item;

  const nameSlug = slug(name);
  const categoryName = categoryFilter[0];
  const firstColor = colorsFilter[0];
  const isImages = images.length > 0;
  const previewImage = isImages ? images[0].url : "/img/no-image.png";
  const firstPrice = price;
  console.log(images);

  async function onSubmit() {
    if (isInCart) {
      setSizeTableOpen(true);
      return;
    }
    const data = {
      productId: id,
      name,
      price: price[sizes[0].label],
      color: colors[0].label,
      size: sizes[0].label,
      image: previewImage,
      quantity: 1,
    };
    await addProductToCart(data);
    setIsInCart(true);
  }

  return (
    <li className={s.Item}>
      {isNew || isBestseller ? (
        <span className={`${s.Label} ${isNew ? s.New : s.Bestseller}`}>
          {isNew ? "Новинка" : "Хит"}
        </span>
      ) : (
        <></>
      )}
      <Link href={`/product/${nameSlug}`} className={s.Img}>
        <Image
          src={previewImage}
          alt={name}
          fill
          style={{ objectFit: "contain" }}
          loading="eager"
          decoding="async"
        />
      </Link>
      <div className={s.Inner}>
        <h3 className={s.Title}>
          <Link href={`/product/${nameSlug}`}>{name}</Link>
        </h3>
        <ProductAvailable vendorCode={articleNumber} isInStock={isInStock} />
        <div className={s.PriceBlock}>
          <span className={s.Price}>{firstPrice} ₽</span>
          {adPrice > 0 ? <span className={s.Adprice}>{adPrice} ₽</span> : null}
        </div>
      </div>

      <button
        className={` ${s.Cart} ${isInCart ? s.Cart__in : ""}`}
        onClick={onSubmit}
      >
        {isInCart ? "Оформить" : "В корзину"}
      </button>
    </li>
  );
};
