import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xl">V</span>
            </div>
            <span className="ml-3 text-xl font-bold text-primary">Veritas</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-primary font-medium">Features</a>
            <a href="#pricing" className="text-muted-foreground hover:text-primary font-medium">Pricing</a>
            <a href="#faq" className="text-muted-foreground hover:text-primary font-medium">FAQ</a>
          </div>
          
          <div>
            <a href="#waitlist" className="hidden md:inline-block">
              <Button>Join Waitlist</Button>
            </a>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[80%] sm:w-[350px]">
                <div className="flex flex-col gap-6 mt-6">
                  <a href="#features" className="text-muted-foreground hover:text-primary font-medium text-lg">Features</a>
                  <a href="#pricing" className="text-muted-foreground hover:text-primary font-medium text-lg">Pricing</a>
                  <a href="#faq" className="text-muted-foreground hover:text-primary font-medium text-lg">FAQ</a>
                  <a href="#waitlist">
                    <Button className="w-full mt-4">Join Waitlist</Button>
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
