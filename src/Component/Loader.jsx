import React from "react";
import Lottie from "lottie-react";
import spinnerAnimation from "../assets/spinner.json";

const Loader = () => {
  return (
    <div className="h-[60vh] flex items-center justify-center">
      <div > 
        <Lottie animationData={spinnerAnimation} loop={true} />
      </div>
    </div>
  );
};

export default Loader;
