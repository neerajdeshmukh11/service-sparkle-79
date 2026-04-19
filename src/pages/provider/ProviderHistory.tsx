import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockProviderJobs } from "@/data/mockData";
import StatusBadge from "@/components/shared/StatusBadge";
import { Clock } from "lucide-react";

const ProviderHistory = () => {
  const completedJobs = mockProviderJobs.filter(j => j.status === "completed");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Job History</h1>
        <p className="text-muted-foreground">View your completed and past service requests</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Service</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Customer</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Date</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Amount</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {completedJobs.map(j => (
                <tr key={j.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-4 font-medium">{j.service}</td>
                  <td className="py-3 px-4">{j.customer}</td>
                  <td className="py-3 px-4 text-muted-foreground">{j.date} {j.time}</td>
                  <td className="py-3 px-4 font-semibold">${j.amount}</td>
                  <td className="py-3 px-4"><StatusBadge status={j.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProviderHistory;
