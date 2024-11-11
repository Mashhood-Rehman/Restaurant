


import  { useEffect,  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../stores/product';
import { addToCart } from '../stores/cartSlice';
import { Icon } from '@iconify/react/dist/iconify.js';

const Desi = () => { 
  const dispatch = useDispatch();
  const items = useSelector((state) => state.product.products);
  const status = useSelector((state) => state.product.status);
  const error = useSelector((state) => state.product.error);

  const filteredProducts =Array.isArray(items) ? items.filter((item) => item.category == "Desi") : []

  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts(Desi));
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Mohtaram , please wait...</div>;
  }

  if (status === 'failed') {
    return <div>{error}</div>;
  }
  return (

    <div id='Desi' className='desi'>
       <h1 className=' bg-orange-500 font-bold text-transparent bg-clip-text text-2xl ml-[10%]'>

      Desi
      </h1>
       <div className="flex  flex-wrap justify-start  gap-4 p-4">
       {filteredProducts?.map((p) => (
  <div
    key={p._id}
    className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 bg-white p-4 sm:p-6 transition ease-in-out duration-200"
  >
    <img
     src={`${import.meta.env.VITE_API_BASE_URL}${p.picture}`}
      alt={p.title}
      className="w-16 h-16 sm:w-24 sm:h-24 object-cover object-center rounded-full mx-auto sm:mx-0"
    />
    <div className="mt-4 sm:mt-0 sm:ml-4 flex-grow text-center sm:text-left">
      <h2 className="text-base sm:text-lg font-semibold border-b p-2 border-gray-200 text-gray-800">
        {p.name}
      </h2>
      <p className="text-gray-600 text-sm hidden lg:block sm:text-base p-2">Lorem ipsum clita erat amet dolor justo diam</p>
    </div>
    <div className="flex justify-center sm:justify-end space-x-4 mt-4 sm:mt-0">
      <span className="text-orange-600 text-lg sm:text-xl font-semibold">${p.price}</span>
      <button
        onClick={() => dispatch(addToCart(p))}
        className="text-orange-500 p-2 rounded-lg transition duration-200 ease-in-out flex items-center"
      >
        <Icon icon="mdi-light:cart" className="h-6 sm:h-8 w-6 sm:w-8" />
      </button>
    </div>
  </div>
))}

  
  </div></div>
  )
}

export default Desi