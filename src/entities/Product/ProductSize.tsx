"use client";
import { getQueryParamValue } from "@/shared/utils/search-params";
import { useSearchParams } from "next/navigation";
import s from "./Product.module.scss";
import ProductFiltersLabel from "./ProductFiltersLabel";
import ProductSizesItem from "./ProductSizesItem";
const ProductSize = ({ sizes, error }: { sizes: string[]; error: string }) => {
  const searchParams = useSearchParams();
  const selectedSize = getQueryParamValue(searchParams, "size");
  return (
    <div>
      <ProductFiltersLabel label="Размер" selected={selectedSize} />
      {sizes.length && (
        <>
          <ul className={s.FiltersList}>
            {sizes.map((size, i) => {
              return (
                <ProductSizesItem
                  key={i}
                  size={size}
                  isInStock={true}
                  selectedSize={selectedSize}
                />
              );
            })}
          </ul>
        </>
      )}
      {error ? <p className={s.ErrorProductMessage}>{error}</p> : null}
    </div>
  );
};
export default ProductSize;

export function checkIfInStock(
  stock: any,
  selectedColor: string | null,
  currentSize: string,
) {
  if (selectedColor === null) {
    return false;
  }
  // let index = stock.findIndex((el) => Object.keys(el)[0] === selectedColor)
  return stock[selectedColor][currentSize] !== 0;
}
