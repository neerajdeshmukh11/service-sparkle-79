import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockProviderJobs } from "@/data/mockData";
import StatusBadge from "@/components/shared/StatusBadge";
import { MapPin, Phone, Clock, Camera, DollarSign, CheckCircle, Play, Navigation } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const ProviderJobs = () => {
  const [jobs, setJobs] = useState(mockProviderJobs);
  const [extraCharge, setExtraCharge] = useState("");

  const updateJobStatus = (id: string, status: string, stage?: string) => {
    setJobs(jobs.map(j => j.id === id ? { ...j, status, ...(stage ? { stage } : {}) } : j));
  };

  const activeJobs = jobs.filter(j => j.status === "accepted" || j.status === "pending");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Jobs</h1>
        <p className="text-muted-foreground">Manage your active and pending job requests</p>
      </div>

      <div className="space-y-4">
        {activeJobs.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">No active jobs at the moment</p>
            </CardContent>
          </Card>
        ) : (
          activeJobs.map(j => (
            <Card key={j.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-semibold text-lg">{j.service}</h3>
                      <StatusBadge status={j.status} />
                      {(j as any).stage && <Badge variant="outline" className="capitalize">{(j as any).stage}</Badge>}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-2"><Clock className="w-4 h-4" />{j.date} at {j.time}</span>
                      <span className="flex items-center gap-2"><MapPin className="w-4 h-4" />{j.address}</span>
                      <span className="flex items-center gap-2"><Phone className="w-4 h-4" />{j.customerPhone}</span>
                      <span className="flex items-center gap-2"><DollarSign className="w-4 h-4" />${j.amount}</span>
                    </div>
                    <p className="text-sm">Customer: <strong>{j.customer}</strong></p>
                  </div>

                  <div className="flex flex-wrap gap-2 shrink-0">
                    {j.status === "pending" && (
                      <>
                        <Button size="sm" className="bg-success text-success-foreground hover:bg-success/90" onClick={() => updateJobStatus(j.id, "accepted", "en-route")}>
                          <CheckCircle className="w-4 h-4 mr-1" />Accept
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => updateJobStatus(j.id, "declined")}>Decline</Button>
                      </>
                    )}
                    {j.status === "accepted" && (j as any).stage === "en-route" && (
                      <>
                        <Button size="sm" variant="outline"><Navigation className="w-4 h-4 mr-1" />Navigate</Button>
                        <Button size="sm" onClick={() => updateJobStatus(j.id, "accepted", "arrived")}>
                          <MapPin className="w-4 h-4 mr-1" />Mark Arrived
                        </Button>
                      </>
                    )}
                    {j.status === "accepted" && (j as any).stage === "arrived" && (
                      <Button size="sm" onClick={() => updateJobStatus(j.id, "accepted", "started")}>
                        <Play className="w-4 h-4 mr-1" />Start Job
                      </Button>
                    )}
                    {j.status === "accepted" && (j as any).stage === "started" && (
                      <>
                        <Dialog>
                          <DialogTrigger asChild><Button size="sm" variant="outline"><Camera className="w-4 h-4 mr-1" />Upload Photos</Button></DialogTrigger>
                          <DialogContent>
                            <DialogHeader><DialogTitle>Upload Before/After Photos</DialogTitle></DialogHeader>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                                <Camera className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                                <p className="text-sm text-muted-foreground">Before Photo</p>
                              </div>
                              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                                <Camera className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                                <p className="text-sm text-muted-foreground">After Photo</p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Dialog>
                          <DialogTrigger asChild><Button size="sm" variant="outline"><DollarSign className="w-4 h-4 mr-1" />Extra Charges</Button></DialogTrigger>
                          <DialogContent>
                            <DialogHeader><DialogTitle>Add Extra Charges</DialogTitle></DialogHeader>
                            <div className="space-y-4 mt-4">
                              <Input placeholder="Amount ($)" type="number" value={extraCharge} onChange={e => setExtraCharge(e.target.value)} />
                              <Input placeholder="Reason" />
                              <Button className="w-full">Add Charge</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button size="sm" className="bg-success text-success-foreground hover:bg-success/90" onClick={() => updateJobStatus(j.id, "completed")}>
                          <CheckCircle className="w-4 h-4 mr-1" />Complete
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ProviderJobs;
