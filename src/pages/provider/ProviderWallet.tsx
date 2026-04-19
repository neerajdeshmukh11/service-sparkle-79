import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockWalletTransactions, mockDashboardStats } from "@/data/mockData";
import StatsCard from "@/components/shared/StatsCard";
import { Wallet, TrendingUp, ArrowDownLeft, ArrowUpRight, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const ProviderWallet = () => {
  const stats = mockDashboardStats.provider;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Wallet</h1>
        <p className="text-muted-foreground">Track your earnings and manage payouts</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard title="Wallet Balance" value={`₹${stats.walletBalance.toLocaleString()}`} icon={Wallet} iconColor="bg-primary/10 text-primary" />
        <StatsCard title="Weekly Earnings" value={`₹${stats.weeklyEarnings.toLocaleString()}`} change="+12%" changeType="positive" icon={TrendingUp} iconColor="bg-success/10 text-success" />
        <StatsCard title="Monthly Earnings" value={`₹${stats.monthlyEarnings.toLocaleString()}`} change="+8.5%" changeType="positive" icon={DollarSign} iconColor="bg-warning/10 text-warning" />
      </div>

      <div className="flex gap-2">
        <Button className="gradient-primary text-primary-foreground">Withdraw to Bank</Button>
      </div>

      <Card>
        <CardHeader><CardTitle>Transaction History</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {mockWalletTransactions.map(t => (
            <div key={t.id} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${t.type === "credit" ? "bg-success/10" : "bg-destructive/10"}`}>
                  {t.type === "credit" ? <ArrowDownLeft className="w-4 h-4 text-success" /> : <ArrowUpRight className="w-4 h-4 text-destructive" />}
                </div>
                <div>
                  <p className="font-medium text-sm">{t.description}</p>
                  <p className="text-xs text-muted-foreground">{t.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${t.type === "credit" ? "text-success" : "text-destructive"}`}>
                  {t.type === "credit" ? "+" : "-"}${t.amount}
                </p>
                <p className="text-xs text-muted-foreground">Bal: ${t.balance}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProviderWallet;
