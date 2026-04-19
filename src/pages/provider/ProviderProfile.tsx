import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, MapPin, Star, Shield, Edit, Save, Camera } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { mockDashboardStats } from "@/data/mockData";

const ProviderProfile = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || "Mike's Plumbing",
    email: user?.email || "mike@plumb.com",
    phone: "+1987654321",
    address: "123 Service Lane, New York, NY 10001",
    bio: "Professional plumber with 10+ years of experience. Specialized in pipe repair, drain cleaning, and water heater installations.",
    categories: ["Plumbing", "Handyman"],
  });

  const stats = mockDashboardStats.provider;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">View and update your profile information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardContent className="p-6 text-center">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-bold mx-auto">
                {profile.name.charAt(0)}
              </div>
              <button className="absolute bottom-0 right-0 p-1.5 bg-primary text-primary-foreground rounded-full">
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>
            <h2 className="text-xl font-bold">{profile.name}</h2>
            <p className="text-muted-foreground text-sm">{profile.email}</p>
            <div className="flex items-center justify-center gap-1 mt-2">
              <Star className="w-5 h-5 text-warning fill-warning" />
              <span className="text-lg font-bold">{stats.rating}</span>
            </div>
            <div className="flex items-center justify-center gap-1 mt-1">
              <Shield className="w-4 h-4 text-success" />
              <span className="text-sm text-success font-medium">Verified</span>
            </div>
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {profile.categories.map(c => (
                <Badge key={c} variant="secondary">{c}</Badge>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-border">
              <div><p className="text-2xl font-bold">{stats.totalJobs}</p><p className="text-xs text-muted-foreground">Total Jobs</p></div>
              <div><p className="text-2xl font-bold">{stats.completedJobs}</p><p className="text-xs text-muted-foreground">Completed</p></div>
              <div><p className="text-2xl font-bold">₹{(stats.totalEarnings / 1000).toFixed(1)}k</p><p className="text-xs text-muted-foreground">Earned</p></div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Profile Details</CardTitle>
            <Button variant={editing ? "default" : "outline"} size="sm" onClick={() => setEditing(!editing)}>
              {editing ? <><Save className="w-4 h-4 mr-1" />Save</> : <><Edit className="w-4 h-4 mr-1" />Edit</>}
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Full Name</label>
                <Input value={profile.name} disabled={!editing} onChange={e => setProfile({ ...profile, name: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Email</label>
                <Input value={profile.email} disabled={!editing} onChange={e => setProfile({ ...profile, email: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Phone</label>
                <Input value={profile.phone} disabled={!editing} onChange={e => setProfile({ ...profile, phone: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Address</label>
                <Input value={profile.address} disabled={!editing} onChange={e => setProfile({ ...profile, address: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Bio</label>
              <textarea
                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                value={profile.bio}
                disabled={!editing}
                onChange={e => setProfile({ ...profile, bio: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProviderProfile;
