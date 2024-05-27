import React from "react"; // Importing React library
import classes from "./Category.module.css"; // Importing CSS module for styling
import { Link } from "react-router-dom"; // Importing Link component from react-router-dom for navigation

// Defining the CategoryCard component that accepts 'data' as a prop
function CategoryCard({ data }) {
  return (
    <div className={classes.category}>
      {" "}
      {/* Div element styled with CSS module */}
      <Link to={`/category/${data.name}`}>
        {" "}
        {/* Link component for navigation to the category page */}
        <span>
          <h2>{data.title}</h2> {/* Displaying the title of the category */}
        </span>
        <img src={data.imgLink} alt={data.name} />{" "}
        {/* Displaying the category image with alt text */}
        <p>shop now</p> {/* Prompt to shop in this category */}
      </Link>
    </div>
  );
}

export default CategoryCard; // Exporting the CategoryCard component
