import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockProviders } from "@/data/mockData";
import StatusBadge from "@/components/shared/StatusBadge";
import { Search, UserPlus, Star, Shield, ShieldOff, Eye } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const AdminProviders = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [tab, setTab] = useState("all");
  const [providers, setProviders] = useState(mockProviders);
  const [showOnboard, setShowOnboard] = useState(false);
  const [newProvider, setNewProvider] = useState({ name: "", email: "", phone: "", category: "" });

  const filtered = providers.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    const matchTab = tab === "all" || (tab === "low-rated" && p.rating < 3.5) || (tab === "unverified" && !p.verified);
    return matchSearch && matchStatus && matchTab;
  });

  const toggleStatus = (id: string) => {
    setProviders(providers.map(p => p.id === id ? { ...p, status: p.status === "active" ? "inactive" : "active" } : p));
  };

  const toggleVerify = (id: string) => {
    setProviders(providers.map(p => p.id === id ? { ...p, verified: !p.verified } : p));
  };

  const onboardProvider = () => {
    if (!newProvider.name || !newProvider.email) return;
    setProviders([...providers, { id: `p${providers.length + 1}`, ...newProvider, rating: 0, jobs: 0, status: "active", verified: false, earnings: 0, joinDate: new Date().toISOString().split("T")[0] }]);
    setNewProvider({ name: "", email: "", phone: "", category: "" });
    setShowOnboard(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Provider Management</h1>
          <p className="text-muted-foreground">Manage service providers and monitor performance</p>
        </div>
        <Dialog open={showOnboard} onOpenChange={setShowOnboard}>
          <DialogTrigger asChild>
            <Button className="gradient-primary text-primary-foreground"><UserPlus className="w-4 h-4 mr-2" />Onboard Provider</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Onboard New Provider</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <Input placeholder="Provider Name" value={newProvider.name} onChange={e => setNewProvider({ ...newProvider, name: e.target.value })} />
              <Input placeholder="Email" type="email" value={newProvider.email} onChange={e => setNewProvider({ ...newProvider, email: e.target.value })} />
              <Input placeholder="Phone" value={newProvider.phone} onChange={e => setNewProvider({ ...newProvider, phone: e.target.value })} />
              <Input placeholder="Category" value={newProvider.category} onChange={e => setNewProvider({ ...newProvider, category: e.target.value })} />
              <Button className="w-full gradient-primary text-primary-foreground" onClick={onboardProvider}>Add Provider</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="all">All Providers</TabsTrigger>
          <TabsTrigger value="low-rated">Low Rated (&lt;3.5★)</TabsTrigger>
          <TabsTrigger value="unverified">Unverified</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search providers..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Provider</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Category</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Rating</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Jobs</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Earnings</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Verified</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4"><Badge variant="secondary">{p.category}</Badge></td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Star className={`w-4 h-4 ${p.rating >= 4 ? "text-warning fill-warning" : p.rating >= 3 ? "text-warning" : "text-destructive"}`} />
                        <span className="font-medium">{p.rating}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{p.jobs}</td>
                    <td className="py-3 px-4 font-semibold">₹{p.earnings.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm" onClick={() => toggleVerify(p.id)}>
                        {p.verified ? <Shield className="w-4 h-4 text-success" /> : <ShieldOff className="w-4 h-4 text-muted-foreground" />}
                      </Button>
                    </td>
                    <td className="py-3 px-4"><StatusBadge status={p.status} /></td>
                    <td className="py-3 px-4">
                      <Button variant={p.status === "active" ? "outline" : "default"} size="sm" onClick={() => toggleStatus(p.id)}>
                        {p.status === "active" ? "Deactivate" : "Activate"}
                      </Button>
                    </td>
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

export default AdminProviders;
