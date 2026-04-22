import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Paperclip, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppState } from "@/contexts/AppStateContext";
import { useAuth } from "@/contexts/AuthContext";
import StatusBadge from "@/components/shared/StatusBadge";

const ProviderChat = () => {
  const { user } = useAuth();
  const { bookings, activeChatBookingId, setActiveChatBookingId, getBookingChat, sendChatMessage } = useAppState();
  // Show all customer bookings (including unpaid) — customers may want to chat before paying
  const chatBookings = bookings;
  const selectedId = activeChatBookingId && chatBookings.find(b => b.id === activeChatBookingId)
    ? activeChatBookingId
    : chatBookings[0]?.id || null;
  const selected = chatBookings.find(b => b.id === selectedId) || null;

  const [text, setText] = useState("");
  const messages = selected ? getBookingChat(selected.id) : [];

  const send = () => {
    if (!text.trim() || !selected) return;
    sendChatMessage(selected.id, "provider", user?.name || "Provider", text.trim());
    setText("");
  };

  if (chatBookings.length === 0) {
    return (
      <div className="space-y-6">
        <div><h1 className="text-2xl font-bold">Chat</h1><p className="text-muted-foreground">Communicate with customers</p></div>
        <Card><CardContent className="p-12 text-center text-muted-foreground">
          <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No active conversations.</p>
        </CardContent></Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold">Chat</h1><p className="text-muted-foreground">Communicate with customers</p></div>
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4" style={{ height: "calc(100vh - 220px)" }}>
        <Card className="overflow-hidden">
          <div className="p-3 border-b border-border font-semibold text-sm">Conversations</div>
          <div className="overflow-y-auto h-full divide-y divide-border">
            {chatBookings.map(b => (
              <button
                key={b.id}
                onClick={() => setActiveChatBookingId(b.id)}
                className={cn(
                  "w-full text-left p-3 transition-colors hover:bg-muted/50",
                  selectedId === b.id && "bg-primary/5 border-l-2 border-primary"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                    {b.customerName.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm truncate">{b.customerName}</p>
                    <p className="text-xs text-muted-foreground truncate">{b.service}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Card>

        <Card className="flex flex-col overflow-hidden">
          {selected && (
            <>
              <div className="p-4 border-b border-border flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {selected.customerName.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{selected.customerName}</h3>
                  <p className="text-xs text-muted-foreground">Booking #{selected.id} • {selected.service}</p>
                </div>
                <StatusBadge status={selected.status === "awaiting-acceptance" ? "confirmed" : selected.status} />
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/20">
                {messages.length === 0 ? (
                  <div className="text-center text-sm text-muted-foreground py-8">
                    Say hi to {selected.customerName}.
                  </div>
                ) : (
                  messages.map(m => (
                    <div key={m.id} className={cn("flex", m.senderRole === "provider" ? "justify-end" : "justify-start")}>
                      <div className={cn(
                        "max-w-[70%] p-3 rounded-2xl shadow-sm",
                        m.senderRole === "provider" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-card rounded-bl-sm"
                      )}>
                        <p className="text-sm">{m.message}</p>
                        <p className={cn("text-[10px] mt-1", m.senderRole === "provider" ? "text-primary-foreground/70" : "text-muted-foreground")}>{m.timestamp}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="p-3 border-t border-border">
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon"><Paperclip className="w-4 h-4" /></Button>
                  <Input placeholder="Type a message..." value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} className="flex-1" />
                  <Button onClick={send} className="gradient-primary text-primary-foreground"><Send className="w-4 h-4" /></Button>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ProviderChat;
