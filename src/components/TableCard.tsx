
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TableCardProps {
  id: string;
  number: number;
  seats: number;
  status: "available" | "occupied" | "reserved";
  onSelect?: () => void;
}

const TableCard = ({
  id,
  number,
  seats,
  status,
  onSelect
}: TableCardProps) => {
  const statusColors = {
    available: "bg-green-100 text-green-800 border-green-200",
    occupied: "bg-red-100 text-red-800 border-red-200",
    reserved: "bg-amber-100 text-amber-800 border-amber-200"
  };
  
  const statusText = {
    available: "Available",
    occupied: "Occupied",
    reserved: "Reserved"
  };

  return (
    <Card className="overflow-hidden card-hover-effect h-full flex flex-col">
      <CardContent className="flex flex-col p-6 h-full">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-2xl">Table {number}</h3>
            <p className="text-muted-foreground">{seats} seats</p>
          </div>
          <div className={cn("px-3 py-1 rounded-full text-xs font-medium", statusColors[status])}>
            {statusText[status]}
          </div>
        </div>
        
        <div className="flex-1 flex items-center justify-center py-4">
          <div className="w-32 h-32 rounded-full border-2 border-primary/30 flex items-center justify-center">
            <span className="text-5xl font-light text-primary/80">{number}</span>
          </div>
        </div>
        
        <Button 
          onClick={onSelect} 
          disabled={status !== "available"}
          className="w-full mt-4"
        >
          {status === "available" ? "Select Table" : "Not Available"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default TableCard;
