import React from "react";
import Lottie from "lottie-react";
import spinnerAnimation from "../assets/spinner.json";

const Loader = () => {
  return (
    <div className="w-full flex items-center justify-center py-6">
      <div className="w-40"> 
        <Lottie animationData={spinnerAnimation} loop={true} />
      </div>
    </div>
  );
};

export default Loader;
