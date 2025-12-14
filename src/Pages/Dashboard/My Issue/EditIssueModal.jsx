import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const EditIssueModal = ({ issue }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    reset({
      title: issue.title,
      description: issue.description,
      location: issue.location,
    });
  }, [issue, reset]);

  const mutation = useMutation({
    mutationFn: (data) =>
      axiosSecure.patch(`/issues/${issue._id}`, data),
    onSuccess: () => {
      toast.success("Issue updated successfully");
      queryClient.invalidateQueries(["myIssues"]);
      document.getElementById("edit_issue_modal").close();
    },
  });

  return (
    <dialog id="edit_issue_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Edit Issue</h3>

        <form onSubmit={handleSubmit(mutation.mutate)} className="space-y-3">
          <input {...register("title")} className="border w-full px-2 py-1" />
          <textarea {...register("description")} className="border w-full px-2 py-1" />
          <input {...register("location")} className="border w-full px-2 py-1" />

          <input
            value={issue.category}
            disabled
            className="border w-full px-2 py-1 bg-gray-100"
          />

          <div className="modal-action">
            <button className="bg-blue-600 text-white px-4 py-1 rounded">
              Update
            </button>
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default EditIssueModal;
