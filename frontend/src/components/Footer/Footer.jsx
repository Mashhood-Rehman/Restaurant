import { Link } from "react-router-dom";
import { Icon } from '@iconify/react';

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
      { name: "Locations", id: "landingpage" },
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
  // Scroll to top section when a footer link is clicked
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
    <footer className="font-sans tracking-wide bg-black px-8 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
        <div>
          <Link to="/landingpage">
            <img
              src="/logoo.jpeg.png"
              alt="Fooderers Logo"
              className="w-44"
            />
          </Link>

          <ul className="mt-10 flex space-x-5">
            {socialLinks.map((link, index) => (
              <li key={index}>
                <Link to={link.href}>
                  <Icon
                    icon={link.icon}
                    className="fill-gray-300 hover:fill-white w-7 h-7"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {footerData.map((section, index) => (
          <div key={index}>
            <h4
              onClick={() => handleScrollToSection("landingpage")}
              className="text-white font-semibold text-lg relative cursor-pointer"
            >
              {section.title}
            </h4>
            <ul className="mt-6 space-y-5">
              {section.links.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleScrollToSection(link.id)}
                    className="hover:text-white text-gray-300 text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <hr className="my-10 border-gray-400" />

      <div className="flex flex-wrap max-md:flex-col gap-4">
        <ul className="md:flex md:space-x-6 max-md:space-y-2">
          <li>
            <Link to="/landingpage" className="hover:text-white text-gray-300 text-sm">
              Terms of Service
            </Link>
          </li>
          <li>
            <Link to="/landingpage" className="hover:text-white text-gray-300 text-sm">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="/landingpage" className="hover:text-white text-gray-300 text-sm">
              Security
            </Link>
          </li>
        </ul>

        <p className="text-gray-300 text-sm md:ml-auto">© Fooderers. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
