"use client";
import { CartContext, ThemeContext, UserContext } from "../_providers";
import { useContext, useState, useEffect } from "react";
import { CheckoutDetails, Input } from ".";
import { lobsterFont } from "../fonts";
import { Dropdown } from ".";
import { useFormik } from "formik";
import { addressSchema } from "../_validation";
import { stateAbbrev } from "../_utils/constants";
import { uuid } from "uuidv4";
import { createOrder, createGuestOrder } from "../_utils/serverutils";

export default function CheckoutDisplay() {
  const { cart, setCart, cartQuantity, setCartQuantity } =
    useContext(CartContext);
  const { user } = useContext(UserContext);
  const { appTheme } = useContext(ThemeContext);
  const [shipState, setShipState] = useState("");
  useEffect(() => {
    if (user) {
      formik.setFieldValue("email", user.email);
    }
  }, [user]);
  const submitOrder = () => {
    const orderId = uuid();
    // const cartToOrder = cart.map((c) => ({
    //   // orderId: null,
    //   // guestId: null,
    //   prodId: c.prodId,
    //   name: c.name,
    //   price: c.price,
    //   quantity: c.quantity,
    //   currency: c.currency,
    // }));
    if (!user) {
      createGuestOrder(
        orderId,
        formik.values.email,
        cart,
        {
          id: orderId,
          firstName: formik.values.firstName,
          lastName: formik.values.lastName,
          addressOne: formik.values.addressOne,
          addressTwo: formik.values.addressTwo,
          city: formik.values.addressCity,
          state: formik.values.addressState,
          zipCode: formik.values.addressPostal,
        },
        100,
        "ground"
      );
    }
  };
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      addressOne: "",
      addressTwo: "",
      addressCity: "",
      addressState: "",
      addressPostal: "",
      email: "",
    },
    onSubmit: (values) => {
      submitOrder();
      console.log(values, "submit--------");
    },
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: addressSchema,
  });

  return (
    <>
      {cart.length > 0 ? (
        <div
          className={`flex flex-row border-${appTheme}-text rounded-lg h-full gap-6`}
        >
          <div className="w-2/3 rounded-lg flex flex-col shadow-[0px_0px_5px_5px_rgba(0,0,0,0.5);]">
            <div
              className={`h-16 ${lobsterFont.className} text-4xl flex items-center pl-6 border-b-2 border-${appTheme}-text bg-${appTheme}-containerBg rounded-t-lg`}
            >
              Checkout
            </div>
            {!user ? <div>Login or continue as guest</div> : null}
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col gap-2 items-center py-8">
                <span className="flex flex-row w-5/6 gap-10 px-2">
                  <Input
                    width="1/2"
                    label="First Name"
                    onChange={formik.handleChange("firstName")}
                    onBlur={formik.handleBlur("firstName")}
                    value={formik.values.firstName}
                    error={formik.touched.firstName && formik.errors.firstName}
                  />
                  <Input
                    width="1/2"
                    label="Last Name"
                    onChange={formik.handleChange("lastName")}
                    onBlur={formik.handleBlur("lastName")}
                    value={formik.values.lastName}
                    error={formik.touched.lastName && formik.errors.lastName}
                  />
                </span>
                <span className="flex flex-col w-5/6 gap-2 px-2">
                  <Input
                    width="full"
                    label="Address"
                    placeholder="Street address or P.O. Box"
                    onChange={formik.handleChange("addressOne")}
                    onBlur={formik.handleBlur("addressOne")}
                    value={formik.values.addressOne}
                    error={
                      formik.touched.addressOne && formik.errors.addressOne
                    }
                  />
                  <Input
                    width="full"
                    label="Address Line Two"
                    placeholder="Apt, suite, unit, building, floor, etc."
                    onChange={formik.handleChange("addressTwo")}
                    value={formik.values.addressTwo}
                  />
                </span>
                <span className="flex flex-row w-5/6 px-2 justify-between">
                  <Input
                    width="1/3"
                    label="City"
                    onChange={formik.handleChange("addressCity")}
                    onBlur={formik.handleBlur("addressCity")}
                    value={formik.values.addressCity}
                    error={
                      formik.touched.addressCity && formik.errors.addressCity
                    }
                  />
                  <Dropdown
                    title="State"
                    options={stateAbbrev.map((s) => ({
                      title: s,
                      setter: () => {
                        setShipState(s);
                        formik.setFieldValue("addressState", s);
                      },
                    }))}
                    error={formik.errors.addressState}
                    stateSelect
                    value={shipState}
                  />
                  <Input
                    width="1/3"
                    label="Zip Code"
                    onChange={formik.handleChange("addressPostal")}
                    onBlur={formik.handleBlur("addressPostal")}
                    value={formik.values.addressPostal}
                    error={
                      formik.touched.addressPostal &&
                      formik.errors.addressPostal
                    }
                  />
                </span>
                {!user && (
                  <span className="flex flex-row w-5/6 px-2 pr-10">
                    <Input
                      width="1/2"
                      label="Email"
                      onChange={formik.handleChange("email")}
                      onBlur={formik.handleBlur("email")}
                      value={formik.values.email}
                      error={formik.touched.email && formik.errors.email}
                    />
                  </span>
                )}
              </div>
            </form>
          </div>
          <CheckoutDetails submit={formik.handleSubmit} />
        </div>
      ) : (
        "Cart Empty"
      )}
    </>
  );
}
