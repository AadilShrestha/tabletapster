
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Customer-facing pages
import Index from "./pages/Index";
import RestaurantSearch from "./pages/RestaurantSearch";
import TableSelection from "./pages/TableSelection";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminRegistration from "./pages/AdminRegistration";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminTables from "./pages/admin/Tables";
import AdminFoods from "./pages/admin/Foods";
import AdminCategories from "./pages/admin/Categories";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Customer-facing routes */}
          <Route path="/" element={<Index />} />
          <Route path="/search" element={<RestaurantSearch />} />
          <Route path="/restaurant/:id/tables" element={<TableSelection />} />
          <Route path="/restaurant/:id/table/:tableId/menu" element={<Menu />} />
          <Route path="/restaurant/:id/table/:tableId/cart" element={<Cart />} />
          
          {/* Admin routes */}
          <Route path="/admin/register" element={<AdminRegistration />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/tables" element={<AdminTables />} />
          <Route path="/admin/foods" element={<AdminFoods />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
