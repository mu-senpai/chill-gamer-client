import { Fade } from "react-awesome-reveal";
import { FaGamepad } from "react-icons/fa";
import { MdPlaylistAddCircle, MdReviews } from "react-icons/md";
import Aos from "aos";
import "aos/dist/aos.css";

Aos.init({
    duration: 400,
    once: true,
    easing: 'ease-in-out',
});

const Features = () => (
    <section id="features" className="py-16 sm:py-20 lg:py-28">

        <Fade triggerOnce="true">
            <div className="w-full space-y-3 lg:space-y-5 mb-8 sm:mb-10 lg:mb-12">
                <h2 className="text-3xl lg:text-5xl font-bold  text-center">
                    Our <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#F948B2] to-[#8758F1]">Features</span>
                </h2>
                <p className="w-[95%] sm:w-[90%] lg:w-[80%] mx-auto text-center text-sm sm:text-base lg:text-lg text-[#8E82C9]">Everything you need to make gaming more enjoyable!</p>
            </div>
        </Fade>

        <div data-aos="fade-down" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-[90%] lg:w-[85%] mx-auto">

            <div className="p-6 col-span-1 sm:col-span-2 lg:col-span-1 flex flex-col items-center border rounded-2xl bg-violet-500/5 backdrop-blur-md">
                <MdReviews size={70} color="#FF42A5" />
                <h3 className="text-2xl font-bold my-3 text-center">User Reviews</h3>
                <p className="text-[#8E82C9] text-center">Read and write reviews for your favorite games.</p>
            </div>

            <div className="p-6 flex flex-col items-center border rounded-2xl bg-violet-500/5 backdrop-blur-md">
                <FaGamepad size={70} color="#FF42A5" />
                <h3 className="text-2xl font-bold my-3 text-center">Highest Rated Games</h3>
                <p className="text-[#8E82C9] text-center">Discover the top-rated games based on user feedback.</p>
            </div>

            <div className="p-6 flex flex-col items-center border rounded-2xl bg-violet-500/5 backdrop-blur-md">
                <MdPlaylistAddCircle size={70} color="#FF42A5" />
                <h3 className="text-2xl font-bold my-3 text-center">Game Watchlist</h3>
                <p className="text-[#8E82C9] text-center">Save games to your personal watchlist for later.</p>
            </div>
            
        </div>
        
    </section>
);

export default Features;
