import "./globals.css";

import { Boundary } from "@/ui/boundary";
import { cookies } from "next/headers";
import { CartProvider } from "./_components/cart-context";
import { Header } from "./_components/header";

export const metadata = {
  title: "Layout Title",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const cartCount = Number(cookies().get("_cart_count")?.value || "0");

  return (
    <html lang="en">
      <body>
        <Boundary animateRerendering={true} labels={["Layout"]} size="small">
          <CartProvider initialCartCount={cartCount}>
            <div className="space-y-10">
              <Header />

              {children}
            </div>
          </CartProvider>
        </Boundary>
      </body>
    </html>
  );
}
