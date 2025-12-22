import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  FileText,
  Clock,
  Loader,
  CheckCircle,
  CreditCard,
} from "lucide-react";

/* COLORS  */
const COLORS = ["#6366F1", "#F59E0B", "#10B981", "#EF4444"];

/*  STAT CARD  */
const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 flex items-center gap-4 hover:shadow-xl transition transform hover:-translate-y-1">
    <div className={`p-3 sm:p-4 rounded-xl ${color}`}>
      <Icon className="text-white" size={24} />
    </div>
    <div>
      <p className="text-gray-500 text-xs sm:text-sm">
        {title}
      </p>
      <h2 className="text-lg sm:text-2xl font-bold">
        {value}
      </h2>
    </div>
  </div>
);

/*  CIRCLE CHART  */
const CircleChart = ({ title, subtitle, data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 hover:shadow-lg transition">
      <h3 className="font-semibold text-base sm:text-lg">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-gray-500 mb-4">
        {subtitle}
      </p>

      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      {/* LEGEND */}
      <div className="mt-4 space-y-2">
        {data.map((item, index) => {
          const percent =
            total > 0
              ? ((item.value / total) * 100).toFixed(1)
              : 0;

          return (
            <div
              key={index}
              className="flex items-center justify-between text-xs sm:text-sm"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor:
                      COLORS[index % COLORS.length],
                  }}
                />
                <span className="text-gray-600">
                  {item.name}
                </span>
              </div>
              <div className="font-medium text-gray-800">
                {item.value}
                <span className="text-gray-400 ml-1">
                  ({percent}%)
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/*  MAIN DASHBOARD  */
const CitizenDashBoardHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["citizen-dashboard"],
    queryFn: async () => {
      const res = await axiosSecure.get("/citizen/dashboard-stats");
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

  const pieData = [
    { name: "Pending", value: data.pendingIssues || 0 },
    { name: "In Progress", value: data.inProgressIssues || 0 },
    { name: "Resolved", value: data.resolvedIssues || 0 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
        Citizen Dashboard
      </h1>

      {/* STAT CARDS*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
        <StatCard
          title="Total Issues"
          value={data.totalIssues}
          icon={FileText}
          color="bg-indigo-500"
        />
        <StatCard
          title="Pending"
          value={data.pendingIssues}
          icon={Clock}
          color="bg-yellow-500"
        />
        <StatCard
          title="In Progress"
          value={data.inProgressIssues}
          icon={Loader}
          color="bg-blue-500"
        />
        <StatCard
          title="Resolved"
          value={data.resolvedIssues}
          icon={CheckCircle}
          color="bg-green-500"
        />
        <StatCard
          title="Payments (BDT)"
          value={data.totalPayments}
          icon={CreditCard}
          color="bg-rose-500"
        />
      </div>

      {/* CHARTS  */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CircleChart
          title="Issue Status Overview"
          subtitle="Distribution of all your reported issues"
          data={pieData}
        />

        <CircleChart
          title="Resolved vs Pending"
          subtitle="Completed issues compared to waiting ones"
          data={[
            { name: "Resolved", value: data.resolvedIssues || 0 },
            { name: "Pending", value: data.pendingIssues || 0 },
          ]}
        />
      </div>
    </div>
  );
};

export default CitizenDashBoardHome;
