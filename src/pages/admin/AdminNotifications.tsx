import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockNotifications } from "@/data/mockData";
import { Bell, Plus, Send, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [showCreate, setShowCreate] = useState(false);
  const [newNotif, setNewNotif] = useState({ title: "", message: "", target: "customer", type: "general" });

  const createNotification = () => {
    if (!newNotif.title) return;
    setNotifications([{ id: `n${notifications.length + 1}`, ...newNotif, date: new Date().toISOString().split("T")[0], read: false }, ...notifications]);
    setNewNotif({ title: "", message: "", target: "customer", type: "general" });
    setShowCreate(false);
  };

  const deleteNotif = (id: string) => setNotifications(notifications.filter(n => n.id !== id));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">Manage and send notifications to users</p>
        </div>
        <Dialog open={showCreate} onOpenChange={setShowCreate}>
          <DialogTrigger asChild>
            <Button className="gradient-primary text-primary-foreground"><Send className="w-4 h-4 mr-2" />Send Notification</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create Notification</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <Input placeholder="Title" value={newNotif.title} onChange={e => setNewNotif({ ...newNotif, title: e.target.value })} />
              <Textarea placeholder="Message" value={newNotif.message} onChange={e => setNewNotif({ ...newNotif, message: e.target.value })} />
              <Select value={newNotif.target} onValueChange={v => setNewNotif({ ...newNotif, target: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer">All Customers</SelectItem>
                  <SelectItem value="provider">All Providers</SelectItem>
                  <SelectItem value="all">Everyone</SelectItem>
                </SelectContent>
              </Select>
              <Button className="w-full" onClick={createNotification}>Send</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {notifications.map(n => (
          <Card key={n.id} className={`hover:shadow-md transition-shadow ${!n.read ? "border-l-4 border-l-primary" : ""}`}>
            <CardContent className="p-4 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg mt-0.5">
                  <Bell className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{n.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{n.message}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="capitalize">{n.target}</Badge>
                    <Badge variant="outline">{n.type}</Badge>
                    <span className="text-xs text-muted-foreground">{n.date}</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="shrink-0 text-destructive" onClick={() => deleteNotif(n.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminNotifications;
