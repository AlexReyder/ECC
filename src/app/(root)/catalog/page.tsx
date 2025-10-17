import { CatalogFilters } from "@/entities/CatalogFilters/CatalogFilters";
import { CatalogPagination } from "@/entities/CatalogPagination/CatalogPagination";
import { Breadcrumbs } from "@/features";
import { CatalogSearchParams } from "@/shared/constants/catalog-search-params";
import { HeadingWithCount, Section } from "@/shared/ui";
import { ErrorPageTemplate } from "@/templates";
import { Products } from "@/widgets/Products/Products";
import { Metadata } from "next";
import type { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import s from "./page.module.scss";

export const metadata: Metadata = {
  title: "Каталог",
};

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function CatalogPage({ searchParams }: PageProps) {
  const { offset, search, bands, genres, manufacturers, colors, sizes } =
    await CatalogSearchParams(searchParams);
  const offsetStr = `?offset=${offset}`;
  const searchStr = search ? `&search=${search}` : "";
  const colorsStr = colors ? `&colors=${colors}` : "";
  const sizesStr = sizes ? `&sizes=${sizes}` : "";

  const productsData = await fetch(
    `${process.env.SITE_DOMAIN}/api/catalog/${offsetStr}${searchStr}${colorsStr}${sizesStr}`,
  );
  const products = await productsData.json();

  const filtersData = await fetch(
    `${process.env.SITE_DOMAIN}/api/filters/getFilters`,
  );
  const filters = await filtersData.json();

  return (
    <main>
      {products && products.success ? (
        <>
          <Section>
            <Breadcrumbs />
            <HeadingWithCount count={products.success.length} title="Каталог" />
          </Section>
          <Section className={s.Container}>
            <CatalogFilters data={filters.success} error={filters.error} />
            <Suspense fallback={<p>Loading feed...</p>}>
              <Products products={products.success.products} />
            </Suspense>
          </Section>
          <CatalogPagination productsCount={products.success.length} />
        </>
      ) : (
        <ErrorPageTemplate />
      )}
    </main>
  );
}
