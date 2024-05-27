import React, { useEffect, useState } from "react";
import classes from "./ProductDetail.module.css";
import LayOut from "../../Components/Layout/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader";

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Initially set to true
  const { productId } = useParams();

  useEffect(() => {
    setIsLoading(true); // Set loading to true when the request starts
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false); // Set loading to false when the request completes
      })
      .catch((err) => {
        console.log("Error fetching product data:", err);
        setIsLoading(false); // Set loading to false even if there's an error
      });
  }, [productId]);

  return (
    <LayOut>
      {isLoading ? (
        <Loader />
      ) : product ? (
        <ProductCard
          product={product}
          flex={true}
          renderAdd={true}
          renderDesc={true}
        />
      ) : (
        <div>Product not found</div>
      )}
    </LayOut>
  );
}

export default ProductDetail;
