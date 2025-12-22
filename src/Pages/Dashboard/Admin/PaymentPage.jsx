import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loader from "../../../Component/Loader";

const PaymentPage = () => {
  const axiosSecure = useAxiosSecure();

  //  Search & filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  //  Fetch all payments once
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["admin-payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/payments");
      return res.data;
    },
  });

  //  Client-side filtering (smooth typing)
  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      const searchMatch =
        !searchTerm ||
        p.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.status?.toLowerCase().includes(searchTerm.toLowerCase());

      const monthMatch = !month || p.month === Number(month);
      const yearMatch = !year || p.year === Number(year);

      return searchMatch && monthMatch && yearMatch;
    });
  }, [payments, searchTerm, month, year]);

  //  Summary data
  const totalAmount = filteredPayments.reduce(
    (sum, p) => sum + Number(p.amount || 0),
    0
  );

  const premiumCount = filteredPayments.filter((p) => p.type === "premium")
    .length;

  const boostCount = filteredPayments.filter((p) => p.type === "boost").length;

  if (isLoading) return <Loader />;

  return (
    <div className="p-4 md:p-6 space-y-6">

      {/* Page Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left">
        💳 Payments Overview
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card bg-green-200 shadow p-4 text-center sm:text-left">
          <p className="text-gray-500">Total Revenue</p>
          <h3 className="text-2xl font-bold">৳ {totalAmount.toLocaleString()}</h3>
        </div>

        <div className="card bg-blue-200 shadow p-4 text-center sm:text-left">
          <p className="text-gray-500">Total Payments</p>
          <h3 className="text-2xl font-bold">{filteredPayments.length}</h3>
        </div>

        <div className="card bg-purple-200 shadow p-4 text-center sm:text-left">
          <p className="text-gray-500">Premium</p>
          <h3 className="text-2xl font-bold">{premiumCount}</h3>
        </div>

        <div className="card bg-orange-200 shadow p-4 text-center sm:text-left">
          <p className="text-gray-500">Boost</p>
          <h3 className="text-2xl font-bold">{boostCount}</h3>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:items-center">
            <input
              type="text"
              placeholder="Search by email / type / status"
              className="input input-bordered w-full md:w-72"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              className="select select-bordered w-full md:w-44"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              <option value="">All Months</option>
              {[...Array(12)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {new Date(0, i).toLocaleString("default", { month: "long" })}
                </option>
              ))}
            </select>

            <select
              className="select select-bordered w-full md:w-36"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="">All Years</option>
              {[2024, 2025, 2026].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>

            <button
              className="btn btn-outline w-full md:w-auto"
              onClick={() => {
                setSearchTerm("");
                setMonth("");
                setYear("");
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="card bg-base-100 shadow overflow-x-auto">
        <div className="card-body p-0">
          <table className="table table-zebra min-w-[600px] md:min-w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {filteredPayments.map((payment, index) => (
                <tr key={payment._id}>
                  <td>{index + 1}</td>
                  <td className="break-all">{payment.email}</td>
                  <td>
                    ৳ {payment.amount} {payment.currency?.toUpperCase()}
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        payment.type === "premium"
                          ? "badge-primary"
                          : "badge-secondary"
                      }`}
                    >
                      {payment.type}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-success">{payment.status}</span>
                  </td>
                  <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredPayments.length === 0 && (
            <p className="text-center mt-6 text-gray-500">
              No payments found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
