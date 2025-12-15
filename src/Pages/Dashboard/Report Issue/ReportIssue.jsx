import React from "react";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { upLoadImage } from "../../../utils";
import Loader from "../../../Component/Loader";

const ReportIssue = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //  Fetch user info using TanStack Query
  const { data: userInfo, isLoading } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  //  Auth loading
  if (loading || isLoading) {
    return <Loader />;
  }

  //  Free vs Premium logic
  const isFreeUser = userInfo?.isPremium === false;
  const hasReachedLimit = isFreeUser && userInfo?.issueCount >= 3;

  // Hide form & show Subscribe button
  if (hasReachedLimit) {
    return (
      <div className="max-w-xl mx-auto text-center mt-20">
        <h2 className="text-2xl font-bold mb-4">Issue Limit Reached</h2>
        <p className="mb-6 text-gray-600">
          Free users can report only 3 issues. Upgrade to premium to report unlimited issues.
        </p>
        <button
          onClick={() => navigate("/dashboard/citizenProfile")}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Subscribe Now
        </button>
      </div>
    );
  }

  //  Submit issue
  const onSubmit = async (data) => {
    const { title, description, category, image, location } = data;

    if (!image || image.length === 0) {
      return toast.error("Please upload an image");
    }

    try {
      const imageURL = await upLoadImage(image[0]);

      const issueData = {
        title,
        description,
        category,
        location,
        image: imageURL,
        email: user.email,
      };

      const res = await axiosSecure.post("/issues", issueData);

      if (res.data.insertedId) {
        toast.success("Issue reported successfully");
        reset();

        //  Refresh user data (issueCount)
        queryClient.invalidateQueries(["user", user.email]);

        navigate("/dashboard/myIssue");
      }
    } catch (error) {
      toast.error("Failed to report issue");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {/* Page Heading */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Report an Issue</h1>
      <p className="text-gray-600 mb-8">
        Please fill out the form below to report any public infrastructure problem.
        Your report helps authorities take quick action.
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 bg-white p-6 rounded-xl shadow-md border"
      >
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Issue Title</label>
          <input
            type="text"
            placeholder="Enter issue title"
            {...register("title", { required: "Title is required" })}
            className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
          />
          {errors.title && (
            <p className="text-red-600 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            rows="4"
            placeholder="Describe the issue clearly"
            {...register("description", { required: "Description is required" })}
            className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
          />
          {errors.description && (
            <p className="text-red-600 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
          >
            <option value="">Select category</option>
            <option value="Streetlight">Streetlight</option>
            <option value="Road Damage">Road Damage</option>
            <option value="Water Leakage">Water Leakage</option>
            <option value="Garbage Issue">Garbage Issue</option>
            <option value="Footpath Damage">Footpath Damage</option>
            <option value="Other">Other</option>
          </select>
          {errors.category && (
            <p className="text-red-600 text-sm">{errors.category.message}</p>
          )}
        </div>

        {/* Upload Image */}
        <div>
          <label className="block mb-1 font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            placeholder="Enter location or address"
            {...register("location", { required: "Location is required" })}
            className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
          />
          {errors.location && (
            <p className="text-red-600 text-sm">{errors.location.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition cursor-pointer"
        >
          Submit Issue
        </button>
      </form>
    </div>
  );
};

export default ReportIssue;
