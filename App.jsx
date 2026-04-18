import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import useDebounce from "./hooks/useDebounce";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useLocalStorage("search", "");

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div>
      <h1>Product Search</h1>

      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={() => setSearch("")}>Clear</button>

      <div className="card-container">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))
        ) : (
          <p>No Results Found</p>
        )}
      </div>
    </div>
  );
}

export default App;