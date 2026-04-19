import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockPromotions, mockCoupons } from "@/data/mockData";
import StatusBadge from "@/components/shared/StatusBadge";
import { Plus, Tag, Ticket, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const AdminPromotions = () => {
  const [promotions, setPromotions] = useState(mockPromotions);
  const [showAdd, setShowAdd] = useState(false);
  const [newPromo, setNewPromo] = useState({ title: "", description: "", discount: "", type: "percentage", validFrom: "", validTo: "" });

  const addPromo = () => {
    if (!newPromo.title) return;
    setPromotions([...promotions, { id: `promo₹{promotions.length + 1}`, ...newPromo, discount: Number(newPromo.discount), status: "active", usageCount: 0 }]);
    setNewPromo({ title: "", description: "", discount: "", type: "percentage", validFrom: "", validTo: "" });
    setShowAdd(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Promotions</h1>
          <p className="text-muted-foreground">Create and manage promotional offers</p>
        </div>
        <Dialog open={showAdd} onOpenChange={setShowAdd}>
          <DialogTrigger asChild>
            <Button className="gradient-primary text-primary-foreground"><Plus className="w-4 h-4 mr-2" />Create Promotion</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Promotion</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <Input placeholder="Title" value={newPromo.title} onChange={e => setNewPromo({ ...newPromo, title: e.target.value })} />
              <Input placeholder="Description" value={newPromo.description} onChange={e => setNewPromo({ ...newPromo, description: e.target.value })} />
              <Input placeholder="Discount" type="number" value={newPromo.discount} onChange={e => setNewPromo({ ...newPromo, discount: e.target.value })} />
              <div className="grid grid-cols-2 gap-4">
                <Input type="date" value={newPromo.validFrom} onChange={e => setNewPromo({ ...newPromo, validFrom: e.target.value })} />
                <Input type="date" value={newPromo.validTo} onChange={e => setNewPromo({ ...newPromo, validTo: e.target.value })} />
              </div>
              <Button className="w-full" onClick={addPromo}>Create</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {promotions.map(p => (
          <Card key={p.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Tag className="w-5 h-5 text-primary" />
                </div>
                <StatusBadge status={p.status} />
              </div>
              <h3 className="font-semibold text-lg mb-1">{p.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{p.description}</p>
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-primary/10 text-primary border-0 text-lg font-bold">
                  {p.type === "percentage" ? `${p.discount}%` : `₹₹{p.discount}`} OFF
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>Valid: {p.validFrom} to {p.validTo}</p>
                <p>Used: {p.usageCount} times</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminPromotions;
