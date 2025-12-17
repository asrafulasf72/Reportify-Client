import { useState, useEffect, useDeferredValue } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import { ArrowBigUp } from "lucide-react";

const AllIssues = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    //  UI input state
    const [searchText, setSearchText] = useState("");

    //  Deferred value
    const deferredSearch = useDeferredValue(searchText);

    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");

    /*  Fetch Issues  */
    const {
        data: issues = [],
        isLoading,
        isFetching,
        isError,
        refetch
    } = useQuery({
        queryKey: [
            "all-issues",
            deferredSearch,
            category,
            status,
            priority
        ],
        queryFn: async () => {
            const params = {};
            if (deferredSearch) params.search = deferredSearch;
            if (category) params.category = category;
            if (status) params.status = status;
            if (priority) params.priority = priority;

            const res = await axios.get(
                "http://localhost:3000/all-issues",
                { params }
            );
            return res.data;
        },
        keepPreviousData: true
    });

    /*  Upvote  */
    const handleUpvote = async (id, ownerEmail) => {
        if (!user) {
            toast.error("Please login to upvote");
            return navigate("/login");
        }

        if (user.email === ownerEmail) {
            return toast.error("You cannot upvote your own issue");
        }

        try {
            await axiosSecure.patch(`/issues/upvote/${id}`);
            toast.success("Upvoted successfully");
            refetch();
        } catch (err) {
            toast.error(err.response?.data?.message || "Already upvoted");
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">

            {/* Search & Filters) */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
                <input type="text"  className="input input-bordered w-full" placeholder="Search by title, category, location" value={searchText} onChange={(e) => setSearchText(e.target.value)}
                />

                <select
                    className="select select-bordered"
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="Road">Road</option>
                    <option value="Water">Water</option>
                </select>

                <select
                    className="select select-bordered"
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                </select>

                <select className="select select-bordered" onChange={(e) => setPriority(e.target.value)} >
                    <option value="">All Priority</option>
                    <option value="high">High</option>
                    <option value="normal">Normal</option>
                </select>
            </div>

            {/*  Inline loader  */}
            {(isLoading || isFetching) && (
                <p className="text-center text-sm text-gray-400 mb-4">
                   <span className="loading loading-bars loading-sm"></span>
                </p>
            )}

            {/* Error */}
            {isError && (
                <p className="text-center text-red-500">
                    Failed to load issues
                </p>
            )}

            {/*Issues Grid*/}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {issues.map((issue) => (
                    <div
                        key={issue._id}
                        className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
                    >
                        <img
                            src={issue.image}
                            alt={issue.title}
                            className="h-48 w-full object-cover"
                        />

                        <div className="p-5">
                            <h2 className="text-lg font-semibold mb-2 line-clamp-1">
                                {issue.title}
                            </h2>

                            <div className="flex flex-wrap gap-2 mb-3">
                                <span className="badge badge-info">
                                    {issue.category}
                                </span>
                                <span
                                    className={`badge ${issue.priority === "high"
                                            ? "badge-error"
                                            : "badge-success"
                                        }`}
                                >
                                    {issue.priority}
                                </span>
                                <span className="badge badge-warning">
                                    {issue.status}
                                </span>
                            </div>

                            <p className="text-sm text-gray-600 mb-4">
                                📍 {issue.location}
                            </p>

                            <div className="flex justify-between items-center">
                                <button onClick={() => handleUpvote(issue._id, issue.citizenEmail)}
                                    className="btn bg-green-200 text-[1rem] btn-sm text-blue-400" >
                                    <ArrowBigUp size={20} /> {issue.upvoteCount || 0}
                                </button>

                                <button
                                    onClick={() =>
                                        navigate(`/issues/details/${issue._id}`)
                                    }
                                    className="btn btn-primary btn-sm"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/*  No Data */}
            {!isFetching && issues.length === 0 && (
                <p className="text-center text-gray-500 mt-12">
                    No issues found
                </p>
            )}
        </div>
    );
};

export default AllIssues;
