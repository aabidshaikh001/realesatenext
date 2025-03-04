"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Facebook, Twitter, Instagram, Youtube, Linkedin, MapPin, Phone, Mail, Clock, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const ContactUs = () => {
  const [personalNumber, setPersonalNumber] = useState("")
  const [whatsappNumber, setWhatsappNumber] = useState("")
  const [usePersonalForWhatsapp, setUsePersonalForWhatsapp] = useState(false)
  const [inquiryType, setInquiryType] = useState("Rent")
  const [propertyTypeOptions, setPropertyTypeOptions] = useState<string[]>([])
  const [propertyTypeStatusOptions, setPropertyTypeStatusOptions] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    personalNumber: "",
    whatsappNumber: "",
    message: "",
    inquiryType: "Rent",
    propertyType: "",
    propertyStatus: "",
    furnishing: "Full-Furnished",
    availability: "Immediate Available",
  })

  useEffect(() => {
    if (inquiryType === "Rent") {
      setPropertyTypeOptions([
        "Flat",
        "Villa",
        "House",
        "PG",
        "Hostel - Girls",
        "Hostel - Boys",
        "Commercial Space",
        "Office Space",
        "Co-working Space",
      ])
      setPropertyTypeStatusOptions([
        "Full-Furnished",
        "Semi-Furnished",
        "Un-Furnished",
        "Immediate Available",
        "Bachelor Friendly",
        "Couple Friendly",
      ])
      // Set default values for Rent
      setFormData((prev) => ({
        ...prev,
        propertyType: "Flat",
        propertyStatus: "Full-Furnished",
      }))
    } else if (inquiryType === "Buy") {
      setPropertyTypeOptions([
        "Residential Plot",
        "Flat",
        "Mansion",
        "House",
        "Commercial Space",
        "Commercial Plot",
        "Office",
      ])
      setPropertyTypeStatusOptions(["Ready to Move", "New Projects", "Premium", "Budget", "Elite", "Rental Income"])
      // Set default values for Buy
      setFormData((prev) => ({
        ...prev,
        propertyType: "Residential Plot",
        propertyStatus: "Ready to Move",
      }))
    }
  }, [inquiryType])

  const handleInquiryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value
    setInquiryType(selectedType)
    setFormData((prev) => ({
      ...prev,
      inquiryType: selectedType,
    }))
  }

  const handlePersonalNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPersonalNumber(value)
    setFormData((prev) => ({
      ...prev,
      personalNumber: value,
    }))

    if (usePersonalForWhatsapp) {
      setWhatsappNumber(value)
      setFormData((prev) => ({
        ...prev,
        whatsappNumber: value,
      }))
    }
  }

  const handleWhatsappNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setWhatsappNumber(value)
    setFormData((prev) => ({
      ...prev,
      whatsappNumber: value,
    }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setUsePersonalForWhatsapp(checked)
    if (checked) {
      setWhatsappNumber(personalNumber)
      setFormData((prev) => ({
        ...prev,
        whatsappNumber: personalNumber,
      }))
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("https://realestateapi-x9de.onrender.com/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success("Your message has been sent successfully. We'll get back to you soon.")

        // Reset form
        setFormData({
          fullName: "",
          email: "",
          personalNumber: "",
          whatsappNumber: "",
          message: "",
          inquiryType: "Rent",
          propertyType: "Flat",
          propertyStatus: "Full-Furnished",
          furnishing: "Full-Furnished",
          availability: "Immediate Available",
        })
        setPersonalNumber("")
        setWhatsappNumber("")
        setUsePersonalForWhatsapp(false)
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message || "Something went wrong")
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to send your message. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-10 lg:mt-0">
      {/* Hero Section with reduced height */}
      <div className="relative h-[200px]">
        <Image src="/bgheader.png" alt="Contact Us Hero" layout="fill" objectFit="cover" className="brightness-75" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-white text-center">Contact Us</h1>
          <nav className="flex items-center text-white text-sm mt-2">
            <a href="/" className="hover:underline opacity-90">
              Home
            </a>
            <ChevronRight className="w-4 h-4 mx-2 opacity-90" />
            <span className="opacity-90">Help</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section with Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 bg-white p-8 shadow-lg rounded-lg"
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Drop Us A Line</h2>
            <p className="text-gray-600 mb-8">Feel free to reach out to us for any inquiries or assistance.</p>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Your Name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
  id="email"
  name="email"
  type="email"
  placeholder="your@email.com"
  value={formData.email}
  onChange={handleInputChange}
  required
/>

                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="personal-number">Personal Number</Label>
                  <Input
                    id="personal-number"
                    type="tel"
                    placeholder="Your Phone Number"
                    value={personalNumber}
                    onChange={handlePersonalNumberChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="whatsapp-number">WhatsApp Number</Label>
                  <Input
                    id="whatsapp-number"
                    type="tel"
                    placeholder="Your WhatsApp Number"
                    value={whatsappNumber}
                    onChange={handleWhatsappNumberChange}
                    disabled={usePersonalForWhatsapp}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="use-personal-for-whatsapp"
                  checked={usePersonalForWhatsapp}
                  onCheckedChange={handleCheckboxChange}
                />
                <Label htmlFor="use-personal-for-whatsapp">Use personal number for WhatsApp</Label>
              </div>

              {/* Moved "Your Message" section here */}
              <div>
                <Label htmlFor="message">Your Message</Label>
                <Textarea
  id="message"
  name="message"
  placeholder="Write your message here..."
  value={formData.message}
  onChange={handleInputChange}
  required
/>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="inquiryType">Property Inquiry Type</Label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    className="w-full border-gray-300 rounded-md"
                    value={inquiryType}
                    onChange={handleInquiryChange}
                  >
                    <option value="Buy">Buy</option>
                    <option value="Rent">Rent</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="propertyType">Property Type</Label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    className="w-full border-gray-300 rounded-md"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                  >
                    {propertyTypeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="propertyStatus">Property Status</Label>
                  <select
                  name="propertyStatus"
                    id="propertyStatus"
                    className="w-full border-gray-300 rounded-md"
                    value={formData.propertyStatus}
                    onChange={handleInputChange}
                  >
                    {propertyTypeStatusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="furnishing">Furnishing</Label>
                  <select
                    id="furnishing"
                    name="furnishing"
                    className="w-full border-gray-300 rounded-md"
                    value={formData.furnishing}
                    onChange={handleInputChange}
                  >
                    <option value="Full-Furnished">Full-Furnished</option>
                    <option value="Semi-Furnished">Semi-Furnished</option>
                    <option value="Un-Furnished">Un-Furnished</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="availability">Availability</Label>
                <select
                  id="availability"
                  name="availability"
                  className="w-full border-gray-300 rounded-md"
                  value={formData.availability}
                  onChange={handleInputChange}
                >
                  <option value="Immediate Available">Immediate Available</option>
                  <option value="Bachelor Friendly">Bachelor Friendly</option>
                  <option value="Couple Friendly">Couple Friendly</option>
                </select>
              </div>

              <Button type="submit" className="w-full bg-red-600 text-white hover:bg-red-700" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </motion.div>

          {/* Right Section with Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-8 shadow-lg rounded-lg"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <MapPin className="w-10 h-10 text-red-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Address:</h3>
                  <p className="text-gray-600">
                    RTech Capital Highstreet, Mahal Rd, Jagatpura, Jaipur, Shri Kishanpura, Rajasthan 302017
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-red-600" />
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Phone:</h3>
                  <p className="text-gray-600">+91 96949 67000</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-red-600" />
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Email:</h3>
                  <p className="text-gray-600">info@realestatecompany.co.in</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-red-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Open Hours:</h3>
                  <p className="text-gray-600">Monday - Friday: 08:00 - 20:00</p>
                  <p className="text-gray-600">Saturday - Sunday: 10:00 - 18:00</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800 mb-2">Follow Us:</h3>
                <div className="flex space-x-4">
                  <Link href="#" aria-label="Facebook">
                    <Facebook className="w-6 h-6 text-gray-600 hover:text-blue-600 transition-colors duration-300" />
                  </Link>
                  <Link href="#" aria-label="Twitter">
                    <Twitter className="w-6 h-6 text-gray-600 hover:text-blue-400 transition-colors duration-300" />
                  </Link>
                  <Link href="#" aria-label="Instagram">
                    <Instagram className="w-6 h-6 text-gray-600 hover:text-pink-500 transition-colors duration-300" />
                  </Link>
                  <Link href="#" aria-label="Youtube">
                    <Youtube className="w-6 h-6 text-gray-600 hover:text-red-600 transition-colors duration-300" />
                  </Link>
                  <Link href="#" aria-label="LinkedIn">
                    <Linkedin className="w-6 h-6 text-gray-600 hover:text-blue-800 transition-colors duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover />
    </div>
  )
}

export default ContactUs

