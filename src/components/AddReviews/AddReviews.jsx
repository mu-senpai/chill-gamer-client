import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { AuthContext } from '../../providers/AuthProvider';
import LoadingPage from '../LoadingPage/LoadingPage';
import Aos from "aos";
import "aos/dist/aos.css";

Aos.init({
    duration: 400,
    once: true,
    easing: 'ease-in-out',
});

const AddReviews = () => {

    const { user, loading, dataLoading, setDataLoading } = useContext(AuthContext);
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        setDataLoading(true);
        if (user) {
            fetch(`https://chill-gamer-server-updated.vercel.app/users/${user.uid}`)
                .then(res => res.json())
                .then(data => {
                    setCurrentUser(data);
                    setDataLoading(false);
                })
        }
    }, [user])

    const handleAddReview = event => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const gameTitle = form.gameTitle.value;
        const genre = form.genre.value;
        const rating = Number.parseFloat(form.rating.value);
        const publishYear = Number.parseInt(form.publishYear.value);
        const review = form.review.value;
        const cover = form.cover.value;

        const newReview = { name, email, gameTitle, genre, rating, publishYear, review, cover };

        fetch('https://chill-gamer-server-updated.vercel.app/reviews', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(newReview),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'New review has added successfully!',
                        icon: 'success',
                        confirmButtonText: 'Close'
                    })
                    form.reset();
                }
            })
    }

    if (loading || dataLoading) {
        return <LoadingPage></LoadingPage>;
    }

    return (
        <div className="w-full pt-28 sm:pt-32 lg:pt-40 xl:pt-48 pb-12 sm:pb-16 lg:pb-24 xl:pb-36">
            <div className="w-[95%] sm:w-[90%] lg:w-[85%] xl:w-[80%] 2xl:w-[70%] mx-auto">

                <div data-aos="fade-down" className="card bg-violet-500/5 backdrop-blur-md py-5 w-full shrink-0 rounded-2xl">
                    <form onSubmit={handleAddReview} className="card-body space-y-5 sm:space-y-6 lg:space-y-7">

                        <h2 className="text-3xl lg:text-4xl xl:text-5xl text-center font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#F948B2] to-[#8758F1]">Add Your Review</h2>

                        <p className="w-[90%] lg:w-[80%] mx-auto text-center text-sm sm:text-base lg:text-lg text-[#8E82C9]">Share your thoughts, rate games, and inspire fellow gamers easily!</p>

                        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6">

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">User Name</span>
                                </label>
                                <input type="text" name="name" placeholder="Enter your name" className="input input-bordered input-md" defaultValue={currentUser.name} readOnly />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">User Email</span>
                                </label>
                                <input type="email" name="email" placeholder="Enter your email" className="input input-bordered input-md" defaultValue={currentUser.email} readOnly />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Game Title</span>
                                </label>
                                <input type="text" name="gameTitle" placeholder="Enter game title" className="input input-bordered input-md" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Genre</span>
                                </label>
                                <select name="genre" className="select select-bordered select-md" required>
                                    <option value="" disabled selected>Select a genre</option>
                                    <option value="Action">Action</option>
                                    <option value="RPG">RPG</option>
                                    <option value="Adventure">Adventure</option>
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Rating</span>
                                </label>
                                <input type="text" name="rating" placeholder="Enter your rating (out of 5)" className="input input-bordered input-md" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Publishing Year</span>
                                </label>
                                <input type="text" name="publishYear" placeholder="Enter publishing year" className="input input-bordered input-md" required />
                            </div>

                            <div className="form-control lg:col-span-2">
                                <label className="label">
                                    <span className="label-text font-semibold">Game Cover Image</span>
                                </label>
                                <input type="text" name="cover" placeholder="Enter photo URL" className="input input-bordered input-md" required />
                            </div>

                            <div className="form-control lg:col-span-2">
                                <label className="label">
                                    <span className="label-text font-semibold">Review Description</span>
                                </label>
                                <textarea name="review" className="textarea textarea-bordered textarea-sm sm:textarea-md h-40 resize-none" placeholder="Enter your review (maximum 80 words)" required></textarea>
                            </div>

                            <div className="form-control mt-6 lg:col-span-2">
                                <button className="btn border-none bg-gradient-to-r from-[#ff42a4af] to-[#FF42A5] hover:bg-[#9B5DE5] text-white">Add Review</button>
                            </div>
                            
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default AddReviews;