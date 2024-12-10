import { useContext, useEffect, useState } from "react";
import ReviewCard from "../ReviewCard/ReviewCard";
import LoadingPage from "../LoadingPage/LoadingPage";
import { AuthContext } from "../../providers/AuthProvider";
import Aos from "aos";
import "aos/dist/aos.css";
import { Fade } from "react-awesome-reveal";

Aos.init({
    duration: 400,
    once: true,
    easing: 'ease-in-out',
});

const AllReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [allGenres, setAllGenres] = useState([]); 
    const { dataLoading, setDataLoading } = useContext(AuthContext);
    const [sortBy, setSortBy] = useState('rating-desc');
    const [selectedGenre, setSelectedGenre] = useState(''); 

    useEffect(() => {
        fetchReviews();
    }, [sortBy, selectedGenre]);

    const fetchReviews = async () => {
        setDataLoading(true);
        const url = new URL('https://chill-gamer-server-updated.vercel.app/reviews');
        
        if (sortBy) url.searchParams.append('sortBy', sortBy);
        if (selectedGenre) url.searchParams.append('genre', selectedGenre);

        const response = await fetch(url);
        const data = await response.json();
        setReviews(data);
        setDataLoading(false);

        if (allGenres.length === 0) {
            const uniqueGenres = [...new Set(data.map(review => review.genre))];
            setAllGenres(uniqueGenres);
        }
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const handleFilterChange = (e) => {
        setSelectedGenre(e.target.value);
    };

    if (dataLoading) {
        return <LoadingPage />;
    }

    return (
        <div className="w-full min-h-screen lg:min-h-[75rem] py-24 sm:py-32 lg:py-36 space-y-8 sm:space-y-10 lg:space-y-12">
            <Fade triggerOnce="true">
                <div className="w-full space-y-3 sm:space-y-4 lg:space-y-5 text-center">

                    <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#F948B2] to-[#8758F1]">All Reviews</h2>

                    <p className="w-[90%] lg:w-[80%] mx-auto text-sm sm:text-base lg:text-lg text-[#8E82C9]">Access detailed reviews for games across all genres here!</p>

                    {/* Dropdown for sorting */}
                    <div className="w-[90%] mx-auto flex justify-center space-x-6 mb-4">
                        <select value={sortBy} onChange={handleSortChange} className="select select-bordered w-full max-w-xs">
                            <option value="rating-asc">Sort by Rating (Asc)</option>
                            <option value="rating-desc">Sort by Rating (Desc)</option>
                            <option value="year-asc">Sort by Year (Asc)</option>
                            <option value="year-desc">Sort by Year (Desc)</option>
                        </select>

                        {/* Dropdown for genre filter */}
                        <select value={selectedGenre} onChange={handleFilterChange} className="select select-bordered w-full max-w-xs">
                            <option value="">Filter by Genre</option>
                            {allGenres.map((genre, index) => (
                                <option key={index} value={genre}>{genre}</option>
                            ))}
                        </select>
                    </div>
                    
                </div>
            </Fade>

            <div data-aos="fade-down" className="w-[90%] lg:w-[85%] mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {reviews.map((review) => (
                    <ReviewCard key={review._id} review={review} />
                ))}
            </div>
        </div>
    );
};

export default AllReviews;