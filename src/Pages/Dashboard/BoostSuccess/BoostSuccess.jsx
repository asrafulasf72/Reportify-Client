import { useSearchParams, useNavigate } from "react-router";
import { useEffect } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const BoostSuccess = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const issueId = params.get("issueId");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        await axiosSecure.post('/boost-payment-success', {
          sessionId,
          issueId
        });

        toast.success("Issue boosted successfully!");
        navigate(`/issues/details/${issueId}`);
      } catch {
        toast.error("Boost verification failed");
      }
    };

    verifyPayment();
  }, []);

  return <p className="text-center mt-20">Verifying boost payment...</p>;
};

export default BoostSuccess;
