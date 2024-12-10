import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";

const ForgotPassword = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || "";

    const { passwordReset, logOutUser } = useContext(AuthContext);

    const handlePasswordReset = (event) => {
        event.preventDefault();

        const email = event.target.email.value;

        passwordReset(email)
            .then(() => {
                logOutUser();
                Swal.fire({
                    title: 'Success!',
                    text: 'You have successfully reset your password!',
                    icon: 'success',
                    confirmButtonText: 'Close'
                }).then(() => {
                    navigate('/s/login');
                });
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

    return (
        <div className="w-full mx-auto pt-36 sm:pt-32 lg:pt-80 xl:pt-64 2xl:pt-[22rem] pb-12 sm:pb-16 lg:pb-36 xl:pb-52">
            <div className="w-[90%] sm:w-[75%] lg:w-[50%] mx-auto">

                <div data-aos="fade-down" className="card bg-violet-500/5 backdrop-blur-md w-full py-6 sm:py-10 xl:py-20 px-0 sm:px-10 xl:px-20 rounded-2xl shrink-0">
                    <div className="card-body">
                        <form onSubmit={handlePasswordReset}>

                            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#F948B2] to-[#8758F1] text-center">Reset Password</h2>

                            <hr className="w-full my-6 sm:my-8 xl:my-12" />

                            <div className="form-control mb-3">
                                <label className="label">
                                    <span className="label-text font-semibold">Email address</span>
                                </label>
                                <input name="email" type="email" placeholder="Enter your email address" className="input input-bordered input-md rounded-[5px]" required value={email} />
                            </div>

                            <div className="form-control mb-6">
                                <button className="btn border-none bg-gradient-to-r from-[#ff42a4af] to-[#FF42A5] hover:bg-[#9B5DE5] text-white">Reset</button>
                            </div>

                            <p className="font-semibold text-center text-[#8E82C9]">Already know your password? <Link className="bg-clip-text text-transparent bg-gradient-to-b from-[#F948B2] to-[#8758F1] inline-block font-bold" to={`/s/login`}>Login</Link></p>

                        </form>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default ForgotPassword;