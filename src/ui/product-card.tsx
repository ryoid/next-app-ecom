import Link from "next/link";
import Image from "next/image";
import { type ProductCard as Product } from "@/lib/shop";

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link href={`/products/${product.handle}`} className="group block">
      <div className="space-y-2">
        <div className="relative">
          <Image
            src={product.images.edges[0].node.originalSrc}
            width={400}
            height={400}
            className="rounded-xl opacity-20 group-hover:opacity-100"
            alt={product.images.edges[0].node.altText ?? product.title}
            // placeholder="blur"
            // blurDataURL={product.imageBlur}
          />
        </div>

        <div className="truncate text-sm font-medium text-white group-hover:text-cyan-500">
          {product.title}
        </div>

        {/* {product.rating ? <ProductRating rating={product.rating} /> : null} */}
        <div>
          {/* <span>${product.priceRange.minVariantPrice.amount}</span> */}
        </div>
        {/* <ProductPrice price={price} discount={product.discount} /> */}

        {/* <ProductSplitPayments price={price} /> */}

        {/* {product.usedPrice ? (
          <ProductUsedPrice usedPrice={product.usedPrice} />
        ) : null} */}

        {/* <ProductEstimatedArrival leadTime={product.leadTime} /> */}

        {/* {product.stock <= 1 ? (
          <ProductLowStockWarning stock={product.stock} />
        ) : null} */}
      </div>
    </Link>
  );
};
