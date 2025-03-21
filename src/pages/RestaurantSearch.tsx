
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

const RestaurantSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  const filteredRestaurants = mockRestaurants.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSelectRestaurant = (restaurantId: string) => {
    navigate(`/restaurant/${restaurantId}/tables`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto mb-12">
            <h1 className="text-3xl font-bold mb-8 text-center animate-fade-in">Find Your Restaurant</h1>
            
            <div className="relative animate-slide-in">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                type="text"
                placeholder="Search by restaurant name, cuisine, or location..."
                className="pl-10 h-12"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {filteredRestaurants.length === 0 ? (
            <div className="text-center text-muted-foreground py-12 animate-fade-in">
              No restaurants found matching your search.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.map((restaurant, index) => (
                <Card 
                  key={restaurant.id} 
                  className="overflow-hidden card-hover-effect cursor-pointer h-full animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => handleSelectRestaurant(restaurant.id)}
                >
                  <div className="aspect-[16/9] relative">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium">
                      ★ {restaurant.rating}
                    </div>
                  </div>
                  
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-xl mb-1">{restaurant.name}</h3>
                    <p className="text-primary font-medium text-sm mb-3">{restaurant.cuisine}</p>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <MapPin size={14} className="mr-1" />
                      <span>{restaurant.location}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RestaurantSearch;
