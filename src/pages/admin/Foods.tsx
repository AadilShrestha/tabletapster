
import { useState } from "react";
import { PlusCircle, Trash2, Edit, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import AdminSidebar from "@/components/admin/Sidebar";
import { useToast } from "@/hooks/use-toast";

// Mock categories data
const mockCategories = [
  { id: "1", name: "Appetizers" },
  { id: "2", name: "Main Courses" },
  { id: "3", name: "Desserts" },
  { id: "4", name: "Drinks" }
];

// Mock food data
const initialFoods = [
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

interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  categoryId: string;
}

const Foods = () => {
  const [foods, setFoods] = useState<FoodItem[]>(initialFoods);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentFood, setCurrentFood] = useState<FoodItem | null>(null);
  const [formData, setFormData] = useState<Partial<FoodItem>>({
    name: "",
    description: "",
    price: 0,
    image: "",
    categoryId: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  
  const filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          food.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || food.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  const handleAddFood = () => {
    // Validate form
    const newErrors: Record<string, string> = {};
    
    if (!formData.name?.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.description?.trim()) {
      newErrors.description = "Description is required";
    }
    
    if (!formData.price || formData.price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }
    
    if (!formData.image?.trim()) {
      newErrors.image = "Image URL is required";
    }
    
    if (!formData.categoryId) {
      newErrors.categoryId = "Category is required";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Add new food
    const newId = (Math.max(...foods.map((food) => parseInt(food.id))) + 1).toString();
    const category = mockCategories.find((c) => c.id === formData.categoryId)?.name || "";
    
    const newFood: FoodItem = {
      id: newId,
      name: formData.name!,
      description: formData.description!,
      price: formData.price!,
      image: formData.image!,
      categoryId: formData.categoryId!,
      category
    };
    
    setFoods([...foods, newFood]);
    
    // Reset form
    setFormData({
      name: "",
      description: "",
      price: 0,
      image: "",
      categoryId: ""
    });
    setErrors({});
    setIsAddDialogOpen(false);
    
    toast({
      title: "Food item added",
      description: `"${newFood.name}" has been added to your menu.`,
    });
  };
  
  const handleEditFood = () => {
    if (!currentFood) return;
    
    // Validate form
    const newErrors: Record<string, string> = {};
    
    if (!formData.name?.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.description?.trim()) {
      newErrors.description = "Description is required";
    }
    
    if (!formData.price || formData.price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }
    
    if (!formData.image?.trim()) {
      newErrors.image = "Image URL is required";
    }
    
    if (!formData.categoryId) {
      newErrors.categoryId = "Category is required";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Update food
    const category = mockCategories.find((c) => c.id === formData.categoryId)?.name || "";
    
    setFoods(foods.map((food) => 
      food.id === currentFood.id
        ? {
            ...food,
            name: formData.name!,
            description: formData.description!,
            price: formData.price!,
            image: formData.image!,
            categoryId: formData.categoryId!,
            category
          }
        : food
    ));
    
    // Reset form
    setFormData({
      name: "",
      description: "",
      price: 0,
      image: "",
      categoryId: ""
    });
    setCurrentFood(null);
    setErrors({});
    setIsEditDialogOpen(false);
    
    toast({
      title: "Food item updated",
      description: `"${formData.name}" has been updated.`,
    });
  };
  
  const handleDeleteFood = (id: string) => {
    const foodToDelete = foods.find((food) => food.id === id);
    setFoods(foods.filter((food) => food.id !== id));
    
    toast({
      title: "Food item deleted",
      description: `"${foodToDelete?.name}" has been removed from your menu.`,
    });
  };
  
  const openEditDialog = (food: FoodItem) => {
    setCurrentFood(food);
    setFormData({
      name: food.name,
      description: food.description,
      price: food.price,
      image: food.image,
      categoryId: food.categoryId
    });
    setIsEditDialogOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-muted/20">
      <AdminSidebar />
      
      <div className="flex-1 ml-16 md:ml-64">
        <div className="p-8">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center animate-fade-in">
              <div>
                <h1 className="text-3xl font-bold">Menu Items</h1>
                <p className="text-muted-foreground">
                  Manage your restaurant's menu
                </p>
              </div>
              
              <Button className="flex items-center gap-2" onClick={() => setIsAddDialogOpen(true)}>
                <PlusCircle size={16} />
                <span>Add Item</span>
              </Button>
            </div>
            
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 animate-fade-in">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                <Input
                  placeholder="Search menu items..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="w-full md:w-64">
                <Select
                  value={selectedCategory || ""}
                  onValueChange={(value) => setSelectedCategory(value || null)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    {mockCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Food Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFoods.length === 0 ? (
                <div className="col-span-full text-center py-12 text-muted-foreground animate-fade-in">
                  No menu items match your search.
                </div>
              ) : (
                filteredFoods.map((food, index) => (
                  <Card key={food.id} className="overflow-hidden animate-scale-in" style={{ animationDelay: `${index * 50}ms` }}>
                    <div className="aspect-[16/9] relative">
                      <img
                        src={food.image}
                        alt={food.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-primary/90 text-primary-foreground">
                          ${food.price.toFixed(2)}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{food.name}</CardTitle>
                        <Badge variant="outline">{food.category}</Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {food.description}
                      </p>
                      
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => openEditDialog(food)}
                        >
                          <Edit size={14} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => handleDeleteFood(food.id)}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Add Food Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Menu Item</DialogTitle>
            <DialogDescription>
              Add a new item to your restaurant's menu
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter item name"
                value={formData.name}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, name: e.target.value }));
                  if (errors.name) {
                    setErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors.name;
                      return newErrors;
                    });
                  }
                }}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter item description"
                value={formData.description}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, description: e.target.value }));
                  if (errors.description) {
                    setErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors.description;
                      return newErrors;
                    });
                  }
                }}
                className={errors.description ? "border-destructive" : ""}
              />
              {errors.description && (
                <p className="text-xs text-destructive">{errors.description}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                placeholder="Enter price"
                value={formData.price || ""}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, price: parseFloat(e.target.value) }));
                  if (errors.price) {
                    setErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors.price;
                      return newErrors;
                    });
                  }
                }}
                className={errors.price ? "border-destructive" : ""}
                step="0.01"
                min="0"
              />
              {errors.price && (
                <p className="text-xs text-destructive">{errors.price}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                placeholder="Enter image URL"
                value={formData.image}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, image: e.target.value }));
                  if (errors.image) {
                    setErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors.image;
                      return newErrors;
                    });
                  }
                }}
                className={errors.image ? "border-destructive" : ""}
              />
              {errors.image && (
                <p className="text-xs text-destructive">{errors.image}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.categoryId}
                onValueChange={(value) => {
                  setFormData((prev) => ({ ...prev, categoryId: value }));
                  if (errors.categoryId) {
                    setErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors.categoryId;
                      return newErrors;
                    });
                  }
                }}
              >
                <SelectTrigger className={errors.categoryId ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {mockCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.categoryId && (
                <p className="text-xs text-destructive">{errors.categoryId}</p>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddFood}>Add Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Food Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Menu Item</DialogTitle>
            <DialogDescription>
              Update the details of this menu item
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                placeholder="Enter item name"
                value={formData.name}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, name: e.target.value }));
                  if (errors.name) {
                    setErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors.name;
                      return newErrors;
                    });
                  }
                }}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                placeholder="Enter item description"
                value={formData.description}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, description: e.target.value }));
                  if (errors.description) {
                    setErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors.description;
                      return newErrors;
                    });
                  }
                }}
                className={errors.description ? "border-destructive" : ""}
              />
              {errors.description && (
                <p className="text-xs text-destructive">{errors.description}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-price">Price ($)</Label>
              <Input
                id="edit-price"
                type="number"
                placeholder="Enter price"
                value={formData.price || ""}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, price: parseFloat(e.target.value) }));
                  if (errors.price) {
                    setErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors.price;
                      return newErrors;
                    });
                  }
                }}
                className={errors.price ? "border-destructive" : ""}
                step="0.01"
                min="0"
              />
              {errors.price && (
                <p className="text-xs text-destructive">{errors.price}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-image">Image URL</Label>
              <Input
                id="edit-image"
                placeholder="Enter image URL"
                value={formData.image}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, image: e.target.value }));
                  if (errors.image) {
                    setErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors.image;
                      return newErrors;
                    });
                  }
                }}
                className={errors.image ? "border-destructive" : ""}
              />
              {errors.image && (
                <p className="text-xs text-destructive">{errors.image}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-category">Category</Label>
              <Select
                value={formData.categoryId}
                onValueChange={(value) => {
                  setFormData((prev) => ({ ...prev, categoryId: value }));
                  if (errors.categoryId) {
                    setErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors.categoryId;
                      return newErrors;
                    });
                  }
                }}
              >
                <SelectTrigger className={errors.categoryId ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {mockCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.categoryId && (
                <p className="text-xs text-destructive">{errors.categoryId}</p>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditFood}>Update Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Foods;
