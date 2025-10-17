import { Product } from "@/entities/Product/Product";
import { Breadcrumbs } from "@/features";
import { getOneProduct } from "@/shared/api/catalog";
import { ProductsDb } from "@/shared/types/validation/products";
import { Section } from "@/shared/ui";
import { ErrorPageTemplate } from "@/templates";
import slug from "slug";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const { success } = await getOneProduct(productId);
  return (
    <main>
      <Section>
        {success ? (
          <>
            <Breadcrumbs name={success.name as string} />
            <Product product={success as ProductsDb} />
          </>
        ) : (
          <ErrorPageTemplate />
        )}
      </Section>
    </main>
  );
}

