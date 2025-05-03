import { Button } from "@/components/ui/button";
import { FaTwitter, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";

export default function CTA() {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to ace your next interview?</h2>
        <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
          Join thousands of professionals who are preparing smarter with Veritas AI
        </p>
        <a href="#waitlist">
          <Button variant="secondary" size="lg" className="font-medium">
            Join the Waitlist
          </Button>
        </a>
        <div className="mt-8 flex justify-center space-x-6">
          <a href="#" className="text-white/80 hover:text-white transition-colors">
            <FaTwitter className="text-2xl" />
          </a>
          <a href="#" className="text-white/80 hover:text-white transition-colors">
            <FaLinkedin className="text-2xl" />
          </a>
          <a href="#" className="text-white/80 hover:text-white transition-colors">
            <FaFacebook className="text-2xl" />
          </a>
          <a href="#" className="text-white/80 hover:text-white transition-colors">
            <FaInstagram className="text-2xl" />
          </a>
        </div>
      </div>
    </section>
  );
}
