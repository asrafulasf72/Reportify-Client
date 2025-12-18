import { useSearchParams, useNavigate } from "react-router";
import { useEffect, useRef } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const BoostSuccess = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const issueId = params.get("issueId");

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const hasVerified = useRef(false); //  IMPORTANT

  useEffect(() => {
    if (!sessionId || !issueId) return;
    if (hasVerified.current) return; //  prevent double run

    hasVerified.current = true;

    const verifyPayment = async () => {
      try {
        await axiosSecure.post("/boost-payment-success", {
          sessionId,
          issueId
        });

        toast.success("Issue boosted successfully!");
        navigate(`/issues/details/${issueId}`, { replace: true });
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Boost verification failed"
        );
      }
    };

    verifyPayment();
  }, [sessionId, issueId, axiosSecure, navigate]);

  return (
    <p className="text-center mt-20 font-medium">
      Verifying boost payment...
    </p>
  );
};

export default BoostSuccess;
