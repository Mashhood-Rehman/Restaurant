import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "@emailjs/browser";

const Reservation = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
  
    emailjs
      .sendForm(
        `${import.meta.env.VITE_EMAILJS_SERVICEKEY}`,
        `${import.meta.env.VITE_EMAILJS_TEMPLATEKEY}`,
        form.current, // Pass the form reference correctly
        {
          publicKey: `${import.meta.env.VITE_EMAILJS_PUBLICKEY}`,
        }
      )
      .then(
        () => {
          toast.success("Your seats will be reserved shortly");
        },
        (err) => {
          toast.error("Error", err);
        }
      );
  };
  
  return (
    <div id="Reservation" className=" bg-orange-500">
    <div className="flex items-center justify-center p-12  shadow-lg">
      <div className="mx-auto w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        <h2   style={{
                fontFamily: 'Dancing Script, cursive',
                fontSize: '2rem', // You can adjust the size as per your preference
                fontWeight: '700', // This gives it a bold, cursive effect
              }} className="text-3xl font-semibold text-center text-orange-500 mb-8">
           <span> -</span>Reservation<span> -</span>
        </h2>
        <form ref={form} onSubmit={sendEmail}>
          <div className=" grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="w-full sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="fName"
                  name="fname"
                  className="block text-base font-medium text-gray-700 mb-3"
                >
                  First Name
                </label>
                <input
                  name="fName"
                  type="text"
                  id="fName"
                  placeholder="First Name"
                  className="w-full rounded-md border border-gray-300 py-3 px-6 text-base text-gray-700 focus:outline-none "
                />
              </div>
            </div>
            <div className="w-full sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="lName"
                  className="block text-base font-medium text-gray-700 mb-3"
                >
                  Last Name
                </label>
                <input
                  name="lName"
                  type="text"
                  id="lName"
                  placeholder="Last Name"
                  className="w-full rounded-md border border-gray-300 py-3 px-6 text-base text-gray-700 focus:outline-none "
                />
              </div>
            </div>
          </div>
  
          <div className="mb-5">
            <label
              htmlFor="guest"
              className="block text-base font-medium text-gray-700 mb-3"
            >
              How many guests are you bringing?
            </label>
            <input
              type="number"
              name="guest"
              id="guest"
              placeholder="Number of Guests"
              min="0"
              className="w-full rounded-md border border-gray-300 py-3 px-6 text-base text-gray-700 focus:outline-none "
            />
          </div>
  
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="w-full sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="date"
                  className="block text-base font-medium text-gray-700 mb-3"
                >
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="w-full rounded-md border border-gray-300 py-3 px-6 text-base text-gray-700 focus:outline-none "
                />
              </div>
            </div>
            <div className="w-full sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="time"
                  className="block text-base font-medium text-gray-700 mb-3"
                >
                  Time
                </label>
                <input
                  type="time"
                  name="time"
                  id="time"
                  className="w-full rounded-md border border-gray-300 py-3 px-6 text-base text-gray-700 focus:outline-none "
                />
              </div>
            </div>
          </div>
  
          <div className="mt-6 flex justify-center">
            <button
           type="submit"
              className="bg-orange-600 text-white py-2 px-6 rounded-md hover:bg-orange-700 transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
        <ToastContainer theme="dark" position="bottom-right" />
      </div>
    </div>
  </div>
  
  );
};

export default Reservation;
