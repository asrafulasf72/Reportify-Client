import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

const statusOptions = {
  pending: ["in-progress"],
  "in-progress": ["working"],
  working: ["resolved"],
  resolved: ["closed"],
};

const AssignedIssues = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [filters, setFilters] = useState({
    status: "",
    priority: "",
  });

  const { data: issues = [], isLoading } = useQuery({
    queryKey: ["assignedIssues", filters],
    queryFn: async () => {
      const res = await axiosSecure.get("/staff/assigned-issues", {
        params: filters,
      });
      return res.data;
    },
  });

  const { mutate: updateStatus } = useMutation({
    mutationFn: async ({ id, status }) =>
      axiosSecure.patch(`/staff/issues/status/${id}`, { status }),
    onSuccess: () => {
      toast.success("Status updated");
      queryClient.invalidateQueries(["assignedIssues"]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed");
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">
        Assigned Issues
      </h2>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex gap-3 mb-5">
        <select
          className="select select-bordered w-full"
          onChange={(e) =>
            setFilters((p) => ({ ...p, status: e.target.value }))
          }
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In-progress</option>
          <option value="working">Working</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>

        <select
          className="select select-bordered w-full"
          onChange={(e) =>
            setFilters((p) => ({ ...p, priority: e.target.value }))
          }
        >
          <option value="">All Priority</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="table table-zebra w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th className="hidden md:table-cell">Category</th>
              <th>Priority</th>
              <th>Status</th>
              <th className="hidden sm:table-cell">Boosted</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {issues.map((issue, idx) => (
              <tr key={issue._id}>
                <td>{idx + 1}</td>
                <td className="max-w-[180px] truncate">
                  {issue.title}
                </td>

                <td className="hidden md:table-cell">
                  {issue.category}
                </td>

                <td>
                  <span
                    className={`badge ${
                      issue.priority === "high"
                        ? "badge-error"
                        : "badge-info"
                    }`}
                  >
                    {issue.priority}
                  </span>
                </td>

                <td>
                  <span className="badge badge-outline">
                    {issue.status}
                  </span>
                </td>

                <td className="hidden sm:table-cell">
                  {issue.isBoosted ? (
                    <span className="badge badge-success">
                      Yes
                    </span>
                  ) : (
                    "No"
                  )}
                </td>

                <td>
                  {statusOptions[issue.status] ? (
                    <select
                      className="select select-sm select-bordered w-full sm:w-auto"
                      defaultValue=""
                      onChange={(e) =>
                        updateStatus({
                          id: issue._id,
                          status: e.target.value,
                        })
                      }
                    >
                      <option disabled value="">
                        Change
                      </option>
                      {statusOptions[issue.status].map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {issues.length === 0 && (
          <p className="text-center py-6 text-gray-500">
            No assigned issues found
          </p>
        )}
      </div>
    </div>
  );
};

export default AssignedIssues;
