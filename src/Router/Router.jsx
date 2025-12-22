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
import IssueDetails from "../Pages/Dashboard/IssueDetails/IssueDetails";
import BoostSuccess from "../Pages/Dashboard/BoostSuccess/BoostSuccess";
import AllIssues from "../Pages/AllIssues/AllIssues";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import AdminRoute from "./AdminRoute";
import AdminAllIssues from "../Pages/Dashboard/Admin/AdminAllIssues";
import ManageStaff from "../Pages/Dashboard/Admin/ManageStaff";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import PaymentPage from "../Pages/Dashboard/Admin/PaymentPage";
import AssignedIssues from "../Pages/Dashboard/Staff/Assignedissues";
import StaffRoute from "./StaffRoute"
import StaffProfile from "../Pages/Dashboard/Staff/StaffProfile";
import AdminProfile from "../Pages/Dashboard/Admin/AdminProfile";

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
            },
            {
                path:'/issues/details/:id',
                element: <PrivateRouter><IssueDetails/></PrivateRouter>
            },
            {
                path:'/issues/boost-success',
                element:<PrivateRouter><BoostSuccess/></PrivateRouter>
            },
            {
                path:'/all-issues-page',
                Component: AllIssues
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
               index:true,
               Component: DashboardHome,
            },
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
            },
            {
                path:'/dashboard/admin-all-issues',
                element:<AdminRoute><AdminAllIssues/></AdminRoute>
            },
            {
                path:'/dashboard/manage-staff',
                element:<AdminRoute><ManageStaff/></AdminRoute>
            },
            {
                path:'/dashboard/manage-users',
                element:<AdminRoute><ManageUsers/></AdminRoute>
            },
            {
                path:'/dashboard/payment-page',
                element:<AdminRoute><PaymentPage/></AdminRoute>
            },
            {
                path:'/dashboard/assigned-issues',
                element:<StaffRoute><AssignedIssues/></StaffRoute>
            },
            {
                path:'/dashboard/staff-profile',
                element: <StaffRoute><StaffProfile/></StaffRoute>
            },
            {
                path:'/dashboard/admin-profile',
                element:<AdminRoute><AdminProfile/></AdminRoute>
            }

        ]
    }
])