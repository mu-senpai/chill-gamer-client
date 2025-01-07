import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { MdPlaylistAddCircle } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import { AuthContext } from "../../providers/AuthProvider";
import LoadingPage from "../LoadingPage/LoadingPage";
import ReactStars from "react-rating-stars-component";
import Swal from "sweetalert2";
import Aos from "aos";
import "aos/dist/aos.css";

Aos.init({
    duration: 400,
    once: true,
    easing: 'ease-in-out',
});

const ReviewDetails = () => {

    const reviewData = useLoaderData();
    const { name, gameTitle, genre, rating, publishYear, review, cover } = reviewData || {};

    const {user, dataLoading, setDataLoading} = useContext(AuthContext);
    const [isWatchlisted, setIsWatchlisted] = useState(false);

    useEffect(() => {
        fetch('https://chill-gamer-server-alpha.vercel.app/watchlist')
        .then(res => res.json())
        .then(data => {
            const listedItem = data.find(item => ((item.email === user.email) && (item.gameTitle === gameTitle)));
            if (listedItem) {
                setIsWatchlisted(true);
                setDataLoading(false);
            }
        })
    }, [user, gameTitle])

    const handleAddWatchList = () => {
        
        const email = user.email;
        const newItem = { email, gameTitle, genre, publishYear };

        fetch('https://chill-gamer-server-alpha.vercel.app/watchlist', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(newItem),
        })
        .then(res => res.json())
        .then(data => {
            if (data.insertedId) {
                setIsWatchlisted(true);
                Swal.fire({
                    title: 'Success!',
                    text: 'New items has added to your watchlist successfully!',
                    icon: 'success',
                    confirmButtonText: 'Close'
                })
            }
        })
    }

    if (dataLoading) {
        return <LoadingPage></LoadingPage>;
    }

    return (
        <div className="pt-28 sm:pt-32 lg:pt-72 pb-12 sm:pb-16 lg:pb-56">
            <div data-aos="fade-down" className="w-[95%] sm:w-[90%] lg:w-[85%] xl:w-[80%] mx-auto lg:h-[30rem] xl:h-[35rem] 2xl:h-[40rem] rounded-2xl p-4 sm:p-6 lg:p-8 bg-violet-500/5 backdrop-blur-md flex flex-col lg:flex-row items-center lg:justify-between gap-8 lg:gap-0">

                <div className="w-full lg:w-[40%] h-[30rem] sm:h-[40rem] lg:h-full">
                    <img data-tooltip-id="review-tooltip" data-tooltip-content={gameTitle} data-tooltip-delay-show={1000} src={cover} className="w-full h-full object-cover rounded-xl" alt="" />
                </div>

                <div className="w-full lg:w-[57.5%] lg:h-full 2xl:h-[90%] flex flex-col items-start lg:justify-center gap-4">

                    <h2 className="text-2xl sm:text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#F948B2] to-[#8758F1]">{gameTitle}</h2>

                    <p className="text-sm/normal sm:text-base/normal lg:text-sm/normal xl:text-base/normal 2xl:text-lg/normal text-[#8E82C9] mb-2">
                      <span data-tooltip-id="review-tooltip" data-tooltip-content={`Author Name: ${name}`} data-tooltip-delay-show={1000}><span className="font-bold">Author:</span> {name.split(" ")[0]}</span> | <span className="font-bold">Genre:</span>  {genre} | <span className="font-bold">Year:</span> {publishYear}
                    </p>

                    <p className="text-sm/normal sm:text-base/normal lg:text-xs/normal xl:text-base/normal 2xl:text-lg/normal mb-4 text-[#8E82C9] lg:flex-grow">
                        {review}
                    </p>

                    <div>
                        <h4 data-tooltip-id="review-tooltip" data-tooltip-content={`Rated ${rating} out of 5`} data-tooltip-delay-show={1000} className="text-base/normal sm:text-lg/normal lg:text-base/normal xl:text-lg/normal 2xl:text-xl/normal font-bold">Rating: <span className={`${rating > 3.5 ? 'text-[#4CAF50]' : 'text-[#FF6B6B]'}`}>{rating} ({(rating > 3.5) ? 'Cool!' : 'Meh!'})</span></h4>
                        <ReactStars
                            count={5}
                            value={rating}
                            size={35}
                            isHalf={true}
                            edit={false}
                            activeColor="#ffd700"
                        />
                    </div>

                    <button onClick={handleAddWatchList} className={`${isWatchlisted && 'btn-disabled'} btn border-none bg-gradient-to-r from-[#ff42a4af] to-[#FF42A5] hover:bg-[#9B5DE5] text-white`}>
                        <MdPlaylistAddCircle size={25} />
                        Add To Watchlist
                    </button>

                </div>

            </div>
            
            <Tooltip style={{ backgroundColor: "rgb(255,66,165)", color: "#FFFFFF" }} id="review-tooltip" />
        </div>
    );
};

export default ReviewDetails;