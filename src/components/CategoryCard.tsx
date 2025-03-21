
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  id: string;
  name: string;
  image: string;
  itemCount: number;
  selected?: boolean;
  onClick?: () => void;
}

const CategoryCard = ({
  id,
  name,
  image,
  itemCount,
  selected = false,
  onClick
}: CategoryCardProps) => {
  return (
    <Card
      className={cn(
        "overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-md card-hover-effect",
        selected ? "ring-2 ring-primary" : ""
      )}
      onClick={onClick}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
          <div className="text-white">
            <h3 className="font-medium text-lg">{name}</h3>
            <p className="text-sm opacity-80">{itemCount} items</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CategoryCard;
