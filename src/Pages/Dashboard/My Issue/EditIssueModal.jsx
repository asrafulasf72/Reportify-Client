import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const EditIssueModal = ({ issue, close }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: issue.title,
      description: issue.description,
      category: issue.category,
      location: issue.location,
    },
  });

  const mutation = useMutation({
    mutationFn: (updatedData) =>
      axiosSecure.patch(`/issues/${issue._id}`, updatedData),
    onSuccess: () => {
      toast.success("Issue updated");
      queryClient.invalidateQueries(["myIssues"]);
      close();
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg w-96 space-y-4"
      >
        <h2 className="text-xl font-bold">Edit Issue</h2>

        <input {...register("title")} className="border w-full px-2 py-1" />
        <textarea {...register("description")} className="border w-full px-2 py-1" />
        <input {...register("location")} className="border w-full px-2 py-1" />

        <div className="flex justify-end gap-3">
          <button type="button" onClick={close}>Cancel</button>
          <button className="bg-blue-600 text-white px-4 py-1 rounded">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditIssueModal;
