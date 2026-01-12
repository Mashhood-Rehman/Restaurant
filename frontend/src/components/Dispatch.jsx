import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { removeFromCart, incrementQuantity, decrementQuantity } from './stores/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useCreateOrderMutation } from '../features/api/orderApi';
import { toast } from "react-toastify"
const Dispatch = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const [data, setData] = useState({
    name: "",
    Number: "",
    email: "",
    address: "",
    instructions: ""
  });

  const onchangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };
  const [createOrder, { isLoading, isSuccess, error }] = useCreateOrderMutation();
  if (error) {
    console.log("order creation error", error)
  }
  const makePayment = async (e) => {
    e.preventDefault();
    console.log("function hit")
    try {
      // ✅ Step 1: Create order first
      const orderData = {
        customerName: data.name,
        customerEmail: data.email,
        customerPhone: data.Number,
        amount: totalAmount + 5,
        address: {
          text: data.address,
          instructions: data.instructions
        },
        items: items.map(i => ({
          id: i._id,
          name: i.name,
          price: i.price,
          quantity: i.quantity
        })),
      };

      const res = await createOrder(orderData).unwrap();
      console.log("Response from order", res)

      // ✅ Step 2: Proceed to Stripe checkout
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_KEY);
      const body = { products: items };
      const headers = { "Content-Type": "application/json" };
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/create-checkout-sessions`, body, { headers });
      const session = response.data;
      const result = await stripe.redirectToCheckout({ sessionId: session.id });


    } catch (err) {
      console.error("Payment or Order creation error:", err);
      toast.error("An error occurred during payment. Please try again.");
    }
  };


  return (
    <div className="bg-white min-h-screen py-12 px-4">
      <form onSubmit={makePayment}>
        <div className="container mx-auto grid lg:grid-cols-2 gap-8">

          {/* Left Column - Order Details */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-black mb-6">Order Details</h2>

            {/* Contact Information */}
            <div className="bg-white border-2 border-orange-500 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-black mb-4">Contact Information</h3>
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={onchangeHandler}
                    className="w-full px-4 py-3 border bg-white border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Mobile Number</label>
                  <input
                    type="text"
                    name="Number"
                    value={data.Number}
                    onChange={onchangeHandler}
                    className="w-full px-4 py-3 border bg-white border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={onchangeHandler}
                    className="w-full px-4 py-3 border bg-white border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Delivery Address</label>
                  <input
                    type="text"
                    name="address"
                    value={data.address}
                    onChange={onchangeHandler}
                    className="w-full px-4 py-3 border bg-white border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Special Instructions */}
            <div className="bg-white border-2 border-orange-500 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-black mb-4">Special Instructions</h3>
              <textarea
                name="instructions"
                value={data.instructions}
                onChange={onchangeHandler}
                placeholder="Allergies, dietary preferences, or special requests..."
                className="w-full px-4 py-3 border bg-white border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 h-32 resize-none"
              />
            </div>


          </div>

          {/* Right Column - Cart Summary */}
          <div>
            <h2 className="text-3xl font-bold text-black mb-6">Your Cart</h2>
            <div className="bg-white border-2 border-orange-500 rounded-lg p-6">
              <div className="space-y-4 overflow-y-auto h-96 mb-6">
                {items.map((p) => (
                  <div key={p.id} className="flex items-center gap-4 pb-4 border-b border-gray-200">
                    <img
                      src={`http://localhost:5000${p.picture}`}
                      alt={p.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-black">{p.name}</h4>
                      <p className="text-sm text-gray-600">{p.description}</p>
                      <p className="text-orange-500 font-bold mt-1">${p.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center bg-orange-500 text-white rounded-full text-xl"
                        onClick={() => dispatch(decrementQuantity(p))}
                      >
                        -
                      </button>
                      <span className="font-semibold text-lg w-6 text-center">{p.quantity}</span>
                      <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center bg-orange-500 text-white rounded-full text-xl"
                        onClick={() => dispatch(incrementQuantity(p))}
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => dispatch(removeFromCart(p._id))}
                      className="text-2xl text-gray-400"
                    >
                      <Icon icon="material-symbols:close" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t-2 border-orange-500">
                <div className="flex justify-between text-black">
                  <span>Subtotal</span>
                  <span className="font-semibold">${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-black">
                  <span>Delivery Charges</span>
                  <span className="font-semibold">$5.00</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-black pt-2">
                  <span>Total Amount</span>
                  <span className="text-orange-500">${(totalAmount + 5).toFixed(2)}</span>
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-orange-500 text-white font-bold text-lg rounded-lg mt-4"
                >
                  Proceed with Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Dispatch;