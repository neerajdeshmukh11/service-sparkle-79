import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockChatMessages } from "@/data/mockData";
import { Send, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";

const ProviderChat = () => {
  const [messages, setMessages] = useState(mockChatMessages);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, {
      id: `m${messages.length + 1}`,
      senderId: "p1",
      senderName: "Mike's Plumbing",
      message: newMessage,
      timestamp: new Date().toLocaleString(),
      role: "provider" as const,
    }]);
    setNewMessage("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Chat</h1>
        <p className="text-muted-foreground">Communicate with customers</p>
      </div>

      <Card className="flex flex-col" style={{ height: "calc(100vh - 250px)" }}>
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">A</div>
            <div>
              <h3 className="font-semibold">Alice Johnson</h3>
              <p className="text-xs text-muted-foreground">Booking #b1 • Pipe Repair</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(m => (
            <div key={m.id} className={cn("flex", m.role === "provider" ? "justify-end" : "justify-start")}>
              <div className={cn(
                "max-w-[70%] p-3 rounded-2xl",
                m.role === "provider" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-muted rounded-bl-sm"
              )}>
                <p className="text-sm">{m.message}</p>
                <p className={cn("text-[10px] mt-1", m.role === "provider" ? "text-primary-foreground/70" : "text-muted-foreground")}>{m.timestamp}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Button variant="ghost" size="icon"><Paperclip className="w-4 h-4" /></Button>
            <Input placeholder="Type a message..." value={newMessage} onChange={e => setNewMessage(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()} className="flex-1" />
            <Button onClick={sendMessage} className="gradient-primary text-primary-foreground"><Send className="w-4 h-4" /></Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProviderChat;
