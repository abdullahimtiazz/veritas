import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ProductShowcase from "@/components/ProductShowcase";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { useState } from "react";
import SuccessDialog from "@/components/SuccessDialog";

export default function Home() {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero onSuccessfulSignup={() => setShowSuccessDialog(true)} />
      <Features />
      <ProductShowcase />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
      <SuccessDialog open={showSuccessDialog} onClose={() => setShowSuccessDialog(false)} />
    </div>
  );
}
