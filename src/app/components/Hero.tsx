"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { MapPin, SlidersHorizontal, Mic } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface CategoryItem {
  id: number
  heading: string
  items: string[]
}

interface ApiResponse {
  success: boolean
  data: CategoryItem[]
}

export default function HeroSection() {
  const router = useRouter()

  // State variables
  const [showFilters, setShowFilters] = useState(false)
  const [bedrooms, setBedrooms] = useState("")
  const [priceRange, setPriceRange] = useState([0, 10000000])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [textIndex, setTextIndex] = useState(0)
  const [showDropdown, setShowDropdown] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)
  const [listingType, setListingType] = useState<"BUY" | "RENT">("BUY")
  const [propertyTagsBuy, setPropertyTagsBuy] = useState<string[]>([])
  const [propertyTagsRent, setPropertyTagsRent] = useState<string[]>([])
  const [propertyTypesBuy, setPropertyTypesBuy] = useState<string[]>([])
  const [propertyTypesRent, setPropertyTypesRent] = useState<string[]>([])

  const TEXT_VARIANTS = ["Dream Home", "Dream Office", "Dream Farms"]

  const [searchParamsBuy, setSearchParamsBuy] = useState({
    location: "",
    propertyTag: "",
    propertyType: "",
  })

  const [searchParamsRent, setSearchParamsRent] = useState({
    location: "",
    propertyTag: "",
    propertyType: "",
  })

  // Get the current searchParams based on listingType
  const searchParams = listingType === "BUY" ? searchParamsBuy : searchParamsRent
  const setSearchParams = listingType === "BUY" ? setSearchParamsBuy : setSearchParamsRent

  // Fetch category data from API
  useEffect(() => {
    const fetchBuyCategories = async () => {
      try {
        const response = await fetch("https://api.realestatecompany.co.in/api/buycategory")
        const result = await response.json()

        if (result.success && Array.isArray(result.data)) {
          // Find the Status and Property Type objects
          const statusObj = result.data.find((item: CategoryItem) => item.heading === "Status")
          const propertyTypeObj = result.data.find((item: CategoryItem) => item.heading === "Property Type")

          // Extract the items arrays
          const tags = statusObj?.items || []
          const types = propertyTypeObj?.items || []

          setPropertyTagsBuy(tags)
          setPropertyTypesBuy(types)

          // Set default values if available
          if (tags.length > 0 && types.length > 0) {
            setSearchParamsBuy((prev) => ({
              ...prev,
              propertyTag: tags[0],
              propertyType: types[0],
            }))
          }
        }
      } catch (error) {
        console.error("Error fetching buy categories:", error)
        // Fallback to default values if API fails
        const defaultTags = ["Ready to move", "New Projects", "Premium", "Budget", "Elite", "Rental Income"]
        const defaultTypes = [
          "Residential Plot",
          "Flat",
          "House",
          "Villa",
          "Apartment",
          "Mansion",
          "Commercial Space",
          "Commercial Plot",
        ]
        setPropertyTagsBuy(defaultTags)
        setPropertyTypesBuy(defaultTypes)
        setSearchParamsBuy((prev) => ({
          ...prev,
          propertyTag: defaultTags[0],
          propertyType: defaultTypes[0],
        }))
      }
    }

    const fetchRentCategories = async () => {
      try {
        const response = await fetch("https://api.realestatecompany.co.in/api/rentcategory")
        const result = await response.json()

        if (result.success && Array.isArray(result.data)) {
          // Find the Status and Property Type objects
          const statusObj = result.data.find((item: CategoryItem) => item.heading === "Status")
          const propertyTypeObj = result.data.find((item: CategoryItem) => item.heading === "Property Type")

          // Extract the items arrays
          const tags = statusObj?.items || []
          const types = propertyTypeObj?.items || []

          setPropertyTagsRent(tags)
          setPropertyTypesRent(types)

          // Set default values if available
          if (tags.length > 0 && types.length > 0) {
            setSearchParamsRent((prev) => ({
              ...prev,
              propertyTag: tags[0],
              propertyType: types[0],
            }))
          }
        }
      } catch (error) {
        console.error("Error fetching rent categories:", error)
        // Fallback to default values if API fails
        const defaultTags = [
          "Full-Furnished",
          "Semi-Furnished",
          "Un-Furnished",
          "Immediate Available",
          "Bachelor Friendly",
          "Couple Friendly",
        ]
        const defaultTypes = [
          "Flat",
          "Villa",
          "House",
          "PG",
          "Hostel - Girls",
          "Hostel - Boys",
          "Commercial Space",
          "Office Space",
          "Co-working Space",
        ]
        setPropertyTagsRent(defaultTags)
        setPropertyTypesRent(defaultTypes)
        setSearchParamsRent((prev) => ({
          ...prev,
          propertyTag: defaultTags[0],
          propertyType: defaultTypes[0],
        }))
      }
    }

    fetchBuyCategories()
    fetchRentCategories()
  }, [])

  // Text animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % TEXT_VARIANTS.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Debounce function to prevent excessive API calls
  const debounce = (func: Function, delay: number) => {
    let timer: NodeJS.Timeout
    return (...args: any) => {
      clearTimeout(timer)
      timer = setTimeout(() => func(...args), delay)
    }
  }

  // Fetch Location Suggestions with Debounce
  const fetchLocationSuggestions = useCallback(
    debounce(async (query: string) => {
      if (!query.trim()) {
        setSuggestions([])
        setShowDropdown(false)
        return
      }
      setLoadingSuggestions(true)

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=IN`,
        )
        const data = await response.json()

        if (Array.isArray(data) && data.length > 0) {
          setSuggestions(data.slice(0, 5).map((place) => place.display_name))
          setShowDropdown(true)
        } else {
          setSuggestions([])
          setShowDropdown(false)
        }
      } catch (error) {
        console.error("Error fetching location suggestions:", error)
      } finally {
        setLoadingSuggestions(false)
      }
    }, 500),
    [],
  )

  // Update location suggestions when location input changes
  useEffect(() => {
    fetchLocationSuggestions(searchParams.location)
  }, [searchParams.location, fetchLocationSuggestions])

  // Speech Recognition Function
  const startSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.")
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = "en-IN"
    setIsListening(true) // Start Animation

    recognition.start()
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setSearchParams((prev) => ({ ...prev, location: transcript }))
      setIsListening(false) // Stop Animation
    }

    recognition.onend = () => {
      setIsListening(false) // Stop Animation if speech stops
    }
  }

  // Apply filters from dialog
  const applyFilters = () => {
    setSearchParams((prev) => ({
      ...prev,
      priceRange,
      bedrooms: bedrooms ? Number.parseInt(bedrooms) : undefined,
    }))
    setShowFilters(false)
  }

  // Handle search button click
  const handleSearch = () => {
    const { location, propertyTag, propertyType } = searchParams
    const query = new URLSearchParams({
      type: propertyType,
      tag: propertyTag,
      listingType: listingType.toLowerCase(),
    }).toString()

    router.push(`/properties/search/${encodeURIComponent(location.toLowerCase())}?${query}`)
  }

  // Detect "Enter" keypress inside the search bar
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault() // Prevent default form submission
      handleSearch()
    }
  }

  return (
    <section
      className="relative min-h-[700px] flex flex-col items-center justify-center px-6 bg-gray-50 text-gray-900 md:-mt-24"
      style={{
        backgroundImage: "url('/hero1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
    

      <div className="relative z-10 w-full max-w-6xl space-y-6 text-center">
        <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight drop-shadow-lg text-white">
          Find Your{" "}
          <motion.span
            key={textIndex}
            className="text-red-500 font-medium"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            {TEXT_VARIANTS[textIndex]}
          </motion.span>
        </h1>

        <div className="flex justify-center mx-auto gap-2 p-1 w-60 bg-black/20 backdrop-blur-lg rounded-full shadow-md">
          {(["BUY", "RENT"] as const).map((type) => (
            <Button
              key={type}
              variant={listingType === type ? "default" : "ghost"}
              onClick={() => setListingType(type)}
              className={`px-8 py-3 font-semibold text-lg rounded-full transition-all ${
                listingType === type ? "bg-white text-black shadow-lg" : "text-white hover:bg-white/20"
              } ${listingType === type ? "hover:bg-white" : ""}`}
            >
              {type}
            </Button>
          ))}
        </div>

        <div className="bg-white shadow-xl rounded-xl p-6 grid grid-cols-1 md:grid-cols-[2fr,1fr,1fr,auto,auto] gap-6 items-center">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Enter location"
              value={searchParams.location}
              onChange={(e) => setSearchParams((prev) => ({ ...prev, location: e.target.value }))}
              onKeyDown={handleKeyDown}
              className="pl-12 bg-gray-100 border border-gray-300 rounded-lg"
            />

            {showDropdown && suggestions.length > 0 && (
              <ul className="absolute w-full bg-white border border-gray-200 rounded-lg shadow-md mt-1 z-20">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSearchParams((prev) => ({ ...prev, location: suggestion }))
                      setShowDropdown(false)
                    }}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}

<motion.button
              className={`absolute right-3 top-1.5 -translate-y-1/2 text-gray-500 cursor-pointer ${
                isListening ? "text-red-500" : ""
              }`}
              onClick={startSpeechRecognition}
              animate={{
                scale: isListening ? [1, 1.2, 1] : 1,
                opacity: isListening ? [1, 0.5, 1] : 1,
              }}
              transition={{
                duration: 1,
                repeat: isListening ? Number.POSITIVE_INFINITY : 0,
                ease: "easeInOut",
              }}
            >
              <Mic className="h-6 w-6" />
            </motion.button>
          </div>

          <Select
            value={searchParams.propertyTag}
            onValueChange={(value) => setSearchParams((prev) => ({ ...prev, propertyTag: value }))}
          >
            <SelectTrigger className="bg-gray-100 border border-gray-300 rounded-lg">
              <SelectValue placeholder="Property Tag" />
            </SelectTrigger>
            <SelectContent className="z-10 bg-white">
              {(listingType === "BUY" ? propertyTagsBuy : propertyTagsRent).map((tag) => (
                <SelectItem key={tag} value={tag}>
                  {tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={searchParams.propertyType}
            onValueChange={(value) => setSearchParams((prev) => ({ ...prev, propertyType: value }))}
          >
            <SelectTrigger className="bg-gray-100 border border-gray-300 rounded-lg">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent className="z-10 bg-white">
              {(listingType === "BUY" ? propertyTypesBuy : propertyTypesRent).map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-gray-400"
            onClick={() => setShowFilters(true)}
          >
            <SlidersHorizontal className="h-5 w-5" />
          </Button>

          <Button
            onClick={handleSearch}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold"
          >
            Search for {listingType === "RENT" ? "Rent" : "Buy"}
          </Button>
        </div>
      </div>

      {/* Filters Dialog */}
      <Dialog open={showFilters} onOpenChange={setShowFilters}>
        <DialogContent className="sm:max-w-[425px] bg-white shadow-lg rounded-lg">
          <DialogHeader>
            <DialogTitle>Filters</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Price Range (₹)</Label>
              <Slider
                min={0}
                max={10000000}
                step={50000}
                value={priceRange}
                onValueChange={(value) => setPriceRange(value)}
                className="bg-gray-50"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>₹{priceRange[0].toLocaleString()}</span>
                <span>₹{priceRange[1].toLocaleString()}</span>
              </div>
            </div>

            {/* Bedrooms filter (only for certain property types) */}
            {(listingType === "BUY"
              ? ["Flat", "House", "Villa", "Apartment", "Mansion"]
              : ["Studio Apartment", "Service Apartment", "Independent House", "Flat"]
            ).includes(searchParams.propertyType) && (
              <div className="grid gap-2">
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Select value={bedrooms} onValueChange={setBedrooms}>
                  <SelectTrigger id="bedrooms" className="bg-gray-100">
                    <SelectValue placeholder="Select bedrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    {["1", "2", "3", "4", "5+"].map((num) => (
                      <SelectItem key={num} value={num}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setShowFilters(false)}>
              Cancel
            </Button>
            <Button onClick={applyFilters} className="bg-red-500 hover:bg-red-600 text-white">
              Apply Filters
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Listening overlay */}
      {isListening && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <p className="text-lg">Listening...</p>
            <motion.div
              className="w-16 h-16 rounded-full border-4 border-white border-opacity-50 flex items-center justify-center mt-4"
              animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <Mic className="h-10 w-10 text-red-500" />
            </motion.div>
          </div>
        </div>
      )}
    </section>
  )
}

