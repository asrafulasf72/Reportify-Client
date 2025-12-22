import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { User, Mail, Image, Loader } from "lucide-react";
import { upLoadImage } from "../../../utils";

const AdminProfile = () => {
    const axiosSecure = useAxiosSecure();

    const [displayName, setDisplayName] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [imageFile, setImageFile] = useState(null);

    // Get admin profile
    const { data: admin, isLoading, refetch } = useQuery({
        queryKey: ["adminProfile"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin/profile");
            return res.data;
        },
    });

    // Set initial values
    useEffect(() => {
        if (admin) {
            setDisplayName(admin.displayName || "");
            setPhotoURL(admin.photoURL || "");
        }
    }, [admin]);

    // Update profile
    const mutation = useMutation({
        mutationFn: async () => {
            let finalPhotoURL = photoURL;

            if (imageFile) {
                finalPhotoURL = await upLoadImage(imageFile);
            }

            return axiosSecure.patch("/admin/profile", {
                displayName,
                photoURL: finalPhotoURL,
            });
        },
        onSuccess: () => {
            toast.success("Profile updated successfully");
            setImageFile(null);
            refetch();
        },
        onError: () => {
            toast.error("Profile update failed");
        },
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <Loader className="animate-spin" size={40} />
            </div>
        );
    }

    return (
        <div className="px-3 sm:px-6 lg:px-0">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">
                    Admin Profile
                </h2>

                {/* Profile Header */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6">
                    <img
                        src={photoURL || "https://i.ibb.co/2kR6N0C/avatar.png"}
                        alt="Admin"
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border object-cover"
                    />

                    <div className="text-center sm:text-left">
                        <p className="text-lg font-semibold">{admin?.displayName}</p>
                        <p className="text-gray-500 flex justify-center sm:justify-start items-center gap-2 text-sm">
                            <Mail size={16} /> {admin?.email}
                        </p>
                    </div>
                </div>

                {/* Form */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {/* Name */}
                    <div className="sm:col-span-1">
                        <label className="text-sm font-medium text-gray-600 flex gap-2">
                            <User size={16} /> Name
                        </label>
                        <input
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="input input-bordered w-full mt-1"
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="sm:col-span-1">
                        <label className="text-sm font-medium text-gray-600 flex gap-2">
                            <Image size={16} /> Profile Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImageFile(e.target.files[0])}
                            className="file-input file-input-bordered w-full mt-1"
                        />
                    </div>
                </div>

                {/* Button */}
                <button
                    onClick={() => mutation.mutate()}
                    className="btn btn-primary w-full sm:w-auto mt-6"
                    disabled={mutation.isLoading}
                >
                    {mutation.isLoading ? "Updating..." : "Update Profile"}
                </button>
            </div>
        </div>
    );
};

export default AdminProfile;
