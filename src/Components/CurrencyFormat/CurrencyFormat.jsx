// Import the necessary libraries
import React from "react"; // Importing the React library to use JSX and create a React component
import numeral from "numeral"; // Importing the numeral library for formatting numbers

// Define the CurrencyFormat component
// This component takes an 'amount' prop and formats it as a currency
const CurrencyFormat = ({ amount }) => {
  // Format the amount using numeral.js to display as currency with two decimal places
  const formattedAmount = numeral(amount).format("$0,0.00");

  // Return a div that displays the formatted amount
  return <div>{formattedAmount}</div>;
};

// Export the CurrencyFormat component as the default export
// This allows other files to import and use the CurrencyFormat component
export default CurrencyFormat;
