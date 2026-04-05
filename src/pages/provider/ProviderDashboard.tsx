import StatsCard from "@/components/shared/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockDashboardStats, mockProviderJobs } from "@/data/mockData";
import { Briefcase, CheckCircle, DollarSign, Star, Clock, TrendingUp } from "lucide-react";
import StatusBadge from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const weeklyData = [
  { day: "Mon", earnings: 180 }, { day: "Tue", earnings: 250 }, { day: "Wed", earnings: 120 },
  { day: "Thu", earnings: 310 }, { day: "Fri", earnings: 200 }, { day: "Sat", earnings: 340 }, { day: "Sun", earnings: 80 },
];

const ProviderDashboard = () => {
  const stats = mockDashboardStats.provider;
  const [available, setAvailable] = useState(true);
  const pendingJobs = mockProviderJobs.filter(j => j.status === "pending");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Provider Dashboard</h1>
          <p className="text-muted-foreground">Manage your jobs and track earnings</p>
        </div>
        <div className="flex items-center gap-3 bg-card p-3 rounded-lg border">
          <span className="text-sm font-medium">Availability:</span>
          <Switch checked={available} onCheckedChange={setAvailable} />
          <span className={`text-sm font-semibold ${available ? "text-success" : "text-destructive"}`}>
            {available ? "Available" : "Unavailable"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Jobs" value={stats.totalJobs} change={`${stats.activeJobs} active`} changeType="neutral" icon={Briefcase} iconColor="bg-primary/10 text-primary" />
        <StatsCard title="Completed" value={stats.completedJobs} change="91% completion" changeType="positive" icon={CheckCircle} iconColor="bg-success/10 text-success" />
        <StatsCard title="Wallet Balance" value={`$${stats.walletBalance.toLocaleString()}`} icon={DollarSign} iconColor="bg-warning/10 text-warning" />
        <StatsCard title="Rating" value={stats.rating} change="Excellent" changeType="positive" icon={Star} iconColor="bg-info/10 text-info" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-lg">Weekly Earnings</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", color: "hsl(var(--foreground))" }} />
                <Bar dataKey="earnings" fill="hsl(142,76%,36%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">Pending Job Requests</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {pendingJobs.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No pending requests</p>
            ) : (
              pendingJobs.map(j => (
                <div key={j.id} className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{j.service}</h3>
                      <p className="text-sm text-muted-foreground">{j.customer} • {j.date} at {j.time}</p>
                      <p className="text-sm text-muted-foreground">{j.address}</p>
                    </div>
                    <p className="text-lg font-bold">${j.amount}</p>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" className="bg-success text-success-foreground hover:bg-success/90">Accept</Button>
                    <Button size="sm" variant="destructive">Decline</Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProviderDashboard;
