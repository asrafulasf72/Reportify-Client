import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  FileText,
  Wallet,
  Users,
  Loader,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

/* ================= COLORS ================= */
const COLORS = {
  pending: "#F59E0B",     // amber
  resolved: "#10B981",    // emerald
  rejected: "#EF4444",    // red
  premium: "#6366F1",     // indigo
  boost: "#22C55E",       // green
  users: "#3B82F6",       // blue
};

/* ================= REUSABLE CARD ================= */
const Card = ({ title, children }) => (
  <div className="bg-white rounded-2xl border border-slate-200 p-6">
    <h3 className="font-semibold text-slate-800 mb-4">{title}</h3>
    {children}
  </div>
);

/* ================= KPI CARD ================= */
const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white rounded-2xl border border-slate-200 p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <h2 className="text-3xl font-semibold text-slate-900 mt-1">
          {value}
        </h2>
      </div>
      <div
        className="h-12 w-12 rounded-full flex items-center justify-center"
        style={{ backgroundColor: color }}
      >
        <Icon className="text-white" size={22} />
      </div>
    </div>
  </div>
);

/* ================= DONUT ================= */
const DonutChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={220}>
    <PieChart>
      <Pie
        data={data}
        innerRadius={65}
        outerRadius={90}
        paddingAngle={4}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={index} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
);

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/dashboard-stats");
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

  const { stats, latestIssues, latestPayments, latestUsers } = data;

  /* ================= CHART DATA ================= */
  const issueChartData = [
    { name: "Pending", value: stats.pendingIssues, color: COLORS.pending },
    { name: "Resolved", value: stats.resolvedIssues, color: COLORS.resolved },
    { name: "Rejected", value: stats.rejectedIssues, color: COLORS.rejected },
  ];

  const paymentChartData = [
    {
      name: "Premium",
      value: latestPayments.filter(p => p.type === "premium").length,
      color: COLORS.premium,
    },
    {
      name: "Boost",
      value: latestPayments.filter(p => p.type === "boost").length,
      color: COLORS.boost,
    },
  ];

  const userChartData = [
    {
      name: "New Users",
      value: latestUsers.length,
      color: COLORS.users,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-8 space-y-10">
      {/* ===== HEADER ===== */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Admin Dashboard
        </h1>
        <p className="text-slate-500 mt-1">
          Platform health & real-time insights
        </p>
      </div>

      {/* ===== KPI ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        <StatCard
          title="Total Issues"
          value={stats.totalIssues}
          icon={FileText}
          color="#0F172A"
        />
        <StatCard
          title="Total Revenue"
          value={`৳${stats.totalRevenue}`}
          icon={Wallet}
          color="#4F46E5"
        />
        <StatCard
          title="Total Users"
          value={latestUsers.length}
          icon={Users}
          color="#2563EB"
        />
      </div>

      {/* ===== DONUT CHART GRID ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Issues */}
        <Card title="Issue Status Overview">
          <DonutChart data={issueChartData} />
          <Legend data={issueChartData} />
        </Card>

        {/* Payments */}
        <Card title="Payment Distribution">
          <DonutChart data={paymentChartData} />
          <Legend data={paymentChartData} />
        </Card>

        {/* Users */}
        <Card title="New Registrations">
          <DonutChart data={userChartData} />
          <Legend data={userChartData} />
        </Card>
      </div>
    </div>
  );
};

/* ================= LEGEND ================= */
const Legend = ({ data }) => (
  <div className="mt-4 space-y-2">
    {data.map((item, idx) => (
      <div key={idx} className="flex items-center gap-3 text-sm">
        <span
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: item.color }}
        />
        <span className="text-slate-600">{item.name}</span>
        <span className="ml-auto font-medium text-slate-800">
          {item.value}
        </span>
      </div>
    ))}
  </div>
);

export default AdminDashboardHome;
