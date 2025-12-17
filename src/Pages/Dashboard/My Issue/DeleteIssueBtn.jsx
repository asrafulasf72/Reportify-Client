import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const DeleteIssueBtn = ({ id, email }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => axiosSecure.delete(`/issues/${id}`),

    onSuccess: () => {
      toast.success("Issue deleted");

      // This updates UI instantly
      queryClient.invalidateQueries({
        queryKey: ["myIssues", email],
      });
    },
  });

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This issue will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate();
      }
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={mutation.isLoading}
      className="px-3 py-1 bg-red-600 text-white rounded cursor-pointer disabled:opacity-60"
    >
      {mutation.isLoading ? "Deleting..." : "Delete"}
    </button>
  );
};

export default DeleteIssueBtn;
