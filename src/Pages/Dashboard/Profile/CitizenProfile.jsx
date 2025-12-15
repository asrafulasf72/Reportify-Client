import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const CitizenProfile = () => {
  const { user, refetchUser } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [displayName, setdisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);

  //  Subscribe handler
  const handleSubscribe = async (user) => {
    const paymentInfo = {
      email: user.email,
      cost: 1000,
      displayName: user.displayName
    }

    try {
      setLoading(true)
      const res = await axiosSecure.post("/create-checkout-session", paymentInfo)
      window.location.href = res.data.url;
    } catch(error) {
          toast.error("Payment initiation failed");
    } finally {
        setLoading(false)
    }


  };

  //  Update profile handler
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await axiosSecure.patch(`/users/update/${user.email}`, {
        displayName,
        photoURL,
      });
      toast.success("Profile updated successfully");
      refetchUser();
    } catch (error) {
      toast.error("Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Block Warning */}
      {user?.isBlocked && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          ⚠ Your account has been blocked. Please contact the authorities.
        </div>
      )}

      {/* Profile Card */}
      <div className="bg-white shadow rounded-lg p-6 flex items-center gap-6">
        <img
          src={user?.photoURL}
          alt="Profile"
          className="w-24 h-24 rounded-full border"
        />

        <div>
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            {user?.displayName}
            {user?.isPremium && (
              <span className="bg-yellow-400 text-black px-3 py-1 text-sm rounded-full">
                ⭐ Premium
              </span>
            )}
          </h2>
          <p className="text-gray-600">{user?.email}</p>
          <p className="text-sm mt-1">
            Issues Submitted: <strong>{user?.issueCount}</strong>
          </p>
        </div>
      </div>

      {/*  Premium Section */}
      {!user?.isPremium && !user?.isBlocked && (
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">
            Upgrade to Premium
          </h3>
          <p className="mb-4">
            Pay <strong>1000 TK</strong> to unlock unlimited issue submission.
          </p>
          <button onClick={() => handleSubscribe(user)} disabled={loading} className="btn btn-primary" >
            Subscribe Now
          </button>
        </div>
      )}

      {user?.isPremium && (
        <div className="bg-green-50 p-4 rounded-lg text-green-700 font-medium">
          🎉 You are a premium user. Unlimited issue submissions enabled.
        </div>
      )}

      {/* Update Profile */}
      {!user?.isBlocked && (
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            Update Profile
          </h3>

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setdisplayName(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Photo URL
              </label>
              <input
                type="text"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-success"
            >
              Save Changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CitizenProfile;
