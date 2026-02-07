import React from 'react'
import { useDispatch } from 'react-redux';
import { Icon } from '@iconify/react/dist/iconify.js';
import { addToCart } from '../stores/cartSlice';
import { useGetProductsQuery } from '../../features/api/productApi';

const CategoryProducts = ({ category }) => {
    const dispatch = useDispatch()
    const { data: getAllProducts, isLoading, error } = useGetProductsQuery();
    const items = getAllProducts?.products || [];

    const filteredProducts = items.filter(
        (item) => {
            const itemCat = item.category.toLowerCase().replace(/\s/g, '');
            const cat = category.toLowerCase().replace(/\s/g, '');
            return itemCat === cat;
        }
    );

    if (isLoading) {
        return <div>Loading, please wait...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    const handleAddToCart = (product) => {
        try {


            console.log("adding item to cart", product)
            dispatch(addToCart(product));
        } catch (error) {
            console.log("error adding to cart", error)
        }

    }
    console.log(filteredProducts)
    return (
        <div id={category}>
            <h1 className=' bg-orange-500 font-bold text-transparent bg-clip-text text-2xl ml-[10%]'>
                {category}
            </h1>
            <div className="flex flex-wrap sm:flex-wrap justify-start gap-4 p-4 overflow-x-auto hide-scrollbar">
                {filteredProducts?.map((p) => (
                    <div
                        key={p._id}
                        className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 bg-white p-4 sm:p-6 transition ease-in-out duration-200"
                    >
                        <img
                            src={p.picture}
                            alt={p.title}
                            className="w-16 h-16 sm:w-24 sm:h-24 object-cover object-center rounded-full "
                        />
                        <div className="mt-4   sm:mt-0 sm:ml-4 flex-grow text-center sm:text-left">
                            <h2 className="text-base sm:text-lg font-semibold border-b p-2 border-gray-200 text-gray-800">
                                {p.name}
                            </h2>
                            <p className="text-gray-600 text-sm hidden lg:block sm:text-base p-2">{p?.description}</p>
                        </div>
                        <div className="flex justify-center sm:justify-end space-x-4 mt-4  ">
                            <span className="text-orange-600 text-lg sm:text-xl ml-3   font-semibold">${p.price}</span>
                            <button
                                onClick={() => handleAddToCart(p)}
                                className="text-orange-500 p-2 rounded-lg transition duration-200 ease-in-out flex items-center"
                            >
                                <Icon icon="mdi-light:cart" className="h-6 sm:h-8 w-6 sm:w-8" />
                            </button>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default CategoryProducts