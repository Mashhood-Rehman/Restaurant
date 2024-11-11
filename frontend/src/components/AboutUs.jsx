import { Icon } from "@iconify/react/dist/iconify.js";

const AboutUs = () => {
  const ImageData = [
    { ImgSrc: "about-1.jpeg" },
    { ImgSrc: "about-2.jpeg" },
    { ImgSrc: "about-3.jpeg" },
    { ImgSrc: "about-4.jpeg" },
  ];

  return (
    <div className="p-4">
      {/* Grid container for images */}
      <div className=" flex justify-evenly">

      <div className="grid grid-cols-2 lg:grid-cols-2 lg:grid-rows-2 gap-4">
      {ImageData.map((pic, index) => (
  <div key={index} className="flex">
    <img
      src={pic.ImgSrc}
      className={`h-44 w-44 object-cover rounded-lg ${index === 1 || index === 3 ? 'mt-6' : ''}`}
      alt={`image-${index + 1}`}
    />
  </div>
))}

      </div>
{/* 
      Second DIv */}
      <div className=" flex flex-col space-y-6">
      <h2   style={{
                fontFamily: 'Dancing Script, cursive',
                fontSize: '2rem', // You can adjust the size as per your preference
                fontWeight: '700', // This gives it a bold, cursive effect
              }} className="text-3xl font-semibold text-center text-orange-500 mb-8">
           <span> -</span>About Us<span> -</span>
        </h2>
        <h1 className=" font-bold text-3xl flex space-x-3 tracking-wide items-center ">Welcome to <span><Icon icon="material-symbols:fork-spoon" className=" text-orange-500"   /></span> Fooderers </h1>
           <p className=" w-96">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda, accusamus.</p>
           <p className=" w-96">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga laudantium non nulla ab doloribus odio consequatur. Accusamus voluptates officiis corporis.</p>
      <div className=" flex items-center space-x-3">


        {/* 
 Third Div */}
        <div className=" flex  space-x-5 border-l-4 border-orange-500 p-2">
        <h1 className=" text-orange-500 font-bold text-4xl">10</h1>
        <div>

          <span className=" text-gray-400">Years of</span>
         <h1 className=" font-bold text-2xl ">Experience</h1>
        </div>
        </div>
{/* 
        Fourth DIv */}
         <div className=" flex  space-x-5 border-l-4 border-orange-500 p-2">
        <h1 className=" text-orange-500 font-bold text-4xl">50</h1>
        <div>

          <span className=" text-gray-400">Popular</span>
         <h1 className=" font-bold text-2xl ">Master Chef</h1>
        </div>
        </div>
      </div>
      </div>

        </div>
    </div>
  );
};

export default AboutUs;
