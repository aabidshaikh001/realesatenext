"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Liam Anderson",
    role: "CEO Digital",
    content:
      "I truly appreciate the professionalism and in-depth knowledge of the brokerage team. They helped me find the perfect home.",
    rating: 5,
    image:
      "https://iqiglobal.com/blog/wp-content/uploads/2020/12/property-developer-FI.jpg",
  },
  {
    id: 2,
    name: "Adam Will",
    role: "CEO Agency",
    content:
      "My experience with property management services has exceeded expectations. They are always professional and attentive.",
    rating: 4,
    image: "https://iqiglobal.com/blog/wp-content/uploads/2020/12/property-developer-FI.jpg",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    role: "Property Investor",
    content:
      "The level of expertise and dedication shown by the team is outstanding. Their market insights have helped me make informed investment decisions.",
    rating: 5,
    image: "https://iqiglobal.com/blog/wp-content/uploads/2020/12/property-developer-FI.jpg",
  },
  {
    id: 4,
    name: "Chris Martin",
    role: "Real Estate Agent",
    content: "Professionalism at its best. They offer excellent service.",
    rating: 4,
    image: "https://iqiglobal.com/blog/wp-content/uploads/2020/12/property-developer-FI.jpg",
  },
];

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 2 >= testimonials.length ? 0 : prevIndex + 2
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 2 : prevIndex - 2
    );
  };

  React.useEffect(() => {
    const timer = setInterval(nextSlide, 3000); // Auto-slide every 3 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section */}
          <div className="space-y-4 lg:col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-red-500">
              TOP PROPERTIES
            </h3>
            <h2 className="text-3xl font-bold">What People Say&apos;s</h2>
            <p className="text-gray-600">
              Our seasoned team excels in real estate with years of successful
              market navigation, offering informed decisions and optimal results.
            </p>
            <div className="flex gap-2 mt-6">
              <button
                onClick={prevSlide}
                className="bg-white text-black p-3 rounded-full shadow-lg hover:bg-red-600 hover:text-white transition"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextSlide}
                className="bg-white text-black p-3 rounded-full shadow-lg hover:bg-red-600 hover:text-white transition"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials
              .slice(currentIndex, currentIndex + 2)
              .map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white p-6 rounded-lg shadow-md transition-all duration-1000 ease-in-out opacity-100 transform scale-100 hover:scale-105"
                >
                  {/* Star Rating */}
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating
                            ? "fill-yellow-400"
                            : "fill-gray-300"
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Testimonial Content */}
                  <p className="text-gray-700 mb-4 italic">
                    "{testimonial.content}"
                  </p>

                  {/* User Info */}
                  <div className="flex items-center gap-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
