import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockReviews, mockDashboardStats } from "@/data/mockData";
import { Star } from "lucide-react";

const ProviderRatings = () => {
  const stats = mockDashboardStats.provider;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Ratings & Feedback</h1>
        <p className="text-muted-foreground">View your customer reviews and ratings</p>
      </div>

      <Card>
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} className={`w-8 h-8 ${i <= Math.round(stats.rating) ? "text-warning fill-warning" : "text-muted"}`} />
            ))}
          </div>
          <p className="text-4xl font-bold">{stats.rating}</p>
          <p className="text-muted-foreground">Based on {stats.completedJobs} completed jobs</p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {mockReviews.map(r => (
          <Card key={r.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold">{r.customer}</h3>
                  <p className="text-xs text-muted-foreground">{r.date} • Booking #{r.bookingId}</p>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} className={`w-4 h-4 ${i <= r.rating ? "text-warning fill-warning" : "text-muted"}`} />
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{r.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProviderRatings;
