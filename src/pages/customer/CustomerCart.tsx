import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Trash2, Calendar, Clock, MapPin, Wallet, MessageCircle, CheckCircle2 } from "lucide-react";
import { useAppState, type CartItem } from "@/contexts/AppStateContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const CustomerCart = () => {
  const { cart, updateCartItem, removeFromCart, clearCart, checkoutCart, walletBalance } = useAppState();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [success, setSuccess] = useState<{ count: number; total: number } | null>(null);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const missing = cart.find(c => !c.date || !c.time || !c.address.trim());
    if (missing) {
      toast.error("Please complete date, time and address for every item");
      return;
    }
    // Create unpaid bookings — payment will happen on the bookings page
    const created = checkoutCart(user?.id || "u1", user?.name || "Customer", "+1234567890");
    setSuccess({ count: created.length, total });
  };

  const chatProvider = (item: CartItem) => {
    // Create a temporary "inquiry" booking-less chat by routing to chat page with cart provider context
    toast.info("Chat available after booking is created. Use 'Chat with Provider' on the booking once added.");
  };

  if (cart.length === 0 && !success) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">My Cart</h1>
          <p className="text-muted-foreground">Review and checkout your selected services</p>
        </div>
        <Card>
          <CardContent className="p-12 text-center text-muted-foreground">
            <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="mb-3">Your cart is empty</p>
            <Button onClick={() => navigate("/customer/services")} className="gradient-primary text-primary-foreground">
              Browse Services
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">My Cart</h1>
          <p className="text-muted-foreground">{cart.length} {cart.length === 1 ? "service" : "services"} ready for checkout</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border shadow-sm">
          <Wallet className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">Wallet:</span>
          <span className="font-semibold">₹{walletBalance.toFixed(2)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
        <div className="space-y-4">
          {cart.map(item => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <Badge variant="secondary">{item.categoryName}</Badge>
                      <h3 className="font-semibold text-lg">{item.serviceName}</h3>
                      <p className="text-sm text-muted-foreground">Provider: <strong className="text-foreground">{item.providerName}</strong> • {item.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">₹{item.price.toFixed(2)}</p>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive mt-1" onClick={() => removeFromCart(item.id)}>
                        <Trash2 className="w-4 h-4 mr-1" /> Remove
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-border">
                    <div>
                      <label className="text-xs font-medium mb-1 block text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" /> Date</label>
                      <Input type="date" value={item.date} onChange={e => updateCartItem(item.id, { date: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-xs font-medium mb-1 block text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> Time</label>
                      <Input type="time" value={item.time} onChange={e => updateCartItem(item.id, { time: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-xs font-medium mb-1 block text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" /> Address</label>
                      <Input placeholder="Service address" value={item.address} onChange={e => updateCartItem(item.id, { address: e.target.value })} />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={() => chatProvider(item)}>
                      <MessageCircle className="w-4 h-4 mr-1.5" /> Chat with Provider
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button variant="outline" onClick={() => navigate("/customer/services")} className="w-full sm:w-auto">
            + Add more services
          </Button>
        </div>

        {/* Summary */}
        <Card className="h-fit sticky top-20">
          <CardContent className="p-5 space-y-4">
            <h3 className="font-semibold text-lg">Order Summary</h3>
            <div className="space-y-2 text-sm">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between gap-2">
                  <span className="text-muted-foreground truncate">{item.serviceName}</span>
                  <span className="font-medium shrink-0">₹{item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Service Fee</span>
                <span>₹0.00</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t border-border pt-2">
                <span>Total</span>
                <span className="text-primary">₹{total.toFixed(2)}</span>
              </div>
            </div>
            <div className={`text-xs px-3 py-2 rounded-lg ${walletBalance >= total ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
              {walletBalance >= total
                ? `✓ Sufficient wallet balance (₹${walletBalance.toFixed(2)})`
                : `Need ₹${(total - walletBalance).toFixed(2)} more in wallet`}
            </div>
            <Button onClick={handleCheckout} className="w-full gradient-primary text-primary-foreground">
              <Wallet className="w-4 h-4 mr-1.5" /> Checkout & Pay ₹{total.toFixed(2)}
            </Button>
            <Button variant="ghost" onClick={clearCart} className="w-full text-destructive hover:text-destructive">
              Clear Cart
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Insufficient balance */}
      <Dialog open={insufficient} onOpenChange={(o) => !o && setInsufficient(false)}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-warning/10 flex items-center justify-center mb-3">
              <AlertTriangle className="w-8 h-8 text-warning" />
            </div>
            <h2 className="text-xl font-bold mb-1">Insufficient Balance</h2>
            <p className="text-muted-foreground mb-4">
              Cart total <strong>₹{total.toFixed(2)}</strong> exceeds your wallet balance of <strong>₹{walletBalance.toFixed(2)}</strong>.
            </p>
            <p className="text-sm text-muted-foreground mb-5">Add money to your wallet to continue.</p>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setInsufficient(false)}>Cancel</Button>
              <Button className="flex-1 gradient-primary text-primary-foreground" onClick={goWallet}>
                <Wallet className="w-4 h-4 mr-1.5" /> Go to Wallet
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success */}
      <Dialog open={!!success} onOpenChange={(o) => { if (!o) { setSuccess(null); navigate("/customer/bookings"); } }}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-4">
            <div className="relative inline-flex mb-4">
              <div className="absolute inset-0 rounded-full bg-success/20 blur-xl animate-pulse" />
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-success to-success/70 flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-10 h-10 text-success-foreground" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-1">Order Placed!</h2>
            <p className="text-muted-foreground mb-5">{success?.count} {success?.count === 1 ? "booking" : "bookings"} confirmed and waiting for provider acceptance.</p>
            <div className="bg-muted/50 rounded-xl p-4 text-left space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Total Paid</span><span className="font-bold text-success">₹{success?.total.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Payment Method</span><span className="font-medium">Wallet</span></div>
            </div>
            <Button className="w-full gradient-primary text-primary-foreground mt-5" onClick={() => { setSuccess(null); navigate("/customer/bookings"); }}>
              View My Bookings
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerCart;
