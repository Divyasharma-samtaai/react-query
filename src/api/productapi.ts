const BASE_URL = "https://dummyjson.com";

export const searchProducts = async (query: string) => {
  const response = await fetch(`${BASE_URL}/products/search?q=${query}`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};
