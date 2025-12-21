import React from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Camera, Loader } from "lucide-react";
import { upLoadImage } from "../../../utils";

const StaffProfile = () => {
  const axiosSecure = useAxiosSecure();

  // 🔹 Load Profile
  const { data: profile = {}, refetch, isLoading } = useQuery({
    queryKey: ["staffProfile"],
    queryFn: async () => {
      const res = await axiosSecure.get("/staff/profile");
      return res.data;
    },
  });

  const { register, handleSubmit, reset } = useForm({
    values: {
      displayName: profile?.displayName || "",
    },
  });

  // 🔹 Update Profile
  const onSubmit = async (data) => {
    try {
      let photoURL = profile.photoURL;

      if (data.image?.length > 0) {
        photoURL = await upLoadImage(data.image[0]);
      }

      await axiosSecure.patch("/staff/profile", {
        displayName: data.displayName,
        photoURL,
      });

      toast.success("Profile updated successfully");
      refetch();
      reset();
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

   if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader className="animate-spin" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      <div className="bg-white shadow rounded-2xl p-6 grid md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <img
              src={profile?.photoURL || "https://i.ibb.co/2FsfXqM/avatar.png"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border"
            />
            <label className="absolute bottom-2 right-2 bg-indigo-600 p-2 rounded-full cursor-pointer">
              <Camera size={16} className="text-white" />
              <input type="file" {...register("image")} hidden />
            </label>
          </div>

          <h3 className="mt-4 font-semibold text-lg">
            {profile?.displayName}
          </h3>
          <p className="text-sm text-gray-500">{profile?.email}</p>
          <span className="mt-2 text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">
            Staff
          </span>
        </div>

        {/* Update Form */}
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <input
                type="text"
                {...register("displayName", { required: true })}
                className="w-full mt-1 p-3 border rounded-lg focus:outline-indigo-500"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Update Profile
              </button>
            </div>
          </form>

          {/* Info Section */}
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <Info label="Email" value={profile.email} />
            <Info label="Role" value={profile.role} />
            <Info
              label="Joined"
              value={new Date(profile.createdAt).toDateString()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <p className="text-xs text-gray-500">{label}</p>
    <p className="font-medium">{value || "N/A"}</p>
  </div>
);

export default StaffProfile;
