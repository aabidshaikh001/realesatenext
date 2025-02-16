"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Facebook, Twitter, Instagram, Youtube, Linkedin, MapPin, Phone, Mail, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const ContactUs = () => {
  const [personalNumber, setPersonalNumber] = useState("")
  const [whatsappNumber, setWhatsappNumber] = useState("")
  const [usePersonalForWhatsapp, setUsePersonalForWhatsapp] = useState(false)

  const handlePersonalNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalNumber(e.target.value)
    if (usePersonalForWhatsapp) {
      setWhatsappNumber(e.target.value)
    }
  }

  const handleCheckboxChange = (checked: boolean) => {
    setUsePersonalForWhatsapp(checked)
    if (checked) {
      setWhatsappNumber(personalNumber)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-10 lg:mt-0">
      {/* Hero Section with reduced height */}
      <div className="relative h-[200px]">
        <Image
          src="/bgheader.png"
          alt="Contact Us Hero"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
      
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold  text-white mb-2">Contact Us</h1>
            <p className="text-lg text-white">We're here to help you find your dream property</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <p className="text-sm text-gray-500">
            <Link href="/" className="hover:underline">
              Home
            </Link>{" "}
            / Pages / <span className="text-red-600 font-semibold">Contact Us</span>
          </p>
        </div>

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
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="full-name">Full Name</Label>
                  <Input id="full-name" type="text" placeholder="Your Name" required />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="your@email.com" required />
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
                    value={usePersonalForWhatsapp ? personalNumber : whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
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
                <Textarea id="message" placeholder="How can we help you?" rows={4} required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="inquiry-type">Property Inquiry Type</Label>
                  <select id="inquiry-type" className="w-full border-gray-300 rounded-md">
                    <option value="Buy">Buy</option>
                    <option value="Rent">Rent</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="property-type">Property Type</Label>
                  <select id="property-type" className="w-full border-gray-300 rounded-md">
                    <option value="Flat">Flat</option>
                    <option value="Villa">Villa</option>
                    <option value="House">House</option>
                    <option value="PG">PG</option>
                    <option value="Hostel - Girls">Hostel - Girls</option>
                    <option value="Hostel - Boys">Hostel - Boys</option>
                    <option value="Commercial Space">Commercial Space</option>
                    <option value="Office Space">Office Space</option>
                    <option value="Co-working Space">Co-working Space</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select id="status" className="w-full border-gray-300 rounded-md">
                    <option value="Ready to Move">Ready to Move</option>
                    <option value="New Projects">New Projects</option>
                    <option value="Premium">Premium</option>
                    <option value="Budget">Budget</option>
                    <option value="Elite">Elite</option>
                    <option value="Rental Income">Rental Income</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="furnishing">Furnishing</Label>
                  <select id="furnishing" className="w-full border-gray-300 rounded-md">
                    <option value="Full-Furnished">Full-Furnished</option>
                    <option value="Semi-Furnished">Semi-Furnished</option>
                    <option value="Un-Furnished">Un-Furnished</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="availability">Availability</Label>
                <select id="availability" className="w-full border-gray-300 rounded-md">
                  <option value="Immediate Available">Immediate Available</option>
                  <option value="Bachelor Friendly">Bachelor Friendly</option>
                  <option value="Couple Friendly">Couple Friendly</option>
                </select>
              </div>

              <Button type="submit" className="w-full bg-red-600 text-white hover:bg-red-700">
                Send Message
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
    </div>
  )
}

export default ContactUs

