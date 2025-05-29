"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, CheckCircle, Loader2, Phone, Mail, MapPin, User } from "lucide-react"
import { FaIndianRupeeSign } from "react-icons/fa6";

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  propertyId: string | null
  propertyFor: "Buy" | "Rent"
}

interface Category {
  REMCategoryCode: string
  Name: string
  REMPropStatusCode: string
}

interface Tag {
  REMPropTagCode: string
  Name: string
  REMPropStatusCode: string
}

export default function ContactModal({ isOpen, onClose, propertyId, propertyFor }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    address: "",
    minBudget: "",
    maxBudget: "",
    categoryCode: "",
    propTagCode: "",
  })

  const [categories, setCategories] = useState<Category[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(false)
  const [isLoadingTags, setIsLoadingTags] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        address: "",
        minBudget: "",
        maxBudget: "",
        categoryCode: "",
        propTagCode: "",
      })
      setSubmitSuccess(false)
      document.body.style.overflow = "hidden"
      
      // Fetch categories and tags when modal opens
      fetchCategories()
      fetchTags()
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const fetchCategories = async () => {
    setIsLoadingCategories(true)
    try {
      const response = await fetch("http://localhost:5000/api/property-category-and-tag/categories")
      const data = await response.json()
      if (data.success) {
        // Filter categories based on propertyFor
        const filteredCategories = data.data.filter((category: Category) => 
          propertyFor === "Buy" ? category.REMPropStatusCode === 'PS-0001' : 
          propertyFor === "Rent" ? category.REMPropStatusCode === 'PS-0002' : 
          true
        )
        setCategories(filteredCategories)
      }
    } catch (error) {
      console.error("Error fetching categories:", error)
    } finally {
      setIsLoadingCategories(false)
    }
  }

  const fetchTags = async () => {
    setIsLoadingTags(true)
    try {
      const response = await fetch("http://localhost:5000/api/property-category-and-tag/tags")
      const data = await response.json()
      if (data.success) {
        // Filter tags based on propertyFor
        const filteredTags = data.data.filter((tag: Tag) => 
          propertyFor === 'Buy' ? tag.REMPropStatusCode === 'PS-0001' : 
          propertyFor === "Rent" ? tag.REMPropStatusCode === 'PS-0002' : 
          true
        )
        setTags(filteredTags)
      }
    } catch (error) {
      console.error("Error fetching tags:", error)
    } finally {
      setIsLoadingTags(false)
    }
  }

  // Update both categories and tags whenever propertyFor changes
  useEffect(() => {
    if (isOpen) {
      fetchCategories()
      fetchTags()
    }
  }, [isOpen, propertyFor])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const contactData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      address: formData.address,
      minBudget: formData.minBudget,
      maxBudget: formData.maxBudget,
      propertyId: propertyId,
      LeadSourceId: "1",
      LeadTypeId: propertyFor === "Buy" ? 1 : propertyFor === "Rent" ? 2 : null,
      REMCategoryCode: formData.categoryCode,
      REMPropTagCode: formData.propTagCode,
    }

    try {
      const response = await fetch("http://localhost:5000/api/propertylead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      })

      if (response.ok) {
        setSubmitSuccess(true)
        setTimeout(() => {
          onClose()
        }, 2000)
      } else {
        const errorData = await response.json()
        alert(`Failed to send message: ${errorData.error || "Unknown error"}`)
      }
    } catch (error) {
      console.error("Error sending contact request:", error)
      alert("An error occurred. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300 ease-out"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative transition-all duration-300 ease-out transform ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        } max-h-[90vh] overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 pb-1 border-b border-gray-100">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">Contact Us</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-all duration-200 p-2 rounded-full hover:bg-gray-100 group"
            aria-label="Close modal"
          >
            <X size={20} className="group-hover:rotate-90 transition-transform duration-200" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {submitSuccess ? (
            <div className="p-8 text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 mb-6 shadow-lg">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent Successfully!</h3>
              <p className="text-gray-600 mb-4">
                Thank you for reaching out. Our agent will contact you within 24 hours.
              </p>
              <div className="inline-flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                <CheckCircle className="h-4 w-4 mr-2" />
                We'll be in touch soon
              </div>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="p-6 space-y-1">
              <input type="hidden" name="propertyId" value={propertyId || ""} />

              {/* Personal Information Section */}
              <div className="space-y-1">
                <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-600" />
                  Personal Information
                </h4>

                {/* Name - Full width */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                    placeholder="Enter your Name"
                  />
                </div>

                {/* Email and Phone - Responsive grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email<span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Mobile <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Property Information Section */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">
                  Property Preferences
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Property Status Dropdown */}
                  <div className="space-y-2">
                    <label htmlFor="categoryCode" className="block text-sm font-medium text-gray-700">
                      Property Status
                    </label>
                    <select
                      id="categoryCode"
                      name="categoryCode"
                      value={formData.categoryCode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                      disabled={isLoadingCategories}
                    >
                      <option value="">Select Property Status</option>
                      {categories.map((category) => (
                        <option key={category.REMCategoryCode} value={category.REMCategoryCode}>
                          {category.Name}
                        </option>
                      ))}
                    </select>
                    {isLoadingCategories && (
                      <div className="text-sm text-gray-500 flex items-center">
                        <Loader2 className="animate-spin h-4 w-4 mr-2" />
                        Loading statuses...
                      </div>
                    )}
                  </div>

                  {/* Property Type Dropdown */}
                  <div className="space-y-2">
                    <label htmlFor="propTagCode" className="block text-sm font-medium text-gray-700">
                      Property Type
                    </label>
                    <select
                      id="propTagCode"
                      name="propTagCode"
                      value={formData.propTagCode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                      disabled={isLoadingTags}
                    >
                      <option value="">Select Property Type</option>
                      {tags.map((tag) => (
                        <option key={tag.REMPropTagCode} value={tag.REMPropTagCode}>
                          {tag.Name}
                        </option>
                      ))}
                    </select>
                    {isLoadingTags && (
                      <div className="text-sm text-gray-500 flex items-center">
                        <Loader2 className="animate-spin h-4 w-4 mr-2" />
                        Loading types...
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Budget Information Section */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                  <FaIndianRupeeSign className="h-5 w-5 mr-2 text-green-600" />
                  Budget Range (In Lacks)
                </h4>

                <div className="flex gap-4">
                  <div className="space-y-2 w-1/2">
                    <label htmlFor="minBudget" className="block text-sm font-medium text-gray-700">
                      Min Budget
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                        ₹
                      </span>
                      <input
                        type="number"
                        id="minBudget"
                        name="minBudget"
                        value={formData.minBudget}
                        onChange={handleChange}
                        className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                        placeholder="10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 w-1/2">
                    <label htmlFor="maxBudget" className="block text-sm font-medium text-gray-700">
                      Max Budget
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                        ₹
                      </span>
                      <input
                        type="number"
                        id="maxBudget"
                        name="maxBudget"
                        value={formData.maxBudget}
                        onChange={handleChange}
                        className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                        placeholder="50"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Location and Message Section */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Preferred Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address || ""}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                      placeholder="Neighborhood, city, or area"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 resize-none"
                    placeholder="Tell us about your specific requirements, preferred amenities, or any questions you have..."
                  ></textarea>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-6 border-t border-gray-100 flex-wrap">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 sm:flex-none sm:w-auto px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 sm:flex-none sm:w-auto px-8 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center min-w-[140px] shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4 mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="h-4 w-4 mr-2" />
                      Send
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}