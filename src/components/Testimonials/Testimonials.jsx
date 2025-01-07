import { useState, useEffect } from "react";

const Testimonials = () => {

  const reviews = [
    {
      text: "Chill Gamer has transformed the way I explore games. It's intuitive and filled with amazing reviews.",
      author: "Avid Gamer",
    },
    {
      text: "I love how easy it is to find reviews and add my own. Chill Gamer is a must-have for any gamer!",
      author: "Gaming Enthusiast",
    },
    {
      text: "The community here is amazing. I’ve discovered so many great games thanks to Chill Gamer.",
      author: "Game Explorer",
    },
    {
      text: "The reviews are so detailed and helpful. I always check Chill Gamer before buying a game.",
      author: "Serious Gamer",
    },
    {
      text: "Chill Gamer is my go-to platform for honest and insightful game reviews.",
      author: "Pro Gamer",
    },
  ];

  const [currentReview, setCurrentReview] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Cycle through reviews every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Handle Next Review with Smooth Transition
  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentReview((prevIndex) => (prevIndex + 1) % reviews.length);
      setIsTransitioning(false);
    }, 600);
  };

  return (
    <section id="testimonials" className="py-16 px-6">

      <h2 className="text-3xl lg:text-5xl font-bold mb-6 sm:mb-8 lg:mb-12 text-center">
        What <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#F948B2] to-[#8758F1]">Our Users</span> Say
      </h2>

      <div className="max-w-4xl h-[10rem] sm:h-[6rem] mx-auto relative">

        <blockquote
          className={`text-lg lg:text-xl italic text-[#8E82C9] text-center transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"
            }`}
        >
          "{reviews[currentReview].text}"
        </blockquote>

        <p
          className={`text-right lg:text-lg text-[#8E82C9] mt-4 transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"
            }`}
        >
          - {reviews[currentReview].author}
        </p>

      </div>

    </section>
  );
};

export default Testimonials;
