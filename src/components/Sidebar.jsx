import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";

const SideBar = ({ size, cart, setCart ,isopen , setIsopen , visible  , setVisible }) => {
 
  const [open, setOpen] = useState(false);
  const [Price, setPrice] = useState(0);

  var ans = 0;

  const handleAdd = (item) => {
    const addItem = cart.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, amount: cartItem.amount + 1 }
        : cartItem``
    );
    setCart(addItem);
  };

  const handleRemove = (item) => {
    const removeItem = cart.map((cartItem) =>
      cartItem.id === item.id && cartItem.amount > 0
        ? { ...cartItem, amount: Math.max(cartItem.amount - 1, 0) }
        : cartItem
    );
    setCart(removeItem);
  };

  const handleRemoveAll = (item) => {
    const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
    setCart(updatedCart);
  };

  const getTotalAmount = () => {
    cart.map((item) => {
      console.log("here is item", item);
      ans += item.amount * item.price;
    });
    setPrice(ans);
  };

  useEffect(() => {
    getTotalAmount();
  }, [cart]);

  console.log(isopen);
  
  return (
    <>
      <div className="flex items-center">
     
        <Icon
          icon="grommet-icons:cart"
          className="cursor-pointer z-10 top-4 right-4 h-8 w-8 fixed"
          onClick={() => setOpen(!open)}
        />
        <span className="text-black bg-white rounded-full text-xl fixed top-1 right-11 font-extrabold cursor-pointer z-10">
          {size}
        </span>
      </div>

      {open && (
        <div
          className="fixed inset-0  bg-black opacity-50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className="sidebar  fixed top-0 right-0 h-[100vh] w-96 md:w-64 sm:w-48 bg-blue-400 text-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out"
        style={{ transform: open ? "translateX(0)" : "translateX(100%)" }}
      >
        {open && (
          <>
            <div className="flex justify-between  items-center p-4">
              <span className="text-xl font-bold">{size}</span>
              
            </div>
            <div className="overflow-y-auto p-4">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between mb-4"
                >
                  <img
                    src={item.img}
                    className="w-16 h-16 rounded-md"
                    alt={item.id}
                  />
                  <div className="flex flex-col mt-4 ml-2">
                    <p className="font-semibold">{item.id}</p>
                    <p className="text-gray-600">${item.price}</p>
                    <div className="flex items-center mt-1">
                      <button
                        className="px-2 py-1 bg-blue-500 text-white rounded-md"
                        onClick={() => handleRemove(item)}
                      >
                        -
                      </button>
                      <p className="px-2">{item.amount}</p>
                      <button
                        className="px-2 py-1 bg-blue-500   font-extrabold  text-white rounded-md"
                        onClick={() => handleAdd(item)}
                      >
                        +
                      </button>
                      <button
                        className="ml-2 px-2 py-1 text-white rounded-md"
                        onClick={() => handleRemoveAll(item)}
                      >
                        X
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-4">
                <button className="font-bold text-lg">
                  Total price:${Price}
                </button>
              </div>
              <div className="mt-4 text-black">
                <button type="button" className="w-full py-2 bg-blue-500  ml-4  font-bold rounded-md" onClick={() =>setVisible(true)}>
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SideBar;





// import React, { useEffect, useState } from "react";
// import { Modal } from "reactstrap";
// import { Icon } from "@iconify/react/dist/iconify.js";
// import FoodDeliveryForm from "./products/FoodDeliveryForm";
// const SideBar = ({ size, cart, setCart }) => {
//   const [open, setOpen] = useState(false);
//   const [price, setPrice] = useState(0);
//   const [showForm, setShowForm] = useState(false); // State to manage form visibility

//   const handleAdd = (item) => {
//     const addItem = cart.map((cartItem) =>
//       cartItem.id === item.id
//         ? { ...cartItem, amount: cartItem.amount + 1 }
//         : cartItem
//     );
//     setCart(addItem);
//   };

//   const handleRemove = (item) => {
//     const removeItem = cart.map((cartItem) =>
//       cartItem.id === item.id && cartItem.amount > 0
//         ? { ...cartItem, amount: Math.max(cartItem.amount - 1, 0) }
//         : cartItem
//     );
//     setCart(removeItem);
//   };

//   const handleRemoveAll = (item) => {
//     const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
//     setCart(updatedCart);
//   };

//   const getTotalAmount = () => {
//     let totalPrice = 0;
//     cart.forEach((item) => {
//       totalPrice += item.amount * item.price;
//     });
//     setPrice(totalPrice);
//   };

//   useEffect(() => {
//     getTotalAmount();
//   }, [cart]);

//   const toggleForm = () => {
//     setShowForm(!showForm);
//   };

//   return (
//     <>
//       <div className="flex items-center">
//         <Icon
//           icon="grommet-icons:cart"
//           className="cursor-pointer z-10 top-4 right-4 h-8 w-8 fixed"
//           onClick={() => setOpen(!open)}
//         />
//         <span className="text-black bg-white rounded-full text-xl fixed top-1 right-11 font-extrabold cursor-pointer z-10">
//           {size}
//         </span>
//       </div>

//       {open && (
//         <div
//           className="fixed inset-0 bg-black opacity-50 z-40"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       <div
//         className="sidebar fixed top-0 right-0 h-[100vh] w-96 md:w-64 sm:w-48 bg-blue-400 text-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out"
//         style={{ transform: open ? "translateX(0)" : "translateX(100%)" }}
//       >
//         {open && (
//           <>
//             <div className="flex justify-between items-center p-4">
//               <span className="text-xl font-bold">{size}</span>
//             </div>
//             <div className="overflow-y-auto p-4">
//               {cart.map((item, index) => (
//                 <div key={index} className="flex items-center justify-between mb-4">
//                   <img src={item.img} className="w-16 h-16 rounded-md" alt={item.id} />
//                   <div className="flex flex-col mt-4 ml-2">
//                     <p className="font-semibold">{item.id}</p>
//                     <p className="text-gray-600">${item.price}</p>
//                     <div className="flex items-center mt-1">
//                       <button
//                         className="px-2 py-1 bg-blue-500 text-white rounded-md"
//                         onClick={() => handleRemove(item)}
//                       >
//                         -
//                       </button>
//                       <p className="px-2">{item.amount}</p>
//                       <button
//                         className="px-2 py-1 bg-blue-500 font-extrabold text-white rounded-md"
//                         onClick={() => handleAdd(item)}
//                       >
//                         +
//                       </button>
//                       <button
//                         className="ml-2 px-2 py-1 text-white rounded-md"
//                         onClick={() => handleRemoveAll(item)}
//                       >
//                         X
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               <div className="mt-4">
//                 <button className="font-bold text-lg">Total price: ${price}</button>
//               </div>
//               <div className="mt-4 text-black">
//                 <button
//                   type="button"
//                   className="w-full py-2 bg-blue-500 ml-4 font-bold rounded-md"
//                   onClick={()=>toggleForm()} // Toggle form visibility
//                 >
//                   Checkout
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
//       </div>

//       {/* Render the form based on showForm state */}
//       {showForm && <FoodDeliveryForm visible={showForm} setVisible={setShowForm} />}
//     </>
//   );
// };

// export default SideBar;
