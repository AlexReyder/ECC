import { ProductsDb } from "@/shared/types/validation/products";
import ProductAvailable from "@/widgets/Products/ProductAvailable";
import s from "./Product.module.scss";
import ProductAttentionLabel from "./ProductAttentionLabel";
import ProductDescription from "./ProductDescription";
import ProductForm from "./ProductForm";
import ProductImages from "./ProductImages";
import { ProductPrice } from "./ProductPrice";
import ProductSpecification from "./ProductSpecification";
import { ProductTable } from "./ProductTable";

export const Product = ({ product }: { product: ProductsDb }) => {
  let {
    id,
    isBestseller,
    isNew,
    name,
    description,
    colors,
    sizes,
    images,
    price,
    material,
    category,
    articleNumber,
    isInStock,
    adPrice,
  } = product;

  let colorsInfo = colors.map((color) => `${color.label}`);
  let sizesInfo = sizes.map((size) => `${size.label}`);

  let materialInfo = material.length > 0 ? material[0].label : null;
  let categoryLabel = category[0].label;

  return (
    <div className={s.ProductContainer}>
      <ProductImages images={images} className={s.ProductImages} />
      <div className={s.ProductContent}>
        <ProductAttentionLabel isBestseller={isBestseller} isNew={isNew} />
        <h1 className={s.ProductTitle}>{name}</h1>
        <ProductPrice price={price} adPrice={adPrice} />
        <div className={s.ProductAvailable}>
          <ProductAvailable vendorCode={articleNumber} isInStock={isInStock} />
        </div>
        <ProductForm
          productId={id}
          name={name}
          colors={colorsInfo}
          sizes={sizesInfo}
          images={images}
          price={price}
          material={materialInfo}
          articleNumber={articleNumber}
        />
        <div className={s.BottomContainer}>
          <ProductDescription description={description} />
        </div>
      </div>
    </div>
  );
};

