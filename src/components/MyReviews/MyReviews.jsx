import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import LoadingPage from "../LoadingPage/LoadingPage";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";

const MyReviews = () => {

    const { user, dataLoading, setDataLoading } = useContext(AuthContext);
    const [myReviews, setMyReviews] = useState([]);

    useEffect(() => {
        setDataLoading(true);
        fetch(`https://chill-gamer-server-updated.vercel.app/reviews/email/${user.email}`)
            .then(res => res.json())
            .then(data => {
                setMyReviews(data);
                setDataLoading(false);
            })
    }, [])

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
            .then((result) => {
                if (result.isConfirmed) {
                    fetch(`https://chill-gamer-server-updated.vercel.app/reviews/id/${id}`, {
                        method: 'DELETE',
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            if (data.deletedCount > 0) {
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Your review has been deleted.",
                                    icon: "success",
                                    confirmButtonText: 'Close'
                                });
                                const newMyReviews = myReviews.filter(review => review._id != id);
                                setMyReviews(newMyReviews);
                            }
                        })
                }
            });
    }

    if (dataLoading) {
        return <LoadingPage></LoadingPage>;
    }

    return (
            <div className="w-full min-h-screen lg:min-h-[76rem] py-24 sm:py-32 lg:py-36 space-y-8 sm:space-y-10 lg:space-y-12">

                <Fade triggerOnce="true">
                    <div className="w-full space-y-3 sm:space-y-4 lg:space-y-5">
                        <h2 className="text-3xl lg:text-4xl xl:text-5xl text-center font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#F948B2] to-[#8758F1]">My Review</h2>

                        <p className="w-[90%] lg:w-[80%] mx-auto text-center text-sm sm:text-base lg:text-lg text-[#8E82C9]">View all the reviews you've uploaded in one place!</p>
                    </div>
                </Fade>

                <div data-aos="fade-down" className="w-[95%] sm:w-[90%] lg:w-[85%] xl:w-[80%] mx-auto">
                    <div className="overflow-x-auto">
                        <table className="table lg:table-lg">
                            
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Game Title</th>
                                    <th>Genre</th>
                                    <th>Publish Year</th>
                                    <th>Rating</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    myReviews.map((review, idx) => (
                                        <tr className="font-semibold hover:bg-violet-500/10 hover:backdrop-blur-sm" key={review._id}>
                                            <th>{idx + 1}</th>
                                            <td>{review.gameTitle}</td>
                                            <td>{review.genre}</td>
                                            <td>{review.publishYear}</td>
                                            <td>{review.rating}</td>
                                            <td>
                                                <div className="flex items-center gap-2 lg:gap-3">
                                                    <Link to={`/s/updatereview/${review._id}`} className="btn btn-sm lg:btn-md bg-[#4CAF50] hover:bg-green-500">
                                                        <FaEdit color="#FFFFFF" />
                                                    </Link>
                                                    <button onClick={() => handleDelete(review._id)} className="btn btn-sm lg:btn-md bg-[#FF6B6B] hover:bg-red-500">
                                                        <FaTrash color="#FFFFFF" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>

                        </table>
                        
                        {
                            myReviews.length === 0 && <p className="text-lg sm:text-xl lg:text-2xl 2xl:text-3xl font-semibold text-center text-[#8E82C9] py-5 sm:py-8 lg:py-10 xl:py-12">There is no review to show.</p>
                        }
                    </div>
                </div>
            </div>
    );
};

export default MyReviews;