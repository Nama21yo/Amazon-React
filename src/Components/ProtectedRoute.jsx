// Import the necessary functions and hooks from the React library and other libraries
import React, { useContext, useEffect } from "react"; // Import React, useContext, and useEffect hooks
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation
import { DataContext } from "./DataProvider/DataProvider"; // Import DataContext for state management

// Define the ProtectedRoute component
const ProtectedRoute = ({ children, msg, redirect }) => {
  // Use the useNavigate hook to get the navigate function
  const navigate = useNavigate();

  // Use the useContext hook to get the user state from DataContext
  const [{ user }, dispatch] = useContext(DataContext);

  // Use the useEffect hook to perform side effects
  useEffect(() => {
    // If there is no user, navigate to the authentication page
    if (!user) {
      navigate("/auth", { state: { msg, redirect } });
    }
  }, [user]); // Dependency array includes 'user', so the effect runs when 'user' changes

  // Return the children components
  return children;
};

// Export the ProtectedRoute component as the default export
export default ProtectedRoute;
