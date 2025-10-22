import { Product } from "@/entities/Product/Product";
import { getOneProduct } from "@/shared/api/catalog";
import { ProductsDb } from "@/shared/types/validation/products";
import { Section } from "@/shared/ui";
import { ErrorPageTemplate } from "@/templates";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const { success, error } = await getOneProduct(productId);
  console.log(error);
  return (
    <main>
      <Section>
        {success ? (
          <>
            <Product product={success as ProductsDb} />
          </>
        ) : (
          <ErrorPageTemplate />
        )}
      </Section>
    </main>
  );
}
