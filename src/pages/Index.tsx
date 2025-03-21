
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UtensilsCrossed, Search, Timer, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({
    hero: false,
    features: false,
    howItWorks: false,
    cta: false
  });

  useEffect(() => {
    setIsVisible({ hero: true });
    
    const observers: IntersectionObserver[] = [];
    
    ["features", "howItWorks", "cta"].forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible((prev) => ({ ...prev, [section]: true }));
              observer.disconnect();
            }
          },
          { threshold: 0.2 }
        );
        
        observer.observe(element);
        observers.push(observer);
      }
    });
    
    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className={`transition-all duration-700 ${isVisible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Order Food <span className="text-primary">Seamlessly</span>, Without Waiting
              </h1>
              <p className="text-xl text-muted-foreground mb-8 md:mb-10">
                TableTapster transforms your dining experience by letting you order directly from your table, eliminating the need for waiters.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/search">
                  <Button size="lg" className="btn-hover-effect">
                    <Search className="mr-2 h-5 w-5" />
                    Find Restaurant
                  </Button>
                </Link>
                <Link to="/admin/register">
                  <Button variant="outline" size="lg" className="btn-hover-effect">
                    Become a Member
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-accent">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-700 ${isVisible.features ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose TableTapster?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform provides a seamless ordering experience for both customers and restaurant owners.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Timer className="h-10 w-10" />,
                title: "Save Time",
                description: "No more waiting for servers to take your order or bring the bill. Everything happens with a few taps."
              },
              {
                icon: <UtensilsCrossed className="h-10 w-10" />,
                title: "Effortless Ordering",
                description: "Browse the full menu with pictures and descriptions, and place your order with ease."
              },
              {
                icon: <CheckCircle className="h-10 w-10" />,
                title: "Order Accuracy",
                description: "Eliminate miscommunications and ensure your order is exactly as you want it."
              }
            ].map((feature, index) => (
              <Card key={index} className={`glass-card card-hover-effect transition-all duration-700 delay-${index * 100} ${isVisible.features ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 rounded-full p-4 inline-flex mb-4">
                    <div className="text-primary">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="howItWorks" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-700 ${isVisible.howItWorks ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Follow these simple steps to enjoy a waiter-free dining experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Find Restaurant",
                description: "Search for your current restaurant on our platform."
              },
              {
                step: "2",
                title: "Select Table",
                description: "Enter your table number to begin the ordering process."
              },
              {
                step: "3",
                title: "Browse & Order",
                description: "Browse the menu and add items to your cart."
              },
              {
                step: "4",
                title: "Enjoy Your Meal",
                description: "Your order is sent to the kitchen and delivered to your table."
              }
            ].map((step, index) => (
              <div key={index} className={`relative transition-all duration-700 delay-${index * 150} ${isVisible.howItWorks ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center text-2xl font-semibold text-primary border border-primary/30 absolute -top-7 left-1/2 transform -translate-x-1/2">
                  {step.step}
                </div>
                <Card className="pt-10 text-center glass-card h-full card-hover-effect mt-7">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section id="cta" className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className={`max-w-3xl mx-auto text-center transition-all duration-700 ${isVisible.cta ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Restaurant?</h2>
            <p className="text-xl opacity-90 mb-8">
              Join TableTapster today and revolutionize your dining service.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/admin/register">
                <Button size="lg" variant="secondary" className="btn-hover-effect text-primary">
                  Become a Member
                </Button>
              </Link>
              <Link to="/search">
                <Button size="lg" variant="outline" className="btn-hover-effect border-white text-white hover:bg-white/10">
                  Find Restaurant
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
