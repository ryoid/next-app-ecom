export interface ProductDetail {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: ProductOption[];
  priceRange: PriceRange;
  variants: Variants;
  images: {
    pageInfo: PageInfo;
    edges: {
      node: ProductImage;
    }[];
  };
}

export interface ProductCard {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  options: ProductOption[];
  priceRange: PriceRange;
  images: {
    edges: [
      {
        node: ProductImage;
      }
    ];
  };
}

export interface ProductRecommendation {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  options: ProductOption[];
  priceRange: PriceRange;
  images: {
    edges: [
      {
        node: ProductImage;
      }
    ];
  };
}

export interface ProductImage {
  originalSrc: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface PriceRange {
  maxVariantPrice: Price;
  minVariantPrice: Price;
}

export interface Price {
  amount: string;
  currencyCode: string;
}

export interface Variants {
  pageInfo: PageInfo;
  edges: {
    node: ProductVariant;
  }[];
}

export interface ProductVariant {
  id: string;
  title: string;
  sku: string;
  availableForSale: boolean;
  requiresShipping: boolean;
  selectedOptions: SelectedOption[];
  priceV2: Price;
  compareAtPriceV2: Price | null;
}

export interface SelectedOption {
  name: string;
  value: string;
}

export async function shopifyFetch<T>(
  {
    query,
    variables,
  }: {
    query: string;
    variables?: Record<string, unknown>;
  },
  init?: RequestInit
) {
  const endpoint =
    process.env.VITE_SHOPIFY_API_ENDPOINT ||
    "https://hydrogen-preview.myshopify.com/api/2023-04/graphql.json";
  const key =
    process.env.VITE_SHOPIFY_STOREFRONT_API_TOKEN ||
    "3b580e70970c4528da70c98e097c2fa0";

  try {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": key,
      },
      body: { query, variables } && JSON.stringify({ query, variables }),
      ...init,
    });

    if (!result.ok) {
      throw new Error(result.statusText);
    }

    return Object.assign(
      (await result.json()) as {
        data: T;
        errors: { message: string }[];
      },
      {
        generatedTs: new Date(),
      }
    );
  } catch (error) {
    console.error("[shopifyFetch] Error:", error);
    throw error;
  }
}

export async function getFeaturedProducts(init?: RequestInit) {
  return shopifyFetch<{
    products: {
      edges: {
        node: ProductCard;
      }[];
    };
  }>(
    {
      query: `{
      products(sortKey: TITLE, first: 4) {
          edges{
            node {
                id
                handle
                availableForSale
                title
                options {
                    id
                    name
                    values
                }
                priceRange {
                    maxVariantPrice {
                        amount
                        currencyCode
                    }
                    minVariantPrice {
                        amount
                        currencyCode
                    }
                }
                images(first: 1) {
                    edges {
                        node {
                            originalSrc
                            altText
                            width
                            height
                        }
                    }
                }
            }
        }
      }
    }`,
    },
    init
  );
}

export async function getAllProducts(init?: RequestInit) {
  return shopifyFetch<{
    products: {
      edges: {
        node: ProductCard;
      }[];
    };
  }>(
    {
      query: `{
      products(sortKey: TITLE, first: 100) {
          edges{
            node {
                id
                handle
                availableForSale
                title
                options {
                    id
                    name
                    values
                }
                priceRange {
                    maxVariantPrice {
                        amount
                        currencyCode
                    }
                    minVariantPrice {
                        amount
                        currencyCode
                    }
                }
                images(first: 1) {
                    edges {
                        node {
                        originalSrc
                        altText
                        width
                        height
                        }
                    }
                }
            }
        }
      }
    }`,
    },
    init
  );
}

export async function getAllCollections(init?: RequestInit) {
  return shopifyFetch(
    {
      query: `{
        collections(first: 100) {
             edges {
                node {
                    handle
                    products(
                        first: 100,
                        sortKey: TITLE

                    ) {
                        edges{
                            node {
                                id
                                handle
                                availableForSale
                                title
                                description
                                descriptionHtml
                                options {
                                    id
                                    name
                                    values
                                }
                                priceRange {
                                    maxVariantPrice {
                                        amount
                                        currencyCode
                                    }
                                    minVariantPrice {
                                        amount
                                        currencyCode
                                    }
                                }
                                variants(first: 250) {
                                    pageInfo {
                                        hasNextPage
                                        hasPreviousPage
                                    }
                                    edges {
                                        node {
                                            id
                                            title
                                            sku
                                            availableForSale
                                            requiresShipping
                                            selectedOptions {
                                                name
                                                value
                                            }
                                            priceV2 {
                                                amount
                                                currencyCode
                                            }
                                            compareAtPriceV2 {
                                                amount
                                                currencyCode
                                            }
                                        }
                                    }
                                }
                                images(first: 20) {
                                    pageInfo {
                                        hasNextPage
                                        hasPreviousPage
                                    }
                                    edges {
                                        node {
                                            originalSrc
                                            altText
                                            width
                                            height
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }`,
    },
    init
  );
}

export async function getCart(cartId: string, init?: RequestInit) {
  return shopifyFetch<{
    cart: {
      checkoutUrl: string;
      estimatedCost: {
        totalAmount: {
          amount: string;
        };
      };
      lines: {
        edges: any[];
      };
    };
  }>(
    {
      query: `
        query GetCart($cartId: ID!) {
          cart(id: $cartId) {
            checkoutUrl
              estimatedCost {
                  totalAmount {
                  amount
                  }
              }
              lines(first: 100) {
                  edges {
                  node {
                      id
                      quantity
                      estimatedCost {
                      subtotalAmount {
                          amount
                          currencyCode
                      }
                      totalAmount {
                          amount
                          currencyCode
                      }
                      }
                      merchandise {
                      ... on ProductVariant {
                          id
                          title
                          product {
                              images(first: 1) {
                                  edges {
                                    node {
                                      originalSrc
                                      altText
                                      width
                                      height
                                    }
                                  }
                                }
                              title
                          }
                      }
                      }
                  }
                  }
              }
            }
        }
      `,
      variables: { cartId },
    },
    init
  );
}

export async function getProductId(handle: string, init?: RequestInit) {
  return shopifyFetch<{
    productByHandle: {
      id: string;
    };
  }>(
    {
      query: ` 
        query getProduct($handle: String!) {
            productByHandle(handle: $handle) {
                id
            }
        }
    `,
      variables: {
        handle,
      },
    },
    init
  );
}

export async function getProductDetail(handle: string, init?: RequestInit) {
  return shopifyFetch<{
    productByHandle: ProductDetail;
  }>(
    {
      query: ` 
        query getProduct($handle: String!) {
            productByHandle(handle: $handle) {
                id
                handle
                availableForSale
                title
                description
                descriptionHtml
                options {
                id
                name
                values
                }
                priceRange {
                maxVariantPrice {
                    amount
                    currencyCode
                }
                minVariantPrice {
                    amount
                    currencyCode
                }
                }
                variants(first: 250) {
                pageInfo {
                    hasNextPage
                    hasPreviousPage
                }
                edges {
                    node {
                    id
                    title
                    sku
                    availableForSale
                    requiresShipping
                    selectedOptions {
                        name
                        value
                    }
                    priceV2 {
                        amount
                        currencyCode
                    }
                    compareAtPriceV2 {
                        amount
                        currencyCode
                    }
                    }
                }
                }
                images(first: 20) {
                pageInfo {
                    hasNextPage
                    hasPreviousPage
                }
                edges {
                    node {
                    originalSrc
                    altText
                    width
                    height
                    }
                }
                }
            }
        }
    `,
      variables: {
        handle,
      },
    },
    init
  );
}

export async function getProductAvailability(id: string, init?: RequestInit) {
  return shopifyFetch<{
    product: {
      variants: ProductDetail["variants"];
    };
  }>(
    {
      query: ` 
        query getProduct($id: ID!) {
          product(id: $id) {
            variants(first: 250) {
              edges {
                node {
                  id
                  title
                  sku
                  availableForSale
                  requiresShipping
                  selectedOptions {
                    name
                    value
                  }
                  priceV2 {
                    amount
                    currencyCode
                  }
                  compareAtPriceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
    `,
      variables: {
        id,
      },
    },
    init
  );
}

export async function getProductRecommendations(
  productId: string,
  init?: RequestInit
) {
  return shopifyFetch<{
    productRecommendations: ProductRecommendation[];
  }>(
    {
      query: ` 
        query productRecommendations($productId: ID!) {
            productRecommendations(productId: $productId) {
              id
              handle
              availableForSale
              title
              options {
                  id
                  name
                  values
              }
              priceRange {
                    maxVariantPrice {
                        amount
                        currencyCode
                    }
                    minVariantPrice {
                        amount
                        currencyCode
                    }
                }
              images(first: 1) {
                    edges {
                        node {
                            originalSrc
                            altText
                            width
                            height
                        }
                    }
                }
            }
        }
    `,
      variables: {
        productId,
      },
    },
    init
  );
}

export async function createCart() {
  return shopifyFetch<{
    cartCreate: {
      cart: {
        checkoutUrl: string;
        id: string;
      };
    };
  }>({
    query: `
      mutation calculateCart($lineItems: [CartLineInput!]) {
        cartCreate(input: { lines: $lineItems }) {
          cart {
            checkoutUrl
            id
          }
        }
      }
    `,
    variables: {},
  });
}

export async function updateCart({
  cartId,
  lineId,
  variantId,
  quantity,
}: {
  cartId: string;
  lineId: string;
  variantId: string;
  quantity: number;
}) {
  return shopifyFetch({
    query: `
      mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          userErrors {
            field
            message
          }
        }
      }
    `,
    variables: {
      cartId: cartId,
      lines: [
        {
          id: lineId,
          merchandiseId: variantId,
          quantity: quantity,
        },
      ],
    },
  });
}

export async function addToCart({
  cartId,
  variantId,
  quantity,
}: {
  cartId: string;
  variantId: string;
  quantity: number;
}) {
  return shopifyFetch({
    query: `
      mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            lines(first: 100) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      product {
                        title
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,

    variables: {
      cartId: cartId,
      lines: [
        {
          merchandiseId: variantId,
          quantity,
        },
      ],
    },
  });
}
