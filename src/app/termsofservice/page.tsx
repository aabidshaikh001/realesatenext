'use client'
import { useState } from "react";
import { motion } from "framer-motion";

const sections = [
  { title: "Introduction", content: "Welcome to our platform. These terms and conditions outline the rules and regulations for the use of our services..." },
  { title: "Eligibility", content: "To be eligible to use our services, you must meet the following criteria..." },
  { title: "User Responsibilities", content: "As a user, you are responsible for maintaining the confidentiality of your account and ensuring the information you provide is accurate..." },
  { title: "Prohibited Activities", content: "Users are prohibited from engaging in the following activities..." },
  { title: "Termination", content: "We reserve the right to terminate or suspend access to our services immediately, without prior notice or liability, for any reason..." },
];

export default function TermsOfService() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="max-w-7xl mx-auto p-12 bg-gray-50 rounded-lg shadow-lg">
      <div className="mb-16">
        <nav className="text-sm text-gray-600 mb-6">
          <a href="/" className=" hover:underline">Home</a> / Pages / <span className="text-red-600">Terms of Service</span>
        </nav>
        <h1 className="text-6xl font-black text-center text-gray-900 mb-8">Terms of Service</h1>
        <p className="text-lg text-center text-gray-600">Understand the rules and guidelines for using our platform below.</p>
      </div>
      <div className="flex space-x-16">
        <div className="w-1/3">
          <ul className="space-y-4">
            {sections.map((section, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`cursor-pointer p-4 rounded-lg text-gray-900 font-medium shadow-sm transition-all duration-300 ${
                  activeIndex === index ? "bg-red-100 border-l-4 border-red-600 font-semibold" : "hover:bg-gray-100"
                }`}
                onClick={() => setActiveIndex(index)}
              >
                {index + 1}. {section.title}
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="w-2/3 bg-white p-8 rounded-lg shadow-md">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-6 text-gray-900">{sections[activeIndex].title}</h2>
            <p className="text-gray-700 leading-relaxed text-lg tracking-wide">{sections[activeIndex].content}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
