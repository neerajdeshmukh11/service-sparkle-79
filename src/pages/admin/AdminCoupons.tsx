import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockCoupons } from "@/data/mockData";
import StatusBadge from "@/components/shared/StatusBadge";
import { Plus, Ticket, Copy } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState(mockCoupons);
  const [showAdd, setShowAdd] = useState(false);
  const [newCoupon, setNewCoupon] = useState({ code: "", discount: "", type: "percentage", minOrder: "", maxDiscount: "", validTo: "", maxUsage: "" });
  const { toast } = useToast();

  const addCoupon = () => {
    if (!newCoupon.code) return;
    setCoupons([...coupons, { id: `coup${coupons.length + 1}`, ...newCoupon, discount: Number(newCoupon.discount), minOrder: Number(newCoupon.minOrder), maxDiscount: Number(newCoupon.maxDiscount), maxUsage: Number(newCoupon.maxUsage), status: "active", usageCount: 0 }]);
    setNewCoupon({ code: "", discount: "", type: "percentage", minOrder: "", maxDiscount: "", validTo: "", maxUsage: "" });
    setShowAdd(false);
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({ title: "Copied!", description: `Code ₹{code} copied to clipboard` });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Coupon Management</h1>
          <p className="text-muted-foreground">Create and manage discount coupons</p>
        </div>
        <Dialog open={showAdd} onOpenChange={setShowAdd}>
          <DialogTrigger asChild>
            <Button className="gradient-primary text-primary-foreground"><Plus className="w-4 h-4 mr-2" />Create Coupon</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Coupon</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <Input placeholder="Coupon Code (e.g. SAVE20)" value={newCoupon.code} onChange={e => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })} />
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Discount" type="number" value={newCoupon.discount} onChange={e => setNewCoupon({ ...newCoupon, discount: e.target.value })} />
                <Input placeholder="Max Discount ($)" type="number" value={newCoupon.maxDiscount} onChange={e => setNewCoupon({ ...newCoupon, maxDiscount: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Min Order ($)" type="number" value={newCoupon.minOrder} onChange={e => setNewCoupon({ ...newCoupon, minOrder: e.target.value })} />
                <Input placeholder="Max Usage" type="number" value={newCoupon.maxUsage} onChange={e => setNewCoupon({ ...newCoupon, maxUsage: e.target.value })} />
              </div>
              <Input type="date" value={newCoupon.validTo} onChange={e => setNewCoupon({ ...newCoupon, validTo: e.target.value })} />
              <Button className="w-full" onClick={addCoupon}>Create Coupon</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-x-auto">
        <Card>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Code</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Discount</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Min Order</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Max Discount</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Usage</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Valid Until</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Copy</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map(c => (
                  <tr key={c.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4">
                      <code className="bg-muted px-2 py-1 rounded font-bold">{c.code}</code>
                    </td>
                    <td className="py-3 px-4 font-semibold">{c.type === "percentage" ? `${c.discount}%` : `₹${c.discount}`}</td>
                    <td className="py-3 px-4">₹{c.minOrder}</td>
                    <td className="py-3 px-4">₹{c.maxDiscount}</td>
                    <td className="py-3 px-4">{c.usageCount}/{c.maxUsage}</td>
                    <td className="py-3 px-4 text-muted-foreground">{c.validTo}</td>
                    <td className="py-3 px-4"><StatusBadge status={c.status} /></td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="icon" onClick={() => copyCode(c.code)}>
                        <Copy className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminCoupons;
