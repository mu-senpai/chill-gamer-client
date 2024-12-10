import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import LoadingPage from "../components/LoadingPage/LoadingPage";
import { AuthContext } from "../providers/AuthProvider";

const PrivateRoute = (props = {}) => {

    const {children} = props || {};

    const {user, loading} = useContext(AuthContext);

    const location = useLocation();

    if (loading) {
        return <LoadingPage></LoadingPage>;
    }

    if (user && user.email) {
        return children;
    }

    return (
        <Navigate state={location.pathname} to={`/s/login`}></Navigate>
    );
};

export default PrivateRoute;

