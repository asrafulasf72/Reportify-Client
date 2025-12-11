import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Layout/AuthLayout";
import { path } from "framer-motion/client";
import LogIn from "../Pages/Auth/LogIn/LogIn";
import Register from "../Pages/Auth/Register/Register";
import DashboardLayout from "../Layout/DashboardLayout";

export const router=createBrowserRouter([
        {
            path:'/',
            Component:RootLayout,
            children:[
                {
                    index:true,
                    Component:Home
                }
            ]
        },
        {
            path:'/',
            Component:AuthLayout,
            children:[
                {
                    path:'/login',
                    Component: LogIn
                },
                {
                    path:'/register',
                    Component: Register
                }
            ]
        },
        {
            path:'/dashboard',
            Component: DashboardLayout,
            children:[
                {
                    
                }
            ]
        }
])