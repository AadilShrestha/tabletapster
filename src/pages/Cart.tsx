
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import OrderSummary from "@/components/OrderSummary";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

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
  }
];

// Mock cart items
const mockCartItems = [
  {
    id: "1",
    name: "Crispy Calamari",
    price: 12.99,
    quantity: 1
  },
  {
    id: "4",
    name: "Grilled Salmon",
    price: 24.99,
    quantity: 2
  },
  {
    id: "7",
    name: "Craft Beer",
    price: 7.99,
    quantity: 2
  }
];

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const Cart = () => {
  const { id: restaurantId, tableId } = useParams<{ id: string; tableId: string }>();
  const [restaurant, setRestaurant] = useState<any>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderPlacing, setOrderPlacing] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const found = mockRestaurants.find((r) => r.id === restaurantId);
      setRestaurant(found);
      setCartItems(mockCartItems); // In a real app, this would be from localStorage or state
      setLoading(false);
    }, 500);
  }, [restaurantId]);
  
  const handleRemoveItem = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    });
  };
  
  const handleQuantityChange = (itemId: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };
  
  const handleCheckout = () => {
    setOrderPlacing(true);
    
    // Simulate API call
    setTimeout(() => {
      setOrderPlacing(false);
      setOrderSuccess(true);
    }, 1500);
  };
  
  const handleBack = () => {
    navigate(`/restaurant/${restaurantId}/table/${tableId}/menu`);
  };
  
  const handleContinueOrdering = () => {
    setOrderSuccess(false);
    setCartItems([]);
    navigate(`/restaurant/${restaurantId}/table/${tableId}/menu`);
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
            <Button onClick={() => navigate("/search")}>Return to Search</Button>
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
            Back to Menu
          </Button>
          
          <div className="mb-10 animate-fade-in">
            <h1 className="text-3xl font-bold">Your Order</h1>
            <p className="text-muted-foreground mt-1">
              {restaurant.name} - Table #{tableId}
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <OrderSummary
              items={cartItems}
              restaurantName={restaurant.name}
              tableNumber={parseInt(tableId as string)}
              onRemoveItem={handleRemoveItem}
              onQuantityChange={handleQuantityChange}
              onCheckout={handleCheckout}
            />
          </div>
          
          {/* Order Success Dialog */}
          <Dialog open={orderSuccess} onOpenChange={(open) => !open && handleContinueOrdering()}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center justify-center text-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                  Order Placed Successfully
                </DialogTitle>
                <DialogDescription className="text-center pt-2">
                  Your order has been sent to the kitchen. You'll be notified when it's ready.
                </DialogDescription>
              </DialogHeader>
              <div className="bg-muted/50 p-4 rounded-md my-4">
                <p className="font-medium">Order Details:</p>
                <p className="text-sm text-muted-foreground">Restaurant: {restaurant.name}</p>
                <p className="text-sm text-muted-foreground">Table: #{tableId}</p>
              </div>
              <DialogFooter>
                <Button onClick={handleContinueOrdering} className="w-full">
                  Continue Ordering
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* Order Placing Loading Dialog */}
          <Dialog open={orderPlacing}>
            <DialogContent className="sm:max-w-md">
              <div className="flex flex-col items-center justify-center py-8">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/20 mb-4"></div>
                  <div className="h-4 bg-muted w-24 mb-2 rounded"></div>
                  <div className="h-3 bg-muted w-32 rounded"></div>
                </div>
                <p className="mt-4 text-center">Processing your order...</p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
