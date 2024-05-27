import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from "./Product.module.css";
import Loader from "../Loader/Loader";

function Product() {
  const [products, setProducts] = useState([]); // Initialize products as an empty array
  const [isLoading, setIsLoading] = useState(true); // Initialize loading state as true

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching products:", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.products_container}>
          {products.map((singleProduct) => (
            <ProductCard
              product={singleProduct}
              key={singleProduct.id}
              renderAdd={true}
              // renderDesc={true}
            />
          ))}
        </section>
      )}
    </>
  );
}

export default Product;
