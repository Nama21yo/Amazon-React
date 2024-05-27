import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import LayOut from "../../Components/Layout/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { useNavigate } from "react-router-dom";
import { db } from "../../Utility/firebase";
import { ClipLoader } from "react-spinners";
import { Type } from "../../Utility/action.type";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);

  // Debugging logs
  console.log("User:", user);
  console.log("Basket:", basket);

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0); // Added 0 as the initial value

  // Debugging logs
  console.log("Total items:", totalItem);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);
      // 1. backend || functions ----> contact to the client secret
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      const clientSecret = response.data?.clientSecret;
      // 2. client side {react side confirmation}
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      // 3. After confirmation --> order firestore database save, clear basket
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
      // empty the basket
      dispatch({ type: Type.EMPTY_BASKET });
      setProcessing(false);
      navigate("/orders", { state: { msg: "You have placed new Order" } });
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }

    console.log(response.data);
  };
  return (
    <LayOut>
      <div className={classes.payment_header}>
        CheckOut ({totalItem}) items {/* Corrected this line */}
      </div>
      <section className={classes.payment}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div> {/* Added optional chaining */}
            <div>123 React Lane</div>
            <div>Addis Ababa, Ethiopia</div>
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} key={item.id} />
            ))}
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Payment Methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_detailes}>
              <form onSubmit={handlePayment}>
                {/* Payment Form from Stripe */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                <CardElement onChange={handleChange} />

                {/*  price*/}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p> Total Order | </p>
                      <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please Wait...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}
export default Payment;
