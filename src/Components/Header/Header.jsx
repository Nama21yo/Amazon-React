// Import the necessary functions and components from the React library and other libraries
import React, { useContext } from "react"; // Import React and useContext hook
import { BsSearch } from "react-icons/bs"; // Import search icon from react-icons library
import { SlLocationPin } from "react-icons/sl"; // Import location pin icon from react-icons library
import { BiCart } from "react-icons/bi"; // Import cart icon from react-icons library
import { Link } from "react-router-dom"; // Import Link component for navigation from react-router-dom

import classes from "./Header.module.css"; // Import CSS module for styling
import LowerHeader from "./LowerHeader"; // Import LowerHeader component
import { DataContext } from "../DataProvider/DataProvider"; // Import DataContext for state management
import { auth } from "../../Utility/firebase"; // Import Firebase authentication utility

// Define the Header component
function Header() {
  // Use the useContext hook to get the user and basket state from DataContext
  const [{ user, basket }, dispatch] = useContext(DataContext);

  // Calculate the total number of items in the basket
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  // Return the JSX for the header
  return (
    <section className={classes.fixed}>
      {/* Header container */}
      <section className={classes.header_container}>
        <div className={classes.logo_container}>
          {/* Logo */}
          <Link to="/">
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="Amazon Logo"
            />
          </Link>
          <div className={classes.delivery}>
            {/* Delivery location */}
            <span>
              {/* Location pin icon */}
              <SlLocationPin />
            </span>
            <div>
              <p>Delivered to</p>
              <span>Ethiopia</span>
            </div>
          </div>
        </div>
        <div className={classes.search}>
          {/* Search bar */}
          <select name="" id="">
            <option value="">All</option>
          </select>
          <input type="text" name="" id="" placeholder="Search Product" />
          {/* Search icon */}
          <BsSearch size={38} />
        </div>
        {/* Right side links */}
        <div className={classes.order_container}>
          <div>
            <Link to="" className={classes.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/800px-Flag_of_the_United_States.svg.png?20150326181342"
                alt="USA Flag"
              />
              <section>
                <option value="">EN</option>
              </section>
            </Link>
          </div>
          {/* User account and authentication */}
          <Link to={!user && "/auth"}>
            <div>
              {user ? (
                <>
                  <p>Hello {user?.email?.split("@")[0]}</p>
                  <span onClick={() => auth.signOut()}>Log Out</span>
                </>
              ) : (
                <>
                  <p>Hello Sign In</p>
                  <span>Account & Lists</span>
                </>
              )}
            </div>
          </Link>
          {/* Orders */}
          <Link to="/orders">
            <p>returns</p>
            <span>& Orders</span>
          </Link>
          {/* Cart */}
          <Link to="/cart" className={classes.cart}>
            {/* Cart icon */}
            <BiCart size={35} />
            {/* Total number of items in the cart */}
            <span>{totalItem}</span>
          </Link>
        </div>
      </section>
      {/* Lower header component */}
      <LowerHeader />
    </section>
  );
}

// Export the Header component as the default export
export default Header;
