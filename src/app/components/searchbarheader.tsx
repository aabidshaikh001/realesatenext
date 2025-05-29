"use client"

import { useState, useEffect, useRef } from "react"
import { MapPin, SlidersHorizontal, Mic, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

const PROPERTY_TYPES = [
  "Flat/Apartment",
  "Residential Land",
  "Serviced Apartments",
  "Independent/Builder Floor",
  "1 RK/ Studio Apartment",
  "Independent House/Villa",
  "Farm House",
  "Other",
]

export default function SearchHeader() {
  const router = useRouter()
  const [searchParams, setSearchParams] = useState({
    location: "",
    propertyTypes: new Set(),
    budget: "",
    bedrooms: "",
    constructionStatus: "",
    postedBy: "",
    propertyFor: "",
  })
  const [expanded, setExpanded] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [closing, setClosing] = useState(false)
  const [isListening, setIsListening] = useState(false);
  // 🔹 Function to trigger search
  const handleSearch = () => {
    if (searchParams.location.trim() !== "") {
      console.log("Searching for:", searchParams)

      setExpanded(false) // Close expanded filters
      setShowDropdown(false) // Close dropdown

      const encodedLocation = encodeURIComponent(searchParams.location.trim())

      // 🔹 Convert selected property types into a comma-separated string
      const propertyTypes = Array.from(searchParams.propertyTypes).join(",")
      const queryParams = new URLSearchParams({
        location: encodedLocation,
        ...(propertyTypes && { propertyTypes }), // Only add if selected
        ...(searchParams.budget && { budget: searchParams.budget }),
        ...(searchParams.constructionStatus && { constructionStatus: searchParams.constructionStatus }),
        ...(searchParams.postedBy && { postedBy: searchParams.postedBy }),
        ...(searchParams.propertyFor && { propertyFor: searchParams.propertyFor }), // "Buy" or "Rent"
      }).toString()

      router.push(`/properties/search/${encodedLocation}?${queryParams}`)
    }
  }

  // 🔹 Detect "Enter" keypress inside the search bar
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault() // Prevent default form submission
      handleSearch()
    }
  }
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY + 50 && expanded) {
        setClosing(true) // Start fade-out animation
        setTimeout(() => {
          setExpanded(false)
          setClosing(false) // Reset closing state after animation
        }, 300) // Delay for smooth transition
      }
      setLastScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [lastScrollY, expanded])

  const togglePropertyType = (type: string) => {
    setSearchParams((prev) => {
      const newTypes = new Set(prev.propertyTypes)
      if (newTypes.has(type)) {
        newTypes.delete(type)
      } else {
        newTypes.add(type)
      }
      return { ...prev, propertyTypes: newTypes }
    })
  }

  const startSpeechRecognition = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }
  
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.start();
    setIsListening(true);
  
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.trim();
  
      console.log("Voice Input Recognized:", transcript); // Debugging
  
      // ✅ If using `useState`
      setSearchParams((prev) => ({ ...prev, location: transcript })); 
  
      // ✅ If using `useSearchParams()`, use `router.push()` instead
      handleSearch();
    };
  
    recognition.onspeechend = () => {
      recognition.stop(); // ✅ Stop recognition once the user stops speaking
      setIsListening(false);
    };
  
    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event);
      setIsListening(false);
    };
  };
  
  

// Function to handle search processing automatically
const processSearch = (query: string) => {
  console.log("Processing search for:", query);
  
  // ✅ Update the URL with the search query (optional if using Next.js router)
  router.push(`/properties?location=${encodeURIComponent(query)}`);
};


  const clearAllFilters = () => {
    setSearchParams({
      location: "",
      propertyTypes: new Set(),
      budget: "",
      bedrooms: "",
      constructionStatus: "",
      postedBy: "",
      propertyFor: "",
    })
  }

  const fetchLocationSuggestions = async (query: string) => {
    if (!query.trim()) {
      setSuggestions([])
      setShowDropdown(false)
      return
    }
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=IN`,
      )
      const data = await response.json()

      if (Array.isArray(data) && data.length > 0) {
        setSuggestions(data.slice(0, 4).map((place) => place.display_name))
        setShowDropdown(true)
      } else {
        setSuggestions([])
        setShowDropdown(false)
      }
    } catch (error) {
      console.error("Error fetching location suggestions:", error)
    }
  }

  // Debounce fetching suggestions when typing
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchLocationSuggestions(searchParams.location)
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [searchParams.location]) // Added searchParams.location as a dependency

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="w-full ">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-2 rounded-xl shadow-lg border border-gray-100">
            

            <div className="hidden sm:block h-8 w-px bg-gray-200" />

            <div className="relative flex-1 w-full">
              <Input
                placeholder="Enter Locality / Project / Society / Landmark"
                value={searchParams.location}
                onKeyDown={handleKeyDown}
                onChange={(e) => setSearchParams((prev) => ({ ...prev, location: e.target.value }))}
                className="pl-10 pr-12 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-600 placeholder:text-gray-400 w-full"
              />
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {searchParams.location && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 hover:bg-gray-100 rounded-full"
                    onClick={() => setSearchParams((prev) => ({ ...prev, location: "" }))}
                  >
                    <X className="h-4 w-4 text-gray-400" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 hover:bg-gray-100 rounded-full"
                  onClick={startSpeechRecognition}
                >
                  <Mic className="h-4 w-4 text-gray-400" />
                </Button>
                
          
              </div>
               {/* Listening Modal */}
               {isListening && (
  <div className="fixed inset-0 z-40 flex items-center justify-center  bg-opacity-60">
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg flex flex-col items-center">
      <p className="text-lg">Listening...</p>
      <motion.div
        className="w-16 h-16 rounded-full border-4 border-white border-opacity-50 flex items-center justify-center mt-4"
        animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      >
        <Mic className="h-10 w-10 text-red-500" />
      </motion.div>
    </div>
  </div>
)}
              {showDropdown && suggestions.length > 0 && (
                <div
                  className="absolute z-10 w-full bg-white mt-1 py-2 rounded-md shadow-lg border border-gray-200"
                  ref={dropdownRef}
                >
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
                      onClick={() => {
                        setSearchParams((prev) => ({ ...prev, location: suggestion }))
                        setShowDropdown(false)
                      }}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="hidden sm:block h-8 w-px bg-gray-200" />

            <Button
              variant="ghost"
              size="icon"
              className={cn("h-10 w-10 rounded-lg hover:bg-gray-50 transition-colors", expanded && "bg-gray-50")}
              onClick={() => setExpanded(!expanded)}
            >
              <SlidersHorizontal className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100"
              >
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-base font-semibold text-gray-900">Filters</h3>
                      <button
                        className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                        onClick={clearAllFilters}
                      >
                        Clear all filters
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                      {PROPERTY_TYPES.map((type) => (
                        <label
                          key={type}
                          className={cn(
                            "flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-colors font-extrabold",
                            searchParams.propertyTypes.has(type) ? "bg-red-50 text-red-900" : "hover:bg-gray-50",
                          )}
                        >
                          <Checkbox
                            checked={searchParams.propertyTypes.has(type)}
                            onCheckedChange={() => togglePropertyType(type)}
                            className="data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 data-[state=checked]:text-white"
                          />
                          <span className="text-sm font-medium">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                    <Select onValueChange={(value) => setSearchParams((prev) => ({ ...prev, budget: value }))}>
                      <SelectTrigger className="w-full sm:w-40 bg-white border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <SelectValue placeholder="Budget" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Below ₹50L</SelectItem>
                        <SelectItem value="medium">₹50L - ₹1Cr</SelectItem>
                        <SelectItem value="high">Above ₹1Cr</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      onValueChange={(value) => setSearchParams((prev) => ({ ...prev, constructionStatus: value }))}
                    >
                      <SelectTrigger className="w-full sm:w-40 bg-white border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <SelectValue placeholder="Construction Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ready">Ready to Move</SelectItem>
                        <SelectItem value="under">Under Construction</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select onValueChange={(value) => setSearchParams((prev) => ({ ...prev, postedBy: value }))}>
                      <SelectTrigger className="w-full sm:w-40 bg-white border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <SelectValue placeholder="Posted By" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="owner">Owner</SelectItem>
                        <SelectItem value="agent">Agent</SelectItem>
                        <SelectItem value="builder">Builder</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t gap-4 ">
                    
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        className="border-gray-200 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                        onClick={() => setExpanded(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-red-600 hover:bg-red-700 transition-colors rounded-2xl text-white"
                        onClick={handleSearch}
                      >
                        Search Properties
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

