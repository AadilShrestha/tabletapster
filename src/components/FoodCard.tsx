
import { useState } from "react";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FoodCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  onAddToCart: (id: string, quantity: number) => void;
}

const FoodCard = ({
  id,
  name,
  description,
  price,
  image,
  category,
  onAddToCart
}: FoodCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    onAddToCart(id, quantity);
    setQuantity(1);
  };

  return (
    <Card
      className={cn(
        "overflow-hidden card-hover-effect h-full flex flex-col",
        isHovered ? "ring-1 ring-primary/20" : ""
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{
            transform: isHovered ? "scale(1.05)" : "scale(1)"
          }}
        />
        <div className="absolute top-2 right-2">
          <span className="bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded-full">
            ${price.toFixed(2)}
          </span>
        </div>
        <div className="absolute top-2 left-2">
          <span className="bg-secondary/90 text-secondary-foreground text-xs px-2 py-1 rounded-full">
            {category}
          </span>
        </div>
      </div>
      
      <CardContent className="flex-1 flex flex-col p-4 pt-5">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-muted-foreground text-sm mt-1 mb-4 flex-1">{description}</p>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={decreaseQuantity}
            >
              <Minus size={14} />
            </Button>
            <span className="w-8 text-center">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={increaseQuantity}
            >
              <Plus size={14} />
            </Button>
          </div>
          
          <Button
            size="sm"
            className="gap-1"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={14} />
            <span>Add</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FoodCard;
