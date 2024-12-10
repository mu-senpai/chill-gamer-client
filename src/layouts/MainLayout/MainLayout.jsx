import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { AuthContext } from "../../providers/AuthProvider";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Testimonials from "../../components/Testimonials/Testimonials";
import Features from "../../components/Features/Features";
import HighestRatedGames from "../../components/HighestRatedGames/HighestRatedGames";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import Aos from "aos";
import "aos/dist/aos.css"

Aos.init({
    duration: 400,
    once: true,
    easing: 'ease-in-out',
});

const MainLayout = () => {
    const { loading } = useContext(AuthContext);

    const backgroundImages = [
        "background1.jpg",
        "background2.jpg",
        "background3.jpg",
    ];

    const [currentBgIndex, setCurrentBgIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [backgroundImages.length]);

    const handleSelect = (index) => {
        setCurrentBgIndex(index);
    };

    if (loading) {
        return <LoadingPage></LoadingPage>;
    }

    return (
        <div>
            <Navbar />
            {/* Dynamic Background Section */}
            <div
                id="home"
                className="h-screen 2xl:max-h-[56rem] xl:bg-fixed min-[1920.1px]:bg-local bg-cover bg-center transition-all duration-1000 relative"
                style={{
                    backgroundImage: `url('${backgroundImages[currentBgIndex]}')`,
                }}
            >
                {/* Overlay for content */}
                <div className="absolute w-full flex flex-col justify-center items-center h-full text-white text-center z-10">
                    <Fade cascade>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 '[text-shadow:_0_2px_4px_rgb(55_65_81_/_0.6)]">
                            Level Up Your Gaming Experience!
                        </h1>
                        <p className="w-[95%] sm:w-auto text-lg mb-6">
                            Explore and share game reviews effortlessly
                        </p>
                        <Link
                            to={`/s/review`}
                            className="btn border-none bg-gradient-to-r from-[#ff42a4af] to-[#FF42A5] hover:bg-[#9B5DE5] text-white"
                        >
                            Get Started
                        </Link>
                    </Fade>
                </div>

                <div className="absolute w-full h-screen 2xl:max-h-[56rem] transition-all duration-1000 bg-black/30 top-0 left-0"></div>

                {/* Indicators (dots) */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center space-x-2">
                    {backgroundImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleSelect(index)}
                            className={`w-3 h-3 rounded-full ${currentBgIndex === index
                                ? "bg-white"
                                : "bg-gray-500"
                                } hover:bg-gray-300`}
                        ></button>
                    ))}
                </div>
            </div>

            {/* Home Page Contents */}
            <div className="w-full min-h-screen bg-[url(https://i.ibb.co.com/3rV0vwx/output-onlinepngtools-edit2.png)] bg-contain">
                <Features></Features>
                <HighestRatedGames></HighestRatedGames>
                <Fade triggerOnce="true">
                    <Testimonials></Testimonials>
                </Fade>
            </div>

            <Footer></Footer>

            {/* Component that is used for setting window at the top every time the page loads */}
            <ScrollToTop></ScrollToTop>
        </div>
    );
};

export default MainLayout;
