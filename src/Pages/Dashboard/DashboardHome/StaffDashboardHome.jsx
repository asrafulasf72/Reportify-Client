import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip} from "recharts";
import { ClipboardList, CheckCircle, CalendarCheck, Loader} from "lucide-react";

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
    totalAssigned = 0,
    resolvedCount = 0,
    todayTasks = 0,
    statusStats = [],
  } = data;

  const chartData = statusStats.map((item) => ({
    name: item._id,
    value: item.count,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

      {/* ================= STAT CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
      <div className="bg-white rounded-xl shadow p-4 sm:p-6 h-[280px] sm:h-[350px]">
        <h2 className="text-base sm:text-lg font-semibold mb-3">
          Issue Status Distribution
        </h2>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={window.innerWidth < 640 ? 80 : 110}
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
    <div className="bg-white rounded-xl shadow p-4 sm:p-5 flex items-center gap-4">
      <div className="p-3 rounded-full bg-gray-100 shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-xs sm:text-sm">
          {title}
        </p>
        <h2 className="text-xl sm:text-2xl font-bold">
          {value}
        </h2>
      </div>
    </div>
  );
};

export default StaffDashboardHome;
