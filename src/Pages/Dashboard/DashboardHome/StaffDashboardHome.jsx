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
  ClipboardList,
  CheckCircle,
  CalendarCheck,
  Loader,
} from "lucide-react";

const COLORS = ["#6366F1", "#22C55E", "#F59E0B", "#EF4444"];

const StaffDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["staffDashboardStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/staff/dashboard-stats");
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

  const {
    totalAssigned,
    resolvedCount,
    todayTasks,
    statusStats = [],
  } = data;

  const chartData = statusStats.map((item) => ({
    name: item._id,
    value: item.count,
  }));

  return (
    <div className="p-6 space-y-6">
      {/* ================= CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Assigned Issues"
          value={totalAssigned}
          icon={<ClipboardList className="text-indigo-500" />}
        />
        <StatCard
          title="Resolved Issues"
          value={resolvedCount}
          icon={<CheckCircle className="text-green-500" />}
        />
        <StatCard
          title="Today's Tasks"
          value={todayTasks}
          icon={<CalendarCheck className="text-orange-500" />}
        />
      </div>

      {/* ================= CHART ================= */}
      <div className="bg-white rounded-xl shadow p-6 h-[350px]">
        <h2 className="text-lg font-semibold mb-4">
          Issue Status Distribution
        </h2>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={110}
              dataKey="value"
              label
            >
              {chartData.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
      <div className="p-3 rounded-full bg-gray-100">
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
      </div>
    </div>
  );
};

export default StaffDashboardHome;
