import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockCategories } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const ProviderServices = () => {
  const [selected, setSelected] = useState(["c1", "c5"]);

  const toggle = (id: string) => {
    setSelected(selected.includes(id) ? selected.filter(s => s !== id) : [...selected, id]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Services</h1>
          <p className="text-muted-foreground">Select service categories you offer</p>
        </div>
        <Button className="gradient-primary text-primary-foreground">Save Changes</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockCategories.map(c => (
          <Card key={c.id} className={`cursor-pointer transition-all hover:shadow-lg ₹{selected.includes(c.id) ? "ring-2 ring-primary bg-primary/5" : ""}`} onClick={() => toggle(c.id)}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="text-3xl mb-2">{c.icon}</div>
                <Checkbox checked={selected.includes(c.id)} />
              </div>
              <h3 className="font-semibold text-lg">{c.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{c.description}</p>
              <Badge variant="secondary" className="mt-3">{c.subServices} sub-services</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProviderServices;
