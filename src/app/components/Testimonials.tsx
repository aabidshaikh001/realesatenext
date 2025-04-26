"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  image_url: string;
}

interface ApiResponse {
  success: boolean;
  data: Testimonial[];
}

export default function TestimonialSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("https://api.realestatecompany.co.in/api/testimonials");
        if (!response.ok) {
          throw new Error("Failed to fetch testimonials");
        }
        const data: ApiResponse = await response.json();
        
        if (data.success && data.data) {
          setTestimonials(data.data);
        } else {
          throw new Error("Invalid data format received");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

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

  useEffect(() => {
    if (testimonials.length > 0) {
      const timer = setInterval(nextSlide, 3000); // Auto-slide every 3 seconds
      return () => clearInterval(timer);
    }
  }, [testimonials]);

  if (loading) {
    return (
      <section className="w-full bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Section */}
            <div className="space-y-4 lg:col-span-1">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="flex gap-2 mt-6">
                <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Testimonials Section */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(2)].map((_, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse"></div>
                    <div>
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-3 w-16 bg-gray-200 rounded animate-pulse mt-2"></div>
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

  if (error) {
    return (
      <section className="w-full bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">What People Say's</h2>
            <p className="text-red-500">Error: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="w-full bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">What People Say's</h2>
            <p className="text-gray-600">No testimonials available</p>
          </div>
        </div>
      </section>
    );
  }

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
                      src={testimonial.image_url}
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