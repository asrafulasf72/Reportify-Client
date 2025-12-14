import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const DeleteIssueBtn = ({ id }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => axiosSecure.delete(`/issues/${id}`),
    onSuccess: () => {
      toast.success("Issue deleted");
      queryClient.invalidateQueries(["myIssues"]);
    },
  });

  return (
    <button
      onClick={() => mutation.mutate()}
      className="px-3 py-1 bg-red-600 text-white rounded"
    >
      Delete
    </button>
  );
};

export default DeleteIssueBtn;
