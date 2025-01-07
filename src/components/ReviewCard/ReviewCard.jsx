import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";

const ReviewCard = (props = {}) => {
    const { reviewData } = props || {};
    const { _id, gameTitle, genre, rating, cover } = reviewData;

    return (
        <div className="card box-border p-3 sm:p-4 2xl:p-5 flex flex-col gap-1 sm:gap-2 xl:gap-1 2xl:gap-2 justify-between bg-violet-500/5 backdrop-blur-md w-full rounded-2xl border">

            <figure>
                <img
                    data-tooltip-id="photo-tooltip"
                    data-tooltip-content={gameTitle}
                    src={cover}
                    data-tooltip-delay-show={1000}
                    className="w-full h-[10rem] sm:h-[20rem] md:h-[14rem] lg:h-[18rem] xl:h-[16rem] 2xl:h-[20rem] rounded-xl object-cover"
                    alt=""
                />
            </figure>

            <h2
                data-tooltip-id="photo-tooltip"
                data-tooltip-content={gameTitle}
                src={cover}
                data-tooltip-delay-show={1000}
                className="text-sm sm:text-2xl md:text-xl xl:text-xl 2xl:text-2xl text-nowrap overflow-clip overflow-ellipsis sm:pt-2 md:pt-1 lg:pt-2 xl:pt-1 2xl:pt-3 font-bold flex-grow">
                {gameTitle}
            </h2>

            {/* <p className="flex items-center gap-2 text-base sm:text-lg 2xl:text-xl text-[#8E82C9]">
                <FaPen />
                <span className="font-semibold">Author:</span> {name.split(" ")[0]}
            </p> */}

            {/* <p className="flex items-center gap-2 text-base sm:text-lg 2xl:text-xl text-[#8E82C9]">
                <MdOutlineCategory />
                <span className="font-semibold">Genre:</span> {genre}
            </p> */}


            {/* <p className="flex items-center gap-2 text-base sm:text-lg 2xl:text-xl text-[#8E82C9]">
                <BsCalendar2Date />
                <span className="font-semibold">Year:</span> {publishYear}
                </p> */}
            <div className="w-full flex items-center justify-between">
                <p className="flex items-center gap-1 sm:gap-2 text-sm sm:text-2xl md:text-xl lg:text-2xl xl:text-xl 2xl:text-2xl text-[#ffd700] font-bold">
                    <FaStar className="w-3 sm:w-6 md:w-5 lg:w-6 xl:w-5 2xl:w-6 h-3 sm:h-6 md:h-5 lg:h-6 xl:h-5 2xl:h-6" color="#ffd700" />
                    {rating}
                </p>
                <div className="badge badge-sm sm:badge-md md:badge-sm lg:badge-md xl:badge-sm 2xl:badge-md bg-[#ff42a4af] text-white">{genre}</div>
            </div>

            <Link
                to={`/s/review/${_id}`}
                className="btn btn-xs sm:btn-sm w-full border-none bg-gradient-to-r from-[#ff42a4af] to-[#FF42A5] hover:bg-[#9B5DE5] text-white"
            >
                Explore Details
            </Link>

            <Tooltip
                style={{ backgroundColor: "rgb(255,66,165)", color: "#FFFFFF" }}
                id="photo-tooltip"
            />
        </div>
    );
};

export default ReviewCard;
