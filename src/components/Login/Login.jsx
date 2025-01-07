import { useContext, useState } from "react";
import { FaRegEye, FaRegEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import Aos from "aos";
import "aos/dist/aos.css";

Aos.init({
    duration: 400,
    once: true,
    easing: 'ease-in-out',
});

const Login = () => {

    const [email, setEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { logInUser, setUser, loginWithGoogle } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleShowPassword = (event) => {
        event.preventDefault();
        setShowPassword(!showPassword);
    }

    const handleLogIn = event => {
        event.preventDefault();

        const form = new FormData(event.target);
        const email = form.get('email');
        const password = form.get('password');

        logInUser(email, password)
            .then(result => {
                setUser(result.user);
                Swal.fire({
                    title: 'Success!',
                    text: 'You have successfully logged in!',
                    icon: 'success',
                    confirmButtonText: 'Close'
                }).then(() => {
                    navigate(location?.state ? location.state : '/');
                });
            })
            .catch(error => {
                Swal.fire({
                    title: 'Error!',
                    text: `${error.code}`,
                    icon: 'error',
                    confirmButtonText: 'Close'
                })
            })
    }

    const handleLoginWithGoogle = () => {
        loginWithGoogle()
            .then((result) => {
                setUser(result.user);

                const name = result.user?.displayName;
                const photo = result.user?.photoURL;
                const email = result.user?.email;
                const createdAt = result.user?.metadata?.creationTime;
                const uid = result.user?.uid;
                const newUser = { name, email, photo, createdAt, uid };

                fetch('https://chill-gamer-server-alpha.vercel.app/users', {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(newUser),
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.matchedCount > 0 || data.modifiedCount > 0 || data.upsertedCount > 0) {
                            Swal.fire({
                                title: 'Success!',
                                text: 'You have successfully logged in!',
                                icon: 'success',
                                confirmButtonText: 'Close'
                            }).then(() => {
                                navigate(location?.state ? location.state : '/');
                            });
                        }
                    })
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Error!',
                    text: `${error.code}`,
                    icon: 'error',
                    confirmButtonText: 'Close'
                })
            });
    }

    const handleInputChange = (event) => {
        setEmail(event.target.value);
    };

    return (
        <div className="w-full mx-auto pt-28 sm:pt-32 lg:pt-52 xl:pt-64 pb-12 sm:pb-16 lg:pb-36 xl:pb-52">
            <div className="w-[90%] sm:w-[75%] lg:w-[50%] mx-auto">

                <div data-aos="fade-down" className="card bg-violet-500/5 backdrop-blur-md w-full py-6 sm:py-10 xl:py-20 px-0 sm:px-10 xl:px-20 rounded-2xl shrink-0">
                    <div className="card-body">
                        <form onSubmit={handleLogIn}>

                            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#F948B2] to-[#8758F1] text-center">Login</h2>

                            <hr className="w-full my-6 sm:my-8 xl:my-12" />

                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text font-semibold">Email address</span>
                                </label>
                                <input name="email" type="email" placeholder="Enter your email address" className="input input-bordered input-md rounded-[5px]" required value={email} onChange={handleInputChange} />
                            </div>

                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text font-semibold">Password</span>
                                </label>
                                <input name="password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" className="input input-bordered input-md rounded-[5px]" required />
                                <button onClick={handleShowPassword} className="btn btn-sm btn-ghost btn-circle absolute right-3 top-11">
                                    {showPassword ? <FaRegEyeSlash></FaRegEyeSlash> : <FaRegEye></FaRegEye>}
                                </button>
                            </div>

                            <label className="label">
                                <Link to={'/s/resetpassword'} state={{ email }} className="label-text-alt link link-hover text-[#8E82C9]">Forgot password?</Link>
                            </label>

                            <div className="form-control mt-6 mb-4">
                                <button className="btn border-none bg-gradient-to-r from-[#ff42a4af] to-[#FF42A5] hover:bg-[#9B5DE5] text-white">Login</button>
                            </div>

                        </form>
                        
                        <div className="w-full flex flex-col gap-4 items-center">
                            <button onClick={handleLoginWithGoogle} className="btn w-full btn-ghost border-2 border-[#ff42a4af] hover:border-4 hover:border-[#FF42A5] bg-clip-text text-transparent bg-gradient-to-b from-[#ff42a4af] to-[#FF42A5] flex items-center gap-2">
                                <FaGoogle color="#FF42A5"></FaGoogle>
                                Login with Google</button>
                            <p className="font-semibold text-center text-[#8E82C9]">Don't have an account? <Link className="bg-clip-text text-transparent bg-gradient-to-b from-[#F948B2] to-[#8758F1] inline-block font-bold" to={`/s/register`}>Register</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;