"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles for toastify

const RentAHomePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    priceRange: "",
    bedrooms: "",
    moveInDate: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setFormData({
      name: "",
      email: "",
      phone: "",
      location: "",
      priceRange: "",
      bedrooms: "",
      moveInDate: "",
    })
  // Toast Notification using react-toastify
  toast.success("Rental Search Request Submitted! We'll be in touch soon.");
  }

  return (
    <div className="min-h-screen bg-gray-50">
            <ToastContainer position="top-right" autoClose={3000} /> {/* Toast container */}

      <div
        className="relative h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/bgheader.png')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Find Your Perfect Rental
            </motion.h1>
            <motion.p
              className="text-xl text-white mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Discover the ideal rental property for your lifestyle
            </motion.p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="bg-white shadow-xl rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-6">
            <h2 className="text-3xl font-semibold mb-6 text-center ">Start Your Rental Search</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="location">Preferred Location</Label>
                  <Input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priceRange">Monthly Rent Range</Label>
                  <Select
                    value={formData.priceRange}
                    onValueChange={(value) => handleSelectChange("priceRange", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select rent range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1000">$0 - $1,000</SelectItem>
                      <SelectItem value="1001-2000">$1,001 - $2,000</SelectItem>
                      <SelectItem value="2001-3000">$2,001 - $3,000</SelectItem>
                      <SelectItem value="3001-4000">$3,001 - $4,000</SelectItem>
                      <SelectItem value="4001+">$4,001+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Select value={formData.bedrooms} onValueChange={(value) => handleSelectChange("bedrooms", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select number of bedrooms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4+">4+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="moveInDate">Desired Move-In Date</Label>
                <Input
                  type="date"
                  id="moveInDate"
                  name="moveInDate"
                  value={formData.moveInDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                  Find Rental Properties
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default RentAHomePage

