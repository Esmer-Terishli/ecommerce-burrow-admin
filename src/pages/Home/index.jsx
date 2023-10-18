import { useEffect, useState } from "react";
import axios from "axios";
import { ProductCard } from "../../components/ProductCard";
import { formatImgUrl } from "../utils";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="home w-5/6 px-8 py-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          price={product.price}
          discount={product.discount}
          name={product.name}
          imgUrl={formatImgUrl(product.productImage)}
        />
      ))}
    </div>
  );
};

export default Home;
