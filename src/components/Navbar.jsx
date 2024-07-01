import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-scroll";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "auto"; // Ensure scroll is enabled when component is unmounted
    };
  }, []);

  return (
    <nav
      className={`fixed z-50 w-full py-5 md:px-20 px-11 transition-all duration-300 ${isScrolled ? "bg-opacity-70 backdrop-blur-2xl shadow-lg" : ""
        }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link to="home" smooth={true} duration={1000}>
            <div className="text-2xl font-bold cursor-pointer flex items-baseline space-x-1">
              <span className="text-blue-700 text-2xl">Nacho</span>
              <span className="text-blue-700 text-2xl">Daddy</span>

            </div>
          </Link>
        </div>
        <div className="md:hidden flex justify-end w-full">
          <button
            onClick={toggleMenu}
            className="text-black focus:outline-none z-20 relative"
          >
            {isOpen ? (
              <HiX
                size={32}
                className="hover:text-[#2DD4BF] transition duration-300"
              />
            ) : (
              <HiMenu
                size={32}
                className="hover:text-[#2DD4BF] transition duration-300"
              />
            )}
          </button>
        </div>
        <div
          className={`fixed inset-0 bg-blue-300 bg-opacity-90 z-10 flex flex-col items-center justify-center space-y-4 text-black transform ${isOpen ? "translate-x-0 h-screen" : "translate-x-full h-0"
            } transition-transform duration-300 md:relative md:bg-transparent md:inset-auto md:flex md:flex-row md:space-y-0 md:space-x-4 md:translate-x-0 md:h-auto`}
        >
          {["Home", "Menu ", "Reservations", "Delivery"].map(
            (item, index) => (
              <Link
                key={index}
                to={item.toLowerCase().replace(" ", "-")}
                smooth={true}
                duration={1000}
                onClick={handleLinkClick}
              >
                <div className="hover:text-blue-700 cursor-pointer pb-1 relative group">
                  {item}
                  <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 h-0.5 w-0 bg-blue-700 transition-all duration-500 group-hover:w-full mt-2"></span>
                </div>
              </Link>
            )
          )}
          <Link
            to="get-started"
            smooth={true}
            duration={500}
            onClick={handleLinkClick}
          >
            <div className="text-blue-700 border-2 border- to-blue-700 py-2 px-4 rounded hover:bg-blue-700 hover:text-gray-900 transition cursor-pointer md:hidden">
              Get Started
            </div>
          </Link>
        </div>
        <Link to="get-started" smooth={true} duration={500}>
          <div className="text-blue-700 border-2 border-blue-700 py-2 px-4  hover:bg-blue-700 hover:text-gray-900 transition cursor-pointer hidden md:block">
            Get Started
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;