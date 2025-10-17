"use client";
import { formatPrice } from "@/shared/utils/common";
import { getQueryParamValue } from "@/shared/utils/search-params";
import { useSearchParams } from "next/navigation";
import s from "./Product.module.scss";

export const ProductPrice = ({
  price,
  adPrice,
}: {
  price: Record<string, number>;
  adPrice: number;
}) => {
  const showAdprice = adPrice > 0;
  return (
    <div
      className={`${s.ProductPriceBlock} ${showAdprice ? s.ProductPriceBlock__adprice : ""}`}
    >
      <h3 className={s.ProductPrice}>{formatPrice(price)} ₽</h3>
      {showAdprice ? (
        <h3 className={s.ProductAdprice}>{formatPrice(adPrice)} ₽</h3>
      ) : null}
    </div>
  );
};

