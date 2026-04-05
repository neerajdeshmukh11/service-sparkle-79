import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusType = "active" | "inactive" | "blocked" | "pending" | "completed" | "in-progress" | "cancelled" | "confirmed" | "open" | "in-review" | "resolved" | "paid" | "refunded" | "expired" | "accepted" | "en-route" | "arrived" | "started" | "flagged";

const statusStyles: Record<string, string> = {
  active: "bg-success/10 text-success border-success/20",
  inactive: "bg-muted text-muted-foreground border-muted",
  blocked: "bg-destructive/10 text-destructive border-destructive/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  completed: "bg-success/10 text-success border-success/20",
  "in-progress": "bg-info/10 text-info border-info/20",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
  confirmed: "bg-primary/10 text-primary border-primary/20",
  open: "bg-warning/10 text-warning border-warning/20",
  "in-review": "bg-info/10 text-info border-info/20",
  resolved: "bg-success/10 text-success border-success/20",
  paid: "bg-success/10 text-success border-success/20",
  refunded: "bg-muted text-muted-foreground border-muted",
  expired: "bg-muted text-muted-foreground border-muted",
  accepted: "bg-primary/10 text-primary border-primary/20",
  "en-route": "bg-info/10 text-info border-info/20",
  arrived: "bg-info/10 text-info border-info/20",
  started: "bg-warning/10 text-warning border-warning/20",
  flagged: "bg-destructive/10 text-destructive border-destructive/20",
};

const StatusBadge = ({ status }: { status: string }) => (
  <Badge variant="outline" className={cn("capitalize font-medium", statusStyles[status] || "bg-muted text-muted-foreground")}>
    {status}
  </Badge>
);

export default StatusBadge;
