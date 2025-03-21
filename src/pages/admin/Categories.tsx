
import { useState } from "react";
import { PlusCircle, Trash2, Edit, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import AdminSidebar from "@/components/admin/Sidebar";
import { useToast } from "@/hooks/use-toast";

// Mock categories data
const initialCategories = [
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

interface Category {
  id: string;
  name: string;
  image: string;
  itemCount: number;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<Partial<Category>>({
    name: "",
    image: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  
  const handleAddCategory = () => {
    // Validate form
    const newErrors: Record<string, string> = {};
    
    if (!formData.name?.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.image?.trim()) {
      newErrors.image = "Image URL is required";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Add new category
    const newId = (Math.max(...categories.map((category) => parseInt(category.id))) + 1).toString();
    
    const newCategory: Category = {
      id: newId,
      name: formData.name!,
      image: formData.image!,
      itemCount: 0
    };
    
    setCategories([...categories, newCategory]);
    
    // Reset form
    setFormData({
      name: "",
      image: ""
    });
    setErrors({});
    setIsAddDialogOpen(false);
    
    toast({
      title: "Category added",
      description: `"${newCategory.name}" has been added to your categories.`,
    });
  };
  
  const handleEditCategory = () => {
    if (!currentCategory) return;
    
    // Validate form
    const newErrors: Record<string, string> = {};
    
    if (!formData.name?.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.image?.trim()) {
      newErrors.image = "Image URL is required";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Update category
    setCategories(categories.map((category) => 
      category.id === currentCategory.id
        ? {
            ...category,
            name: formData.name!,
            image: formData.image!
          }
        : category
    ));
    
    // Reset form
    setFormData({
      name: "",
      image: ""
    });
    setCurrentCategory(null);
    setErrors({});
    setIsEditDialogOpen(false);
    
    toast({
      title: "Category updated",
      description: `"${formData.name}" has been updated.`,
    });
  };
  
  const handleDeleteCategory = (id: string) => {
    const categoryToDelete = categories.find((category) => category.id === id);
    setCategories(categories.filter((category) => category.id !== id));
    
    toast({
      title: "Category deleted",
      description: `"${categoryToDelete?.name}" has been removed.`,
    });
  };
  
  const openEditDialog = (category: Category) => {
    setCurrentCategory(category);
    setFormData({
      name: category.name,
      image: category.image
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
                <h1 className="text-3xl font-bold">Categories</h1>
                <p className="text-muted-foreground">
                  Manage your restaurant's menu categories
                </p>
              </div>
              
              <Button className="flex items-center gap-2" onClick={() => setIsAddDialogOpen(true)}>
                <PlusCircle size={16} />
                <span>Add Category</span>
              </Button>
            </div>
            
            {/* Categories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <Card key={category.id} className="overflow-hidden animate-scale-in" style={{ animationDelay: `${index * 50}ms` }}>
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                      <div className="text-white">
                        <h3 className="font-medium text-lg">{category.name}</h3>
                        <p className="text-sm opacity-80">{category.itemCount} items</p>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => openEditDialog(category)}
                      >
                        <Edit size={14} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Add Category Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
            <DialogDescription>
              Add a new category to your restaurant's menu
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter category name"
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
              <Label htmlFor="image">Image URL</Label>
              <div className="relative">
                <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
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
                  className={`pl-9 ${errors.image ? "border-destructive" : ""}`}
                />
              </div>
              {errors.image && (
                <p className="text-xs text-destructive">{errors.image}</p>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCategory}>Add Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Category Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Update the details of this category
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                placeholder="Enter category name"
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
              <Label htmlFor="edit-image">Image URL</Label>
              <div className="relative">
                <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
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
                  className={`pl-9 ${errors.image ? "border-destructive" : ""}`}
                />
              </div>
              {errors.image && (
                <p className="text-xs text-destructive">{errors.image}</p>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditCategory}>Update Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Categories;
