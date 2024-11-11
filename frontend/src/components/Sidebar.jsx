import { useDispatch, useSelector } from "react-redux"
import { motion } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";
import { decrementQuantity, incrementQuantity, removeFromCart } from "./stores/cartSlice";
import { NavLink } from "react-router-dom";

const Sidebar = ({open , setOpen}) => {

    const totalAmount = useSelector(state => state.cart.totalAmount)
    const items = useSelector(state => state.cart.items)
    const dispatch = useDispatch()

    return (
    <div>
              {open && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={() => setOpen(false)}
          />
        )}

        <motion.div
          className="sidebar  fixed top-20 right-0 h-3/4 w-96 overflow-y-auto bg-blue-400 text-white z-50 transform transition-transform duration-300 ease-in-out"
          style={{ transform: open ? "translateX(0)" : "translateX(100%)" }}
        >
          {open && (
            <>
              <div className="flex-none px-10">
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle"
                  ></div>
                </div>
              </div>

              <div className="  ">
              {items.map((p) => (
    <div key={p.id} className="p-4 flex flex-col md:flex-row items-center md:items-start">
        <img  src={`${import.meta.env.VITE_API_BASE_URL}${p.picture}`}alt={p.title} className="w-24 h-24 object-cover rounded-full mb-4 md:mb-0 md:mr-4" />
        <div className="flex-1">
            <h2 className="text-xl font-medium text-gray-800">{p.name}</h2>
            <div className="flex items-center space-x-4 mt-2">
                <button className="text-black text-3xl rounded-full px-2 py-1 hover:bg-blue-600 transition duration-300" onClick={() => dispatch(decrementQuantity(p))}>-</button>
                <p className="text-gray-600 text-xl">{p.quantity}</p>
                <button className="text-black text-3xl rounded-full px-2 py-1 hover:bg-blue-600 transition duration-300" onClick={() => dispatch(incrementQuantity(p))}>+</button>
            </div>
            <p className="text-gray-600 mt-2">Price: ${p.price }</p>
        </div>
        <button
            onClick={() => dispatch(removeFromCart(p._id))}
        >
            <Icon className="  -mt-[1]  text-black    hover:bg-red-600 px-2 w-10 h-8 rounded-full   duration-300 ease-in-out   -ml-16" icon="material-symbols:close"  />
        </button>
    </div>
))}


          <div className=" flex flex-col  mt-4">
            <button className="font-semibold tracking-tight text-xl">
              Total price: ${totalAmount +5}
            </button>
            <button className="font-semibold text-gray-300 text-sm tracking-tight ">
              (Delivery Fee: $5)
            </button>
          </div>
          <div className="mt-4">
            
            {totalAmount >90 ? 
            (<div>

            <NavLink to= "/dispatch" target="_blank">
              
              < button  className="w-full py-2 bg-blue-500  text-white font-bold rounded-md mb-1">

              Checkout
              </button>
              </NavLink>
                </div>)
              :
              <p className="font-semibold font-sans     flex text-center justify-center ">

              "Minimum Delivery $100 "
              </p>
               }
          </div>
        </div>
            </>
          )}
        </motion.div>
        
    </div>
  )
}

export default Sidebar
