import { Eye, EyeOff, Plus } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { upLoadImage } from "../../../utils";

const ManageStaff = () => {
  const axiosSecure = useAxiosSecure();

  const [staffs, setStaffs] = useState([]);
  const [showPass, setShowPass] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const addModalRef = useRef();
  const updateModalRef = useRef();

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { register: updateRegister, handleSubmit: handleUpdateSubmit, reset: updateReset } = useForm();

  useEffect(() => {
    loadStaffs();
  }, []);

  const loadStaffs = async () => {
    const res = await axiosSecure.get("/admin/staffs");
    setStaffs(res.data);
  };

  const onAddStaff = async (data) => {
    const imageFile = data.photoURL[0];
    try {
      const imageURL = await upLoadImage(imageFile);
      const staffInfo = { ...data, photoURL: imageURL };
      const res = await axiosSecure.post("/admin/staff", staffInfo);
      if (res.data?.success) {
        toast.success("Staff created successfully");
        reset();
        addModalRef.current.close();
        loadStaffs();
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create staff");
    }
  };

  const openUpdateModal = (staff) => {
    setSelectedStaff(staff);
    updateReset(staff);
    updateModalRef.current.showModal();
  };

  const onUpdateStaff = async (data) => {
    await axiosSecure.patch(`/admin/staff/${selectedStaff.email}`, data);
    toast.success("Staff updated");
    updateModalRef.current.close();
    loadStaffs();
  };

  const handleDelete = async (email) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This staff will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
    });
    if (!result.isConfirmed) return;

    await axiosSecure.delete(`/admin/staff/${email}`);
    toast.success("Staff deleted");
    loadStaffs();
  };

  return (
    <div className="p-4">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 mb-4">
        <h2 className="text-2xl font-bold">Manage Staff</h2>
        <button
          onClick={() => addModalRef.current.showModal()}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus size={18} /> Add Staff
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full min-w-[650px] md:min-w-full text-sm sm:text-base">
          <thead>
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Staff Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {staffs.map((staff, index) => (
              <tr key={staff.email} className="text-xs sm:text-sm">
                <td>{index + 1}</td>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={staff.photoURL} alt={staff.displayName} />
                    </div>
                  </div>
                </td>
                <td>{staff.displayName}</td>
                <td>{staff.email}</td>
                <td>{staff.phone || "N/A"}</td>
                <td className="flex flex-wrap gap-1">
                  <button
                    className="btn btn-xs sm:btn-sm btn-info"
                    onClick={() => openUpdateModal(staff)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-xs sm:btn-sm btn-error"
                    onClick={() => handleDelete(staff.email)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD STAFF MODAL */}
      <dialog ref={addModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box w-full sm:w-[400px]">
          <h3 className="font-bold text-lg text-center mb-3">Create Staff Account</h3>
          <form onSubmit={handleSubmit(onAddStaff)} className="space-y-3">
            <input {...register("displayName", { required: true })} placeholder="Name" className="input input-bordered w-full" />
            {errors.displayName && <p className="text-red-500 text-xs">Name is required</p>}
            <input {...register("email", { required: true })} placeholder="Email" className="input input-bordered w-full" />
            <input {...register("phone")} placeholder="Phone" className="input input-bordered w-full" />
            <input {...register("photoURL")} type="file" className="file-input input-bordered w-full" />
            <div className="relative">
              <input type={showPass ? "text" : "password"} {...register("password", { required: true, minLength: 6 })} placeholder="Password" className="input input-bordered w-full" />
              <span className="absolute right-3 top-3 cursor-pointer z-50" onClick={() => setShowPass(!showPass)}>
                {showPass ? <Eye size={18} /> : <EyeOff size={18} />}
              </span>
            </div>
            <div className="modal-action flex flex-col sm:flex-row sm:justify-end gap-2">
              <button className="btn btn-primary w-full sm:w-auto">Create</button>
              <button type="button" className="btn w-full sm:w-auto" onClick={() => addModalRef.current.close()}>Cancel</button>
            </div>
          </form>
        </div>
      </dialog>

      {/* UPDATE STAFF MODAL */}
      <dialog ref={updateModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box w-full sm:w-[400px]">
          <h3 className="font-bold text-lg text-center mb-3">Update Staff</h3>
          <form onSubmit={handleUpdateSubmit(onUpdateStaff)} className="space-y-3">
            <input {...updateRegister("displayName")} placeholder="Name" className="input input-bordered w-full" />
            <input {...updateRegister("phone")} placeholder="Phone" className="input input-bordered w-full" />
            <input {...updateRegister("photoURL")} placeholder="Photo URL" className="input input-bordered w-full" />
            <div className="modal-action flex flex-col sm:flex-row sm:justify-end gap-2">
              <button className="btn btn-primary w-full sm:w-auto">Update</button>
              <button type="button" className="btn w-full sm:w-auto" onClick={() => updateModalRef.current.close()}>Cancel</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ManageStaff;
