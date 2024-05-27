// Import the necessary functions from the React library
import React, { createContext, useReducer } from "react";

// Create a new context for the data and export it
export const DataContext = createContext();

// Define the DataProvider component and export it
// This component takes children, a reducer, and an initial state as props
export const DataProvider = ({ children, reducer, intialState }) => {
  // Return a context provider that wraps its children
  // The value of the provider is set to the state and dispatch function from useReducer
  return (
    <DataContext.Provider value={useReducer(reducer, intialState)}>
      {children} {/* Render the children components */}
    </DataContext.Provider>
  );
};
