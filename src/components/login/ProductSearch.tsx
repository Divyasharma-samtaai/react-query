import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "../../services/productapi";
import "./ProductSearch.css";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    setShouldFetch(true);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", searchTerm],
    queryFn: () => searchProducts(searchTerm),
    enabled: shouldFetch && searchTerm.trim().length > 0,
  });

  return (
    <div className="search-container">
      <h2>Product Search</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="search product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {/* Loading State */}
      {isLoading && <p>Loading products...</p>}

      {/* Error State */}
      {isError && <p>{error.message}</p>}

      {/* No Results */}
      {data?.products?.length === 0 && <p>No products found</p>}

      {/*product list */}
      <div className="product-list">
        {data?.products?.map((product: Product) => (
          <div key={product.id} className="product-card">
            <img src={product.thumbnail} alt={product.title} />
            <h4>{product.title}</h4>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSearch;
