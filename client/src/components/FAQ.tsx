import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the AI interview simulation work?",
    answer: "Veritas uses advanced natural language processing to create realistic interview experiences. Our AI analyzes your responses, speech patterns, and even facial expressions (with camera permission) to provide comprehensive feedback. The system adapts to your performance, adjusting the difficulty and focus areas based on your strengths and weaknesses."
  },
  {
    question: "When will Veritas be available?",
    answer: "We're currently in the final stages of development and plan to launch our beta version in Q2 2023. By joining our waitlist, you'll be among the first to get access, with special early-bird pricing and extended features during the beta period."
  },
  {
    question: "Can I use Veritas on mobile devices?",
    answer: "Yes! While we're launching with desktop applications for Windows, Mac, and Linux, we're also developing mobile apps for iOS and Android that will be released shortly after our initial launch. All your data and progress will sync across devices."
  },
  {
    question: "What industries and job types does Veritas support?",
    answer: "At launch, we'll support interviews for technology, finance, healthcare, marketing, sales, and general business roles at various levels from entry to executive. We're constantly expanding our industry coverage and interview scenarios based on user feedback and market demand."
  },
  {
    question: "Is my interview data private and secure?",
    answer: "Absolutely. We take data privacy very seriously. All your interview sessions and personal information are encrypted and securely stored. We never share your data with third parties, and you can delete your data at any time. Our AI training is done in a way that preserves your privacy."
  }
];

export default function FAQ() {
  return (
    <section id="faq" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about Veritas and how it can help you succeed
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
