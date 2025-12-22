import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Loader } from "lucide-react";

const AdminAllIssues = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState("");

  // Get all issues
  const { data: issues = [], isLoading, refetch } = useQuery({
    queryKey: ["admin-all-issues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/issues");
      return res.data;
    },
  });

  // Get all staff
  const { data: staffs = [] } = useQuery({
    queryKey: ["staff-list"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/staffs");
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

  // Assign staff handler
  const handleAssignStaff = async () => {
    await axiosSecure.patch(`/admin/issues/assign/${selectedIssue._id}`, {
      staffEmail: selectedStaff,
    });

    toast.success("Staff assigned successfully");
    setSelectedIssue(null);
    setSelectedStaff("");
    refetch();
  };

  // Reject issue handler
  const handleReject = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This issue will be rejected!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, reject it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.patch(`/admin/issues/reject/${id}`);
      toast.success("Issue rejected successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to reject issue");
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="table table-zebra w-full min-w-[700px] md:min-w-full">
        <thead>
          <tr className="text-sm sm:text-base">
            <th>#</th>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Assigned Staff</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {issues.map((issue, index) => (
            <tr key={issue._id} className="text-xs sm:text-sm">
              <th>{index + 1}</th>
              <td>{issue.title}</td>
              <td>{issue.category}</td>
              <td>{issue.status}</td>
              <td>
                <span
                  className={`badge ${
                    issue.priority === "high" ? "badge-error" : "badge-info"
                  }`}
                >
                  {issue.priority}
                </span>
              </td>
              <td>{issue.assignedStaff || "Not Assigned"}</td>
              <td className="space-x-1 sm:space-x-2">
                {/* Pending & Not Assigned */}
                {issue.status === "pending" && !issue.assignedStaff && (
                  <>
                    <button
                      className="btn btn-xs sm:btn-sm btn-primary font-bold"
                      onClick={() => setSelectedIssue(issue)}
                    >
                      Assign
                    </button>
                    <button
                      className="btn btn-xs sm:btn-sm btn-error font-bold"
                      onClick={() => handleReject(issue._id)}
                    >
                      Reject
                    </button>
                  </>
                )}

                {/* Rejected */}
                {issue.status === "rejected" && (
                  <button
                    className="btn btn-xs sm:btn-sm bg-red-300 text-black font-bold"
                    disabled
                  >
                    Rejected
                  </button>
                )}

                {/* Closed */}
                {issue.status === "closed" && (
                  <button
                    className="btn btn-xs sm:btn-sm bg-green-200 text-black font-bold"
                    disabled
                  >
                    Closed
                  </button>
                )}

                {/* Staff Assigned */}
                {issue.assignedStaff &&
                  issue.status !== "rejected" &&
                  issue.status !== "closed" && (
                    <button
                      className="btn btn-xs sm:btn-sm bg-blue-300 text-black font-bold"
                      disabled
                    >
                      Assigned
                    </button>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Assign Staff Modal */}
      {selectedIssue && (
        <dialog className="modal modal-open w-full sm:w-auto">
          <div className="modal-box p-4 sm:p-6 w-full sm:w-[400px]">
            <h3 className="font-bold text-lg mb-3">Assign Staff</h3>

            <select
              className="select select-bordered w-full mb-4"
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
            >
              <option value="">Select Staff</option>
              {staffs.map((staff) => (
                <option key={staff.email} value={staff.email}>
                  {staff.displayName || staff.email}
                </option>
              ))}
            </select>

            <div className="modal-action flex flex-col sm:flex-row sm:justify-end gap-2">
              <button
                className="btn btn-primary w-full sm:w-auto"
                disabled={!selectedStaff}
                onClick={handleAssignStaff}
              >
                Confirm
              </button>
              <button
                className="btn w-full sm:w-auto"
                onClick={() => setSelectedIssue(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default AdminAllIssues;
