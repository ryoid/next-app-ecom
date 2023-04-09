"use client";

import React, { useState } from "react";

const CartContext = React.createContext<
  [number, React.Dispatch<React.SetStateAction<null | number>>] | undefined
>(undefined);

export function CartProvider({
  children,
  initialCartCount,
}: {
  children: React.ReactNode;
  initialCartCount: number;
}) {
  const [optimisticCartCount, setOptimisticCartCount] = useState<null | number>(
    null
  );

  const count =
    optimisticCartCount !== null ? optimisticCartCount : initialCartCount;

  return (
    <CartContext.Provider value={[count, setOptimisticCartCount]}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = React.useContext(CartContext);
  if (context === undefined) {
    throw new Error("[useCart] must be used within a `CartProvider`");
  }
  return context;
}
