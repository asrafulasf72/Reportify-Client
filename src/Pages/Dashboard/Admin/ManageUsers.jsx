import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loader from "../../../Component/Loader";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all citizen users
  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/users");
      return res.data;
    },
  });

  // Block / Unblock handler
  const handleBlockToggle = (user) => {
    Swal.fire({
      title: user.isBlocked ? "Unblock User?" : "Block User?",
      text: user.isBlocked
        ? "User will be able to submit issues again."
        : "User will not be able to submit issues.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: user.isBlocked ? "Yes, Unblock" : "Yes, Block",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.patch(`/admin/users/block/${user.email}`, {
          isBlocked: !user.isBlocked,
        });

        refetch();

        Swal.fire(
          "Success!",
          `User has been ${user.isBlocked ? "unblocked" : "blocked"}.`,
          "success"
        );
      }
    });
  };

  if (isLoading) {
    return <Loader/>
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Subscription</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>

                <td className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img
                        src={
                          user.photoURL ||
                          "https://i.ibb.co/4pDNDk1/avatar.png"
                        }
                        alt="avatar"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">
                      {user.displayName || "N/A"}
                    </div>
                  </div>
                </td>

                <td>{user.email}</td>

                <td>
                  {user.isPremium ? (
                    <span className="badge badge-success">Premium</span>
                  ) : (
                    <span className="badge badge-ghost">Free</span>
                  )}
                </td>

                <td>
                  {user.isBlocked ? (
                    <span className="badge badge-error">Blocked</span>
                  ) : (
                    <span className="badge badge-success">Active</span>
                  )}
                </td>

                <td>
                  <button
                    onClick={() => handleBlockToggle(user)}
                    className={`btn btn-sm ${
                      user.isBlocked ? "btn-success" : "btn-error"
                    }`}
                  >
                    {user.isBlocked ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="text-center mt-6 text-gray-500">
            No users found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
