import { MdOutlineCategory } from "react-icons/md";
import { FaPen, FaRegStar } from "react-icons/fa";
import { BsCalendar2Date } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";

const ReviewCard = (props = {}) => {
    const { review } = props || {};
    const { _id, name, gameTitle, genre, rating, publishYear, cover } = review;

    return (
        <div className="card box-border p-5 lg:p-6 flex flex-col gap-3 justify-between bg-violet-500/5 backdrop-blur-md w-full rounded-2xl border">

            <figure>
                <img
                    data-tooltip-id="photo-tooltip"
                    data-tooltip-content={gameTitle}
                    src={cover}
                    data-tooltip-delay-show={1000}
                    className="w-full h-[24rem] sm:h-[20rem] md:h-[24rem] xl:h-[22rem] 2xl:h-[28rem] rounded-xl object-cover"
                    alt=""
                />
            </figure>

            <h2 className="text-2xl sm:text-3xl 2xl:text-4xl py-3 font-bold flex-grow">
                {gameTitle}
            </h2>

            <p className="flex items-center gap-2 text-base sm:text-lg 2xl:text-xl text-[#8E82C9]">
                <FaPen />
                <span className="font-semibold">Author:</span> {name.split(" ")[0]}
            </p>

            <p className="flex items-center gap-2 text-base sm:text-lg 2xl:text-xl text-[#8E82C9]">
                <MdOutlineCategory />
                <span className="font-semibold">Genre:</span> {genre}
            </p>

            <p className="flex items-center gap-2 text-base sm:text-lg 2xl:text-xl text-[#8E82C9]">
                <BsCalendar2Date />
                <span className="font-semibold">Year:</span> {publishYear}
            </p>

            <p className="flex items-center gap-2 text-base sm:text-lg 2xl:text-xl text-[#8E82C9]">
                <FaRegStar />
                <span className="font-semibold">Rating:</span> {rating}
            </p>

            <Link
                to={`/s/review/${_id}`}
                className="btn w-full border-none bg-gradient-to-r from-[#ff42a4af] to-[#FF42A5] hover:bg-[#9B5DE5] text-white"
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
