import WaitlistForm from "./WaitlistForm";
import { FaWindows, FaApple, FaLinux } from "react-icons/fa";

interface HeroProps {
  onSuccessfulSignup: () => void;
}

export default function Hero({ onSuccessfulSignup }: HeroProps) {
  return (
    <section className="bg-gradient-to-br from-white to-secondary py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0 lg:pr-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4">
              Ace Your Next Interview with <span className="text-primary">AI</span> Preparation
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Veritas uses advanced AI to simulate real interviews, provide personalized feedback, and help you land your dream job. Available on Windows, Mac, and Linux.
            </p>
            
            <div id="waitlist">
              <WaitlistForm onSuccess={onSuccessfulSignup} />
            </div>
            
            <div className="flex items-center mt-8">
              <span className="text-muted-foreground mr-4">Available on:</span>
              <div className="flex space-x-4">
                <div className="flex items-center" title="Windows">
                  <FaWindows className="text-muted-foreground text-xl" />
                </div>
                <div className="flex items-center" title="macOS">
                  <FaApple className="text-muted-foreground text-xl" />
                </div>
                <div className="flex items-center" title="Linux">
                  <FaLinux className="text-muted-foreground text-xl" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="relative">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80" 
                  alt="Professional using Veritas for interview preparation" 
                  className="w-full"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/80 to-transparent p-6">
                  <div className="text-white">
                    <div className="flex items-center mb-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></div>
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                      <span className="text-xs ml-2">Veritas AI Interview Assistant</span>
                    </div>
                    <p className="text-sm italic opacity-90">"Tell me about a time you had to work under pressure."</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-amber-500 text-white text-sm font-medium px-4 py-2 rounded-full shadow-lg">
                AI-Powered
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
