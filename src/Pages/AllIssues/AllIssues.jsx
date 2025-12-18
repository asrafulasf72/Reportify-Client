import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const AllIssues = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // states
    const [searchText, setSearchText] = useState("");
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");
    const [page, setPage] = useState(1);
    const limit = 6;

    const inputRef = useRef(null); // 🔹 focus ref

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearch(searchText);
            setPage(1);

            // 🔹 Maintain focus on input after debounce
            if (inputRef.current) {
                const position = inputRef.current.selectionStart;
                inputRef.current.focus();
                inputRef.current.setSelectionRange(position, position);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchText]);

    const { data, isLoading, isFetching, refetch } = useQuery({
        queryKey: ["all-issues", search, category, status, priority, page],
        queryFn: async () => {
            const params = { page, limit, search, category, status, priority };
            const res = await axios.get("http://localhost:3000/all-issues", { params });
            return res.data;
        },
        keepPreviousData: true
    });

    const issues = data?.issues || [];
    const totalPages = data?.totalPages || 1;

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

    if (isLoading) return <div className="text-center mt-20">Loading issues...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            {/* Search & Filter */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
                <input
                    ref={inputRef}
                    className="input input-bordered"
                    placeholder="Search by title, category, location"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />

                <select className="select select-bordered" onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Select category</option>
                    <option value="Streetlight">Streetlight</option>
                    <option value="Road Damage">Road Damage</option>
                    <option value="Water Leakage">Water Leakage</option>
                    <option value="Garbage Issue">Garbage Issue</option>
                    <option value="Footpath Damage">Footpath Damage</option>
                    <option value="Other">Other</option>
                </select>

                <select className="select select-bordered" onChange={(e) => setStatus(e.target.value)}>
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                </select>

                <select className="select select-bordered" onChange={(e) => setPriority(e.target.value)}>
                    <option value="">All Priority</option>
                    <option value="high">High</option>
                    <option value="normal">Normal</option>
                </select>
            </div>

            {isFetching && (
                <p className="text-center text-sm text-gray-400 mb-4">Updating results...</p>
            )}

            {/* Issues Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {issues.map((issue) => (
                    <div key={issue._id} className="bg-white rounded-xl shadow hover:shadow-xl transition">
                        <img src={issue.image} className="h-48 w-full object-cover rounded-t-xl" />

                        <div className="p-5">
                            <h2 className="font-semibold text-lg mb-2">{issue.title}</h2>

                            <div className="flex flex-wrap gap-2 mb-3">
                                <span className="badge badge-info">{issue.category}</span>
                                <span className={`badge ${issue.priority === "high" ? "badge-error" : "badge-success"}`}>
                                    {issue.priority}
                                </span>
                                <span className="badge badge-warning">{issue.status}</span>
                            </div>

                            <p className="text-sm mb-4">📍 {issue.location}</p>

                            <div className="flex justify-between items-center">
                                <button
                                    onClick={() => handleUpvote(issue._id, issue.citizenEmail)}
                                    className="btn btn-outline btn-sm"
                                >
                                    👍 {issue.upvoteCount || 0}
                                </button>

                                <button
                                    onClick={() => navigate(`/issues/details/${issue._id}`)}
                                    className="btn btn-primary btn-sm"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-10">
                <button className="btn btn-sm" disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>

                {[...Array(totalPages).keys()].map((num) => (
                    <button
                        key={num}
                        className={`btn btn-sm ${page === num + 1 ? "btn-primary" : ""}`}
                        onClick={() => setPage(num + 1)}
                    >
                        {num + 1}
                    </button>
                ))}

                <button className="btn btn-sm" disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
            </div>
        </div>
    );
};

export default AllIssues;
