import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockCategories, mockSubServices } from "@/data/mockData";
import StatusBadge from "@/components/shared/StatusBadge";
import { Plus, Edit, Trash2, FolderTree } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const AdminCategories = () => {
  const [categories, setCategories] = useState(mockCategories);
  const [subServices, setSubServices] = useState(mockSubServices);
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [showAddCat, setShowAddCat] = useState(false);
  const [showAddSub, setShowAddSub] = useState(false);
  const [newCat, setNewCat] = useState({ name: "", icon: "", description: "" });
  const [newSub, setNewSub] = useState({ name: "", price: "", duration: "" });

  const addCategory = () => {
    if (!newCat.name) return;
    setCategories([...categories, { id: `c₹{categories.length + 1}`, ...newCat, subServices: 0, status: "active" }]);
    setNewCat({ name: "", icon: "", description: "" });
    setShowAddCat(false);
  };

  const addSubService = () => {
    if (!newSub.name || !selectedCat) return;
    setSubServices([...subServices, { id: `ss₹{subServices.length + 1}`, categoryId: selectedCat, name: newSub.name, price: Number(newSub.price), duration: newSub.duration, status: "active" }]);
    setNewSub({ name: "", price: "", duration: "" });
    setShowAddSub(false);
  };

  const deleteCategory = (id: string) => setCategories(categories.filter(c => c.id !== id));
  const filteredSubs = selectedCat ? subServices.filter(s => s.categoryId === selectedCat) : subServices;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Service Categories</h1>
          <p className="text-muted-foreground">Manage categories and sub-services with pricing</p>
        </div>
        <Dialog open={showAddCat} onOpenChange={setShowAddCat}>
          <DialogTrigger asChild>
            <Button className="gradient-primary text-primary-foreground"><Plus className="w-4 h-4 mr-2" />Add Category</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add New Category</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <Input placeholder="Category Name" value={newCat.name} onChange={e => setNewCat({ ...newCat, name: e.target.value })} />
              <Input placeholder="Icon (emoji)" value={newCat.icon} onChange={e => setNewCat({ ...newCat, icon: e.target.value })} />
              <Input placeholder="Description" value={newCat.description} onChange={e => setNewCat({ ...newCat, description: e.target.value })} />
              <Button className="w-full" onClick={addCategory}>Create Category</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map(c => (
          <Card key={c.id} className={`cursor-pointer transition-all hover:shadow-lg ₹{selectedCat === c.id ? "ring-2 ring-primary" : ""}`} onClick={() => setSelectedCat(selectedCat === c.id ? null : c.id)}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="text-3xl mb-2">{c.icon}</div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={e => { e.stopPropagation(); deleteCategory(c.id); }}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <h3 className="font-semibold text-lg">{c.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{c.description}</p>
              <div className="flex items-center gap-2 mt-3">
                <Badge variant="secondary">{c.subServices} services</Badge>
                <StatusBadge status={c.status} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">
            {selectedCat ? `Sub-Services — ₹{categories.find(c => c.id === selectedCat)?.name}` : "All Sub-Services"}
          </CardTitle>
          <Dialog open={showAddSub} onOpenChange={setShowAddSub}>
            <DialogTrigger asChild>
              <Button size="sm" disabled={!selectedCat}><Plus className="w-4 h-4 mr-1" />Add Sub-Service</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Add Sub-Service</DialogTitle></DialogHeader>
              <div className="space-y-4 mt-4">
                <Input placeholder="Service Name" value={newSub.name} onChange={e => setNewSub({ ...newSub, name: e.target.value })} />
                <Input placeholder="Price ($)" type="number" value={newSub.price} onChange={e => setNewSub({ ...newSub, price: e.target.value })} />
                <Input placeholder="Duration" value={newSub.duration} onChange={e => setNewSub({ ...newSub, duration: e.target.value })} />
                <Button className="w-full" onClick={addSubService}>Add Service</Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Service</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Category</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Price</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Duration</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubs.map(s => (
                  <tr key={s.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 font-medium">{s.name}</td>
                    <td className="py-3 px-4"><Badge variant="secondary">{categories.find(c => c.id === s.categoryId)?.name}</Badge></td>
                    <td className="py-3 px-4 font-semibold">₹{s.price}</td>
                    <td className="py-3 px-4 text-muted-foreground">{s.duration}</td>
                    <td className="py-3 px-4"><StatusBadge status={s.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCategories;
