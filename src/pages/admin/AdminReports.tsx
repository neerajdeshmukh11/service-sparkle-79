import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { monthlyRevenueData, categoryDistribution, mockDashboardStats } from "@/data/mockData";
import StatsCard from "@/components/shared/StatsCard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { BarChart3, TrendingUp, Users, BookOpen } from "lucide-react";

const COLORS = ["hsl(221,83%,53%)", "hsl(142,76%,36%)", "hsl(38,92%,50%)", "hsl(0,84%,60%)", "hsl(262,83%,58%)", "hsl(199,89%,48%)"];

const AdminReports = () => {
  const stats = mockDashboardStats.admin;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">System Reports</h1>
        <p className="text-muted-foreground">Analyze platform performance and metrics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Users" value={stats.totalUsers.toLocaleString()} change="+12.5%" changeType="positive" icon={Users} />
        <StatsCard title="Total Bookings" value={stats.totalBookings.toLocaleString()} change="+8.7%" changeType="positive" icon={BookOpen} iconColor="bg-info/10 text-info" />
        <StatsCard title="Revenue Growth" value="+18.3%" change="vs last month" changeType="positive" icon={TrendingUp} iconColor="bg-success/10 text-success" />
        <StatsCard title="Pending Complaints" value={stats.pendingComplaints} change="Needs attention" changeType="negative" icon={BarChart3} iconColor="bg-warning/10 text-warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Revenue Trend</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", color: "hsl(var(--foreground))" }} />
                <Line type="monotone" dataKey="revenue" stroke="hsl(221,83%,53%)" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Bookings Trend</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", color: "hsl(var(--foreground))" }} />
                <Bar dataKey="bookings" fill="hsl(142,76%,36%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Service Category Distribution</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={categoryDistribution} cx="50%" cy="50%" outerRadius={120} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {categoryDistribution.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", color: "hsl(var(--foreground))" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {categoryDistribution.map((item, i) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded" style={{ background: COLORS[i % COLORS.length] }} />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <span className="text-muted-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminReports;
