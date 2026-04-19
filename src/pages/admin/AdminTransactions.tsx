import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockTransactions } from "@/data/mockData";
import StatusBadge from "@/components/shared/StatusBadge";
import StatsCard from "@/components/shared/StatsCard";
import { Search, AlertTriangle, DollarSign, CreditCard, TrendingUp } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminTransactions = () => {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");

  const filtered = mockTransactions.filter(t => {
    const matchSearch = t.customer.toLowerCase().includes(search.toLowerCase()) || t.provider.toLowerCase().includes(search.toLowerCase());
    const matchTab = tab === "all" || (tab === "flagged" && t.flagged);
    return matchSearch && matchTab;
  });

  const totalRevenue = mockTransactions.filter(t => t.status === "completed").reduce((a, t) => a + t.amount, 0);
  const totalFees = mockTransactions.filter(t => t.status === "completed").reduce((a, t) => a + t.platformFee, 0);
  const flaggedCount = mockTransactions.filter(t => t.flagged).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Transaction Monitoring</h1>
        <p className="text-muted-foreground">Monitor payments and detect suspicious activity</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard title="Total Processed" value={`₹${totalRevenue.toLocaleString()}`} icon={DollarSign} iconColor="bg-success/10 text-success" />
        <StatsCard title="Platform Fees" value={`₹${totalFees.toLocaleString()}`} icon={CreditCard} iconColor="bg-primary/10 text-primary" />
        <StatsCard title="Flagged Transactions" value={flaggedCount} change="Needs review" changeType="negative" icon={AlertTriangle} iconColor="bg-destructive/10 text-destructive" />
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="all">All Transactions</TabsTrigger>
          <TabsTrigger value="flagged">
            <AlertTriangle className="w-4 h-4 mr-1" />Suspicious ({flaggedCount})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <CardHeader className="pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search transactions..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">ID</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Customer</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Provider</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Amount</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Fee</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Method</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Date</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Flag</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(t => (
                  <tr key={t.id} className={`border-b border-border/50 hover:bg-muted/30 transition-colors ₹{t.flagged ? "bg-destructive/5" : ""}`}>
                    <td className="py-3 px-4 font-mono text-xs">#{t.id}</td>
                    <td className="py-3 px-4">{t.customer}</td>
                    <td className="py-3 px-4">{t.provider}</td>
                    <td className="py-3 px-4 font-semibold">₹{t.amount}</td>
                    <td className="py-3 px-4 text-muted-foreground">₹{t.platformFee}</td>
                    <td className="py-3 px-4">{t.method}</td>
                    <td className="py-3 px-4 text-muted-foreground">{t.date}</td>
                    <td className="py-3 px-4"><StatusBadge status={t.status} /></td>
                    <td className="py-3 px-4">
                      {t.flagged && <StatusBadge status="flagged" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTransactions;
