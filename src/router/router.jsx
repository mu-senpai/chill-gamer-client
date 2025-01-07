import {
  createBrowserRouter,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import MainLayout from "../layouts/MainLayout/MainLayout";
import SecondaryLayout from "../layouts/SecondaryLayout/SecondaryLayout";
import UpdateReview from "../components/UpdateReview/UpdateReview";
import ReviewDetails from "../components/ReviewDetails/ReviewDetails";
import MyReviews from "../components/MyReviews/MyReviews";
import GameWatchList from "../components/GameWatchList/GameWatchList";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import AddReviews from "../components/AddReviews/AddReviews";
import AllReviews from "../components/AllReviews/AllReviews";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>
  },
  {
    path: "s",
    element: <SecondaryLayout></SecondaryLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "addreviews",
        element: <PrivateRoute><AddReviews></AddReviews></PrivateRoute>,
      },
      {
        path: "updatereview/:id",
        element: <PrivateRoute><UpdateReview></UpdateReview></PrivateRoute>,
        loader: ({params}) => fetch(`https://chill-gamer-server-alpha.vercel.app/reviews/${params.id}`)
      },
      {
        path: "review",
        element: <PrivateRoute><AllReviews></AllReviews></PrivateRoute>
      },
      {
        path: "review/:id",
        element: <PrivateRoute><ReviewDetails></ReviewDetails></PrivateRoute>,
        loader: ({params}) => fetch(`https://chill-gamer-server-alpha.vercel.app/reviews/${params.id}`)
      },
      {
        path: "myreview",
        element: <PrivateRoute><MyReviews></MyReviews></PrivateRoute>,
      },
      {
        path: "watchlist",
        element: <PrivateRoute><GameWatchList></GameWatchList></PrivateRoute>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "resetpassword",
        element: <ForgotPassword></ForgotPassword>,
      }
    ]
  },
]);

export default router;