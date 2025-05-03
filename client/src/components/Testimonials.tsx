import { Star, StarHalf } from "lucide-react";

const testimonials = [
  {
    rating: 5,
    text: "After using Veritas for just two weeks, I felt so much more confident in my interviews. The AI feedback helped me refine my answers and I landed my dream job!",
    initials: "JD",
    name: "Jessica D.",
    title: "Software Engineer"
  },
  {
    rating: 5,
    text: "The industry-specific questions were spot on. I had practiced with Veritas and when I went to my actual interview, I had already prepared for many of the questions they asked.",
    initials: "ML",
    name: "Michael L.",
    title: "Product Manager"
  },
  {
    rating: 4.5,
    text: "As someone who gets nervous in interviews, Veritas was a game-changer. Being able to practice in a realistic setting helped me overcome my anxiety and communicate more clearly.",
    initials: "AT",
    name: "Alex T.",
    title: "Marketing Specialist"
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What Early Users Say</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our beta testers have experienced remarkable improvements in their interview performance
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="text-primary flex">
                  {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                    <Star key={i} className="fill-current" />
                  ))}
                  {testimonial.rating % 1 !== 0 && (
                    <StarHalf className="fill-current" />
                  )}
                </div>
              </div>
              <p className="text-muted-foreground italic mb-6">
                "{testimonial.text}"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                  <span className="text-foreground font-semibold">{testimonial.initials}</span>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
