import { 
  Bot, 
  LineChart, 
  Puzzle, 
  MessageSquare, 
  GraduationCap, 
  RefreshCcw 
} from "lucide-react";

const features = [
  {
    icon: <Bot className="text-primary text-xl" />,
    title: "AI Interview Simulation",
    description: "Practice with our AI that simulates real interviewers from different industries and seniority levels."
  },
  {
    icon: <LineChart className="text-primary text-xl" />,
    title: "Performance Analytics",
    description: "Get detailed feedback on your answers, body language, and speech patterns to improve over time."
  },
  {
    icon: <Puzzle className="text-primary text-xl" />,
    title: "Industry-Specific Questions",
    description: "Practice with questions tailored to your industry, from tech to finance to healthcare."
  },
  {
    icon: <MessageSquare className="text-primary text-xl" />,
    title: "Real-time Feedback",
    description: "Receive immediate insights on your answers to improve on the spot during practice sessions."
  },
  {
    icon: <GraduationCap className="text-primary text-xl" />,
    title: "Learning Resources",
    description: "Access our library of interview guides, answer frameworks, and industry best practices."
  },
  {
    icon: <RefreshCcw className="text-primary text-xl" />,
    title: "Continuous Updates",
    description: "Our AI constantly learns from real interview trends to keep your preparation current."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose Veritas?</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our AI-powered platform transforms the way you prepare for interviews with personalized feedback and realistic simulations.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 hover:shadow-md transition duration-300">
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
