import React from "react";
import { Link } from "react-router-dom";

const OrderPage = () => {
    return (
        <div className="bg-gray-50 px-4 py-8">
            <div className="max-w-screen-xl mx-auto">
                {/* Header */}
                <div className="flex flex-wrap justify-between items-center gap-6">
                    <div className="max-w-96">
                        <h2 className="text-slate-900 text-2xl font-bold mb-3">
                            Order History
                        </h2>
                        <p className="text-base text-slate-600">
                            View and manage your past orders
                        </p>
                    </div>
                    <div>
                        <input
                            type="text"
                            className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-indigo-600"
                            placeholder="Search orders..."
                        />
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-wrap items-center gap-8 mt-12">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="text-[15px] font-medium text-slate-600">
                            Filter by:
                        </span>
                        <button className="px-4 py-2 cursor-pointer bg-indigo-600 border border-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition">
                            All Orders
                        </button>
                        <button className="px-4 py-2 cursor-pointer bg-white border border-gray-300 text-slate-900 rounded-md text-sm font-medium hover:bg-gray-50 transition">
                            Completed
                        </button>
                        <button className="px-4 py-2 cursor-pointer bg-white border border-gray-300 text-slate-900 rounded-md text-sm font-medium hover:bg-gray-50 transition">
                            Processing
                        </button>
                        <button className="px-4 py-2 cursor-pointer bg-white border border-gray-300 text-slate-900 rounded-md text-sm font-medium hover:bg-gray-50 transition">
                            Cancelled
                        </button>
                    </div>
                    <div className="ml-auto">
                        <select className="appearance-none px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-indigo-600 cursor-pointer">
                            <option>Sort by: Newest</option>
                            <option>Sort by: Oldest</option>
                            <option>Sort by: Price (High to Low)</option>
                            <option>Sort by: Price (Low to High)</option>
                        </select>
                    </div>
                </div>

                {/* Orders List */}
                <div className="space-y-6 mt-6">
                    {/* Order 1 */}
                    <div className="bg-white rounded-xl border border-gray-300 overflow-hidden p-6">
                        <div className="flex flex-wrap justify-between gap-6">
                            <div className="max-w-96">
                                <div className="flex items-center gap-4">
                                    <span className="text-[15px] font-semibold text-slate-600">
                                        Order #3245
                                    </span>
                                    <span className="px-3 py-1.5 bg-green-100 text-green-900 text-xs font-medium rounded-md">
                                        Delivered
                                    </span>
                                </div>
                                <p className="text-slate-600 text-sm mt-3">
                                    Placed on May 12, 2025 at 12:30 PM
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-semibold text-slate-900">$248.75</p>
                                <p className="text-slate-600 text-sm mt-2">3 items</p>
                            </div>
                        </div>

                        <hr className="border-gray-300 my-6" />

                        <div className="flex flex-wrap items-center gap-8">
                            {/* Product 1 */}
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-gray-100 p-1 rounded-md overflow-hidden">
                                    <img
                                        src="https://readymadeui.com/images/dark-green-tshirt-2.webp"
                                        alt="Product"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div>
                                    <p className="text-[15px] font-medium text-slate-900">
                                        Tshirt
                                    </p>
                                    <p className="text-xs text-slate-600 mt-1">Qty: 1</p>
                                </div>
                            </div>
                            {/* Product 2 */}
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-gray-100 p-1 rounded-md overflow-hidden">
                                    <img
                                        src="https://readymadeui.com/images/product14.webp"
                                        alt="Product"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div>
                                    <p className="text-[15px] font-medium text-slate-900">
                                        Echo Elegance
                                    </p>
                                    <p className="text-xs text-slate-600 mt-1">Qty: 1</p>
                                </div>
                            </div>
                            {/* Product 3 */}
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-gray-100 p-1 rounded-md overflow-hidden">
                                    <img
                                        src="https://readymadeui.com/images/watch5.webp"
                                        alt="Product"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div>
                                    <p className="text-[15px] font-medium text-slate-900">
                                        Smart Watch Timex
                                    </p>
                                    <p className="text-xs text-slate-600 mt-1">Qty: 1</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link
                                to="/orders/3245"
                                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm text-slate-900 font-medium cursor-pointer hover:bg-gray-50 transition flex items-center gap-2"
                            >
                                View Details
                            </Link>
                            <Link
                                to="/reorder/3245"
                                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm text-slate-900 font-medium cursor-pointer hover:bg-gray-50 transition flex items-center gap-2"
                            >
                                Reorder
                            </Link>
                        </div>
                    </div>

                    {/* You can map other orders similarly */}
                </div>

                {/* Pagination */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-slate-600">
                        Showing <span className="font-medium">1</span> to{" "}
                        <span className="font-medium">3</span> of{" "}
                        <span className="font-medium">12</span> orders
                    </div>

                    <div className="flex gap-3">
                        <button
                            className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition disabled:opacity-50"
                            disabled
                        >
                            ‹
                        </button>
                        <button className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition cursor-pointer">
                            1
                        </button>
                        <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition cursor-pointer">
                            2
                        </button>
                        <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition cursor-pointer">
                            3
                        </button>
                        <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition cursor-pointer">
                            ›
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
