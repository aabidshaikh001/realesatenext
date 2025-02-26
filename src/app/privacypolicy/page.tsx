'use client'
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const sections = [
  { title: "Terms", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed euismod justo..." },
  { title: "Limitations", content: "In malesuada neque quis libero laoreet posuere. In consequat vitae ligula quis rutrum..." },
  { title: "Revisions And Errata", content: "Morbi dolor orci, maximus a pulvinar sed, bibendum ac lacus. Suspendisse in consectetur lorem..." },
  { title: "Site Terms Of Use Modifications", content: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas..." },
  { title: "Risks", content: "Etiam eleifend metus at nunc ultricies facilisis. Morbi finibus tristique interdum..." },
];

export default function PrivacyPolicy() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
    {/* Header Section */}
    <div className="relative w-full overflow-hidden mt-14 lg:mt-0">
      {/* Background Image */}
      <div className="relative h-[200px]">
        <Image src="/bgheader.png" alt="Legal assistance background" fill className="object-cover brightness-75" />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        
        <h1 className="text-4xl sm:text-6xl font-black text-center text-white mb-4">
        Privacy Policy</h1>
        
        <nav className="flex items-center text-white text-sm mt-2">
          <Link href="/" className="hover:underline opacity-90">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2 opacity-90" />
          <span className="opacity-90">Privacy Policy</span>
        </nav>
      </div>
    </div>
    <div className="flex flex-col lg:flex-row gap-10 mt-10 p-6 sm:p-12">
        <div className="w-full lg:w-1/3">
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
