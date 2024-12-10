import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

const SecondaryLayout = () => {

    return (
        <div>
            <Navbar />

            <section className="w-full min-h-[40rem] sm:min-h-screen lg:min-h-[65rem] 2xl:min-h-[76rem] bg-[url(https://i.ibb.co.com/3rV0vwx/output-onlinepngtools-edit2.png)] bg-contain">
                <Outlet />
            </section>
            
            <Footer />

            {/* Component that is used for setting window at the top every time the page loads */}
            <ScrollToTop />
        </div>
    );
};

export default SecondaryLayout;
