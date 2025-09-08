import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Header/Navbar";
import Reservation from "./components/Reservation";
import Product from "./components/products/Product";
import Contact from "./Contact";
import Landingpage from "./components/Header/Landingpage";
import Dispatch from "./components/Dispatch";
import Cancel from "./components/Cancel";
import Success from "./components/Success";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Routes>
      {/* Main homepage */}
      <Route
        path="/"
        element={
          <>
            <div className="relative bg-[url('/bg-hero.jpeg')] bg-cover bg-center bg-black">
              <div className="absolute inset-0 bg-black bg-opacity-90"></div>
              <Navbar />
              <Landingpage />
            </div>
            <AboutUs />
            <Product />
            <Reservation />
            <Contact />
            <Footer />
            <ToastContainer />
          </>
        }
      />

      {/* Other routes */}
      <Route path="/dispatch" element={<Dispatch />} />
      <Route path="/success" element={<Success />} />
      <Route path="/cancel" element={<Cancel />} />
    </Routes>
  );
};

export default App;
