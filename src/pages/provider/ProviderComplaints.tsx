import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, MessageSquare } from "lucide-react";
import StatusBadge from "@/components/shared/StatusBadge";

const ProviderComplaints = () => {
  const [complaints, setComplaints] = useState([
    { id: "pc1", customer: "Alice Johnson", bookingId: "b1", issue: "Customer was not available at scheduled time", status: "resolved", date: "2024-12-02", resolution: "Customer apologized, rescheduled successfully" },
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [newComplaint, setNewComplaint] = useState({ customer: "", bookingId: "", issue: "" });

  const addComplaint = () => {
    if (!newComplaint.issue) return;
    setComplaints([...complaints, { id: `pc${complaints.length + 1}`, ...newComplaint, status: "open", date: new Date().toISOString().split("T")[0], resolution: "" }]);
    setNewComplaint({ customer: "", bookingId: "", issue: "" });
    setShowAdd(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Complaints</h1>
          <p className="text-muted-foreground">Report issues during service delivery</p>
        </div>
        <Dialog open={showAdd} onOpenChange={setShowAdd}>
          <DialogTrigger asChild>
            <Button className="gradient-primary text-primary-foreground"><Plus className="w-4 h-4 mr-2" />Raise Complaint</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Raise a Complaint</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <Input placeholder="Customer Name" value={newComplaint.customer} onChange={e => setNewComplaint({ ...newComplaint, customer: e.target.value })} />
              <Input placeholder="Booking ID" value={newComplaint.bookingId} onChange={e => setNewComplaint({ ...newComplaint, bookingId: e.target.value })} />
              <Textarea placeholder="Describe the issue..." value={newComplaint.issue} onChange={e => setNewComplaint({ ...newComplaint, issue: e.target.value })} />
              <Button className="w-full" onClick={addComplaint}>Submit Complaint</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {complaints.map(c => (
          <Card key={c.id}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <StatusBadge status={c.status} />
                    <span className="text-xs text-muted-foreground">{c.date}</span>
                  </div>
                  <p className="font-medium">{c.issue}</p>
                  <p className="text-sm text-muted-foreground mt-1">Against: {c.customer} • Booking #{c.bookingId}</p>
                  {c.resolution && <p className="text-sm text-success mt-2 bg-success/10 p-2 rounded">Resolution: {c.resolution}</p>}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProviderComplaints;
