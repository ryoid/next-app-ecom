import { ProductDetail } from "@/lib/shop";
import { cookies } from "next/headers";
import Image from "next/image";
import { Suspense } from "react";
import { AddToCart } from "./add-to-cart";
import {
  ProductAvailability,
  ProductAvailabilitySkeleton,
} from "./product-availability";

export const SingleProduct = async ({ data }: { data: ProductDetail }) => {
  // Get the cart count from the users cookies and pass it to the client
  // AddToCart component
  const cartCount = Number(cookies().get("_cart_count")?.value || "0");

  const primaryImage = data.images.edges[0].node;

  return (
    <div className="grid grid-cols-4 gap-6">
      <div className="col-span-full lg:col-span-1">
        <div className="space-y-2">
          <Image
            src={primaryImage.originalSrc}
            className="hidden rounded-lg grayscale lg:block"
            alt={primaryImage.altText ?? data.title}
            height={400}
            width={400}
          />

          <div className="grid grid-cols-3 gap-2">
            {data.images.edges.slice(1).map((image, i) => (
              <div key={`product-detail-image-${i}`}>
                <Image
                  src={image.node.originalSrc}
                  className="rounded-lg grayscale"
                  alt={image.node.altText ?? data.title}
                  height={image.node.height}
                  width={image.node.width}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="col-span-full space-y-4 lg:col-span-2">
        <div className="truncate text-xl font-medium text-white lg:text-2xl">
          {data.title}
        </div>

        {/* <ProductRating rating={data.product.rating} /> */}
        <div className="space-y-4 text-sm text-neutral-200">
          <p>{data.description}</p>
        </div>

        <div className="border border-white/10 rounded-xl p-4">
          <Suspense fallback={<ProductAvailabilitySkeleton />}>
            {/* @ts-expect-error Async Server Component */}
            <ProductAvailability productId={data.id} />
          </Suspense>

          {/* <Pricing product={product} cartCount={cartCount} /> */}
          <AddToCart initialCartCount={cartCount} />
          {/* <div>${data.product.}</div> */}
        </div>
      </div>
    </div>
  );
};
