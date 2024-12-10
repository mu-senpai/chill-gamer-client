import { FaHome } from "react-icons/fa";
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="text-center space-y-8 p-8">
        <h2 className="text-9xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-[#F948B2] to-[#8758F1]">{error.status || 404}</h2>
        <p className="text-2xl md:text-3xl font-semibold">{error.statusText || "Page Not Found"}</p>
        <p className="text-lg text-[#8E82C9]">
          {error.message || "Something went wrong!"}
        </p>
        <Link
          to="/"
          className="btn border-none bg-gradient-to-r from-[#ff42a4af] to-[#FF42A5] hover:bg-[#9B5DE5] text-white flex items-center justify-center gap-2"
        >
          <FaHome size={20} />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
