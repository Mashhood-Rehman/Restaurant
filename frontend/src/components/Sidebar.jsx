import { useDispatch, useSelector } from "react-redux"
import { motion } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";
import { decrementQuantity, incrementQuantity, removeFromCart } from "./stores/cartSlice";
import { NavLink } from "react-router-dom";

const Sidebar = ({open, setOpen}) => {
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
                className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col"
                style={{ transform: open ? "translateX(0)" : "translateX(100%)" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                {open && (
                    <>
                        <div className="flex items-center justify-between p-6 border-b-2 border-orange-500">
                            <h2 className="text-2xl font-bold text-black">Your Cart</h2>
                            <button 
                                onClick={() => setOpen(false)}
                                className="text-gray-600 text-3xl"
                            >
                                <Icon icon="material-symbols:close" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                    <Icon icon="mdi:cart-outline" className="text-6xl mb-4" />
                                    <p className="text-lg">Your cart is empty</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {items.map((p) => (
                                        <div key={p.id} className="bg-white border border-gray-200 rounded-lg p-4">
                                            <div className="flex gap-3">
                                                <img 
                                                    src={`${import.meta.env.VITE_API_BASE_URL}${p.picture}`}
                                                    alt={p.title} 
                                                    className="w-20 h-20 object-cover rounded-lg" 
                                                />
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start">
                                                        <h3 className="font-semibold text-black">{p.name}</h3>
                                                        <button
                                                            onClick={() => dispatch(removeFromCart(p._id))}
                                                            className="text-gray-400 text-xl"
                                                        >
                                                            <Icon icon="material-symbols:close" />
                                                        </button>
                                                    </div>
                                                    <p className="text-orange-500 font-bold mt-1">${p.price.toFixed(2)}</p>
                                                    <div className="flex items-center gap-3 mt-3">
                                                        <button 
                                                            className="w-7 h-7 flex items-center justify-center bg-orange-500 text-white rounded-full text-lg"
                                                            onClick={() => dispatch(decrementQuantity(p))}
                                                        >
                                                            -
                                                        </button>
                                                        <span className="font-semibold text-black w-6 text-center">{p.quantity}</span>
                                                        <button 
                                                            className="w-7 h-7 flex items-center justify-center bg-orange-500 text-white rounded-full text-lg"
                                                            onClick={() => dispatch(incrementQuantity(p))}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="border-t-2 border-orange-500 p-6 bg-white">
                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-black">
                                    <span>Subtotal</span>
                                    <span className="font-semibold">${totalAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-black">
                                    <span>Delivery Fee</span>
                                    <span className="font-semibold">$5.00</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold text-black pt-2 border-t border-gray-300">
                                    <span>Total</span>
                                    <span className="text-orange-500">${(totalAmount + 5).toFixed(2)}</span>
                                </div>
                            </div>

                            {totalAmount > 90 ? (
                                <NavLink to="/dispatch" target="_blank">
                                    <button className="w-full py-3 bg-orange-500 text-white font-bold rounded-lg">
                                        Proceed to Checkout
                                    </button>
                                </NavLink>
                            ) : (
                                <div className="text-center">
                                    <button 
                                        disabled 
                                        className="w-full py-3 bg-gray-300 text-gray-500 font-bold rounded-lg cursor-not-allowed"
                                    >
                                        Minimum Order $100
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </motion.div>
        </div>
    )
}

export default Sidebar