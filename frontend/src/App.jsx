import { Route, Routes } from "react-router-dom";

import Cancel from "./components/Cancel";
import Dispatch from "./components/Dispatch";
import Success from "./components/Success";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";

const App = () => {
  return (<>
    <ToastContainer />
    <Routes>
      {/* Main homepage */}
      <Route path="/" element={<Home />} />
      {/* Other routes */}
      <Route path="/dispatch" element={<Dispatch />} />
      <Route path="/success" element={<Success />} />
      <Route path="/cancel" element={<Cancel />} />
    </Routes>
  </>
  );
};

export default App;
