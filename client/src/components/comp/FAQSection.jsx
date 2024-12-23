import React, { useState } from "react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null); // Track which FAQ is open

  const faqList = [
    {
      question: "What types of posters do you sell?",
      answer:
        "We offer a variety of posters, including art prints, motivational quotes, and custom designs.",
    },
    {
      question: "How can I place an order?",
      answer:
        "You can place an order directly through our website by selecting your desired posters and checking out.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship worldwide! Shipping costs will be calculated at checkout based on your location.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We accept returns within 30 days of purchase if the item is in its original condition. Please refer to our return policy for more details.",
    },
    {
      question: "Can I customize a poster?",
      answer:
        "Yes, we offer customization options for certain designs. Please contact our support team for more information.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle open/close
  };

  return (
    <section className="py-16 bg-gray-500">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white-800 mb-8">
          FAQs
        </h2>
        <div className="space-y-4">
          {faqList.map((faq, index) => (
            <div
              key={index}
              className="p-4 bg-slate-600 rounded-lg shadow-md border border-gray-200"
            >
              {/* Question */}
              <div
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center cursor-pointer"
              >
                <h3 className="text-lg font-semibold text-white-800">
                  {faq.question}
                </h3>
                <span className="text-white-900 font-bold text-2xl">
                  {openIndex === index ? "-" : "+"}
                </span>
              </div>

              {/* Answer */}
              {openIndex === index && (
                <p className="text-white-600 text-1xl mt-2">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
