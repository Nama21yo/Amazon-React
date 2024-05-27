import React from "react"; // Importing React library
import classes from "./Category.module.css"; // Importing CSS module for styling

import { categoryInfos } from "./CategoryInformation"; // Importing category information data
import CategoryCard from "./CategoryCard"; // Importing CategoryCard component

function Category() {
  return (
    <section className={classes.category__container}> {/* Section element styled with CSS module */}
      {categoryInfos.map((infos) => ( // Mapping through each item in categoryInfos array
        <CategoryCard data={infos} key={infos.id} /> // Rendering a CategoryCard for each item with data and key properties
      ))}
    </section>
  );
}

export default Category; // Exporting the Category component
