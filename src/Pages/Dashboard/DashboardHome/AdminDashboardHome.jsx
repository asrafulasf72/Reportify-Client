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

/*  COLORS  */
const COLORS = {
  pending: "#F59E0B",
  resolved: "#10B981",
  rejected: "#EF4444",
  premium: "#6366F1",
  boost: "#22C55E",
  users: "#3B82F6",
};

/* REUSABLE CARD */
const Card = ({ title, children }) => (
  <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6">
    <h3 className="font-semibold text-slate-800 mb-3 sm:mb-4 text-sm sm:text-base">
      {title}
    </h3>
    {children}
  </div>
);

/*  KPI CARD  */
const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6">
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-xs sm:text-sm text-slate-500">
          {title}
        </p>
        <h2 className="text-xl sm:text-3xl font-semibold text-slate-900 mt-1">
          {value}
        </h2>
      </div>
      <div
        className="h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: color }}
      >
        <Icon className="text-white" size={20} />
      </div>
    </div>
  </div>
);

/*  DONUT */
const DonutChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={200}>
    <PieChart>
      <Pie
        data={data}
        innerRadius={50}
        outerRadius={80}
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

/* MAIN  */
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

  const { stats, latestPayments, latestUsers, } = data;

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
    <div className="min-h-screen bg-slate-50 px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* HEADER  */}
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
          Admin Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Platform health & real-time insights
        </p>
      </div>

      {/* KPI  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
          title="Total Citizen"
          value={stats.totalUsers}
          icon={Users}
          color="#2563EB"
        />
      </div>

      {/* DONUT CHARTS  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card title="Issue Status Overview">
          <DonutChart data={issueChartData} />
          <Legend data={issueChartData} />
        </Card>

        <Card title="Payment Distribution">
          <DonutChart data={paymentChartData} />
          <Legend data={paymentChartData} />
        </Card>

        <Card title="New Registrations">
          <DonutChart data={userChartData} />
          <Legend data={userChartData} />

          {/* Latest 5 Users */}
          <div className="mt-4">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">Latest Users</h4>
            <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
              {latestUsers.slice(-5).reverse().map((user, idx) => (
                <li key={idx} className="flex justify-between">
                  <span>{user.displayName || user.email}</span>
                  <span className="text-slate-400 text-[11px]">{user.email}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

/*  LEGEND  */
const Legend = ({ data }) => (
  <div className="mt-4 space-y-2">
    {data.map((item, idx) => (
      <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm">
        <span
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: item.color }}
        />
        <span className="text-slate-600">
          {item.name}
        </span>
        <span className="ml-auto font-medium text-slate-800">
          {item.value}
        </span>
      </div>
    ))}
  </div>
);

export default AdminDashboardHome;
