import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import { ArrowBigUp, Loader, Trash2 } from "lucide-react";
import DeleteIssueBtn from "../My Issue/DeleteIssueBtn";

const IssueDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: issue, isLoading, refetch } = useQuery({
    queryKey: ["issue-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues/details/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader className="animate-spin" size={40} />
      </div>
    );
  }

  const isOwner = user?.email === issue.citizenEmail;
  const isPending = issue.status === "pending";

  const handleUpvote = async () => {
    if (!user) {
      toast.error("Please login to upvote");
      return navigate("/login");
    }

    if (user.email === issue.citizenEmail) {
      return toast.error("You cannot upvote your own issue");
    }

    try {
      await axiosSecure.patch(`/issues/upvote/${issue._id}`);
      toast.success("Upvoted successfully");
      refetch();
    } catch (err) {
      toast.error(err.response?.data?.message || "Already upvoted");
    }
  };

  const handleBoost = async () => {
    try {
      const res = await axiosSecure.post("/create-boost-session", {
        issueId: issue._id
      });
      window.location.href = res.data.url;
    } catch {
      toast.error("Failed to start boost payment");
    }
  };

  const timeline = [...issue.timeline].reverse();

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">

      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold">{issue.title}</h1>
        <div className="flex gap-3 mt-2">
          <span className="badge badge-warning">{issue.status}</span>
          <span className="badge badge-info">Priority: {issue.priority}</span>
        </div>
      </div>

      {/* Image */}
      <img src={issue.image} className="rounded-lg max-h-[400px] w-full object-cover" />

      {/* Upvote */}
      <button
        onClick={handleUpvote}
        className="btn btn-outline btn-sm flex gap-1"
      >
        <ArrowBigUp size={18} /> {issue.upvoteCount || 0} Upvotes
      </button>

      {/* Description */}
      <p className="text-gray-700">{issue.description}</p>

      {/* Meta */}
      <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded">
        <p><strong>Category:</strong> {issue.category}</p>
        <p><strong>Location:</strong> {issue.location}</p>
        <p><strong>Reported By:</strong> {issue.citizenName}</p>
        <p><strong>Date:</strong> {new Date(issue.createdAt).toLocaleString()}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        {isOwner && isPending && <button className="btn btn-primary">Edit</button>}

        {isOwner && (
          <DeleteIssueBtn id={issue._id} email={issue.citizenEmail}>
            <Trash2 size={16} />
          </DeleteIssueBtn>
        )}

        {!issue.isBoosted && (
          <button onClick={handleBoost} className="btn btn-warning">
            Boost Issue (৳100)
          </button>
        )}
      </div>

      {/* Timeline */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Issue Timeline</h2>
        <ul className="timeline timeline-vertical">
          {timeline.map((t, i) => (
            <li key={i}>
              <div className="timeline-start">
                <span className="badge badge-outline">{t.status}</span>
              </div>
              <div className="timeline-middle">●</div>
              <div className="timeline-end">
                <p>{t.message}</p>
                <p className="text-sm text-gray-500">
                  {t.updatedBy} — {new Date(t.date).toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default IssueDetails;
