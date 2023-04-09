"use client";

import { useCart } from "./cart-context";

export function CartCount() {
  const [count] = useCart();
  return <span>{count}</span>;
}
