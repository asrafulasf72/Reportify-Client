import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Loader from "../../../Component/Loader";
import DeleteIssueBtn from "../My Issue/DeleteIssueBtn";
import { Trash2 } from "lucide-react";

const IssueDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: issue, isLoading } = useQuery({
    queryKey: ["issue-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues/details/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  const isOwner = user?.email === issue.citizenEmail;
  const isPending = issue.status === "pending";

  const timeline = [...issue.timeline].reverse();

  const handleBoost = async () => {
  try {
    const res = await axiosSecure.post('/create-boost-session', {
      issueId: issue._id
    });

    window.location.href = res.data.url;
  } catch (error) {
    toast.error("Failed to start boost payment");
  }
};

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">

      {/* Title & Status */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">{issue.title}</h1>

        <div className="flex gap-3 mt-2">
          <span className="badge badge-warning">{issue.status}</span>
          <span className="badge badge-info">
            Priority: {issue.priority}
          </span>
        </div>
      </div>

      {/* Image */}
      <img
        src={issue.image}
        alt="issue"
        className="w-full rounded-lg border max-h-[400px] object-cover"
      />

      {/* Description */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700">{issue.description}</p>
      </div>

      {/* Meta Info */}
      <div className="grid grid-cols-2 gap-6 bg-gray-50 p-5 rounded-lg border">
        <p><strong>Category:</strong> {issue.category}</p>
        <p><strong>Location:</strong> {issue.location}</p>
        <p><strong>Reported By:</strong> {issue.citizenName}</p>
        <p><strong>Reported At:</strong> {new Date(issue.createdAt).toLocaleString()}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        {isOwner && isPending && (
          <button className="btn btn-primary">Edit</button>
        )}

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
        <h2 className="text-2xl font-semibold mb-4">Issue Timeline</h2>

        <ul className="timeline timeline-vertical">
          {timeline.map((item, index) => (
            <li key={index}>
              <div className="timeline-start">
                <span className="badge badge-outline">
                  {item.status}
                </span>
              </div>
              <div className="timeline-middle">●</div>
              <div className="timeline-end">
                <p className="font-medium">{item.message}</p>
                <p className="text-sm text-gray-500">
                  {item.updatedBy} —{" "}
                  {new Date(item.date).toLocaleString()}
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
