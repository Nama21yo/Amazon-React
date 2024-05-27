import React, { useContext, useEffect, useState } from "react";
import classes from "./Orders.module.css";
import LayOut from "../../Components/Layout/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { db } from "../../Utility/firebase";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader"; // Import the Loader component

function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // State for managing the loading state

  useEffect(() => {
    if (user) {
      const unsubscribe = db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
          setLoading(false); // Set loading to false once data is fetched
        });

      return () => unsubscribe(); // Cleanup the subscription on unmount
    } else {
      setOrders([]);
      setLoading(false); // Set loading to false if no user is logged in
    }
  }, [user]);

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Your Orders</h2>
          {loading ? ( // Show the loader while loading
            <Loader />
          ) : orders?.length === 0 ? ( // Show a message if there are no orders
            <div style={{ padding: "20px" }}>You don't have orders yet.</div>
          ) : (
            <div>
              {orders?.map((eachOrder, i) => (
                <div key={i}>
                  <hr />
                  <p>Order ID: {eachOrder?.id}</p>
                  {eachOrder?.data?.basket?.map((order) => (
                    <ProductCard flex={true} product={order} key={order.id} />
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;
