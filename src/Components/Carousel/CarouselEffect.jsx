import React from "react"; // Importing React library

import { Carousel } from "react-responsive-carousel"; // Importing the Carousel component from react-responsive-carousel library
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importing the Carousel CSS styles
import { img } from "./AmazonImages/data"; // Importing image data from a local file
import classes from "./Carousel.module.css"; // Importing CSS module for styling

function CarouselEffect() {
  return (
    <div>
      <Carousel
        autoPlay={true} // Carousel automatically plays
        infiniteLoop={true} // Carousel loops infinitely
        showIndicators={false} // Hide indicators
        showThumbs={false} // Hide thumbnails
      >
        {img.map((imageItemLink) => ( // Mapping through each image link in the img array
          <img src={imageItemLink} key={imageItemLink} alt="carousel" /> // Rendering each image with src and key properties
        ))}
      </Carousel>

      <div className={classes.hero__img}></div> {/* Div for additional styling or content, styled with CSS module */}
    </div>
  );
}

export default CarouselEffect; // Exporting the CarouselEffect component
