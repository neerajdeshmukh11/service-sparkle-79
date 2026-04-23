import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockCategories, mockSubServices, mockProviders } from "@/data/mockData";
import { Search, Star, Calendar, Clock, Camera, CreditCard, RotateCcw, MapPin, MessageCircle, Wallet, CheckCircle2, Download, FileText, AlertTriangle, Sparkles, ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import StatusBadge from "@/components/shared/StatusBadge";
import StatsCard from "@/components/shared/StatsCard";
import { mockDashboardStats } from "@/data/mockData";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Bot, Send, Paperclip } from "lucide-react";
import { useAppState, type Booking } from "@/contexts/AppStateContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { downloadInvoicePdf } from "@/lib/invoice";

// ===== Customer Home =====
export const CustomerHome = () => {
  const stats = mockDashboardStats.customer;
  const { walletBalance, bookings } = useAppState();
  const myBookings = bookings.length;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome back! 👋</h1>
        <p className="text-muted-foreground">Find and book trusted home services</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="My Bookings" value={myBookings || stats.totalBookings} icon={Calendar} iconColor="bg-primary/10 text-primary" />
        <StatsCard title="Active" value={bookings.filter(b => ["awaiting-acceptance","accepted","in-progress"].includes(b.status)).length} icon={Clock} iconColor="bg-info/10 text-info" />
        <StatsCard title="Completed" value={bookings.filter(b => b.status === "completed").length} icon={Star} iconColor="bg-success/10 text-success" />
        <StatsCard title="Wallet Balance" value={`₹${walletBalance.toFixed(2)}`} icon={Wallet} iconColor="bg-warning/10 text-warning" />
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
  const [bookingService, setBookingService] = useState<typeof mockSubServices[0] | null>(null);
  const [cartService, setCartService] = useState<typeof mockSubServices[0] | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const { user } = useAuth();
  const { createBooking, addToCart, cart } = useAppState();
  const navigate = useNavigate();

  const filtered = mockSubServices.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = !selectedCat || s.categoryId === selectedCat;
    return matchSearch && matchCat;
  });

  const resetForm = () => {
    setDate(""); setTime(""); setAddress(""); setNotes("");
  };

  const getProviderForCat = (categoryId: string) => {
    const cat = mockCategories.find(c => c.id === categoryId);
    return mockProviders.find(p => p.category === cat?.name) || mockProviders[0];
  };

  const handleConfirm = () => {
    if (!bookingService) return;
    if (!date || !time || !address.trim()) {
      toast.error("Please fill date, time and address");
      return;
    }
    const cat = mockCategories.find(c => c.id === bookingService.categoryId);
    const provider = getProviderForCat(bookingService.categoryId);
    createBooking({
      customerId: user?.id || "u1",
      customerName: user?.name || "Customer",
      customerPhone: "+1234567890",
      customerAddress: address,
      providerId: provider.id,
      providerName: provider.name,
      providerPhone: provider.phone,
      service: bookingService.name,
      category: cat?.name || "Service",
      date,
      time,
      amount: bookingService.price,
      notes,
    });
    toast.success("Booking request sent!", { description: "The provider will accept or decline shortly. You can chat with them in the meantime." });
    resetForm();
    setBookingService(null);
    navigate("/customer/bookings");
  };

  const handleAddToCart = () => {
    if (!cartService) return;
    if (!date || !time || !address.trim()) {
      toast.error("Please fill date, time and address");
      return;
    }
    const cat = mockCategories.find(c => c.id === cartService.categoryId);
    const provider = getProviderForCat(cartService.categoryId);
    addToCart({
      serviceId: cartService.id,
      serviceName: cartService.name,
      categoryId: cartService.categoryId,
      categoryName: cat?.name || "Service",
      price: cartService.price,
      duration: cartService.duration,
      providerId: provider.id,
      providerName: provider.name,
      providerPhone: provider.phone,
      date,
      time,
      address,
      notes,
    });
    toast.success("Added to cart", { description: `${cartService.name} added. Continue shopping or checkout.` });
    resetForm();
    setCartService(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Browse Services</h1>
          <p className="text-muted-foreground">Explore and book services</p>
        </div>
        <Button variant="outline" onClick={() => navigate("/customer/cart")} className="relative">
          <ShoppingCart className="w-4 h-4 mr-1.5" /> Cart
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[11px] font-bold flex items-center justify-center shadow">
              {cart.length}
            </span>
          )}
        </Button>
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
              <p className="text-2xl font-bold text-primary mt-3">₹{s.price}</p>
              <div className="flex items-center gap-2 mt-4">
                <Button variant="outline" className="flex-1" onClick={() => setCartService(s)}>
                  <ShoppingCart className="w-4 h-4 mr-1.5" /> Add to Cart
                </Button>
                <Button className="flex-1 gradient-primary text-primary-foreground" onClick={() => setBookingService(s)}>Book Now</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Booking dialog */}
      <Dialog open={!!bookingService} onOpenChange={(o) => { if (!o) { setBookingService(null); resetForm(); } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book {bookingService?.name}</DialogTitle>
            <DialogDescription>
              ₹{bookingService?.price} • {bookingService?.duration}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium mb-1 block text-muted-foreground">Date</label>
                <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block text-muted-foreground">Time</label>
                <Input type="time" value={time} onChange={e => setTime(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium mb-1 block text-muted-foreground">Address</label>
              <Input placeholder="Service address" value={address} onChange={e => setAddress(e.target.value)} />
            </div>
            <Textarea placeholder="Describe the issue (optional)" value={notes} onChange={e => setNotes(e.target.value)} />
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Camera className="w-6 h-6 mx-auto text-muted-foreground mb-1" />
              <p className="text-sm text-muted-foreground">Upload photos (optional)</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setBookingService(null); resetForm(); }}>Cancel</Button>
            <Button onClick={handleConfirm} className="gradient-primary text-primary-foreground">
              Send Request to Provider
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add-to-cart dialog */}
      <Dialog open={!!cartService} onOpenChange={(o) => { if (!o) { setCartService(null); resetForm(); } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-primary" /> Add {cartService?.name} to Cart
            </DialogTitle>
            <DialogDescription>
              ₹{cartService?.price} • {cartService?.duration} — schedule details for this service
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium mb-1 block text-muted-foreground">Date</label>
                <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block text-muted-foreground">Time</label>
                <Input type="time" value={time} onChange={e => setTime(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium mb-1 block text-muted-foreground">Address</label>
              <Input placeholder="Service address" value={address} onChange={e => setAddress(e.target.value)} />
            </div>
            <Textarea placeholder="Notes for the provider (optional)" value={notes} onChange={e => setNotes(e.target.value)} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setCartService(null); resetForm(); }}>Cancel</Button>
            <Button onClick={handleAddToCart} className="gradient-primary text-primary-foreground">
              <ShoppingCart className="w-4 h-4 mr-1.5" /> Add to Cart
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// ===== Customer Bookings =====
export const CustomerBookings = () => {
  const [tab, setTab] = useState("all");
  const { bookings, payForBooking, walletBalance, setActiveChatBookingId } = useAppState();
  const navigate = useNavigate();

  const [paySuccess, setPaySuccess] = useState<Booking | null>(null);
  const [insufficient, setInsufficient] = useState<Booking | null>(null);
  const [locationFor, setLocationFor] = useState<Booking | null>(null);
  const [invoiceFor, setInvoiceFor] = useState<Booking | null>(null);
  const [rateFor, setRateFor] = useState<Booking | null>(null);

  const filtered = bookings.filter(b => {
    if (tab === "all") return true;
    if (tab === "pending") return b.status === "awaiting-acceptance" || (b.status === "accepted" && b.paymentStatus === "unpaid");
    if (tab === "active") return (b.status === "accepted" && b.paymentStatus === "paid") || b.status === "in-progress";
    if (tab === "completed") return b.status === "completed";
    return true;
  });

  const handlePay = (b: Booking) => {
    const result = payForBooking(b.id);
    if (result.success) {
      setPaySuccess(b);
    } else if (result.reason === "insufficient") {
      setInsufficient(b);
    }
  };

  const goToWallet = () => {
    setInsufficient(null);
    navigate("/customer/wallet", { state: { from: "bookings" } });
  };

  const openChat = (b: Booking) => {
    setActiveChatBookingId(b.id);
    navigate("/customer/chat");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">My Bookings</h1>
          <p className="text-muted-foreground">Track your service bookings</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border shadow-sm">
          <Wallet className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">Wallet:</span>
          <span className="font-semibold">₹{walletBalance.toFixed(2)}</span>
        </div>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="all">All ({bookings.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        {filtered.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">
              <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="mb-3">No bookings yet</p>
              <Button onClick={() => navigate("/customer/services")} className="gradient-primary text-primary-foreground">
                Browse Services
              </Button>
            </CardContent>
          </Card>
        )}
        {filtered.map(b => (
          <Card key={b.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-lg">{b.service}</h3>
                      <StatusBadge status={
                        b.status === "awaiting-acceptance" ? "pending" :
                        b.status === "accepted" && b.paymentStatus === "unpaid" ? "confirmed" :
                        b.status
                      } />
                      <StatusBadge status={b.paymentStatus} />
                    </div>
                    <p className="text-sm text-muted-foreground">Provider: <strong className="text-foreground">{b.providerName}</strong></p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{b.date} at {b.time}</p>
                  </div>
                  <p className="text-2xl font-bold text-primary">₹{b.amount.toFixed(2)}</p>
                </div>

                {/* Action row */}
                <div className="flex flex-wrap gap-2 pt-3 border-t border-border">
                  {b.status === "awaiting-acceptance" && (
                    <Button size="sm" variant="outline" onClick={() => openChat(b)}>
                      <MessageCircle className="w-4 h-4 mr-1.5" /> Chat with Provider
                    </Button>
                  )}
                  {b.status === "accepted" && b.paymentStatus === "unpaid" && (
                    <>
                      <Button size="sm" className="gradient-primary text-primary-foreground" onClick={() => handlePay(b)}>
                        <Wallet className="w-4 h-4 mr-1.5" /> Pay Now
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => openChat(b)}>
                        <MessageCircle className="w-4 h-4 mr-1.5" /> Chat with Provider
                      </Button>
                    </>
                  )}
                  {b.paymentStatus === "paid" && (b.status === "accepted" || b.status === "in-progress") && (
                    <>
                      <Button size="sm" variant="outline" onClick={() => setLocationFor(b)}>
                        <MapPin className="w-4 h-4 mr-1.5" /> Provider Location
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => openChat(b)}>
                        <MessageCircle className="w-4 h-4 mr-1.5" /> Chat
                      </Button>
                    </>
                  )}
                  {b.paymentStatus === "paid" && (
                    <Button size="sm" variant="outline" onClick={() => setInvoiceFor(b)}>
                      <FileText className="w-4 h-4 mr-1.5" /> View Invoice
                    </Button>
                  )}
                  {b.paymentStatus === "paid" && (
                    <Button size="sm" variant="outline" onClick={() => downloadInvoicePdf(b)}>
                      <Download className="w-4 h-4 mr-1.5" /> Download PDF
                    </Button>
                  )}
                  {b.status === "completed" && (
                    <>
                      <Button size="sm" variant="outline" onClick={() => setRateFor(b)}>
                        <Star className="w-4 h-4 mr-1.5" /> Rate
                      </Button>
                      <Button size="sm" variant="outline">
                        <RotateCcw className="w-4 h-4 mr-1.5" /> Rebook
                      </Button>
                    </>
                  )}
                </div>

                {b.status === "awaiting-acceptance" && (
                  <div className="flex items-center gap-2 text-xs text-info bg-info/5 p-2.5 rounded-lg">
                    <Clock className="w-3.5 h-3.5" />
                    Waiting for the provider to accept your request — you can chat with them in the meantime.
                  </div>
                )}
                {b.status === "accepted" && b.paymentStatus === "unpaid" && (
                  <div className="flex items-center gap-2 text-xs text-warning bg-warning/5 p-2.5 rounded-lg">
                    <Wallet className="w-3.5 h-3.5" />
                    Provider accepted! Pay now to schedule the job.
                  </div>
                )}
                {b.status === "accepted" && b.paymentStatus === "paid" && b.stage === "en-route" && (
                  <div className="flex items-center gap-2 text-xs text-info bg-info/5 p-2.5 rounded-lg">
                    🚗 Provider is on the way to your location.
                  </div>
                )}
                {b.status === "in-progress" && (
                  <div className="flex items-center gap-2 text-xs text-warning bg-warning/5 p-2.5 rounded-lg">
                    🛠 Service in progress…
                  </div>
                )}
                {b.status === "completed" && (b.beforeImage || b.afterImage) && (
                  <div className="grid grid-cols-2 gap-3">
                    {b.beforeImage && (
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Before</p>
                        <img src={b.beforeImage} alt="Before" className="w-full h-28 object-cover rounded-lg border border-border" />
                      </div>
                    )}
                    {b.afterImage && (
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">After</p>
                        <img src={b.afterImage} alt="After" className="w-full h-28 object-cover rounded-lg border border-border" />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payment success */}
      <Dialog open={!!paySuccess} onOpenChange={(o) => !o && setPaySuccess(null)}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-4">
            <div className="relative inline-flex mb-4">
              <div className="absolute inset-0 rounded-full bg-success/20 blur-xl animate-pulse" />
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-success to-success/70 flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-10 h-10 text-success-foreground" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-1">Payment Successful!</h2>
            <p className="text-muted-foreground mb-5">Your booking is confirmed and waiting for provider acceptance.</p>
            <div className="bg-muted/50 rounded-xl p-4 text-left space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Service</span><span className="font-medium">{paySuccess?.service}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Provider</span><span className="font-medium">{paySuccess?.providerName}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Paid via</span><span className="font-medium">Wallet</span></div>
              <div className="flex justify-between text-base pt-2 border-t border-border"><span className="font-semibold">Amount</span><span className="font-bold text-success">₹{paySuccess?.amount.toFixed(2)}</span></div>
            </div>
            <div className="flex gap-2 mt-5">
              <Button variant="outline" className="flex-1" onClick={() => { paySuccess && setInvoiceFor(paySuccess); setPaySuccess(null); }}>
                <FileText className="w-4 h-4 mr-1.5" /> View Invoice
              </Button>
              <Button className="flex-1 gradient-primary text-primary-foreground" onClick={() => setPaySuccess(null)}>Done</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Insufficient balance */}
      <Dialog open={!!insufficient} onOpenChange={(o) => !o && setInsufficient(null)}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-warning/10 flex items-center justify-center mb-3">
              <AlertTriangle className="w-8 h-8 text-warning" />
            </div>
            <h2 className="text-xl font-bold mb-1">Insufficient Balance</h2>
            <p className="text-muted-foreground mb-4">
              You need <strong>₹{insufficient?.amount.toFixed(2)}</strong> but your wallet has only <strong>₹{walletBalance.toFixed(2)}</strong>.
            </p>
            <p className="text-sm text-muted-foreground mb-5">Add money to your wallet to continue with the payment.</p>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setInsufficient(null)}>Cancel</Button>
              <Button className="flex-1 gradient-primary text-primary-foreground" onClick={goToWallet}>
                <Wallet className="w-4 h-4 mr-1.5" /> Go to Wallet
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Provider location placeholder */}
      <Dialog open={!!locationFor} onOpenChange={(o) => !o && setLocationFor(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" /> Provider Location</DialogTitle>
          </DialogHeader>
          <div className="aspect-video rounded-lg bg-muted flex items-center justify-center border border-border">
            <div className="text-center">
              <MapPin className="w-10 h-10 mx-auto text-primary mb-2" />
              <p className="font-medium">{locationFor?.providerName}</p>
              <p className="text-xs text-muted-foreground mt-1">Live location preview</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Invoice preview */}
      <Dialog open={!!invoiceFor} onOpenChange={(o) => !o && setInvoiceFor(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Invoice #{invoiceFor?.id.toUpperCase()}</DialogTitle>
            <DialogDescription>Paid on {invoiceFor?.paidAt}</DialogDescription>
          </DialogHeader>
          {invoiceFor && (
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Service</span><span className="font-medium">{invoiceFor.service}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Provider</span><span className="font-medium">{invoiceFor.providerName}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span>{invoiceFor.date} {invoiceFor.time}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Address</span><span className="text-right max-w-[60%]">{invoiceFor.customerAddress}</span></div>
              <div className="border-t border-border pt-3 space-y-2">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{invoiceFor.amount.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Extra Charges</span><span>₹0.00</span></div>
                <div className="flex justify-between font-bold text-base border-t border-border pt-2"><span>Total Paid</span><span className="text-success">₹{invoiceFor.amount.toFixed(2)}</span></div>
              </div>
              <div className="flex justify-between"><span className="text-muted-foreground">Payment Method</span><span>Wallet</span></div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setInvoiceFor(null)}>Close</Button>
            <Button onClick={() => invoiceFor && downloadInvoicePdf(invoiceFor)} className="gradient-primary text-primary-foreground">
              <Download className="w-4 h-4 mr-1.5" /> Download PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rate */}
      <Dialog open={!!rateFor} onOpenChange={(o) => !o && setRateFor(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Rate Service</DialogTitle></DialogHeader>
          <div className="space-y-4 mt-2 text-center">
            <div className="flex justify-center gap-2">{[1,2,3,4,5].map(i => <Star key={i} className="w-8 h-8 text-warning cursor-pointer hover:fill-warning" />)}</div>
            <Textarea placeholder="Write your feedback..." />
            <Button className="w-full gradient-primary text-primary-foreground" onClick={() => { setRateFor(null); toast.success("Thanks for your review!"); }}>Submit Review</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// ===== Customer Invoices =====
export const CustomerInvoices = () => {
  const { bookings } = useAppState();
  const paidBookings = bookings.filter(b => b.paymentStatus === "paid");
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Invoices</h1>
        <p className="text-muted-foreground">View and download all your invoices</p>
      </div>
      {paidBookings.length === 0 && (
        <Card><CardContent className="p-12 text-center text-muted-foreground">
          <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No invoices yet. Pay for a booking to generate an invoice.</p>
        </CardContent></Card>
      )}
      {paidBookings.map(b => (
        <Card key={b.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <div>
                <h3 className="font-semibold">Invoice #{b.id.toUpperCase()}</h3>
                <p className="text-sm text-muted-foreground">{b.paidAt || b.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status="paid" />
                <Button size="sm" variant="outline" onClick={() => downloadInvoicePdf(b)}>
                  <Download className="w-4 h-4 mr-1.5" /> PDF
                </Button>
              </div>
            </div>
            <div className="space-y-2 text-sm border-t border-border pt-3">
              <div className="flex justify-between"><span className="text-muted-foreground">Service</span><span>{b.service}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Provider</span><span>{b.providerName}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Base Price</span><span>₹{b.amount.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Extra Charges</span><span>₹0.00</span></div>
              <div className="flex justify-between font-bold text-base border-t border-border pt-2 mt-2"><span>Total</span><span>₹{b.amount.toFixed(2)}</span></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// ===== Customer Chat =====
export const CustomerChat = () => {
  const { user } = useAuth();
  const { bookings, activeChatBookingId, setActiveChatBookingId, getBookingChat, sendChatMessage } = useAppState();

  // Allow chat for any booking — customers can chat with provider before paying too
  const chatBookings = bookings;
  const selectedId = activeChatBookingId && chatBookings.find(b => b.id === activeChatBookingId)
    ? activeChatBookingId
    : chatBookings[0]?.id || null;
  const selected = chatBookings.find(b => b.id === selectedId) || null;

  const [text, setText] = useState("");
  const messages = selected ? getBookingChat(selected.id) : [];

  const send = () => {
    if (!text.trim() || !selected) return;
    sendChatMessage(selected.id, "customer", user?.name || "Customer", text.trim());
    setText("");
  };

  if (chatBookings.length === 0) {
    return (
      <div className="space-y-6">
        <div><h1 className="text-2xl font-bold">Chat</h1><p className="text-muted-foreground">Communicate with your service provider</p></div>
        <Card><CardContent className="p-12 text-center text-muted-foreground">
          <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No active chats. Book a service to start chatting with your provider — even before paying.</p>
        </CardContent></Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold">Chat</h1><p className="text-muted-foreground">Communicate with your service provider</p></div>
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
                    {b.providerName.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm truncate">{b.providerName}</p>
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
                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center text-success font-bold">
                  {selected.providerName.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{selected.providerName}</h3>
                  <p className="text-xs text-muted-foreground">Booking #{selected.id} • {selected.service}</p>
                </div>
                <StatusBadge status={selected.status === "awaiting-acceptance" ? "confirmed" : selected.status} />
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/20">
                {messages.length === 0 ? (
                  <div className="text-center text-sm text-muted-foreground py-8">
                    Start the conversation with {selected.providerName}.
                  </div>
                ) : (
                  messages.map(m => (
                    <div key={m.id} className={cn("flex", m.senderRole === "customer" ? "justify-end" : "justify-start")}>
                      <div className={cn(
                        "max-w-[70%] p-3 rounded-2xl shadow-sm",
                        m.senderRole === "customer" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-card rounded-bl-sm"
                      )}>
                        <p className="text-sm">{m.message}</p>
                        <p className={cn("text-[10px] mt-1", m.senderRole === "customer" ? "text-primary-foreground/70" : "text-muted-foreground")}>{m.timestamp}</p>
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

// ===== Customer Support (AI Chatbot) =====
export const CustomerSupport = () => {
  const [messages, setMessages] = useState<{id: string; role: "bot" | "user"; text: string}[]>([
    { id: "1", role: "bot", text: "Hello! 👋 I'm your HomeGenie AI assistant. How can I help you today?" },
    { id: "2", role: "bot", text: "I can help you with:\n• Finding services\n• Booking assistance\n• Payment issues\n• Complaint registration\n• Contact support" },
  ]);
  const [input, setInput] = useState("");
  const sendMsg = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now().toString(), role: "user" as const, text: input };
    const botReply = { id: (Date.now() + 1).toString(), role: "bot" as const, text: getBotReply(input) };
    setMessages([...messages, userMsg, botReply]);
    setInput("");
  };
  const getBotReply = (msg: string) => {
    const lower = msg.toLowerCase();
    if (lower.includes("book") || lower.includes("service")) return "Browse our Services page! We have plumbing, cleaning, electrical and more.";
    if (lower.includes("payment") || lower.includes("refund")) return "For payment issues, check your wallet & invoices. Refunds are processed automatically when a provider declines.";
    if (lower.includes("wallet")) return "Top up your wallet from the Wallet page using card, UPI, or bank transfer.";
    if (lower.includes("complaint") || lower.includes("issue")) return "You can raise a complaint from your booking details. Our team will respond within 24-48 hours.";
    if (lower.includes("contact") || lower.includes("support") || lower.includes("help")) return "📞 +1-800-HOMEGENIE\n📧 support@homegenie.com\n🕐 24/7";
    return "Got it! Let me connect you with our support team. Meanwhile, browse services or check your bookings.";
  };
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold">AI Support</h1><p className="text-muted-foreground">Get instant help from our AI assistant</p></div>
      <Card className="flex flex-col" style={{ height: "calc(100vh - 250px)" }}>
        <div className="p-4 border-b border-border flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg"><Bot className="w-5 h-5 text-primary" /></div>
          <div><h3 className="font-semibold">HomeGenie AI</h3><p className="text-xs text-success">Online</p></div>
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
            {["Find a service", "Payment help", "Wallet", "Contact support"].map(q => (
              <Button key={q} variant="outline" size="sm" className="text-xs" onClick={() => setInput(q)}>{q}</Button>
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
