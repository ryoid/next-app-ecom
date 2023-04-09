export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");
  if (id) {
    let product = await fetch(`https://dummyjson.com/products/${id}`, {
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => res.json() as Promise<Product>);

    const fields = searchParams.get("fields");
    if (product && fields) {
      product = fields.split(",").reduce((acc, field) => {
        // @ts-ignore
        acc[field] = product[field];

        return acc;
      }, {} as Product);
    }

    return new Response(JSON.stringify(product ?? null), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });
  }

  const q = searchParams.get("q");
  const url = new URL("https://dummyjson.com/products");
  if (q) {
    url.pathname = "/products/search";
    url.searchParams.set("q", q);
  }
  let products = await fetch(url, {
    headers: {
      "content-type": "application/json",
    },
  }).then(
    (res) =>
      res.json() as Promise<{
        products: Product[];
        total: number;
        skip: number;
        limit: number;
      }>
  );

  return new Response(JSON.stringify(products.products), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
