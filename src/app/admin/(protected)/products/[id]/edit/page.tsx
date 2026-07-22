import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/ProductForm";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: { images: true, colors: true },
  });
  if (!product) notFound();

  const initial = {
    ...product,
    pricePerSqft: product.pricePerSqft ? Number(product.pricePerSqft) : "",
    fixedPrice: product.fixedPrice ? Number(product.fixedPrice) : "",
  };

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-navy">Edit Product</h1>
      <ProductForm initial={initial} productId={product.id} />
    </div>
  );
}
