import { Play } from "lucide-react";

const showcaseItems = [
  {
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80",
    title: "Professional Interviews",
    description: "Practice with AI that simulates interviews for roles at all levels, from entry to executive."
  },
  {
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80",
    title: "Cross-Platform Experience",
    description: "Use Veritas on any device - prepare on your terms, whether at home or on the go."
  },
  {
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80",
    title: "Detailed Analytics",
    description: "Track your progress with comprehensive reports and identify areas for improvement."
  }
];

export default function ProductShowcase() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">See Veritas in Action</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Prepare for interviews like never before with our intuitive platform
          </p>
        </div>
        
        {/* <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-16">
          <div className="h-96 bg-gray-800 relative">
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/80 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-primary transition duration-300 group">
                  <Play className="text-2xl ml-1 group-hover:scale-110 transition-transform" />
                </div>
                <p className="font-medium">Watch Veritas Demo</p>
              </div>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80" 
              alt="Veritas product demo" 
              className="w-full h-full object-cover opacity-70"
            />
          </div>
        </div> */}
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {showcaseItems.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src={item.image}
                alt={item.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
