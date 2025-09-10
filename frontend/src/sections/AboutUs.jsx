import { Icon } from "@iconify/react/dist/iconify.js";
import { IMAGES } from "../assets/Images";

const AboutUs = () => {
  // Use absolute paths or import images properly
  const ImageData = [
    { ImgSrc: IMAGES.ABOUT1 },
    { ImgSrc: IMAGES.ABOUT2 },
    { ImgSrc: IMAGES.ABOUT3 },
    { ImgSrc: IMAGES.ABOUT4 },
  ];

  // Handle image load errors
  const handleImageError = (e) => {
    e.target.style.display = 'none';
    console.warn('Image failed to load:', e.target.src);
  };

  const handleImageLoad = (e) => {
    e.target.style.opacity = '1';
  };

  return (
    <div className="p-4 md:p-8 lg:p-12 bg-white">
      {/* Main container - stack on mobile, side by side on desktop */}
      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8 lg:gap-12">

        {/* Images Grid */}
        <div className="w-full lg:w-auto flex justify-center">
          <div className="grid grid-cols-2 lg:grid-cols-2 lg:grid-rows-2 gap-3 md:gap-4">
            {ImageData.map((pic, index) => (
              <div key={index} className="flex justify-center">
                <div className={`relative h-32 w-32 md:h-40 md:w-40 lg:h-44 lg:w-44 ${
                  index === 1 || index === 3 ? 'mt-4 md:mt-6' : ''
                }`}>
                  <img
                    src={pic.ImgSrc}
                    alt={'ok'}
                    className="w-full h-full object-cover rounded-lg transition-all duration-300 hover:scale-105"
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    loading="lazy"
                    style={{ 
                      transition: 'opacity 0.3s ease-in-out',
                      minHeight: '100%',
                      minWidth: '100%'
                    }}
                  />
                
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col space-y-4 md:space-y-6 w-full lg:max-w-2xl text-center lg:text-left">
          {/* About Us Header */}
          <h2   
            style={{
              fontFamily: 'Dancing Script, cursive',
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              fontWeight: '700',
            }} 
            className="text-2xl md:text-3xl font-semibold text-orange-500 mb-4 md:mb-8"
          >
            <span> -</span>About Us<span> -</span>
          </h2>

          {/* Main Title */}
          <h1 className="font-bold text-2xl md:text-3xl flex flex-wrap justify-center lg:justify-start items-center gap-2 tracking-wide text-gray-900">
            Welcome to 
            <span>
              <Icon icon="material-symbols:fork-spoon" className="text-orange-500" />
            </span> 
            Fooderers
          </h1>

          {/* Description Paragraphs */}
          <div className="space-y-3 md:space-y-4">
            <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed max-w-full lg:max-w-md">
              Experience culinary excellence in our warm and welcoming atmosphere. Our passionate chefs create memorable dining experiences using the finest ingredients.
            </p>
            <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed max-w-full lg:max-w-md">
              From traditional favorites to innovative creations, every dish tells a story of flavor, craftsmanship, and dedication to exceptional dining.
            </p>
          </div>

          {/* Stats Section */}
          <div className="flex flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-4">
            {/* Years of Experience */}
            <div className="flex items-center space-x-3 md:space-x-4 border-l-4 border-orange-500 pl-3 md:pl-4">
              <h1 className="text-orange-500 font-bold text-3xl md:text-4xl">15</h1>
              <div className="text-center sm:text-left">
                <span className="text-gray-500 text-sm md:text-base block">Years of</span>
                <h1 className="font-bold text-lg md:text-2xl text-gray-900">Experience</h1>
              </div>
            </div>

            {/* Master Chefs */}
            <div className="flex items-center space-x-3 md:space-x-5 border-l-4 border-orange-500 pl-3 md:pl-4">
              <h1 className="text-orange-500 font-bold text-3xl md:text-4xl">25</h1>
              <div className="text-center sm:text-left">
                <span className="text-gray-500 text-sm md:text-base block">Expert</span>
                <h1 className="font-bold text-lg md:text-2xl text-gray-900">Master Chefs</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;