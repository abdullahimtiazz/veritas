import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Basic",
    description: "For occasional job seekers",
    price: "$9",
    period: "/month",
    features: [
      { included: true, text: "5 AI interview sessions per month" },
      { included: true, text: "Basic performance analytics" },
      { included: true, text: "General industry questions" },
      { included: false, text: "Advanced feedback analysis" },
      { included: false, text: "Interview recording & review" }
    ],
    popular: false,
    buttonVariant: "outline" as const
  },
  {
    name: "Professional",
    description: "For active job seekers",
    price: "$19",
    period: "/month",
    features: [
      { included: true, text: "Unlimited AI interview sessions" },
      { included: true, text: "Advanced performance analytics" },
      { included: true, text: "Industry-specific questions" },
      { included: true, text: "Advanced feedback analysis" },
      { included: true, text: "Interview recording & review" }
    ],
    popular: true,
    buttonVariant: "default" as const
  },
  {
    name: "Enterprise",
    description: "For organizations",
    price: "$99",
    period: "/month",
    features: [
      { included: true, text: "Everything in Professional" },
      { included: true, text: "5+ user accounts" },
      { included: true, text: "Custom interview scenarios" },
      { included: true, text: "Company-specific training" },
      { included: true, text: "Admin dashboard & analytics" }
    ],
    popular: false,
    buttonText: "Contact Sales",
    buttonVariant: "outline" as const
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Choose the plan that fits your needs and take your interview preparation to the next level
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`
                bg-white rounded-lg shadow-md overflow-hidden border 
                ${plan.popular ? 'border-2 border-primary transform md:-translate-y-4 z-10' : 'border-gray-100'}
              `}
            >
              {plan.popular && (
                <div className="bg-primary text-white py-2 text-center text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">{plan.name}</h3>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex items-end mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-1 pb-1">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className={`flex items-start ${!feature.included ? 'text-muted-foreground' : ''}`}>
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-gray-400 mr-2 shrink-0" />
                      )}
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
                <Button variant={plan.buttonVariant} className="w-full">
                  {plan.buttonText || "Join Waitlist"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
