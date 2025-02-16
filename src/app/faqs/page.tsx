"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const faqData = [
  {
    category: "Overview",
    items: [
      {
        question: "Why Should I Use Your Services?",
        answer:
          "Once your account is set up and you've familiarized yourself with the platform, you are ready to start using our services. Whether it's accessing specific features, making transactions, or utilizing our tools, you'll find everything you need at your fingertips.",
      },
      {
        question: "How Do I Get Started With Your Services?",
        answer: "To get started, simply create an account, verify your details, and explore our platform.",
      },
      {
        question: "How Secure Are Your Services?",
        answer:
          "We use state-of-the-art encryption and follow industry standards to ensure the security of your data and transactions.",
      },
      {
        question: "Is There Customer Support Available?",
        answer:
          "Yes, our customer support team is available 24/7 to assist you with any issues or questions.",
      },
      {
        question: "How Can I Update My Account Information?",
        answer:
          "You can update your account information from the profile settings section within your dashboard.",
      },
    ],
  },
  {
    category: "Costs And Payments",
    items: [
      {
        question: "How Do You Calculate Fees?",
        answer: "Fees are calculated based on the type of service you choose and your transaction volume.",
      },
      {
        question: "How Do I Pay My Invoices?",
        answer: "You can pay your invoices through multiple methods such as credit card, bank transfer, or online payment systems.",
      },
      {
        question: "Are There Opportunities For Discounts Or Promotions?",
        answer: "Yes, we offer periodic promotions and discounts. Keep an eye on our announcements.",
      },
      {
        question: "Are There Any Hidden Fees Not Displayed In The Pricing Table?",
        answer: "No, all applicable fees are transparently listed in the pricing table.",
      },
      {
        question: "What Is The Refund Procedure?",
        answer: "Refunds can be requested through the support portal. Our team will process it within 7 business days.",
      },
      {
        question: "Is There Financial Or Accounting Support?",
        answer: "Yes, we provide financial support and consultation for our premium users.",
      },
    ],
  },
  {
    category: "Safety And Security",
    items: [
      {
        question: "What Languages Does Your Service Support?",
        answer: "Our service supports multiple languages including English, Spanish, French, and more.",
      },
      {
        question: "How Do I Integrate Your Service Into My System?",
        answer: "Integration guides and API documentation are available in our developer portal.",
      },
      {
        question: "What Are The Safety Features Of Your System?",
        answer: "We offer data encryption, multi-factor authentication, and real-time monitoring to ensure safety.",
      },
      {
        question: "How Can I Request New Features?",
        answer: "You can request new features by submitting a request through our feedback form.",
      },
      {
        question: "Is My Data Protected?",
        answer: "Yes, we adhere to GDPR and other data protection regulations to ensure your data is safe.",
      },
      {
        question: "How Do I Report A Technical Issue?",
        answer: "You can report technical issues through our support portal or contact customer service.",
      },
    ],
  },
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto p-12 bg-gray-50 rounded-lg shadow-lg">
      <div className="mb-16">
        <nav className="text-sm text-gray-600 mb-6">
          <a href="/" className=" hover:underline">Home</a> / Pages / <span className="text-red-600">Frequently Asked Questions</span>
        </nav>
        <h1 className="text-6xl font-black text-center text-gray-900 mb-8">FAQs</h1>
        <p className="text-lg text-center text-gray-600">Learn more about our frequently asked questions below.</p>
      </div>
      <div className="flex space-x-16">
        <div className="w-1/3">
          <ul className="space-y-4">
            {faqData.map((section, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`cursor-pointer p-4 rounded-lg text-gray-900 font-medium shadow-sm transition-all duration-300 ${
                  activeCategory === index ? "bg-red-100 border-l-4 border-red-600 font-semibold" : "hover:bg-gray-100"
                }`}
                onClick={() => setActiveCategory(index)}
              >
                {index + 1}. {section.category}
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="w-2/3 bg-white p-8 rounded-lg shadow-md">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-6 text-gray-900">{faqData[activeCategory].category}</h2>
            <div className="space-y-6">
              {faqData[activeCategory].items.map((item, idx) => (
                <div key={idx} className="border-b pb-4">
                  <button
                    className="w-full text-left text-lg font-semibold flex justify-between items-center"
                    onClick={() => setActiveQuestion(activeQuestion === idx ? null : idx)}
                  >
                    {item.question}
                    {activeQuestion === idx ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                  {activeQuestion === idx && (
                    <motion.p
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className="mt-2 text-gray-700"
                    >
                      {item.answer}
                    </motion.p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
