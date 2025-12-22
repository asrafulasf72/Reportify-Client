import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { MapPin, Tag, Eye, Loader } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, type: "spring", stiffness: 100 },
    }),
    hover: { scale: 1.05, boxShadow: "0px 15px 35px rgba(0,0,0,0.2)" },
};

const LatestResolve = () => {
    const { data: issues = [], isLoading, isError } = useQuery({
        queryKey: ["latest-resolved"],
        queryFn: async () => {
            const res = await axios.get(
                "https://reportify-server.vercel.app/public/issues/latest-resolved"
            );
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-60">
                <Loader className="animate-spin text-blue-600" size={50} />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center py-12 text-red-500 text-lg">
                Failed to load resolved issues
            </div>
        );
    }

    return (
        <section className="max-w-7xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800">
                    Latest Resolved Issues
                </h2>
                <p className="text-gray-500 mt-2 text-lg">
                    Recently solved community problems
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {issues.map((issue, index) => (
                    <motion.div
                        key={issue._id}
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        variants={cardVariants}
                        className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-lg cursor-pointer bg-linear-to-b from-white to-gray-50"
                    >
                        <div className="h-52 w-full overflow-hidden rounded-t-2xl">
                            <img
                                src={issue.image || "https://via.placeholder.com/400x300"}
                                alt={issue.title}
                                className="h-full w-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                            />
                        </div>

                        <div className="p-6 space-y-3">
                            <h3 className="text-xl font-semibold text-gray-800 line-clamp-1">
                                {issue.title}
                            </h3>

                            <p className="text-gray-500 text-sm line-clamp-3">
                                {issue.description}
                            </p>

                            <div className="flex items-center justify-between text-gray-500 text-sm mt-2">
                                <span className="flex items-center gap-2">
                                    <Tag size={16} className="text-indigo-500" />
                                    {issue.category}
                                </span>
                                <span className="flex items-center gap-2">
                                    <MapPin size={16} className="text-red-500" />
                                    {issue.location}
                                </span>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600 font-medium">
                                    Resolved
                                </span>

                                <Link
                                    to={`/issues/details/${issue._id}`}
                                    className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
                                >
                                    <Eye size={16} />
                                    View Details
                                </Link>
                            </div>
                        </div>

                        {/* Gradient overlay effect */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent pointer-events-none"></div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default LatestResolve;
