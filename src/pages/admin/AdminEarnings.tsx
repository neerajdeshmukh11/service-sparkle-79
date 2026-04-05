import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockDashboardStats, monthlyRevenueData, mockTransactions } from "@/data/mockData";
import StatsCard from "@/components/shared/StatsCard";
import { DollarSign, TrendingUp, CreditCard, ArrowUpRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const AdminEarnings = () => {
  const totalEarnings = mockTransactions.filter(t => t.status === "completed").reduce((a, t) => a + t.platformFee, 0);
  const totalProcessed = mockTransactions.filter(t => t.status === "completed").reduce((a, t) => a + t.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Platform Earnings</h1>
        <p className="text-muted-foreground">Track total revenue and platform earnings</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard title="Total Revenue" value={`$${mockDashboardStats.admin.totalRevenue.toLocaleString()}`} change="+18.3% growth" changeType="positive" icon={DollarSign} iconColor="bg-success/10 text-success" />
        <StatsCard title="Platform Fees" value={`$${totalEarnings.toLocaleString()}`} change="15% commission" changeType="neutral" icon={CreditCard} iconColor="bg-primary/10 text-primary" />
        <StatsCard title="Total Processed" value={`$${totalProcessed.toLocaleString()}`} change="This period" changeType="neutral" icon={TrendingUp} iconColor="bg-info/10 text-info" />
      </div>

      <Card>
        <CardHeader><CardTitle>Revenue Over Time</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={monthlyRevenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(221,83%,53%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(221,83%,53%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", color: "hsl(var(--foreground))" }} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(221,83%,53%)" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminEarnings;
