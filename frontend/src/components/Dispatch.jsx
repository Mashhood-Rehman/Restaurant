import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { removeFromCart, incrementQuantity, decrementQuantity } from './stores/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios';


const Dispatch = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const [data,setData] = useState({
    name: "",
      Number: "",
      email: "",
      address: "",
    instructions:""
  })
  const onchangeHandler = (e) => {
    const name = e.target.name; 
    const value = e.target.value; 
    setData({ ...data, [name]: value });
  };
  
  const makePayment = async (e) => {
    e.preventDefault()
    const stripe =  await loadStripe(import.meta.env.VITE_STRIPE_KEY);

  
    const body = {
      products: items   
    };
  
    const headers = {
      "Content-Type": "application/json"
    };
  
    try {
      const response = await axios.post( `${import.meta.env.VITE_API_BASE_URL}/create-checkout-sessions`, body, { headers });
      const session = response.data;
  
      const result = await stripe.redirectToCheckout({
        sessionId: session.id
      });
  
      if (result.error) {
        console.log(result.error);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };
  

      
  return (
<>
<form onSubmit={makePayment}>

      <div className='container lg:flex lg:flex-row md:flex-col md:flex  justify-evenly'>

            {/* info Section */}
            <div className='lg:w-[50%]  md:flex-col md:flex '>

        <div className='bg-gray-100 p-4  md:flex-col md:flex  rounded-lg  lg:mt-[4%] lg:w-[100%] ' >
          <div className='lg:flex lg:flex-row md:flex  md:flex-col '>

          <div className=' flex flex-col'>
            <label  className=' font-bold mb-[4%]'>Full Name</label>
            <input type="text" name='name' value={data.name} onChange={onchangeHandler} className='  border lg:h-10 lg:w-32 outline-none duration-200 ease-in-out rounded-xl ' />
          </div>
          <div className=' flex flex-col'>
            <label className='mb-[4%] font-bold lg:ml-[12%]'>
            Mobile no.
            </label>
            <input type="text" name='Number' value={data.Number} onChange={onchangeHandler} className=' lg:h-10 lg:w-32 border   outline-none duration-200 ease-in-out rounded-xl lg:ml-[30%]' />
            </div>
            <div className=' flex flex-col '> 

            <label className='mb-[4%] font-bold lg:ml-[30%] ' >Email</label>
            <input type="text" name='email ' value={data.email} onChange={onchangeHandler} className=' lg:h-10 lg:w-56 border  outline-none duration-200 ease-in-out rounded-xl lg:ml-[30%]' />
            </div>
          </div>
      <div className=' lg:mt-[4%] flex flex-col'>

      <label className='font-bold'>Address</label>
      <input type="text" name='address' value={data.address} onChange={onchangeHandler} className=' rounded-xl h-10 border  outline-none duration-200 ease-in-out '  />
      </div>
        </div>



      
        {/* instructions section */}
        <div className='bg-gray-100 p-4   md:mt-[5%]  rounded-lg  lg:mt-[2%] lg:w-[100%] ' >
    <div className=' flex flex-col  md:mt-4'>
            <label  className=' font-bold  mb-[4%]'>Special Instructions</label>
            <input name='instrucions' value={data.instructions} onChange={onchangeHandler} placeholder='Enter Special Instructions....i.e; allergies , recommendations etc' type="text" className='  border lg:h-24 lg:w-[100%] md:h-44 sm:h-32 md:w-96 outline-none duration-200 ease-in-out rounded-xl '  />
          
          </div>
        </div>


        <div className='bg-gray-100 p-4  md:mt-[5%] sm:mt-6   rounded-lg  lg:mt-[2%] lg:w-[100%] ' >
        <div  className=' flex flex-col'>
        <label  className=' font-bold mb-[4%]'>Payment Method</label>
        <div className='flex justify-start'>

        <button  className=' hover:bg-blue-700 hover:text-white font bold duration-200 ease-in-out lg:-mt-[1%] lg:-ml-[3%]  p-2 rounded-xl lg:w-40'>Cash on Delivery</button>
        <button onClick={makePayment} className=' hover:bg-blue-700 hover:text-white font bold duration-200 ease-in-out lg:-mt-[1%] lg:-ml-[3%]  p-2 rounded-xl lg:w-40'>Pay with Card</button>
        </div>

        </div>
        </div>

        </div>
  {/* Cart Section */}
        <div className=' lg:ml-[10%] lg:mt-[5%] text-xl font-semibold font-sans   '>
            <h1>Your Cart</h1>
            <div className="space-y-4 overflow-y-auto h-80">
              {items.map((p) => (
                <div key={p.id} className="flex items-center overflow-y-auto space-x-4">
                  <img  src={`http://localhost:5000${p.picture}`} alt={p.title} className="w-16 h-16 object-cover rounded-full" />
                  <div className="flex-1">
                    <h3 className="font-semibold">{p.name}</h3>
                    <p className="text-gray-600 text-sm">{p.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      className="text-xl font-bold hover:bg-blue-800 transition duration-200 hover:text-white rounded-full px-2"
                      onClick={() => dispatch(decrementQuantity(p))}
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold">{p.quantity}</span>
                    <button
                      className="text-xl font-bold hover:bg-blue-800 hover:text-white rounded-full  transition duration-200 px-2"
                      onClick={() => dispatch(incrementQuantity(p))}
                    >
                      +
                    </button>
                  </div>
                  <p className="text-gray-600">${p.price.toFixed(2)}</p>
                  <button
                    onClick={() => dispatch(removeFromCart(p._id))}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Icon icon="material-symbols:close" />
                  </button>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span>Rs$5</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Grand total</span>
                <span>${totalAmount+5}</span>
              </div>
              <button  className="w-full py-3 bg-gray-500 hover:bg-orange-500 duration-200 ease-in-out text-white rounded">Proceed with Payment</button>
            </div>
          </div>


      </div>
</form>

</>

  );
};

export default Dispatch;


















