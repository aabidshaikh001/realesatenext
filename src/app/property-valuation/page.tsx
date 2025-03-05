"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { ChevronRight } from "lucide-react"
import Image from "next/image"

const valuationFactors = [
  {
    title: "Location",
    content:
      "The location of a property plays a critical role in its valuation. This includes the quality of the neighborhood, the proximity to key amenities such as schools, shopping centers, parks, public transport, and the overall safety and appeal of the area. Properties in desirable locations typically hold higher value due to accessibility and lifestyle advantages.",
  },
  {
    title: "Property Size",
    content:
      "The size of a property is a key determinant in its value, which includes both the total square footage of the interior living space and the land area it sits on. Larger properties often offer more versatility for renovations, expansions, or outdoor space, and are generally valued higher compared to smaller ones. The overall layout, number of rooms, and floor plan also contribute to the valuation.",
  },
  {
    title: "Age and Condition",
    content:
      "The age of the property reflects how old the building is, which influences its overall appeal and the likelihood of needed repairs or renovations. Well-maintained older homes can sometimes hold higher value than newer properties if they have been upgraded with modern amenities. The current state of repair, including the condition of the roof, plumbing, electrical systems, and appliances, will significantly affect the market value.",
  },
  {
    title: "Recent Sales",
    content:
      "Recent sales of comparable properties (also known as 'comps') in the neighborhood provide a benchmark for valuing a property. By comparing the sale price of similar homes in terms of size, condition, and location, real estate professionals can determine a fair market value. These sales data help to identify market trends and potential price fluctuations.",
  },
  {
    title: "Market Trends",
    content:
      "The overall state of the real estate market influences property values. Factors such as interest rates, the supply and demand for housing, and economic conditions affect property prices. Additionally, market trends provide insight into whether property values are likely to rise or fall in the near future, allowing buyers and sellers to make informed decisions.",
  },
  {
    title: "Unique Features",
    content:
      "Unique features and amenities, such as a swimming pool, home theater, gourmet kitchen, or eco-friendly upgrades, can significantly enhance a property's value. Special characteristics like waterfront views, historical significance, or architecturally distinctive design elements can also make a property more desirable and thus more valuable in the eyes of buyers.",
  },
]

export default function PropertyValuationPage() {
  const [activeIndex, setActiveIndex] = useState(0)
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
  })
  const [loading, setLoading] = useState(false)
  const [locationSuggestions, setLocationSuggestions] = useState<Array<{ display_name: string; place_id: string }>>([])
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const locationDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setFormData({
        ...formData,
        [name]: checked,
        whatsapp: checked ? formData.phone : formData.whatsapp,
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
        whatsapp: name === "phone" && formData.usePhoneForWhatsApp ? value : formData.whatsapp,
      })

      // Fetch location suggestions when location field changes
      if (name === "location") {
        fetchLocationSuggestions(value)
      }
    }
  }

  const fetchLocationSuggestions = async (query: string) => {
    if (!query || query.length < 3) {
      setLocationSuggestions([])
      setShowSuggestions(false)
      return
    }

    setIsLoadingSuggestions(true)
    setShowSuggestions(true)
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=in&limit=3&addressdetails=1`,
        {
          headers: {
            "Accept-Language": "en",
            "User-Agent": "PropertyValuationWebsite",
          },
        },
      )

      if (response.ok) {
        const data = await response.json()
        setLocationSuggestions(data)
        setShowSuggestions(data.length > 0)
      } else {
        console.error("Failed to fetch location suggestions")
        setLocationSuggestions([])
        setShowSuggestions(false)
      }
    } catch (error) {
      console.error("Error fetching location suggestions:", error)
      setLocationSuggestions([])
      setShowSuggestions(false)
    } finally {
      setIsLoadingSuggestions(false)
    }
  }

  const handleSelectSuggestion = (suggestion: { display_name: string; place_id: string }) => {
    setFormData({
      ...formData,
      location: suggestion.display_name,
    })
    setLocationSuggestions([])
    setShowSuggestions(false)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    // Ensure whatsApp number is set if using phone number
    const submissionData = {
      ...formData,
      whatsapp: formData.usePhoneForWhatsApp ? formData.phone : formData.whatsapp,
    }

    // Remove the usePhoneForWhatsApp field as it's not needed in the backend
    const { usePhoneForWhatsApp, ...dataToSubmit } = submissionData

    try {
      const response = await fetch("https://realestateapi-x9de.onrender.com/api/property-valuations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
      })
      if (response.ok) {
        toast.success("Thank you for submitting your property details. We will contact you with a valuation soon.")
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
        })
      } else {
        toast.error("There was an error submitting your property details.")
      }
    } catch (error) {
      toast.error("Network error. Please try again later.")
    }
    setLoading(false)
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
                {valuationFactors.map((factor, index) => (
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
                <h2 className="text-3xl font-bold mb-6 text-gray-900">{valuationFactors[activeIndex].title}</h2>
                <p className="text-gray-700 leading-relaxed text-lg mb-6">{valuationFactors[activeIndex].content}</p>

                <div className="mt-auto">
                  <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-r-lg">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Why Choose Our Valuation Services?</h4>
                    <p className="text-gray-700">
                      With over 20 years of experience in real estate valuation, our team provides accurate and
                      comprehensive property assessments. We use the latest market data and advanced analytics to ensure
                      you receive the most precise valuation for your property.
                    </p>
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
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-700 text-center italic">
                  "Their valuation was spot-on and helped me price my property perfectly for a quick sale."
                </p>
                <p className="text-xs text-gray-500 text-center mt-2">— Michael Roberts, Satisfied Client</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

