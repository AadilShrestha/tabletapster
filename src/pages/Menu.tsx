
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import FoodCard from "@/components/FoodCard";
import CategoryCard from "@/components/CategoryCard";
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

// Mock categories data
const mockCategories = [
  {
    id: "1",
    name: "Appetizers",
    image: "https://images.unsplash.com/photo-1626200423672-b4d52bf541a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    itemCount: 6
  },
  {
    id: "2",
    name: "Main Courses",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    itemCount: 8
  },
  {
    id: "3",
    name: "Desserts",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    itemCount: 4
  },
  {
    id: "4",
    name: "Drinks",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    itemCount: 5
  }
];

// Mock food data
const mockFoods = [
  {
    id: "1",
    name: "Crispy Calamari",
    description: "Lightly fried calamari served with marinara sauce and lemon wedges.",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1603073163308-9654c3fb70b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Appetizers",
    categoryId: "1"
  },
  {
    id: "2",
    name: "Bruschetta",
    description: "Toasted bread topped with diced tomatoes, fresh basil, garlic, and olive oil.",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Appetizers",
    categoryId: "1"
  },
  {
    id: "3",
    name: "Spinach & Artichoke Dip",
    description: "Creamy blend of spinach, artichokes, and cheeses served with tortilla chips.",
    price: 10.99,
    image: "https://images.unsplash.com/photo-1576506295286-5cda18df43e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Appetizers",
    categoryId: "1"
  },
  {
    id: "4",
    name: "Grilled Salmon",
    description: "Fresh salmon fillet grilled to perfection, served with seasonal vegetables and rice pilaf.",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Main Courses",
    categoryId: "2"
  },
  {
    id: "5",
    name: "Ribeye Steak",
    description: "12oz ribeye steak cooked to your preference, with mashed potatoes and asparagus.",
    price: 32.99,
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Main Courses",
    categoryId: "2"
  },
  {
    id: "6",
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a molten center, served with vanilla ice cream.",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Desserts",
    categoryId: "3"
  },
  {
    id: "7",
    name: "Craft Beer",
    description: "Selection of local craft beers. Ask your server for today's options.",
    price: 7.99,
    image: "https://images.unsplash.com/photo-1566633806327-68e152aaf26d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Drinks",
    categoryId: "4"
  }
];

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const Menu = () => {
  const { id: restaurantId, tableId } = useParams<{ id: string; tableId: string }>();
  const [restaurant, setRestaurant] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [foods, setFoods] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("categories");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const found = mockRestaurants.find((r) => r.id === restaurantId);
      setRestaurant(found);
      setCategories(mockCategories);
      setFoods(mockFoods);
      setLoading(false);
    }, 500);
  }, [restaurantId]);
  
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setActiveTab("menu");
  };
  
  const handleAddToCart = (foodId: string, quantity: number) => {
    const foodItem = foods.find((food) => food.id === foodId);
    
    if (foodItem) {
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.id === foodId);
        
        if (existingItem) {
          return prevCart.map((item) =>
            item.id === foodId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          return [
            ...prevCart,
            {
              id: foodId,
              name: foodItem.name,
              price: foodItem.price,
              quantity
            }
          ];
        }
      });
      
      toast({
        title: "Added to cart",
        description: `${quantity} x ${foodItem.name} added to your order.`,
      });
    }
  };
  
  const handleViewCart = () => {
    navigate(`/restaurant/${restaurantId}/table/${tableId}/cart`);
  };
  
  const handleBack = () => {
    if (activeTab === "menu" && selectedCategory) {
      setActiveTab("categories");
      setSelectedCategory(null);
    } else {
      navigate(`/restaurant/${restaurantId}/tables`);
    }
  };

  const filteredFoods = selectedCategory
    ? foods.filter((food) => food.categoryId === selectedCategory)
    : foods;
    
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

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
          <div className="flex justify-between items-center mb-6">
            <Button
              variant="ghost"
              className="-ml-3 flex items-center"
              onClick={handleBack}
            >
              <ChevronLeft size={18} className="mr-1" />
              {activeTab === "menu" && selectedCategory ? "Back to Categories" : "Back to Tables"}
            </Button>
            
            <Button
              variant="outline"
              className="flex items-center"
              onClick={handleViewCart}
              disabled={cart.length === 0}
            >
              <ShoppingCart size={18} className="mr-2" />
              View Cart
              {totalItems > 0 && (
                <Badge className="ml-2 bg-primary">{totalItems}</Badge>
              )}
            </Button>
          </div>
          
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">{restaurant.name}</h1>
                <p className="text-muted-foreground mt-1">Table #{tableId}</p>
              </div>
              <div className="bg-primary/10 px-3 py-1 rounded-full text-primary text-sm font-medium">
                ★ {restaurant.rating}
              </div>
            </div>
          </div>
          
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="animate-fade-in"
          >
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="menu" disabled={!selectedCategory}>
                Menu Items
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="categories" className="mt-0 animate-scale-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category, index) => (
                  <div 
                    key={category.id} 
                    className="animate-scale-in" 
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <CategoryCard
                      id={category.id}
                      name={category.name}
                      image={category.image}
                      itemCount={category.itemCount}
                      onClick={() => handleCategorySelect(category.id)}
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="menu" className="mt-0 animate-scale-in">
              {selectedCategory && (
                <>
                  <h2 className="text-2xl font-semibold mb-6">
                    {categories.find((c) => c.id === selectedCategory)?.name}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredFoods.map((food, index) => (
                      <div 
                        key={food.id} 
                        className="animate-scale-in" 
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <FoodCard
                          id={food.id}
                          name={food.name}
                          description={food.description}
                          price={food.price}
                          image={food.image}
                          category={food.category}
                          onAddToCart={handleAddToCart}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Menu;
