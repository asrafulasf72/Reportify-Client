import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { refetchUser } = useAuth();

  useEffect(() => {
    if (!sessionId) return;

    axiosSecure
      .post("/payment-success", { sessionId })
      .then(() => {
        toast.success("Payment successful! You are now Premium 🎉");
        refetchUser();
        navigate("/dashboard/citizenProfile");
      })
      .catch(() => {
        toast.error("Payment verification failed");
      });
  }, [sessionId]);

  return <div className="p-10 text-center">Processing payment...</div>;
};

export default PaymentSuccess;
