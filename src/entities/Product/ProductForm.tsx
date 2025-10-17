"use client";
import ProductCounter from "@/features/ProductsListItem/ProductCounter";
import { addProductToCart } from "@/shared/api/cart";
import { productFormSchema } from "@/shared/types/schemas";
import { Form } from "@/shared/ui";
import { getQueryParamValue } from "@/shared/utils/search-params";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AddToCartBtn from "./AddToCartBtn";
import s from "./Product.module.scss";
import ProductColor from "./ProductColor";
import ProductFiltersLabel from "./ProductFiltersLabel";
import ProductSize from "./ProductSize";
import Link from "next/link";
interface Props {
  productId: string;
  name: string;
  colors: string[];
  sizes: string[];
  price: Record<string, number>;
  images: any;
  material: string | null;
  articleNumber: string;
}
type FormSchema = z.infer<typeof productFormSchema>;

const ProductForm = ({
  productId,
  name,
  price,
  images,
  colors,
  sizes,
  details,
  material,
  articleNumber,
  oColors,
  colorsFilter,
}: Props) => {
  const [count, setCount] = useState(0);
  const [sizeError, setSizeError] = useState("");
  const [quantityError, setQauntityError] = useState("");
  const searchParams = useSearchParams();
  const selectedSize = getQueryParamValue(searchParams, "size") as string;

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormSchema>();

  async function onSubmit() {
    if (!selectedSize) {
      setSizeError("Выберите размер");
    }

    if (count === 0) {
      setQauntityError("Выберите количество");
    }

    if (count !== 0 && selectedSize) {
      const data = {
        productId,
        name,
        price,
        image: images.length > 0 ? images[0].url : "/img/no-image.png",
        color: colors[0],
        size: selectedSize,
        quantity: count,
      };
      const cart = await addProductToCart(data);
      console.log(cart);
      console.log(data);
      setSizeError("");
      setQauntityError("");
    } else {
      console.log("hi");
    }
  }

  return (
    <Form action={handleSubmit(onSubmit)}>
      {material ? (
        <ProductFiltersLabel label="Материал" selected={material} />
      ) : null}
      <ProductSize sizes={sizes} error={sizeError} />
      <div>
        <ProductFiltersLabel label="Количество" selected={`${count}`} />
        <div className={s.BasketContainer}>
          <ProductCounter count={+count} totalCount={10} setCount={setCount} />
          {quantityError ? (
            <p className={s.ErrorProductMessage}>{quantityError}</p>
          ) : null}
          <AddToCartBtn
            className={s.AddToCart}
            text="В корзину"
            handleAddToCart={() => {}}
            addToCartSpinner={false}
            btnDisabled={false}
          />
        </div>
      </div>
    </Form>
  );
};
export default ProductForm;
