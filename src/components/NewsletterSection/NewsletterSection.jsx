import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Animation duration in milliseconds
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      Swal.fire({
        title: "Success!",
        text: "Thank you for subscribing to our newsletter!",
        icon: "success",
        confirmButtonText: "Close",
      });
      setEmail("");
    } else {
      Swal.fire({
        title: "Error!",
        text: "Please enter a valid email address.",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  return (
    <section
      className="w-[90%] lg:w-[85%] mx-auto sm:mt-4 lg:mt-12 mb-16 sm:mb-20 lg:mb-28 bg-gradient-to-r from-[#FF42A5] to-[#bc377f] text-white p-8 rounded-lg text-center"
      data-aos="fade-up" // AOS animation
    >
      <div className="container mx-auto max-w-xl" data-aos="zoom-in">
        <div className="flex flex-col items-center">
          <div className="mb-4" data-aos="fade-down">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-12 h-12 mx-auto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 0a2 2 0 012-2h14a2 2 0 012 2m-18 0v8a2 2 0 002 2h14a2 2 0 002-2V8"
              />
            </svg>
          </div>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2"
            data-aos="fade-right"
          >
            Subscribe to newsletter
          </h2>
          <p
            className="text-sm sm:text-base lg:text-lg mb-6"
            data-aos="fade-left"
          >
            Stay up to date! Get all the latest reviews delivered straight to your
            inbox.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-4 w-full"
            data-aos="flip-up"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="input input-sm sm:input-md input-bordered text-black w-full md:w-[80%]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="btn btn-sm sm:btn-md border-none bg-gradient-to-r from-[#ff42a4af] to-[#FF42A5] hover:bg-[#9B5DE5] text-white w-full md:w-auto"
              type="submit"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
