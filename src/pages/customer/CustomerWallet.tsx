import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wallet, Plus, ArrowDownLeft, ArrowUpRight, CreditCard, Building2, Smartphone, ArrowLeft, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { useAppState } from "@/contexts/AppStateContext";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const QUICK_AMOUNTS = [50, 100, 200, 500];
const METHODS = [
  { id: "card", label: "Credit / Debit Card", icon: CreditCard },
  { id: "upi", label: "UPI", icon: Smartphone },
  { id: "bank", label: "Bank Transfer", icon: Building2 },
];

const CustomerWallet = () => {
  const { walletBalance, walletTransactions, addMoneyToWallet } = useAppState();
  const navigate = useNavigate();
  const location = useLocation();
  const cameFromBookings = location.state?.from === "bookings";

  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("card");

  const handleAdd = () => {
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    addMoneyToWallet(amt, METHODS.find((m) => m.id === method)?.label || method);
    toast.success(`₹${amt.toFixed(2)} added to your wallet`, {
      description: "You can now complete your pending payments.",
    });
    setOpen(false);
    setAmount("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">My Wallet</h1>
          <p className="text-muted-foreground">Manage your balance and view transactions</p>
        </div>
        {cameFromBookings && (
          <Button variant="outline" onClick={() => navigate("/customer/bookings")}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Bookings
          </Button>
        )}
      </div>

      {/* Balance card */}
      <Card className="overflow-hidden border-0 shadow-xl">
        <div className="gradient-primary p-6 text-primary-foreground relative">
          <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-primary-foreground/10 blur-2xl" />
          <div className="absolute -left-4 -bottom-12 w-48 h-48 rounded-full bg-primary-foreground/10 blur-2xl" />
          <div className="relative flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 text-primary-foreground/80 text-sm mb-2">
                <Wallet className="w-4 h-4" />
                <span>Available Balance</span>
              </div>
              <p className="text-5xl font-bold tracking-tight">₹{walletBalance.toFixed(2)}</p>
              <p className="text-primary-foreground/70 text-sm mt-2">HomeGenie Wallet • Ready to pay</p>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-card text-foreground hover:bg-card/90 shadow-lg">
                  <Plus className="w-4 h-4 mr-2" /> Add Money
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" /> Add Money to Wallet
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-5 mt-2">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Amount</label>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="text-lg h-12"
                    />
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {QUICK_AMOUNTS.map((a) => (
                        <Button key={a} type="button" variant="outline" size="sm" onClick={() => setAmount(String(a))}>
                          ₹{a}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Payment Method</label>
                    <div className="grid grid-cols-1 gap-2">
                      {METHODS.map((m) => {
                        const Icon = m.icon;
                        const active = method === m.id;
                        return (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => setMethod(m.id)}
                            className={cn(
                              "flex items-center gap-3 p-3 rounded-lg border-2 transition-all text-left",
                              active ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                            )}
                          >
                            <div className={cn("p-2 rounded-lg", active ? "bg-primary text-primary-foreground" : "bg-muted")}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="font-medium text-sm">{m.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button onClick={handleAdd} className="gradient-primary text-primary-foreground">
                    Add ₹{amount || "0"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </Card>

      {/* Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          {walletTransactions.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Wallet className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No transactions yet. Add money to get started.</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {walletTransactions.map((t) => (
                <div key={t.id} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "p-2 rounded-full",
                        t.type === "credit" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                      )}
                    >
                      {t.type === "credit" ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{t.description}</p>
                      <p className="text-xs text-muted-foreground">{t.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={cn(
                        "font-semibold",
                        t.type === "credit" ? "text-success" : "text-foreground"
                      )}
                    >
                      {t.type === "credit" ? "+" : "−"}${t.amount.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">Bal: ₹{t.balanceAfter.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerWallet;
