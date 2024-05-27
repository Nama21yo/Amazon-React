// Import the necessary functions and components from the React library and other libraries
import React from "react"; // Import React to use JSX and create a React component
import { AiOutlineMenu } from "react-icons/ai"; // Import menu icon from react-icons library
import classes from "./Header.module.css"; // Import CSS module for styling

// Define the LowerHeader component
const LowerHeader = () => {
  return (
    // Container for the lower header section
    <div className={classes.lower_container}>
      <ul>
        <li>
          {/* Menu icon and 'All' label */}
          <AiOutlineMenu size={15} />
          <p>All</p>
        </li>
        {/* Navigation links */}
        <li>Today's Deals</li>
        <li>Customer Service</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  );
};

// Export the LowerHeader component as the default export
export default LowerHeader;
