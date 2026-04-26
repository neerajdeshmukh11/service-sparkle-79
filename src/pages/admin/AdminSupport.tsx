import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatusBadge from "@/components/shared/StatusBadge";
import StatsCard from "@/components/shared/StatsCard";
import { useAppState, SupportTicketStatus } from "@/contexts/AppStateContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { LifeBuoy, Send, MessageSquare, ArrowRight, CheckCircle, Clock, AlertCircle } from "lucide-react";

const AdminSupport = () => {
  const { user } = useAuth();
  const { supportTickets, replySupportTicket, updateSupportTicketStatus } = useAppState();
  const { toast } = useToast();

  const [tab, setTab] = useState<"all" | SupportTicketStatus>("all");
  const [activeTicketId, setActiveTicketId] = useState<string | null>(null);
  const [reply, setReply] = useState("");

  const filtered = supportTickets.filter((t) => tab === "all" || t.status === tab);
  const activeTicket = supportTickets.find((t) => t.id === activeTicketId) || null;

  const counts = {
    all: supportTickets.length,
    open: supportTickets.filter((t) => t.status === "open").length,
    "in-review": supportTickets.filter((t) => t.status === "in-review").length,
    resolved: supportTickets.filter((t) => t.status === "resolved").length,
  };

  const sendReply = () => {
    if (!activeTicket || !user || !reply.trim()) return;
    replySupportTicket(activeTicket.id, "admin", user.name, reply.trim());
    setReply("");
  };

  const setStatus = (status: SupportTicketStatus) => {
    if (!activeTicket) return;
    updateSupportTicketStatus(activeTicket.id, status);
    toast({ title: "Status updated", description: `Ticket #${activeTicket.id} marked as ${status}.` });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Provider Support Tickets</h1>
        <p className="text-muted-foreground">Manage and respond to provider support requests</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Tickets" value={counts.all} icon={LifeBuoy} iconColor="bg-primary/10 text-primary" />
        <StatsCard title="Open" value={counts.open} icon={AlertCircle} iconColor="bg-warning/10 text-warning" />
        <StatsCard title="In Review" value={counts["in-review"]} icon={Clock} iconColor="bg-info/10 text-info" />
        <StatsCard title="Resolved" value={counts.resolved} icon={CheckCircle} iconColor="bg-success/10 text-success" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Ticket list */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <LifeBuoy className="w-5 h-5 text-primary" /> Tickets
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
              <TabsList className="w-full grid grid-cols-4">
                <TabsTrigger value="all">All ({counts.all})</TabsTrigger>
                <TabsTrigger value="open">Open ({counts.open})</TabsTrigger>
                <TabsTrigger value="in-review">Review ({counts["in-review"]})</TabsTrigger>
                <TabsTrigger value="resolved">Done ({counts.resolved})</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
              {filtered.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground text-sm">
                  <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  No tickets in this view.
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
                    <p className="text-xs text-muted-foreground mt-0.5">From: {t.providerName}</p>
                    <div className="flex items-center justify-between mt-2 gap-2">
                      <Badge variant={t.priority === "high" ? "destructive" : t.priority === "medium" ? "default" : "secondary"} className="text-[10px]">
                        {t.priority}
                      </Badge>
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

                <div className="text-xs text-muted-foreground bg-muted/40 p-2 rounded-md">
                  Provider: <strong className="text-foreground">{activeTicket.providerName}</strong> • {activeTicket.providerEmail}
                </div>

                <div className="bg-muted/40 p-4 rounded-lg border border-border">
                  <p className="text-xs text-muted-foreground mb-1">Original request • {activeTicket.createdAt}</p>
                  <p className="text-sm whitespace-pre-wrap">{activeTicket.description}</p>
                </div>

                <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
                  {activeTicket.replies.length === 0 ? (
                    <p className="text-center text-xs text-muted-foreground py-4">No replies yet. Be the first to respond.</p>
                  ) : (
                    activeTicket.replies.map((r) => (
                      <div
                        key={r.id}
                        className={`flex ${r.authorRole === "admin" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            r.authorRole === "admin"
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
                  <>
                    <div className="flex gap-2 pt-2 border-t border-border">
                      <Input
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendReply()}
                        placeholder="Reply to provider..."
                      />
                      <Button onClick={sendReply} disabled={!reply.trim()}>
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      {activeTicket.status === "open" && (
                        <Button variant="outline" size="sm" onClick={() => setStatus("in-review")}>
                          Move to Review
                        </Button>
                      )}
                      <Button size="sm" onClick={() => setStatus("resolved")} className="bg-success text-success-foreground hover:bg-success/90">
                        <CheckCircle className="w-4 h-4 mr-1" /> Mark Resolved
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-border">
                    <p className="text-xs text-success bg-success/10 px-3 py-2 rounded-lg flex-1">
                      This ticket is resolved.
                    </p>
                    <Button variant="outline" size="sm" onClick={() => setStatus("in-review")}>
                      Reopen
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSupport;
