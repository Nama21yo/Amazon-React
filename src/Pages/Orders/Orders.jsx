// Import the necessary functions, hooks, and components from the React library and other libraries
import React, { useContext, useEffect, useState } from "react"; // Import React, useContext, useEffect, and useState hooks
import classes from "./Orders.module.css"; // Import CSS module for styling
import LayOut from "../../Components/Layout/LayOut"; // Import LayOut component for page layout
import { DataContext } from "../../Components/DataProvider/DataProvider"; // Import DataContext for state management
import { db } from "../../Utility/firebase"; // Import Firebase database
import ProductCard from "../../Components/Product/ProductCard"; // Import ProductCard component

// Define the Orders component
function Orders() {
  // Use the useContext hook to get the user state from DataContext
  const [{ user }, dispatch] = useContext(DataContext);

  // Use the useState hook to manage the orders state
  const [orders, setOrders] = useState([]);

  // Use the useEffect hook to fetch orders from the database when the user changes
  useEffect(() => {
    if (user) {
      // Fetch orders from the Firebase database for the logged-in user
      db.collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc") // Order the orders by creation date in descending order
        .onSnapshot((snapshot) => {
          // Update the orders state with the fetched orders
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      // If no user is logged in, clear the orders state
      setOrders([]);
    }
  }, [user]); // Dependency array includes 'user', so the effect runs when 'user' changes

  // Return the JSX for the orders page
  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Your Orders</h2>
          {/* Display a message if there are no orders */}
          {orders?.length == 0 && (
            <div
              style={{
                padding: "20px",
              }}
            >
              You don't have orders yet.
            </div>
          )}
          <div>
            {/* Map over the orders and render each order */}
            {orders?.map((eachOrder, i) => {
              return (
                <div key={i}>
                  <hr />
                  <p>Order ID: {eachOrder?.id}</p>
                  {/* Map over the items in the order's basket and render a ProductCard for each */}
                  {eachOrder?.data?.basket?.map((order) => {
                    return (
                      <ProductCard flex={true} product={order} key={order.id} />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

// Export the Orders component as the default export
export default Orders;
