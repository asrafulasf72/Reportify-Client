import React from "react";
import { Link } from "react-router";
import Lottie from "lottie-react";
import animationData from "../assets/404.json";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      
      <div className="w-full max-w-md">
        <Lottie animationData={animationData} loop={true} />
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mt-4">Page Not Found</h2>
      <p className="text-gray-500 mt-2 text-center">
        The page you're looking for doesn’t exist or was moved.
      </p>

      <Link
        to="/"
        className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
