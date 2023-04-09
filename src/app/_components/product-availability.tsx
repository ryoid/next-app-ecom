import { getProductAvailability } from "@/lib/shop";
import { shimmerCn } from "@/ui/shimmer";

export async function ProductAvailability({
  productId,
  variantId,
}: {
  productId: string;
  variantId?: string;
}) {
  const availabilities = await getProductAvailability(productId);

  const availability = variantId
    ? availabilities.data.product.variants.edges.find(
        (e) => e.node.id === variantId
      )
    : availabilities.data.product.variants.edges[0];

  if (!availability) {
    return <div className="">No</div>;
  }

  return (
    <div>
      <div className="">Available to ship in 1-2 days</div>
      <div className="text-xs text-neutral-500">
        Generated @ {availabilities.generatedTs.toLocaleString("en-UK")}
      </div>
    </div>
  );
}

export function ProductAvailabilitySkeleton() {
  return (
    <div className="flex">
      <div
        style={{ width: 200 }}
        className={`h-[24px] rounded bg-neutral-900 ${shimmerCn}`}
      />
    </div>
  );
}
