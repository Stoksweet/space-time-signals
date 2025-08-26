import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQSection = () => {
  const faqs = [
    {
      question: "How much does it cost to start a campaign?",
      answer: "You can get started with a minimum package of R1000, which includes 360 ad slots and covers your campaign creation fee."
    },
    {
      question: "What is a \"slot\" and how long is it?",
      answer: "A slot is a 60-second placement on a single screen where your ad is displayed."
    },
    {
      question: "Can I run multiple campaigns from one package?",
      answer: "Yes! You can update your message as often as you like—weekly, monthly, or seasonally—within the 3-month validity of your package."
    },
    {
      question: "Do I need to use all my slots at once?",
      answer: "No. Once you purchase a package, you can schedule as few or as many slots as you want until your package balance runs out within the 3-month period."
    },
    {
      question: "How do you track actions like QR scans, clicks, or promo codes?",
      answer: "Our system monitors interactions in real-time. You'll see exactly how many people scanned, clicked, or used your promo code."
    },
    {
      question: "What is \"Pay As You Close\"?",
      answer: "It's our performance model where you only pay a commission when your campaign drives results—like QR scans, website clicks, or promo code redemptions."
    },
    {
      question: "What percentage do you charge on Pay As You Close actions?",
      answer: "For items under R1000, the commission is a fixed 5%. For higher-value items, we generate a dynamic, negotiable rate."
    },
    {
      question: "What if my campaign doesn't drive any conversions?",
      answer: "You only pay for the slots you booked. No conversions = no Pay As You Close charges."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently asked{" "}
            <span className="text-transparent bg-gradient-brand bg-clip-text">
              questions
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about our advertising platform and pricing.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-2 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};