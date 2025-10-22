import { CatalogFilters } from "@/entities/CatalogFilters/CatalogFilters";
import { CatalogPagination } from "@/entities/CatalogPagination/CatalogPagination";
import { CatalogSearchParams } from "@/shared/constants/catalog-search-params";
import { HeadingWithCount, Section } from "@/shared/ui";
import { Products } from "@/widgets/Products/Products";
import { Metadata } from "next";
import { SearchParams } from "nuqs/server";
import s from "../page.module.scss";

export const metadata: Metadata = {
  title: "Каталог",
};

type PageProps = {
  params: Promise<{ categorySlug: string }>;
  searchParams: Promise<SearchParams>;
};

export default async function CatalogCategoryPage({
  params,
  searchParams,
}: PageProps) {
  const { categorySlug } = await params;
  const { offset, colors, sizes } = await CatalogSearchParams(searchParams);

  const offsetStr = `?offset=${offset ? offset : 1}`;
  const colorsStr = colors ? `&colors=${colors}` : "";
  const sizesStr = sizes ? `&sizes=${sizes}` : "";

  const productsData = await fetch(
    `${process.env.SITE_DOMAIN}/api/catalog/${categorySlug}/${offsetStr}${colorsStr}${sizesStr}`,
  );
  const products = await productsData.json();

  const filtersData = await fetch(
    `${process.env.SITE_DOMAIN}/api/filters/getFilters`,
  );
  const filters = await filtersData.json();

  return (
    <main>
      <Section>
        <HeadingWithCount
          count={products.success.length}
          title={products.success.categoryName}
        />
      </Section>
      <Section className={s.Container}>
        <CatalogFilters data={filters.success} error={filters.error} />
        <Products products={products.success.products} />
      </Section>
      <CatalogPagination productsCount={products.success.length} />
    </main>
  );
}

