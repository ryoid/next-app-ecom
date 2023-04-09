// import { Reviews, ReviewsSkeleton } from "@/app/streaming/_components/reviews";
import { getFeaturedProducts } from "@/lib/shop";
import { ProductCard } from "@/ui/product-card";

export const runtime = "experimental-edge";

export default async function Page({ params }: { params: { id: string } }) {
  const featured = await getFeaturedProducts();

  return (
    <div className="space-y-8 lg:space-y-14">
      <h1>Products</h1>

      <div className="grid grid-cols-4 gap-6">
        {featured.data.products.edges.map(({ node: product }) => (
          <div key={product.id} className="col-span-4 lg:col-span-1">
            <ProductCard product={product} />
          </div>
        ))}
        <div className="text-xs text-neutral-500">
          Featured Generated @ {featured.generatedTs.toLocaleString("en-UK")}
        </div>
      </div>
    </div>
  );
}
