import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loader from "../../../Component/Loader";
import toast from "react-hot-toast";
import { generateInvoicePDF } from "../../../utils/generateInvoice";

const CitizenProfile = () => {
  const { user, refetchUser } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);

  // ================= PAYMENTS =================
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["citizen-payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payments/citizen?email=${user.email}`
      );
      return res.data;
    },
  });

  // ================= SUBSCRIBE =================
  const handleSubscribe = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.post("/create-checkout-session", {
        email: user.email,
        cost: 1000,
      });
      window.location.href = res.data.url;
    } catch {
      toast.error("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= UPDATE PROFILE =================
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axiosSecure.patch(`/users/update/${user.email}`, {
        displayName,
        photoURL,
      });
      toast.success("Profile updated");
      refetchUser();
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

      {/* ================= PROFILE ================= */}
      <div className="bg-white shadow rounded-lg p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
        <img
          src={user?.photoURL}
          alt="Profile"
          className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full border object-cover"
        />

        <div className="text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-semibold flex flex-col sm:flex-row sm:items-center gap-2">
            {user?.displayName}
            {user?.isPremium && (
              <span className="badge badge-warning text-sm">
                Premium
              </span>
            )}
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            {user?.email}
          </p>
          <p className="text-sm mt-1">
            Issues Submitted:{" "}
            <span className="font-semibold">{user?.issueCount}</span>
          </p>
        </div>
      </div>

      {/* ================= PREMIUM ================= */}
      {!user?.isPremium && (
        <div className="bg-blue-50 p-6 rounded-lg text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-semibold mb-2">
            Upgrade to Premium
          </h3>
          <p className="text-sm sm:text-base mb-4">
            Pay ৳1000 to unlock unlimited issue submission.
          </p>
          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="btn btn-primary w-full sm:w-auto"
          >
            {loading ? "Processing..." : "Subscribe Now"}
          </button>
        </div>
      )}

      {/* ================= INVOICES ================= */}
      {payments.length > 0 && (
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 overflow-x-auto">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center sm:text-left">
            Payment Invoices
          </h3>

          <table className="table table-zebra min-w-[600px] sm:min-w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Invoice</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p, i) => (
                <tr key={p._id}>
                  <td>{i + 1}</td>
                  <td className="capitalize">{p.type}</td>
                  <td>৳ {p.amount}</td>
                  <td>
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    <button
                      onClick={() => generateInvoicePDF(p)}
                      className="btn btn-sm btn-outline w-full sm:w-auto"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= UPDATE PROFILE ================= */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center sm:text-left">
          Update Profile
        </h3>

        <form
          onSubmit={handleUpdateProfile}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="input input-bordered w-full sm:col-span-2"
            placeholder="Name"
            required
          />

          <input
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="input input-bordered w-full sm:col-span-2"
            placeholder="Photo URL"
          />

          <button
            className="btn btn-success w-full sm:w-auto sm:col-span-2"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CitizenProfile;
