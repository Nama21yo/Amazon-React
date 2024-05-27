import React from "react";
import CarouselEffect from "../../Components/Carousel/CarouselEffect";
import Category from "../../Components/Category/Category";
import Product from "../../Components/Product/Product";
import LayOut from "../../Components/Layout/LayOut";

function Landing() {
  return (
    <LayOut>
      <CarouselEffect />
      <Category />
      <Product />
    </LayOut>
  );
}

export default Landing;
