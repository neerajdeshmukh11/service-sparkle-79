import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatusBadge from "@/components/shared/StatusBadge";
import { useAppState, SupportTicketPriority } from "@/contexts/AppStateContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { LifeBuoy, Plus, Send, Mail, Phone, Clock, MessageSquare, ArrowRight } from "lucide-react";

const categories = [
  "Account & Profile",
  "Payments & Wallet",
  "Booking Issues",
  "Customer Disputes",
  "Technical Issue",
  "Feature Request",
  "Other",
];

const ProviderSupport = () => {
  const { user } = useAuth();
  const { supportTickets, createSupportTicket, replySupportTicket } = useAppState();
  const { toast } = useToast();

  const myTickets = supportTickets.filter((t) => t.providerId === user?.id);
  const [tab, setTab] = useState("all");

  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(categories[0]);
  const [priority, setPriority] = useState<SupportTicketPriority>("medium");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const [activeTicketId, setActiveTicketId] = useState<string | null>(null);
  const [reply, setReply] = useState("");

  const filtered = myTickets.filter((t) => tab === "all" || t.status === tab);
  const activeTicket = myTickets.find((t) => t.id === activeTicketId) || null;

  const submit = () => {
    if (!user || !subject.trim() || !description.trim()) {
      toast({ title: "Missing fields", description: "Subject and description are required.", variant: "destructive" });
      return;
    }
    const t = createSupportTicket({
      providerId: user.id,
      providerName: user.name,
      providerEmail: user.email,
      category,
      subject: subject.trim(),
      description: description.trim(),
      priority,
    });
    toast({ title: "Ticket created", description: `#${t.id} sent to HomeGenie support.` });
    setOpen(false);
    setSubject("");
    setDescription("");
    setPriority("medium");
    setCategory(categories[0]);
    setActiveTicketId(t.id);
  };

  const sendReply = () => {
    if (!activeTicket || !user || !reply.trim()) return;
    replySupportTicket(activeTicket.id, "provider", user.name, reply.trim());
    setReply("");
  };

  const counts = {
    all: myTickets.length,
    open: myTickets.filter((t) => t.status === "open").length,
    "in-review": myTickets.filter((t) => t.status === "in-review").length,
    resolved: myTickets.filter((t) => t.status === "resolved").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Support</h1>
          <p className="text-muted-foreground">Reach out to HomeGenie for any help or raise a ticket</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-1" />
              New Ticket
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Raise a Support Ticket</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Priority</Label>
                  <Select value={priority} onValueChange={(v) => setPriority(v as SupportTicketPriority)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Subject</Label>
                <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Brief title for your issue" />
              </div>
              <div className="space-y-1.5">
                <Label>Description</Label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the issue in detail..." rows={5} />
              </div>
              <Button className="w-full" onClick={submit}>
                <Send className="w-4 h-4 mr-1" />
                Submit Ticket
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Contact channels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-5 flex items-center gap-3">
            <div className="p-3 bg-primary/10 text-primary rounded-lg"><Mail className="w-5 h-5" /></div>
            <div>
              <p className="text-sm text-muted-foreground">Email Support</p>
              <p className="font-semibold">support@homegenie.com</p>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-5 flex items-center gap-3">
            <div className="p-3 bg-success/10 text-success rounded-lg"><Phone className="w-5 h-5" /></div>
            <div>
              <p className="text-sm text-muted-foreground">Helpline</p>
              <p className="font-semibold">+91 1800-123-456</p>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-5 flex items-center gap-3">
            <div className="p-3 bg-info/10 text-info rounded-lg"><Clock className="w-5 h-5" /></div>
            <div>
              <p className="text-sm text-muted-foreground">Response Time</p>
              <p className="font-semibold">Within 24 hours</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Ticket list */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <LifeBuoy className="w-5 h-5 text-primary" /> My Tickets
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs value={tab} onValueChange={setTab}>
              <TabsList className="w-full grid grid-cols-4">
                <TabsTrigger value="all">All ({counts.all})</TabsTrigger>
                <TabsTrigger value="open">Open ({counts.open})</TabsTrigger>
                <TabsTrigger value="in-review">Review ({counts["in-review"]})</TabsTrigger>
                <TabsTrigger value="resolved">Done ({counts.resolved})</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
              {filtered.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground text-sm">
                  <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  No tickets yet. Raise one to get started.
                </div>
              ) : (
                filtered.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTicketId(t.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      activeTicketId === t.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted/40"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-mono text-[10px] text-muted-foreground">#{t.id}</span>
                      <StatusBadge status={t.status} />
                    </div>
                    <p className="font-medium text-sm line-clamp-1">{t.subject}</p>
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant="outline" className="text-[10px]">{t.category}</Badge>
                      <span className="text-[10px] text-muted-foreground">{t.updatedAt}</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Conversation */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-lg">{activeTicket ? activeTicket.subject : "Select a ticket"}</CardTitle>
          </CardHeader>
          <CardContent>
            {!activeTicket ? (
              <div className="text-center py-16 text-muted-foreground">
                <ArrowRight className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Pick a ticket from the list to view the conversation.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  <span className="font-mono text-muted-foreground">#{activeTicket.id}</span>
                  <StatusBadge status={activeTicket.status} />
                  <Badge variant={activeTicket.priority === "high" ? "destructive" : activeTicket.priority === "medium" ? "default" : "secondary"}>
                    {activeTicket.priority} priority
                  </Badge>
                  <Badge variant="outline">{activeTicket.category}</Badge>
                </div>

                <div className="bg-muted/40 p-4 rounded-lg border border-border">
                  <p className="text-xs text-muted-foreground mb-1">Original request • {activeTicket.createdAt}</p>
                  <p className="text-sm whitespace-pre-wrap">{activeTicket.description}</p>
                </div>

                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                  {activeTicket.replies.length === 0 ? (
                    <p className="text-center text-xs text-muted-foreground py-4">Awaiting response from HomeGenie support team…</p>
                  ) : (
                    activeTicket.replies.map((r) => (
                      <div
                        key={r.id}
                        className={`flex ${r.authorRole === "provider" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            r.authorRole === "provider"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-foreground"
                          }`}
                        >
                          <p className="text-[10px] opacity-70 mb-1">{r.authorRole === "admin" ? "HomeGenie Support" : r.authorName} • {r.timestamp}</p>
                          <p className="text-sm whitespace-pre-wrap">{r.message}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {activeTicket.status !== "resolved" ? (
                  <div className="flex gap-2 pt-2 border-t border-border">
                    <Input
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendReply()}
                      placeholder="Add a reply..."
                    />
                    <Button onClick={sendReply} disabled={!reply.trim()}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <p className="text-xs text-success bg-success/10 p-3 rounded-lg text-center">
                    This ticket has been resolved. Raise a new ticket if you need further help.
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProviderSupport;
