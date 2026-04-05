import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockCategories, mockSubServices, mockBookings } from "@/data/mockData";
import { Search, Star, Calendar, MapPin, Clock, Camera, CreditCard, MessageCircle, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import StatusBadge from "@/components/shared/StatusBadge";
import StatsCard from "@/components/shared/StatsCard";
import { mockDashboardStats } from "@/data/mockData";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { mockChatMessages } from "@/data/mockData";
import { Send, Paperclip, Bot, Phone, Mail, HelpCircle } from "lucide-react";

// ===== Customer Home =====
export const CustomerHome = () => {
  const stats = mockDashboardStats.customer;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome back! 👋</h1>
        <p className="text-muted-foreground">Find and book trusted home services</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Bookings" value={stats.totalBookings} icon={Calendar} iconColor="bg-primary/10 text-primary" />
        <StatsCard title="Active" value={stats.activeBookings} icon={Clock} iconColor="bg-info/10 text-info" />
        <StatsCard title="Completed" value={stats.completedBookings} icon={Star} iconColor="bg-success/10 text-success" />
        <StatsCard title="Total Spent" value={`$${stats.totalSpent}`} icon={CreditCard} iconColor="bg-warning/10 text-warning" />
      </div>
      <h2 className="text-lg font-semibold mt-4">Popular Services</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {mockCategories.slice(0, 8).map(c => (
          <Card key={c.id} className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1">
            <CardContent className="p-5 text-center">
              <div className="text-4xl mb-3">{c.icon}</div>
              <h3 className="font-semibold">{c.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{c.subServices} services</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ===== Browse Services =====
export const CustomerServices = () => {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const filtered = mockSubServices.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = !selectedCat || s.categoryId === selectedCat;
    return matchSearch && matchCat;
  });
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Browse Services</h1>
        <p className="text-muted-foreground">Explore and book services</p>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search services..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div className="flex gap-2 flex-wrap">
        <Badge variant={!selectedCat ? "default" : "secondary"} className="cursor-pointer" onClick={() => setSelectedCat(null)}>All</Badge>
        {mockCategories.map(c => (
          <Badge key={c.id} variant={selectedCat === c.id ? "default" : "secondary"} className="cursor-pointer" onClick={() => setSelectedCat(c.id)}>
            {c.icon} {c.name}
          </Badge>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(s => (
          <Card key={s.id} className="hover:shadow-lg transition-all">
            <CardContent className="p-5">
              <Badge variant="secondary" className="mb-3">{mockCategories.find(c => c.id === s.categoryId)?.name}</Badge>
              <h3 className="font-semibold text-lg">{s.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">Duration: {s.duration}</p>
              <div className="flex items-center justify-between mt-4">
                <p className="text-2xl font-bold text-primary">${s.price}</p>
                <Dialog>
                  <DialogTrigger asChild><Button className="gradient-primary text-primary-foreground">Book Now</Button></DialogTrigger>
                  <DialogContent>
                    <DialogHeader><DialogTitle>Book {s.name}</DialogTitle></DialogHeader>
                    <div className="space-y-4 mt-4">
                      <p className="text-muted-foreground">Price: <strong>${s.price}</strong> • Duration: {s.duration}</p>
                      <Input type="date" />
                      <Input type="time" />
                      <Input placeholder="Address" />
                      <Textarea placeholder="Describe the issue (optional)" />
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer">
                        <Camera className="w-6 h-6 mx-auto text-muted-foreground mb-1" />
                        <p className="text-sm text-muted-foreground">Upload photos (optional)</p>
                      </div>
                      <Button className="w-full gradient-primary text-primary-foreground">Confirm Booking — ${s.price}</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ===== Customer Bookings =====
export const CustomerBookings = () => {
  const [tab, setTab] = useState("all");
  const customerBookings = mockBookings.filter(b => b.customerId === "u1" || b.customerId === "u2");
  const filtered = customerBookings.filter(b => tab === "all" || b.status === tab);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Bookings</h1>
        <p className="text-muted-foreground">Track your service bookings</p>
      </div>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="space-y-4">
        {filtered.map(b => (
          <Card key={b.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-lg">{b.service}</h3>
                    <StatusBadge status={b.status} />
                    <StatusBadge status={b.paymentStatus} />
                  </div>
                  <p className="text-sm text-muted-foreground">Provider: <strong>{b.providerName}</strong></p>
                  <p className="text-sm text-muted-foreground">{b.date} at {b.time}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-xl font-bold">${b.amount}</p>
                  {b.status === "completed" && (
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild><Button size="sm" variant="outline"><Star className="w-4 h-4 mr-1" />Rate</Button></DialogTrigger>
                        <DialogContent>
                          <DialogHeader><DialogTitle>Rate Service</DialogTitle></DialogHeader>
                          <div className="space-y-4 mt-4 text-center">
                            <div className="flex justify-center gap-2">{[1,2,3,4,5].map(i => <Star key={i} className="w-8 h-8 text-warning cursor-pointer hover:fill-warning" />)}</div>
                            <Textarea placeholder="Write your feedback..." />
                            <Button className="w-full">Submit Review</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button size="sm" variant="outline"><RotateCcw className="w-4 h-4 mr-1" />Rebook</Button>
                    </div>
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

// ===== Customer Invoices =====
export const CustomerInvoices = () => {
  const paidBookings = mockBookings.filter(b => b.paymentStatus === "paid");
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Invoices</h1>
        <p className="text-muted-foreground">View service charges and payment breakdown</p>
      </div>
      {paidBookings.map(b => (
        <Card key={b.id}>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold">Invoice #{b.id.toUpperCase()}</h3>
                <p className="text-sm text-muted-foreground">{b.date}</p>
              </div>
              <StatusBadge status="paid" />
            </div>
            <div className="space-y-2 text-sm border-t border-border pt-3">
              <div className="flex justify-between"><span className="text-muted-foreground">Service</span><span>{b.service}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Provider</span><span>{b.providerName}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Base Price</span><span>${b.amount}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Extra Charges</span><span>$0</span></div>
              <div className="flex justify-between font-bold text-base border-t border-border pt-2 mt-2"><span>Total</span><span>${b.amount}</span></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// ===== Customer Chat =====
export const CustomerChat = () => {
  const [messages, setMessages] = useState(mockChatMessages);
  const [newMessage, setNewMessage] = useState("");
  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { id: `m${messages.length + 1}`, senderId: "u1", senderName: "Alice Johnson", message: newMessage, timestamp: new Date().toLocaleString(), role: "customer" as const }]);
    setNewMessage("");
  };
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold">Chat</h1><p className="text-muted-foreground">Communicate with your service provider</p></div>
      <Card className="flex flex-col" style={{ height: "calc(100vh - 250px)" }}>
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center text-success font-bold">M</div>
            <div><h3 className="font-semibold">Mike's Plumbing</h3><p className="text-xs text-muted-foreground">Booking #b1 • Pipe Repair</p></div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(m => (
            <div key={m.id} className={cn("flex", m.role === "customer" ? "justify-end" : "justify-start")}>
              <div className={cn("max-w-[70%] p-3 rounded-2xl", m.role === "customer" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-muted rounded-bl-sm")}>
                <p className="text-sm">{m.message}</p>
                <p className={cn("text-[10px] mt-1", m.role === "customer" ? "text-primary-foreground/70" : "text-muted-foreground")}>{m.timestamp}</p>
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

// ===== Customer Support (AI Chatbot) =====
export const CustomerSupport = () => {
  const [messages, setMessages] = useState<{id: string; role: "bot" | "user"; text: string}[]>([
    { id: "1", role: "bot", text: "Hello! 👋 I'm your SmartServ AI assistant. How can I help you today?" },
    { id: "2", role: "bot", text: "I can help you with:\n• Finding services\n• Booking assistance\n• Payment issues\n• Complaint registration\n• Contact support" },
  ]);
  const [input, setInput] = useState("");
  const sendMsg = () => {
    if (!input.trim()) return;
    const userMsg: {id: string; role: "user"; text: string} = { id: Date.now().toString(), role: "user", text: input };
    const botReply: {id: string; role: "bot"; text: string} = { id: (Date.now() + 1).toString(), role: "bot", text: getBotReply(input) };
    setMessages([...messages, userMsg, botReply]);
    setInput("");
  };
  const getBotReply = (msg: string) => {
    const lower = msg.toLowerCase();
    if (lower.includes("book") || lower.includes("service")) return "I'd recommend browsing our services page! We have plumbing, cleaning, electrical and more. Would you like me to guide you through the booking process?";
    if (lower.includes("payment") || lower.includes("refund")) return "For payment issues, I can connect you to our support team. You can also check your invoices in the Invoices section. If you need a refund, please raise a complaint.";
    if (lower.includes("complaint") || lower.includes("issue")) return "I'm sorry to hear that! You can raise a complaint from your booking details. Our team will review and resolve it within 24-48 hours.";
    if (lower.includes("contact") || lower.includes("support") || lower.includes("help")) return "📞 Phone: +1-800-SMART-SERV\n📧 Email: support@smartserv.com\n🕐 Hours: 24/7\n\nYou can also raise a ticket through the complaints section.";
    return "I understand you're asking about \"" + msg + "\". Let me connect you with our support team for detailed assistance. In the meantime, feel free to browse our services or check your bookings!";
  };
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold">AI Support</h1><p className="text-muted-foreground">Get instant help from our AI assistant</p></div>
      <Card className="flex flex-col" style={{ height: "calc(100vh - 250px)" }}>
        <div className="p-4 border-b border-border flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg"><Bot className="w-5 h-5 text-primary" /></div>
          <div><h3 className="font-semibold">SmartServ AI</h3><p className="text-xs text-success">Online</p></div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(m => (
            <div key={m.id} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
              <div className={cn("max-w-[70%] p-3 rounded-2xl whitespace-pre-line", m.role === "user" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-muted rounded-bl-sm")}>
                <p className="text-sm">{m.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-border">
          <div className="flex gap-2 mb-2 flex-wrap">
            {["Find a service", "Payment help", "Raise complaint", "Contact support"].map(q => (
              <Button key={q} variant="outline" size="sm" className="text-xs" onClick={() => { setInput(q); }}>{q}</Button>
            ))}
          </div>
          <div className="flex gap-2">
            <Input placeholder="Ask me anything..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMsg()} className="flex-1" />
            <Button onClick={sendMsg} className="gradient-primary text-primary-foreground"><Send className="w-4 h-4" /></Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

// ===== Customer Profile =====
export const CustomerProfile = () => {
  const [profile, setProfile] = useState({ name: "Alice Johnson", email: "alice@email.com", phone: "+1234567890", address: "456 Customer Ave, NY 10002" });
  const [editing, setEditing] = useState(false);
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold">My Profile</h1></div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Personal Information</CardTitle>
          <Button variant={editing ? "default" : "outline"} size="sm" onClick={() => setEditing(!editing)}>{editing ? "Save" : "Edit"}</Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">A</div>
            <div><h2 className="text-xl font-bold">{profile.name}</h2><p className="text-muted-foreground">{profile.email}</p></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="text-sm font-medium text-muted-foreground block mb-1.5">Name</label><Input value={profile.name} disabled={!editing} onChange={e => setProfile({...profile, name: e.target.value})} /></div>
            <div><label className="text-sm font-medium text-muted-foreground block mb-1.5">Email</label><Input value={profile.email} disabled={!editing} onChange={e => setProfile({...profile, email: e.target.value})} /></div>
            <div><label className="text-sm font-medium text-muted-foreground block mb-1.5">Phone</label><Input value={profile.phone} disabled={!editing} onChange={e => setProfile({...profile, phone: e.target.value})} /></div>
            <div><label className="text-sm font-medium text-muted-foreground block mb-1.5">Address</label><Input value={profile.address} disabled={!editing} onChange={e => setProfile({...profile, address: e.target.value})} /></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
