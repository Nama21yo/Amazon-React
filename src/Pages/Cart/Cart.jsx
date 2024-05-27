import React, { useContext } from "react";
import classes from "./Cart.module.css";
import LayOut from "../../Components/Layout/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";
import { Type } from "../../Utility/action.type";

function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0); // Added 0 as the initial value

  const increment = (item) => {
    dispatch({
      type: Type.Add_TO_BASKET,
      item,
    });
  };
  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };
  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.cart__container}>
          <h2>Hello</h2>
          <h3>Your Shopping Basket</h3>
          <hr />
          {basket?.length == 0 ? (
            <p>Sorry, there is no item in your cart</p>
          ) : (
            basket?.map((item, i) => (
              <section className={classes.cart_product}>
                <ProductCard
                  product={item}
                  renderDesc={true}
                  renderAdd={false}
                  flex={true}
                  key={i}
                />
                <div className={classes.btn_container}>
                  <button
                    className={classes.calc_btn}
                    onClick={() => increment(item)}
                  >
                    <IoIosArrowUp size={25} />
                  </button>
                  <span>{item.amount}</span>
                  <button
                    className={classes.calc_btn}
                    onClick={() => decrement(item.id)}
                  >
                    <IoIosArrowDown size={25} />
                  </button>
                </div>
              </section>
            ))
          )}
        </div>
        {basket?.length !== 0 && (
          <div className={classes.subtotal}>
            <div>
              <p>Subtotal ({basket?.length} items)</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payments">Continue to checkout</Link>
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Cart;
