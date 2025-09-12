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
        form.current, 
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
  <section id="Reservation" className="min-h-screen bg-gradient-to-br from-white to-gray-100 py-12">
    <div className="container px-6">
      {/* Compact Header */}
      <div className="text-center mb-8">
        <h2 className="text-5xl font-bold text-black mb-3" style={{ fontFamily: 'Dancing Script, cursive' }}>
          Reserve Your Table
        </h2>
        <div className="w-16 h-1 bg-orange-500 mx-auto mb-4"></div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Experience culinary excellence in an unforgettable atmosphere
        </p>
      </div>

      {/* Compact Form Container */}
      <div className="bg-white rounded-2xl shadow-[var(--shadow-elegant)] border border-orange-500/20 overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-orange-400 p-6">
          <h3 className="text-2xl font-bold text-white text-center">Make a Reservation</h3>
          <p className="text-white/90 text-center mt-1">Fill in your details below</p>
        </div>

        <form ref={form} onSubmit={sendEmail} className="p-8">
          {/* Compact Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* First Name */}
            <div className="space-y-2">
              <label htmlFor="fName" className="text-sm font-semibold text-black block">
                First Name *
              </label>
              <input
                name="fName"
                type="text"
                id="fName"
                placeholder="First name"
                required
                className="w-full h-12 px-4 text-base border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-[var(--transition-smooth)] outline-none bg-white"
              />
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <label htmlFor="lName" className="text-sm font-semibold text-black block">
                Last Name *
              </label>
              <input
                name="lName"
                type="text"
                id="lName"
                placeholder="Last name"
                required
                className="w-full h-12 px-4 text-base border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-[var(--transition-smooth)] outline-none bg-white"
              />
            </div>

            {/* Guests */}
            <div className="space-y-2">
              <label htmlFor="guest" className="text-sm font-semibold text-black block">
                Guests *
              </label>
              <select
                name="guest"
                id="guest"
                required
                className="w-full h-12 px-4 text-base border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-[var(--transition-smooth)] outline-none bg-white cursor-pointer"
              >
                <option value="">Select guests</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                ))}
                <option value="9">9+ Guests</option>
              </select>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-semibold text-black block">
                Date *
              </label>
              <input
                type="date"
                name="date"
                id="date"
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full h-12 px-4 text-base border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-[var(--transition-smooth)] outline-none bg-white cursor-pointer"
              />
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Time */}
            <div className="space-y-2">
              <label htmlFor="time" className="text-sm font-semibold text-black block">
                Time *
              </label>
              <select
                name="time"
                id="time"
                required
                className="w-full h-12 px-4 text-base border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-[var(--transition-smooth)] outline-none bg-white cursor-pointer"
              >
                <option value="">Select time</option>
                {['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'].map(time => (
                  <option key={time} value={time}>
                    {new Date(`2000-01-01T${time}`).toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'})}
                  </option>
                ))}
              </select>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-black block">
                Email *
              </label>
              <input
                name="email"
                type="email"
                id="email"
                placeholder="your@email.com"
                required
                className="w-full h-12 px-4 text-base border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-[var(--transition-smooth)] outline-none bg-white"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-semibold text-black block">
                Phone *
              </label>
              <input
                name="phone"
                type="tel"
                id="phone"
                placeholder="(555) 123-4567"
                required
                className="w-full h-12 px-4 text-base border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-[var(--transition-smooth)] outline-none bg-white"
              />
            </div>

            {/* Submit Button */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-transparent block">Submit</label>
              <button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white text-base font-bold rounded-lg shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transform hover:-translate-y-0.5 transition-[var(--transition-smooth)] focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              >
                Reserve Now
              </button>
            </div>
          </div>

          {/* Footer Note */}
          <div className="bg-gray-100 px-6 py-4 rounded-lg border border-gray-300">
            <p className="text-center text-sm text-gray-600">
              <span className="font-semibold text-orange-500">Note:</span> Reservations confirmed within 30 minutes via email or phone
            </p>
          </div>
        </form>
      </div>
    </div>
    <ToastContainer theme="light" position="bottom-right" />
  </section>
);

};

export default Reservation;
