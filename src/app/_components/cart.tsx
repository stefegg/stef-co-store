"use client";
import { ThemeContext, CartContext } from "../_providers";
import { useContext } from "react";
import { lobsterFont } from "../fonts";
import { currencyGen } from "../_utils";
import Image from "next/image";
import trashCan from "../../../public/icons/trash.svg";
import { getFilter } from "../_utils";
import { CartItem } from "../_types";
import { Button } from ".";
import { useRouter } from "next/navigation";

export default function Cart() {
  const { appTheme } = useContext(ThemeContext);
  const { cart, showCart, setShowCart, cartQuantity, setCartQuantity } =
    useContext(CartContext);
  const router = useRouter();

  const getTranslate = () => {
    if (showCart === false) {
      return `translate-x-full`;
    } else return null;
  };

  const iconStyle = {
    filter: getFilter(appTheme),
  };

  const removeUpdateCount = (
    cart: CartItem[],
    idx: number,
    quantity: number
  ) => {
    cart.splice(idx, 1);
    setCartQuantity(cartQuantity - quantity);
  };

  const removeCartItem = (cartItem: CartItem) => {
    cart.map((c, idx) =>
      c.prodId === cartItem.prodId
        ? removeUpdateCount(cart, idx, c.quantity)
        : null
    );
  };

  const getSubtotal = () => {
    let subtotal = 0;
    cart.map((c) => (subtotal = c.price * c.quantity + subtotal));
    return subtotal;
  };

  const clickCheckout = () => {
    setShowCart(false);
    router.push("/checkout");
  };

  return (
    <div
      className={`flex flex-col text-${appTheme}-text bg-${appTheme}-containerBg border-${appTheme}-text absolute justify-between border-l-2 h-[calc(100vh-4rem)] w-1/4 top-16 right-0 ${getTranslate()} transition duration-500 p-4 overflow-y-scroll z-30`}
    >
      <div
        className={`${lobsterFont.className} text-4xl border-b-2 border-${appTheme}-border h-16`}
      >
        Shopping Cart
      </div>
      <div className="h-2/3 py-4 overflow-y-scroll gap-4 flex flex-col">
        {cart.length > 0 ? (
          cart.map((cartItem, idx) => (
            <div
              key={idx}
              className={`flex flex-col w-full gap-2 pl-2 bg-${appTheme}-bodyBg rounded-lg py-2`}
            >
              <div className="text-3xl flex flex-row justify-between w-full ">
                <div className={lobsterFont.className}>{cartItem.name}</div>
                <div className="text-lg grid grid-cols-2 gap-2 mr-2">
                  <div>
                    <div className="flex justify-end">x{cartItem.quantity}</div>
                    <div className="ml-auto text-lg ">
                      {currencyGen(cartItem.currency)}
                      {cartItem.price * cartItem.quantity}
                    </div>
                  </div>
                  <div
                    className={`cursor-pointer flex flex-col items-center py-1`}
                  >
                    <Image
                      src={trashCan}
                      alt="delete"
                      height={20}
                      width={20}
                      style={iconStyle}
                      onClick={() => removeCartItem(cartItem)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-row w-full text-lg pl-2 pt-2">
            Your cart is empty
          </div>
        )}
      </div>
      {cart.length > 0 && (
        <div className="flex flex-col w-full ml-1 h-40 py-4 ">
          <div
            className={`text-4xl ${lobsterFont.className} flex flex-row justify-between pr-4 pl-1 `}
          >
            <div>Subtotal</div>
            <div>
              {cart.length > 0 ? currencyGen(cart[0].currency) : null}
              {getSubtotal()}
            </div>
          </div>
          <div className="flex flex-row justify-center w-full pt-4 pr-2">
            <Button
              buttonText="Checkout"
              styleType="secondary"
              onClick={() => clickCheckout()}
              size="lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
