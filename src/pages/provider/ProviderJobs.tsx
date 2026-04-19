import { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/shared/StatusBadge";
import { MapPin, Phone, Clock, Camera, DollarSign, CheckCircle, Play, Navigation, MessageCircle, Inbox, ImagePlus, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppState, type Booking } from "@/contexts/AppStateContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const fileToDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = reject;
    r.readAsDataURL(file);
  });

const ProviderJobs = () => {
  const { bookings, acceptBooking, declineBooking, updateJobStage, uploadJobImage, completeJob, setActiveChatBookingId } = useAppState();
  const navigate = useNavigate();
  const [tab, setTab] = useState("requests");
  const beforeRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const afterRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const requests = bookings.filter(b => b.status === "awaiting-acceptance" && b.paymentStatus === "paid");
  const active = bookings.filter(b => b.status === "accepted" || b.status === "in-progress");
  const completed = bookings.filter(b => b.status === "completed");

  const list = tab === "requests" ? requests : tab === "active" ? active : completed;

  const openChat = (b: Booking) => {
    setActiveChatBookingId(b.id);
    navigate("/provider/chat");
  };

  const handleImage = async (b: Booking, kind: "before" | "after", file?: File) => {
    if (!file) return;
    const url = await fileToDataUrl(file);
    uploadJobImage(b.id, kind, url);
    toast.success(`${kind === "before" ? "Before" : "After"} image uploaded`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">My Jobs</h1>
          <p className="text-muted-foreground">Manage incoming requests and active jobs</p>
        </div>
        {requests.length > 0 && (
          <Badge className="bg-warning text-warning-foreground gap-1.5 px-3 py-1.5 text-sm">
            <Bell className="w-3.5 h-3.5" /> {requests.length} new request{requests.length > 1 ? "s" : ""}
          </Badge>
        )}
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="requests">New Requests ({requests.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({active.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completed.length})</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        {list.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">
              <Inbox className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No jobs in this category yet.</p>
            </CardContent>
          </Card>
        ) : (
          list.map(j => (
            <Card key={j.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-semibold text-lg">{j.service}</h3>
                      <StatusBadge status={j.status === "awaiting-acceptance" ? "pending" : j.status} />
                      {j.stage && j.stage !== "completed" && <Badge variant="outline" className="capitalize">{j.stage}</Badge>}
                      <StatusBadge status="paid" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-2"><Clock className="w-4 h-4" />{j.date} at {j.time}</span>
                      <span className="flex items-center gap-2"><Phone className="w-4 h-4" />{j.customerPhone}</span>
                      <span className="flex items-center gap-2 col-span-full"><MapPin className="w-4 h-4 shrink-0" />{j.customerAddress}</span>
                      <span className="flex items-center gap-2"><DollarSign className="w-4 h-4" />${j.amount.toFixed(2)}</span>
                    </div>
                    <p className="text-sm">Customer: <strong>{j.customerName}</strong></p>
                    {j.notes && <p className="text-sm text-muted-foreground italic">"{j.notes}"</p>}

                    {(j.beforeImage || j.afterImage) && (
                      <div className="grid grid-cols-2 gap-3 max-w-md">
                        {j.beforeImage && (
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Before</p>
                            <img src={j.beforeImage} alt="Before" className="w-full h-24 object-cover rounded-lg border border-border" />
                          </div>
                        )}
                        {j.afterImage && (
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">After</p>
                            <img src={j.afterImage} alt="After" className="w-full h-24 object-cover rounded-lg border border-border" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 shrink-0">
                    {/* Always show */}
                    {j.status !== "completed" && (
                      <>
                        <Button size="sm" variant="outline" onClick={() => openChat(j)}>
                          <MessageCircle className="w-4 h-4 mr-1.5" /> Chat
                        </Button>
                        <CustomerLocationDialog booking={j} />
                      </>
                    )}

                    {j.status === "awaiting-acceptance" && (
                      <>
                        <Button size="sm" className="bg-success text-success-foreground hover:bg-success/90" onClick={() => { acceptBooking(j.id); toast.success("Job accepted!"); }}>
                          <CheckCircle className="w-4 h-4 mr-1.5" /> Accept
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => { declineBooking(j.id); toast.message("Job declined", { description: "Customer has been refunded." }); }}>
                          Decline
                        </Button>
                      </>
                    )}

                    {j.status === "accepted" && j.stage === "en-route" && (
                      <Button size="sm" onClick={() => updateJobStage(j.id, "arrived")}>
                        <Navigation className="w-4 h-4 mr-1.5" /> Mark Arrived
                      </Button>
                    )}

                    {j.status === "accepted" && j.stage === "arrived" && (
                      <>
                        <Button size="sm" variant="outline" onClick={() => beforeRefs.current[j.id]?.click()}>
                          <ImagePlus className="w-4 h-4 mr-1.5" /> Upload Before
                        </Button>
                        <input type="file" accept="image/*" hidden ref={el => (beforeRefs.current[j.id] = el)} onChange={e => handleImage(j, "before", e.target.files?.[0])} />
                        <Button size="sm" disabled={!j.beforeImage} className="gradient-primary text-primary-foreground" onClick={() => updateJobStage(j.id, "started")}>
                          <Play className="w-4 h-4 mr-1.5" /> Start Job
                        </Button>
                      </>
                    )}

                    {j.status === "in-progress" && j.stage === "started" && (
                      <>
                        <Button size="sm" variant="outline" onClick={() => afterRefs.current[j.id]?.click()}>
                          <Camera className="w-4 h-4 mr-1.5" /> Upload After
                        </Button>
                        <input type="file" accept="image/*" hidden ref={el => (afterRefs.current[j.id] = el)} onChange={e => handleImage(j, "after", e.target.files?.[0])} />
                        <Button size="sm" disabled={!j.afterImage} className="bg-success text-success-foreground hover:bg-success/90" onClick={() => { completeJob(j.id); toast.success("Job marked completed!"); }}>
                          <CheckCircle className="w-4 h-4 mr-1.5" /> Job Completed
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

const CustomerLocationDialog = ({ booking }: { booking: Booking }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button size="sm" variant="outline">
        <MapPin className="w-4 h-4 mr-1.5" /> Customer Location
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" /> Customer Location</DialogTitle>
      </DialogHeader>
      <div className="aspect-video rounded-lg bg-muted flex items-center justify-center border border-border">
        <div className="text-center px-4">
          <MapPin className="w-10 h-10 mx-auto text-primary mb-2" />
          <p className="font-medium">{booking.customerName}</p>
          <p className="text-sm text-muted-foreground mt-1">{booking.customerAddress}</p>
        </div>
      </div>
      <Button variant="outline" className="w-full">
        <Navigation className="w-4 h-4 mr-1.5" /> Open in Maps
      </Button>
    </DialogContent>
  </Dialog>
);

export default ProviderJobs;
