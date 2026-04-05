import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockComplaints } from "@/data/mockData";
import StatusBadge from "@/components/shared/StatusBadge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, RefreshCcw } from "lucide-react";

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState(mockComplaints);
  const [tab, setTab] = useState("all");
  const [selectedComplaint, setSelectedComplaint] = useState<typeof mockComplaints[0] | null>(null);
  const [resolution, setResolution] = useState("");

  const filtered = complaints.filter(c => tab === "all" || c.status === tab);

  const updateStatus = (id: string, newStatus: string) => {
    setComplaints(complaints.map(c => c.id === id ? { ...c, status: newStatus, resolution: newStatus === "resolved" ? resolution : c.resolution } : c));
    setSelectedComplaint(null);
    setResolution("");
  };

  const processRefund = (id: string) => {
    setComplaints(complaints.map(c => c.id === id ? { ...c, status: "resolved", resolution: "Refund processed successfully" } : c));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Complaints & Refunds</h1>
        <p className="text-muted-foreground">Handle complaints and process refunds</p>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="all">All ({complaints.length})</TabsTrigger>
          <TabsTrigger value="open">Open ({complaints.filter(c => c.status === "open").length})</TabsTrigger>
          <TabsTrigger value="in-review">In Review ({complaints.filter(c => c.status === "in-review").length})</TabsTrigger>
          <TabsTrigger value="resolved">Resolved ({complaints.filter(c => c.status === "resolved").length})</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        {filtered.map(c => (
          <Card key={c.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-mono text-xs text-muted-foreground">#{c.id}</span>
                    <StatusBadge status={c.status} />
                    <Badge variant={c.priority === "high" ? "destructive" : c.priority === "medium" ? "default" : "secondary"}>
                      {c.priority} priority
                    </Badge>
                    <Badge variant="outline">{c.raisedByRole}</Badge>
                  </div>
                  <h3 className="font-semibold text-lg">{c.issue}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span>Raised by: <strong className="text-foreground">{c.raisedBy}</strong></span>
                    <span>Against: <strong className="text-foreground">{c.against}</strong></span>
                    <span>Booking: #{c.bookingId}</span>
                    <span>{c.date}</span>
                  </div>
                  {c.resolution && <p className="text-sm bg-success/10 text-success p-2 rounded mt-2">Resolution: {c.resolution}</p>}
                </div>
                <div className="flex gap-2 shrink-0">
                  {c.status !== "resolved" && (
                    <>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" onClick={() => setSelectedComplaint(c)}>
                            <MessageSquare className="w-4 h-4 mr-1" />Resolve
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader><DialogTitle>Resolve Complaint</DialogTitle></DialogHeader>
                          <div className="space-y-4 mt-4">
                            <p className="text-sm text-muted-foreground">{c.issue}</p>
                            <Textarea placeholder="Enter resolution notes..." value={resolution} onChange={e => setResolution(e.target.value)} />
                            <div className="flex gap-2">
                              <Button className="flex-1" onClick={() => updateStatus(c.id, "resolved")}>Mark Resolved</Button>
                              <Button variant="outline" className="flex-1" onClick={() => updateStatus(c.id, "in-review")}>Move to Review</Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button size="sm" variant="outline" onClick={() => processRefund(c.id)}>
                        <RefreshCcw className="w-4 h-4 mr-1" />Refund
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminComplaints;
