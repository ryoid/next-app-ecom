import {
  RecommendedProducts,
  RecommendedProductsSkeleton,
} from "@/app/_components/recommended";
// import { Reviews, ReviewsSkeleton } from "@/app/streaming/_components/reviews";
import { SingleProduct } from "@/app/_components/single-product";
import { getProductDetail } from "@/lib/shop";
import { Suspense } from "react";

export const runtime = "experimental-edge";

export default async function Page({ params }: { params: { slug: string } }) {
  const detail = await getProductDetail(params.slug, {
    next: {
      // ISR - 5 minutes
      revalidate: 60 * 5,
    },
  });
  return (
    <div className="space-y-8 lg:space-y-14">
      {/* @ts-expect-error Async Server Component */}
      <SingleProduct data={detail.data.productByHandle} />
      <div className="text-xs text-neutral-500">
        Detail Generated @ {detail.generatedTs.toLocaleString("en-UK")}
      </div>

      <Suspense fallback={<RecommendedProductsSkeleton />}>
        {/* @ts-expect-error Async Server Component */}
        <RecommendedProducts productId={detail.data.productByHandle.id} />
      </Suspense>

      <Suspense fallback={<div>Loading Reviews...</div>}>
        {/* <Reviews
          data={fetch(
            // We intentionally delay the reponse to simulate a slow data
            // request that would benefit from streaming
            `${getBaseUrl()}/api/reviews?delay=1000`,
            {
              // We intentionally disable Next.js Cache to better demo
              // streaming
              cache: "no-store",
            }
          )}
        /> */}
        <div>Reviews</div>
      </Suspense>
    </div>
  );
}
