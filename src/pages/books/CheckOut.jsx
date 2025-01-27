import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContex";
import { useCreateOrderMutation } from "@/redux/features/orders/ordersApi";


import Swal from "sweetalert2";
import { formSchema } from "@/utils/zodValidation/schema";


const CheckOut = () => {
  
  const { register, handleSubmit, watch } = useForm();
  const {currentUser}=useAuth();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [createOrder,{isLoading,error}]=useCreateOrderMutation();
  const navigate=useNavigate();

  const totalPrice = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);
  }, [cartItems]);

  const onSubmit = async(formData) => {
    const newOrder={
      name:formData.name,
      email:formData.email,
      address:{
        city:formData.city,
        country:formData.country,
        state:formData.state,
        zipcode:formData.zipcode,
      },
      phone:Number(formData.phone),
      productsIds:cartItems.map(item=>item._id),
      totalPrice:Number(totalPrice)
    }
    console.log(newOrder)
    try {
      const result =formSchema.safeParse(newOrder);
      if (!result.success) {
        throw new Error("Validation failed");
      } 
      await createOrder(newOrder).unwrap();
      Swal.fire({
        title: "Order Placed",
        text: "Your Order is Placed",
        icon: "success"
      });
      navigate("/order")
    } catch (error) {
      console.log("Error Placing a Order ",error);
      Swal.fire({
        title: "Order Can not be Placed",
        text: "Provide Complete Details",
        icon: "error"
      });
    }
  };

  const [isChecked,setIsChecked] = useState(true);
  if (isLoading)return <div>Loading...</div>

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-gray-600 mb-2">
            Cash On Delivery
          </h2>
          <p className="text-gray-500 mb-2">Total Price: ${totalPrice}</p>
          <p className="text-gray-500 mb-6">Items: {cartItems.length}</p>
        </div>

        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8"
          >
            <div className="text-gray-600">
              <p className="font-medium text-lg">Personal Details</p>
              <p>Please fill out all the fields.</p>
            </div>

            <div className="lg:col-span-2">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                <div className="md:col-span-5">
                  <label htmlFor="full_name">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    {...register("name")}
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    autoComplete="off"
                  />
                </div>

                <div className="md:col-span-5">
                  <label html="email">Email Address</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    {...register("email")}
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    disabled
                    defaultValue={currentUser?.email}
                    placeholder="email@domain.com"
                    autoComplete="off"
                  />
                </div>
                <div className="md:col-span-5">
                  <label html="phone">Phone Number</label>
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    {...register("phone")}
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    placeholder="+91 234 566 890"
                    autoComplete="off"
                  />
                </div>

                <div className="md:col-span-3">
                  <label htmlFor="address">Address / Street</label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    {...register("address")}
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    placeholder=""
                    autoComplete="off"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    {...register("city")}
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    placeholder=""
                    autoComplete="off"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="country">Country / region</label>
                  <input
                    name="country"
                    id="country"
                    {...register("country")}
                    placeholder="Country"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    autoComplete="off"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="state">State / province</label>
                  <input
                    name="state"
                    id="state"
                    {...register("state")}
                    placeholder="State"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    autoComplete="off"
                  />
                </div>

                <div className="md:col-span-1">
                  <label htmlFor="zipcode">Zipcode</label>
                  <input
                    type="text"
                    name="zipcode"
                    id="zipcode"
                    {...register("zipcode")}
                    className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    placeholder=""
                    autoComplete="off"
                  />
                </div>

                <div className="md:col-span-5 mt-3">
                  <div className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="billing_same"
                      id="billing_same"
                      {...register("billing_same")}
                      className="form-checkbox"

                    />
                    <label htmlFor="billing_same" className="ml-2 ">
                      I agree to the{" "}
                      <Link className="underline underline-offset-2 text-blue-600">
                        Terms & Conditions
                      </Link>{" "}
                      and{" "}
                      <Link className="underline underline-offset-2 text-blue-600">
                        Shopping Policy
                      </Link>
                      .
                    </label>
                  </div>
                </div>

                <div className="md:col-span-5 text-right">
                  <div className="inline-flex items-end">
                    <button
                      disabled={!isChecked}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Place an Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
