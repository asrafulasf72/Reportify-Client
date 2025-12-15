import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Layout/AuthLayout";
import { path } from "framer-motion/client";
import LogIn from "../Pages/Auth/LogIn/LogIn";
import Register from "../Pages/Auth/Register/Register";
import DashboardLayout from "../Layout/DashboardLayout";
import NotFound from "../Component/NotFound";
import Loader from "../Component/Loader";
import ReportIssue from "../Pages/Dashboard/Report Issue/ReportIssue";
import CitizenProfile from "../Pages/Dashboard/Profile/CitizenProfile";
import PrivateRouter from "./PrivateRouter";
import MyIssues from "../Pages/Dashboard/My Issue/MyIssues";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";
import PaymentcanCeled from "../Pages/Dashboard/Payment/PaymentcanCeled";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        errorElement: <NotFound />,
        hydrateFallbackElement: <Loader />,
        children: [
            {
                index: true,
                Component: Home
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: '/login',
                Component: LogIn
            },
            {
                path: '/register',
                Component: Register
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRouter><DashboardLayout/></PrivateRouter>,
        children: [
            {
                path: '/dashboard/myIssue',
                element: <MyIssues/>
            },
            {
                path: '/dashboard/reportIssue',
                element: <ReportIssue />
            },
            {
                path:'/dashboard/citizenProfile',
                element:<CitizenProfile/>
            },
            {
                path:'/dashboard/payment-success',
                element:<PaymentSuccess/>
            },
            {
                path:'/dashboard/payment-canceled',
                element:<PaymentcanCeled/>
            }

        ]
    }
])