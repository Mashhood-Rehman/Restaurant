import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { IMAGES } from "../../assets/Images";

const footerData = [
  {
    title: "Menu",
    links: [
      { name: "Appetizers", id: "Product" },
      { name: "Main Courses", id: "Product" },
      { name: "Desserts", id: "Product" },
      { name: "Drinks", id: "Product" },
      { name: "Specials", id: "Product" },
    ],
  },
  {
    title: "Our Story",
    links: [
      { name: "About Us", id: "landingpage" },
      { name: "Our Vision", id: "landingpage" },
      { name: "Testimonials", id: "landingpage" },
      { name: "Careers", id: "landingpage" },
    ],
  },
  {
    title: "Contact",
    links: [
      { name: "Reservations", id: "Reservation" },
      { name: "Contact", id: "Contact" },
    ],
  },
];

const socialLinks = [
  { icon: "mdi:facebook", href: "/landingpage" },
  { icon: "mdi:instagram", href: "/landingpage" },
  { icon: "mdi:twitter", href: "/landingpage" },
  { icon: "mdi:youtube", href: "/landingpage" },
];

const Footer = () => {
  const handleScrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="bg-black text-white">
      <div className="w-full px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          <div className="lg:col-span-4">
            <img
              src={IMAGES.LOGO}
              alt="Logo"
              height={70}
              width={80}
              className="cursor-pointer"
              onClick={() => handleScrollToSection("hero")}
            />
            <p className="text-gray-300 text-base leading-relaxed mb-6 pr-4">
              At Fooderers, we serve authentic flavors crafted with passion and creativity.
              Enjoy unforgettable dining in a warm and welcoming atmosphere.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors duration-300"
                >
                  <Icon icon={link.icon} className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links Sections - Takes 6 columns */}
          <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            {footerData.map((section, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-white mb-4 border-b-2 border-orange-500 pb-2 inline-block">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <button
                        onClick={() => handleScrollToSection(link.id)}
                        className="text-gray-300 hover:text-orange-500 text-sm transition-colors duration-200 block"
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact & Hours - Takes 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-4 border-b-2 border-orange-500 pb-2 inline-block">
              Visit Us
            </h3>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start space-x-3">
                <Icon icon="mdi:map-marker" className="w-5 h-5 text-orange-500 mt-0.5" />
                <span className="text-gray-300 text-sm">123 Food Street, Lahore, Pakistan</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon icon="mdi:phone" className="w-5 h-5 text-orange-500" />
                <span className="text-gray-300 text-sm">(042) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon icon="mdi:email" className="w-5 h-5 text-orange-500" />
                <span className="text-gray-300 text-sm">contact@fooderers.com</span>
              </div>
            </div>


          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="w-full px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center md:justify-start space-x-6 text-sm">
              <Link
                to="/landingpage"
                className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                to="/landingpage"
                className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                to="/landingpage"
                className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
              >
                Security
              </Link>
            </div>

            {/* Copyright */}
            <p className="text-gray-400 text-sm text-center md:text-right">
              © {new Date().getFullYear()} Fooderers. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
