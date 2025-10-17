"use client";
import { createQueryString } from "@/shared/utils/search-params";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import s from "./Product.module.scss";

const ProductSizesItem = ({
  size,
  selectedSize,
  isInStock,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
}: any) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const queries = createQueryString(searchParams, "size", size);
  const url = pathname + "?" + queries;

  const handle = () => {
    router.replace(url, { scroll: false });
  };

  return (
    <li
      className={`${s.ProductSelectItem} ${selectedSize === size ? s.ProductSelectItem__selected : ""} ${!isInStock ? s.ProductSelectItem__not_in_stock : ""}`}
    >
      <button onClick={handle} className={`${s.ProductSizeBtn}`} type="button">
        {size}
      </button>
    </li>
  );
};

export default ProductSizesItem;

