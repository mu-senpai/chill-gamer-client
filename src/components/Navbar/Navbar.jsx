import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { Tooltip } from "react-tooltip";
import logo from "../../assets/heading-logo.png";
import Swal from "sweetalert2";

const Navbar = () => {

    const { user, logOutUser } = useContext(AuthContext);

    const location = useLocation();
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState({});
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    console.log(currentUser);

    useEffect(() => {
        if (user) {
            fetch(`https://chill-gamer-server-alpha.vercel.app/users/${user.uid}`)
                .then(res => res.json())
                .then(data => setCurrentUser(data))
        }
    }, [user])

    const handleLogout = () => {
        logOutUser()
            .then(() => {
                setTimeout(() => {
                    navigate('/');
                }, 5);
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

    // Initialize dark mode state from localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            document.documentElement.setAttribute("data-theme", "dark");
            setIsDarkMode(true);
        } else {
            document.documentElement.setAttribute("data-theme", "light");
            setIsDarkMode(false);
        }
    }, []);

    const toggleDarkMode = () => {
        const newTheme = isDarkMode ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        setIsDarkMode(!isDarkMode);
    };

    useEffect(() => {
        if (location.pathname === "/") {
            const handleScroll = () => {
                setIsScrolled(window.scrollY > 170);
            };

            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        } else {
            setIsScrolled(true);
        }
    }, [location.pathname]);

    const NavigationList = (
        <>
            {!user ? (
                <>
                    <li>
                        <Link
                            to={`/s/login`}
                            onClick={() => setIsMenuOpen(false)}
                            className="font-bold text-[#FF42A5] hover:text-[#9B5DE5] lg:btn lg:btn-sm lg:border-none lg:bg-gradient-to-r lg:from-[#ff42a4af] lg:to-[#FF42A5] lg:hover:bg-[#9B5DE5] lg:text-white lg:hover:text-white"
                        >
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={`/s/register`}
                            onClick={() => setIsMenuOpen(false)}
                            className="font-bold text-[#FF42A5] hover:text-[#9B5DE5] lg:btn lg:btn-sm lg:border-none lg:bg-gradient-to-r lg:from-[#ff42a4af] lg:to-[#FF42A5] lg:hover:bg-[#9B5DE5] lg:text-white lg:hover:text-white"
                        >
                            Register
                        </Link>
                    </li>
                </>
            ) : (
                <>
                    <li>
                        <NavLink to={`/s/review`} onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `${isActive && 'text-[#FF42A5]'} hover:text-[#FF42A5]`}>
                            All Reviews
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={`/s/addreviews`} onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `${isActive && 'text-[#FF42A5]'} hover:text-[#FF42A5]`}>
                            Add Review
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={`/s/myreview`} onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `${isActive && 'text-[#FF42A5]'} hover:text-[#FF42A5]`}>
                            My Reviews
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={`/s/watchlist`} onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `${isActive && 'text-[#FF42A5]'} hover:text-[#FF42A5]`}>
                            Game WatchList
                        </NavLink>
                    </li>
                    <li>
                        <button
                            onClick={() => {
                                handleLogout();
                                setIsMenuOpen(false);
                            }}
                            className="font-bold text-[#FF42A5] hover:text-[#9B5DE5] lg:btn lg:btn-sm lg:border-none lg:bg-gradient-to-r lg:from-[#ff42a4af] lg:to-[#FF42A5] lg:hover:bg-[#9B5DE5] lg:text-white lg:hover:text-white"
                        >
                            Log Out
                        </button>
                    </li>
                </>
            )}
        </>
    );

    return (
        <nav
            className={`min-[1920px]:max-w-[120rem] mx-auto fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "text-black bg-white/30 backdrop-blur-md" : "text-white"
                }`}
        >
            <div className="w-[97%] mx-auto flex justify-between items-center px-4 py-2 sm:py-3">
                {/* Logo */}
                <Link
                    to="/"
                    className={`text-2xl md:text-3xl inline-flex items-center gap-2 font-bold ${!isScrolled && "[text-shadow:_0_2px_4px_rgb(55_65_81_/_0.6)]"
                        }`}
                >
                    <img src={logo} className="w-12 md:w-16" alt="" />
                    <span className="text-[#FF42A5]">Chill</span>{" "}
                    <span className={`${isScrolled ? "text-black" : "text-white"}`}>Gamer</span>
                </Link>


                {/* Desktop Navigation */}
                <ul className="hidden lg:flex lg:space-x-3 xl:space-x-6 items-center">
                    <li>
                        <label data-tooltip-id="nav-tooltip" data-tooltip-content="Switch current theme" data-tooltip-delay-show={1000} className="swap swap-rotate">
                            {/* this hidden checkbox controls the state */}
                            <input
                                type="checkbox"
                                checked={isDarkMode}
                                onChange={toggleDarkMode}
                            />

                            {/* sun icon */}
                            <svg
                                className="swap-off h-10 w-10 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path
                                    d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                            </svg>

                            {/* moon icon */}
                            <svg
                                className="swap-on h-10 w-10 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path
                                    d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                            </svg>
                        </label>
                    </li>

                    {NavigationList}

                    {(user && currentUser &&
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        data-tooltip-id="nav-tooltip"
                                        data-tooltip-content={currentUser.name}
                                        data-tooltip-delay-show={1000}
                                        alt={currentUser.name}
                                        src={currentUser.photo} />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-[10px] z-[1] mt-3 w-auto p-3 shadow">
                                <p className="text-[#8E82C9] font-semibold">User Name: {currentUser.name}</p>
                                <p className="text-[#8E82C9] font-semibold">Email: {currentUser.email}</p>
                            </ul>
                        </div>
                    )}
                </ul>

                <div className="flex lg:hidden items-center gap-1 sm:gap-3">
                    {/* Avatar */}
                    {(user && currentUser &&
                        <div className="dropdown dropdown-end hidden min-[375px]:block lg:hidden">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-8 rounded-full">
                                    <img
                                        alt={currentUser.name}
                                        src={currentUser.photo} />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-[10px] z-[1] mt-3 w-auto p-3 shadow">
                                <p className="text-[#8E82C9] font-semibold">User Name: {currentUser.name}</p>
                                <p className="text-[#8E82C9] font-semibold">Email: {currentUser.email}</p>
                            </ul>
                        </div>
                    )}

                    <label className="swap swap-rotate btn btn-circle btn-ghost">
                        {/* this hidden checkbox controls the state */}
                        <input
                            type="checkbox"
                            checked={isDarkMode}
                            onChange={toggleDarkMode}
                        />

                        {/* sun icon */}
                        <svg
                            className="swap-off h-8 w-8 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                        </svg>

                        {/* moon icon */}
                        <svg
                            className="swap-on h-8 w-8 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                        </svg>
                    </label>

                    {/* Mobile Menu Button */}
                    <button
                        className="block lg:hidden text-2xl"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        ☰
                    </button>
                </div>
            </div>

            {/* Dropdown for Small Devices */}
            <div
                className={`fixed top-0 left-0 w-full transition-transform duration-300 ${isMenuOpen && window.innerWidth < 768 ? "translate-y-0" : "translate-y-[-100%]"
                    } bg-gray-900/95 text-white p-14 ${user ? 'h-80' : 'h-44'} md:hidden`}
                style={{ zIndex: 1000 }}
            >
                {/* Close Button */}
                <button
                    className="absolute top-4 right-6 text-2xl bg-gray-700 px-4 py-2 rounded-full hover:bg-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                >
                    ✕
                </button>

                {/* Menu Items */}
                <ul className="flex flex-col items-center justify-center space-y-4 text-center text-lg font-semibold tracking-wide">
                    {NavigationList}
                </ul>
            </div>

            {/* Sidebar for Medium Devices */}
            <div
                className={`fixed top-0 right-0 h-screen transition-transform duration-300 ${isMenuOpen && window.innerWidth >= 768 ? "translate-x-0" : "translate-x-full"
                    } bg-gray-900/85 backdrop-blur-md text-white w-72 hidden md:block lg:hidden`}
            >
                {/* Close Button */}
                <button
                    className="absolute top-4 right-6 text-2xl bg-gray-700 px-4 py-2 rounded-full hover:bg-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                >
                    ✕
                </button>

                {/* Menu Items */}
                <ul className="flex flex-col items-center justify-center h-full space-y-6 text-center text-lg font-semibold tracking-wide">
                    {NavigationList}
                </ul>
            </div>

            <Tooltip style={{ backgroundColor: "rgb(255,66,165)", color: "#FFFFFF" }} id="nav-tooltip" />
        </nav>
    );
};

export default Navbar;