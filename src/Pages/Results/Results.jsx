import React, { useEffect, useState } from "react";
import classes from "./Results.module.css";
import LayOut from "../../Components/Layout/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader";

function Results() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Initialize loading state as true
  const { categoryName } = useParams();

  useEffect(() => {
    setIsLoading(true); // Set loading to true when the request starts
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
        setIsLoading(false); // Set loading to false when the request completes
      })
      .catch((err) => {
        console.log("Error fetching results:", err);
        setIsLoading(false); // Set loading to false even if there's an error
      });
  }, [categoryName]);

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category / {categoryName}</p>
        <hr />
        {isLoading ? (
          <Loader />
        ) : (
          <div className={classes.products_container}>
            {results?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                renderDesc={false}
                renderAdd={true}
              />
            ))}
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Results;
