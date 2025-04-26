"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { ChevronRight, Star, MapPin, Home, Calendar, TrendingUp, Award } from "lucide-react"
import Image from "next/image"

interface ValuationFactor {
  title: string;
  content: string;
  icon: string;
}

interface WhyChooseUs {
  title: string;
  content: string;
}

interface SatisfiedClient {
  quote: string;
  name: string;
  rating: number;
}

interface PropertyValuationData {
  valuationFactors: ValuationFactor[];
  whyChooseUs: WhyChooseUs;
  satisfiedClient: SatisfiedClient;
}

interface ApiResponse {
  success: boolean;
  data: {
    id: number;
    helpPageName: string;
    helpPageData: PropertyValuationData;
  }[];
}

export default function PropertyValuationPage() {
  const [pageData, setPageData] = useState<PropertyValuationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    propertyType: "",
    squareFootage: "",
    bathrooms: "",
    bedrooms: "",
    location: "",
    message: "",
    usePhoneForWhatsApp: true,
  });
  const [locationSuggestions, setLocationSuggestions] = useState<Array<{ display_name: string; place_id: string }>>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const locationDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://api.realestatecompany.co.in/api/helppage");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data: ApiResponse = await response.json();
        
        if (data.success && data.data) {
          const propertyValuationPage = data.data.find(
            (page) => page.helpPageName === "Property Valuation"
          );
          
          if (propertyValuationPage) {
            setPageData(propertyValuationPage.helpPageData);
          } else {
            throw new Error("Property Valuation page data not found");
          }
        } else {
          throw new Error("Invalid API response");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "MapPin":
        return <MapPin className="w-5 h-5" />;
      case "Home":
        return <Home className="w-5 h-5" />;
      case "Calendar":
        return <Calendar className="w-5 h-5" />;
      case "TrendingUp":
        return <TrendingUp className="w-5 h-5" />;
      case "Award":
        return <Award className="w-5 h-5" />;
      default:
        return <Award className="w-5 h-5" />;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({
        ...formData,
        [name]: checked,
        whatsapp: checked ? formData.phone : formData.whatsapp,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
        whatsapp: name === "phone" && formData.usePhoneForWhatsApp ? value : formData.whatsapp,
      });

      if (name === "location") {
        fetchLocationSuggestions(value);
      }
    }
  };

  const fetchLocationSuggestions = async (query: string) => {
    if (!query || query.length < 3) {
      setLocationSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoadingSuggestions(true);
    setShowSuggestions(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=in&limit=3&addressdetails=1`,
        {
          headers: {
            "Accept-Language": "en",
            "User-Agent": "PropertyValuationWebsite",
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        setLocationSuggestions(data);
        setShowSuggestions(data.length > 0);
      } else {
        console.error("Failed to fetch location suggestions");
        setLocationSuggestions([]);
        setShowSuggestions(false);
      }
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
      setLocationSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const handleSelectSuggestion = (suggestion: { display_name: string; place_id: string }) => {
    setFormData({
      ...formData,
      location: suggestion.display_name,
    });
    setLocationSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const submissionData = {
      ...formData,
      whatsapp: formData.usePhoneForWhatsApp ? formData.phone : formData.whatsapp,
    };

    const { usePhoneForWhatsApp, ...dataToSubmit } = submissionData;

    try {
      const response = await fetch("https://api.realestatecompany.co.in/api/property-valuations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
      });
      if (response.ok) {
        toast.success("Thank you for submitting your property details. We will contact you with a valuation soon.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          whatsapp: "",
          propertyType: "",
          squareFootage: "",
          bathrooms: "",
          bedrooms: "",
          location: "",
          message: "",
          usePhoneForWhatsApp: true,
        });
      } else {
        toast.error("There was an error submitting your property details.");
      }
    } catch (error) {
      toast.error("Network error. Please try again later.");
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-4">Error Loading Page</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-4">Data Not Available</h2>
          <p className="text-gray-700">The property valuation data could not be loaded.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer />
      {/* Header Section */}
      <div className="relative w-full overflow-hidden mt-12 lg:mt-0">
        {/* Background Image */}
        <div className="relative h-[200px]">
          <Image src="/bgheader.png" alt="Property valuation background" fill className="object-cover brightness-75" />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-4xl sm:text-6xl font-black text-center text-white mb-4">Property Valuation</h1>

          <nav className="flex items-center text-white text-sm mt-2">
            <Link href="/" className="hover:underline opacity-90">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 opacity-90" />
            <span className="opacity-90">Help</span>
          </nav>
        </div>
      </div>

      {/* Main Content with 3-column layout */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Valuation Factors List */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Valuation Factors</h3>
              <ul className="space-y-3">
                {pageData.valuationFactors.map((factor, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`cursor-pointer p-3 rounded-lg text-gray-900 font-medium transition-all duration-300 ${
                      activeIndex === index ? "bg-red-100 border-l-4 border-red-600 font-semibold" : "hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveIndex(index)}
                  >
                    {index + 1}. {factor.title}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Middle Column - Content */}
          <div className="w-full lg:w-2/5">
            <div className="bg-white p-8 rounded-lg shadow-md h-full">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="h-full flex flex-col"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-red-100 p-3 rounded-full">
                    {getIcon(pageData.valuationFactors[activeIndex].icon)}
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">{pageData.valuationFactors[activeIndex].title}</h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg mb-6">
                  {pageData.valuationFactors[activeIndex].content}
                </p>

                <div className="mt-auto">
                  <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-r-lg">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{pageData.whyChooseUs.title}</h4>
                    <p className="text-gray-700">{pageData.whyChooseUs.content}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column - Valuation Request Form */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Request a Valuation</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Your Full Name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Your Email Address"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Your Phone Number"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">
                    WhatsApp Number
                  </label>
                  <div className="flex flex-col space-y-2">
                    <input
                      type="tel"
                      id="whatsapp"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                      placeholder="Your WhatsApp Number"
                      required
                    />
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="usePhoneForWhatsApp"
                        name="usePhoneForWhatsApp"
                        checked={formData.usePhoneForWhatsApp}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      />
                      <label htmlFor="usePhoneForWhatsApp" className="ml-2 block text-sm text-gray-700">
                        Use phone number for WhatsApp
                      </label>
                    </div>
                  </div>
                </div>

                <div className="relative" ref={locationDropdownRef}>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Location/Area
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    onFocus={() => locationSuggestions.length > 0 && setShowSuggestions(true)}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="City, State or Area"
                    required
                  />
                  {isLoadingSuggestions && (
                    <div className="absolute right-3 top-9">
                      <div className="animate-spin h-5 w-5 border-2 border-red-600 border-t-transparent rounded-full"></div>
                    </div>
                  )}
                  {showSuggestions && locationSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-lg border overflow-hidden">
                      <ul className="max-h-60 overflow-auto" onMouseDown={(e) => e.preventDefault()}>
                        {locationSuggestions.map((suggestion) => (
                          <li
                            key={suggestion.place_id}
                            onClick={() => handleSelectSuggestion(suggestion)}
                            className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                          >
                            {suggestion.display_name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700">
                    Property Type
                  </label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    required
                  >
                    <option value="">Select property type</option>
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Villa">Villa</option>
                    <option value="Land">Land</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">
                      Bedrooms
                    </label>
                    <input
                      type="number"
                      id="bedrooms"
                      name="bedrooms"
                      value={formData.bedrooms}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                      min="0"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">
                      Bathrooms
                    </label>
                    <input
                      type="number"
                      id="bathrooms"
                      name="bathrooms"
                      value={formData.bathrooms}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                      min="0"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="squareFootage" className="block text-sm font-medium text-gray-700">
                      Sq. Ft.
                    </label>
                    <input
                      type="number"
                      id="squareFootage"
                      name="squareFootage"
                      value={formData.squareFootage}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Additional Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Please provide any additional information about your property"
                    required
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 mt-4"
                >
                  {loading ? "Submitting..." : "Request Valuation"}
                </motion.button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Our team will contact you within 24 hours with your property valuation.
                </p>
              </form>

              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center mb-3">
                  <div className="flex">
                    {[...Array(pageData.satisfiedClient.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-700 text-center italic">"{pageData.satisfiedClient.quote}"</p>
                <p className="text-xs text-gray-500 text-center mt-2">
                  — {pageData.satisfiedClient.name}, Satisfied Client
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
