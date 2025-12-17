import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loader from "../../../Component/Loader";
import IssueCard from "./IssueCard";
import EditIssueModal from "./EditIssueModal";

const MyIssues = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [selectedIssue, setSelectedIssue] = useState(null);

  const { data: issues = [], isLoading } = useQuery({
    queryKey: ["myIssues", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues/${user.email}`);
      return res.data;
    },
  });

  useEffect(() => {
    const handler = (e) => {
      setSelectedIssue(e.detail);
      document.getElementById("edit_issue_modal").showModal();
    };

    window.addEventListener("open-edit-issue", handler);
    return () => window.removeEventListener("open-edit-issue", handler);
  }, []);

  if (isLoading) return <Loader />;

  const filteredIssues = issues.filter(
    (issue) =>
      (!statusFilter || issue.status === statusFilter) &&
      (!categoryFilter || issue.category === categoryFilter)
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">My Issues</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="resolved">Resolved</option>
        </select>

        <select
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Categories</option>
          <option value="Streetlight">Streetlight</option>
          <option value="Road Damage">Road Damage</option>
          <option value="Garbage Issue">Garbage Issue</option>
          <option value="Footpath Damage">Footpath Damage</option>
          <option value="Water Leakage">Water Leakage</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {filteredIssues.length === 0 ? (
        <div className="text-center py-20 border rounded-lg bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">
            No Issues Created Yet
          </h2>
          <p className="text-gray-600">
            You haven’t reported any issues yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredIssues.map((issue) => (
            <IssueCard key={issue._id} issue={issue} />
          ))}
        </div>
      )}

      {/* ONE modal only */}
      {selectedIssue && <EditIssueModal issue={selectedIssue} />}
    </div>
  );
};

export default MyIssues;
