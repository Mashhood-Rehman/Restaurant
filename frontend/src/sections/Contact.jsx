import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
 
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        `${import.meta.env.VITE_EMAILJS_SERVICEKEY}`,
        `${import.meta.env.VITE_EMAILJS_TEMPKEY}`,
        form.current, 
        {
          publicKey: `${import.meta.env.VITE_EMAILJS_PUBLICKEY}`,
        }
      )
      .then(
        () => {
          toast.success("Your Feedback was sent successfully");
        },
        (err) => {
          toast.error("Error", err);
        }
      );
  };

  return (
    <section
    id="Contact"
      className="relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/bgpic.jpeg')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Darkened overlay */}

      <div className="container px-4 py-16 md:px-16 flex justify-end items-start relative z-10">
        <form
          id="FeedBack"
          ref={form}
          onSubmit={sendEmail}
          className="lg:w-1/3 md:w-1/2 w-full bg-white rounded-lg p-8 shadow-md"
        >
          <h2 className="text-gray-900 text-lg mb-6 font-medium">Feedback</h2>

          <div className="relative mb-4">
            <label htmlFor="name" className="text-sm text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full bg-white rounded border border-gray-300  focus:outline-none focus:ring-indigo-200 text-base text-gray-700 py-2 px-3 mt-1"
            />
          </div>

          <div className="relative mb-4">
            <label htmlFor="email" className="text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300  focus:outline-none focus:ring-indigo-200 text-base text-gray-700 py-2 px-3 mt-1"
            />
          </div>

          <div className="relative mb-4">
            <label htmlFor="message" className="text-sm text-gray-600">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="w-full bg-white rounded border border-gray-300  focus:outline-none focus:ring-indigo-200 h-32 text-base text-gray-700 py-2 px-3 mt-1 resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full text-white bg-orange-500 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded-lg text-lg"
          >
            Send
          </button>
        </form>
      </div>

      <ToastContainer theme="dark" position="bottom-right" />
    </section>
  );
};

export default Contact;
