
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import TableCard from "@/components/TableCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

// Mock tables data
const mockTables = [
  { id: "1", number: 1, seats: 2, status: "available" },
  { id: "2", number: 2, seats: 4, status: "occupied" },
  { id: "3", number: 3, seats: 2, status: "available" },
  { id: "4", number: 4, seats: 6, status: "reserved" },
  { id: "5", number: 5, seats: 4, status: "available" },
  { id: "6", number: 6, seats: 2, status: "available" },
  { id: "7", number: 7, seats: 8, status: "occupied" },
  { id: "8", number: 8, seats: 2, status: "available" },
];

// Mock restaurant data
const mockRestaurants = [
  {
    id: "1",
    name: "The Rustic Plate",
    location: "123 Main St, Anytown",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    cuisine: "American, Contemporary"
  },
  {
    id: "2",
    name: "Sapore Italiano",
    location: "456 Oak Ave, Somewhere",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    cuisine: "Italian, Pizza"
  },
  {
    id: "3",
    name: "Sakura Garden",
    location: "789 Elm St, Elsewhere",
    image: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    cuisine: "Japanese, Sushi"
  },
  {
    id: "4",
    name: "Spice Route",
    location: "101 Pine Dr, Nowhere",
    image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    cuisine: "Indian, Curry"
  }
];

const TableSelection = () => {
  const { id: restaurantId } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<any>(null);
  const [tables, setTables] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const found = mockRestaurants.find((r) => r.id === restaurantId);
      setRestaurant(found);
      setTables(mockTables);
      setLoading(false);
    }, 500);
  }, [restaurantId]);
  
  const handleTableSelect = (tableId: string) => {
    navigate(`/restaurant/${restaurantId}/table/${tableId}/menu`);
    toast({
      title: "Table selected",
      description: `You've selected table #${tables.find(t => t.id === tableId)?.number}`,
    });
  };
  
  const handleBack = () => {
    navigate("/search");
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse text-primary text-xl">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center px-4">
            <h2 className="text-2xl font-semibold mb-4">Restaurant Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The restaurant you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={handleBack}>Return to Search</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          <Button
            variant="ghost"
            className="mb-6 -ml-3 flex items-center"
            onClick={handleBack}
          >
            <ChevronLeft size={18} className="mr-1" />
            Back to Search
          </Button>
          
          <div className="mb-10 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">{restaurant.name}</h1>
                <p className="text-muted-foreground mt-1">{restaurant.cuisine}</p>
              </div>
              <div className="bg-primary/10 px-3 py-1 rounded-full text-primary text-sm font-medium">
                ★ {restaurant.rating}
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mb-6 animate-fade-in">Select Your Table</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tables.map((table, index) => (
              <div 
                key={table.id} 
                className="animate-scale-in" 
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <TableCard
                  id={table.id}
                  number={table.number}
                  seats={table.seats}
                  status={table.status as "available" | "occupied" | "reserved"}
                  onSelect={() => table.status === "available" && handleTableSelect(table.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TableSelection;
