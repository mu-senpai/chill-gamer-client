import { useContext, useEffect, useState } from 'react';
import ReviewCard from '../ReviewCard/ReviewCard';
import { AuthContext } from '../../providers/AuthProvider';
import LoadingPage from '../LoadingPage/LoadingPage';
import { Fade } from 'react-awesome-reveal';
import Aos from "aos";
import "aos/dist/aos.css";

Aos.init({
    duration: 400,
    once: true,
    easing: 'ease-in-out',
});

const HighestRatedGames = () => {

    const [reviews, setReviews] = useState([]);
    const { dataLoading, setDataLoading } = useContext(AuthContext);

    useEffect(() => {
        fetch('https://chill-gamer-server-updated.vercel.app/highestratedgames')
            .then(res => res.json())
            .then(data => {
                setReviews(data);
                setDataLoading(false);
            });
    }, [])

    if (dataLoading) {
        return <LoadingPage></LoadingPage>;
    }

    return (
        <section className="pb-8">

            <Fade triggerOnce="true">
                <div className="w-full space-y-3 lg:space-y-5 mb-8 sm:mb-10 lg:mb-12">
                <h2 className="text-3xl lg:text-5xl font-bold text-center">
                    Highest Rated <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#F948B2] to-[#8758F1]">Games</span>
                </h2>
                    <p className="w-[95%] sm:w-[90%] lg:w-[80%] mx-auto text-center text-sm sm:text-base lg:text-lg text-[#8E82C9]">Explore the top-rated games loved by our users!</p>
                </div>
            </Fade>

            <div data-aos="fade-down" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 w-[90%] lg:w-[85%] mx-auto">
                {
                    reviews.map(review => <ReviewCard key={review._id} review={review}></ReviewCard>)
                }
            </div>
            
        </section>
    );
};

export default HighestRatedGames;