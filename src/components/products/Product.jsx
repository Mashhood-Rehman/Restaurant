import React from "react";
import { Link } from "react-scroll";

const Product = () => {
  return (
    <div id="Product">
      <div class="flex flex-col bg-white m-auto p-auto ">
        <h1 class="flex py-5 lg:px-20 md:px-10 px-5 lg:mx-40 md:mx-20 mx-5 font-bold text-4xl text-gray-800">
          Menu
        </h1>
        <div class="flex overflow-x-scroll mt-4 justify-evenly pb-10 hide-scroll-bar">
          <div class="flex flex-nowrap  ">
            <div class="inline-block px-3">
              <Link
                to="Cart"
                smooth={true}
                duration={1000}
                className="scroll-smooth"
              >
                <img
                  src="deals.jpeg"
                  alt="food pic"
                  className="w-28 h-28 bg-black object-contain
                max-w-xs overflow-hidden rounded-full shadow-md hover:shadow-2xl    
                transition-shadow duration-300 ease-in-out"
                />
                <p className="font-bold ml-[6%] mt-[5%]">Specail Deals</p>
              </Link>
            </div>
            <div class="inline-block px-3">
              <Link
                to="Fast"
                smooth={true}
                duration={1000}
                className="scroll-smooth"
              >
                <img
                  src="https://imgs.search.brave.com/0KDrhakNsEnzTgKwMi6Eqm5JjMdPrs7L05mb_mct0QM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTI0/Mzg3NzAyL3Bob3Rv/L2J1cmdlci1wbGFp/bi5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9VzlsS096TXNw/UGpGTEpIQ1NzZGd3/RUFxRFp4ZzQ5Z1VU/MFZuU09pY2xQOD0"
                  alt="food pic"
                  className="w-28 h-28 bg-black object-contain  max-w-xs overflow-hidden  rounded-full  shadow-md  hover:shadow-2xl     transition-shadow duration-300 ease-in-out"
                />
                <p className="font-bold ml-[15%] mt-[5%]">Fast Food</p>
              </Link>
            </div>
            <div class="inline-block px-3">
              <Link
                to="Desi"
                smooth={true}
                duration={1000}
                className="scroll-smooth"
              >
                <img
                  src=" Karahi.jpeg"
                  alt=""
                  class="w-28 h-28  max-w-xs overflow-hidden  rounded-full  shadow-md bg-green-400 hover:shadow-2xl transition-shadow duration-300 ease-in-out"
                />
                <p className="font-bold ml-[34%] mt-[5%]">Desi</p>
              </Link>
            </div>
            <div class="inline-block px-3">
              <Link to="Chinese" smooth={true} duration={1000}>
                <img
                  src=" Noodles.jpeg"
                  class="w-28 h-28  max-w-xs overflow-hidden  rounded-full  shadow-md bg-green-400 hover:shadow-2xl transition-shadow duration-300 ease-in-out"
                  alt=""
                />
              </Link>
              <p className="font-bold ml-[23%] mt-[5%]">Chinese</p>
            </div>
            <div class="inline-block px-3">
              <Link to="Dessert" smooth={true} duration={1000}>
                <img
                  src=" barfi.jpeg
"
                  class="w-28 h-28  max-w-xs overflow-hidden  rounded-full  shadow-md bg-green-400 hover:shadow-2xl transition-shadow duration-300 ease-in-out"
                  alt=""
                />
              </Link>
              <p className="font-bold ml-[26%] mt-[5%]">Desserts</p>
            </div>
            <div class="inline-block px-3">
              <Link to="drink" smooth={true} duration={1000}>
                <img
                  src="coke.jpeg"
                  class="w-28 h-28  max-w-xs overflow-hidden  rounded-full  shadow-md bg-green-400 hover:shadow-2xl transition-shadow duration-300 ease-in-out"
                />
              </Link>
              <p className="font-bold ml-[26%] mt-[5%]">Drinks</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
