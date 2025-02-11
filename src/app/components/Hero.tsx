"use client";

import { useState,useEffect, useCallback } from "react";
import { MapPin, SlidersHorizontal, Mic } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";


const PROPERTY_TAGS_BUY = [
  "Ready to move",
  "New Projects",
  "Premium",
  "Budget",
  "Elite",
  "Rental Income",
] as const;

const PROPERTY_TAGS_RENT = [
  "Fully Furnished",
  "Semi Furnished",
  "Unfurnished",
  "Short-Term Rental",
  "Long-Term Rental",
  "Immediate Available",
"Bachelor Friendly",
"Couple Friendly"
] as const;
const PROPERTY_TYPES_BUY = [
  "Residential Plot",
  "Flat",
  "House",
  "Villa",
  "Apartment",
  "Mansion",
  "Commercial Space",
  "Commercial Plot",
] as const;

const PROPERTY_TYPES_RENT = [
  "Studio Apartment",
  "Service Apartment",
  "Independent House",
  "Co-Living Space",
  "Shared Accommodation",
] as const;
const TEXT_VARIANTS = ["Dream Home", "Dream Office", "Dream Farms"];

export default function HeroSection() {
 

  const [showFilters, setShowFilters] = useState(false);
  const [bedrooms, setBedrooms] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [textIndex, setTextIndex] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  const [isListening, setIsListening] = useState(false);
  
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [listingType, setListingType] = useState<"BUY" | "RENT">("BUY");

const [searchParamsBuy, setSearchParamsBuy] = useState({
  location: "",
  propertyTag: "Ready to move", // Default for BUY
  propertyType: "Residential Plot", // Default for BUY
});

const [searchParamsRent, setSearchParamsRent] = useState({
  location: "",
  propertyTag: "Fully Furnished", // Default for RENT
  propertyType: "Studio Apartment", // Default for RENT
});

// Get the current searchParams based on listingType
const searchParams = listingType === "BUY" ? searchParamsBuy : searchParamsRent;
const setSearchParams = listingType === "BUY" ? setSearchParamsBuy : setSearchParamsRent;


  // 🔹 Debounce function to prevent excessive API calls
  const debounce = (func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };
// 🔹 Detect "Enter" keypress inside the search bar
const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  if (event.key === "Enter") {
    event.preventDefault() // Prevent default form submission
    handleSearch()
  }
}

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % TEXT_VARIANTS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
   // 🔹 Fetch Location Suggestions with Debounce
   const fetchLocationSuggestions = useCallback(
    debounce(async (query: string) => {
      if (!query.trim()) {
        setSuggestions([]);
        setShowDropdown(false);
        return;
      }
      setLoadingSuggestions(true);

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=IN`
        );
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setSuggestions(data.slice(0, 5).map((place) => place.display_name));
          setShowDropdown(true);
        } else {
          setSuggestions([]);
          setShowDropdown(false);
        }
      } catch (error) {
        console.error("Error fetching location suggestions:", error);
      } finally {
        setLoadingSuggestions(false);
      }
    }, 500),
    []
  );


   // 🔹 Speech Recognition Function
   const startSpeechRecognition = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    setIsListening(true); // Start Animation

    recognition.start();
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSearchParams((prev) => ({ ...prev, location: transcript }));
      setIsListening(false); // Stop Animation
    };

    recognition.onend = () => {
      setIsListening(false); // Stop Animation if speech stops
    };
  };
  const applyFilters = () => {
    setSearchParams((prev) => ({
      ...prev,
      priceRange,
      bedrooms: bedrooms ? Number.parseInt(bedrooms) : undefined,
    }));
    setShowFilters(false);
  };
  const handleSearch = () => {
    console.log("Searching with:", {
      listingType,
      ...(listingType === "BUY" ? searchParamsBuy : searchParamsRent),
    });
  };
  
  return (
    <section
      className="relative min-h-[700px] flex flex-col items-center justify-center px-6 bg-gray-50 text-gray-900  md:-mt-24"
      style={{
        backgroundImage: "url('/hero1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
       
     
        
      }}
      
    >
      <div className="relative z-10 w-full max-w-6xl space-y-6 text-center">
        <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight drop-shadow-lg text-white">
          Find Your {" "}
          <motion.span
            key={textIndex}
            className="text-red-500 font-medium"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 1, ease: 'easeInOut', delay: 0.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 3, delayChildren: 0.5, staggerChildren: 0.5, when: "beforeChildren" } }
          >
            {TEXT_VARIANTS[textIndex]}
          </motion.span>
        </h1>
       
        <div className="flex justify-center mx-auto gap-2 p-1 w-60 bg-black/20 backdrop-blur-lg rounded-full shadow-md">
  {(["BUY", "RENT"] as const).map((type) => (
    <Button
      key={type}
      variant={listingType === type ? "default" : "ghost"}
      onClick={() => setListingType(type)} // Simply switch between BUY and RENT
      className={`px-8 py-3 font-semibold text-lg rounded-full transition-all ${
        listingType === type
          ? "bg-white text-black shadow-lg"
          : "text-white hover:bg-white/20"
      } ${listingType === type ? "hover:bg-white" : ""}`}
    >
      {type}
    </Button>
  ))}
</div>

        <div className="bg-white shadow-xl rounded-xl p-6 grid grid-cols-1 md:grid-cols-[2fr,1fr,1fr,auto,auto] gap-6 items-center ">
        <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Enter location"
              value={searchParams.location}
              onKeyDown={handleKeyDown} // ✅ Detect Enter keypress
              onChange={(e) => {
                setSearchParams((prev) => ({ ...prev, location: e.target.value }));
                fetchLocationSuggestions(e.target.value);
              }}
              className="pl-12 bg-gray-100 border border-gray-300 rounded-lg"
             
              
            />
            
             {showDropdown && suggestions.length > 0 && (
            <ul className="absolute w-full bg-white border border-gray-200 rounded-lg shadow-md mt-1">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSearchParams((prev) => ({ ...prev, location: suggestion }));
                    setShowDropdown(false);
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
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Mic className="h-6 w-6" />
            </motion.button>
          </div>
          {isListening && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
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
          

          <Select
  value={searchParams.propertyTag}
  onValueChange={(value) =>
    setSearchParams((prev) => ({ ...prev, propertyTag: value }))
  }
>
  <SelectTrigger className="bg-gray-100 border border-gray-300 rounded-lg">
    <SelectValue placeholder="Property Tag" />
  </SelectTrigger>
  <SelectContent className="z-10 bg-gray-200">
    {(listingType === "BUY" ? PROPERTY_TAGS_BUY : PROPERTY_TAGS_RENT).map(
      (tag) => (
        <SelectItem key={tag} value={tag}>
          {tag}
        </SelectItem>
      )
    )}
  </SelectContent>
</Select>

<Select
  value={searchParams.propertyType}
  onValueChange={(value) =>
    setSearchParams((prev) => ({ ...prev, propertyType: value }))
  }
>
  <SelectTrigger className="bg-gray-100 border border-gray-300 rounded-lg">
    <SelectValue placeholder="Property Type" />
  </SelectTrigger>
  <SelectContent className="z-10 bg-gray-200">
    {(listingType === "BUY" ? PROPERTY_TYPES_BUY : PROPERTY_TYPES_RENT).map(
      (type) => (
        <SelectItem key={type} value={type}>
          {type}
        </SelectItem>
      )
    )}
  </SelectContent>
</Select>

          <Button variant="outline" size="icon" className="rounded-full border-gray-400" onClick={() => setShowFilters(true)}>
            <SlidersHorizontal className="h-5 w-5" />
          </Button>
          <Button onClick={handleSearch} className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold">
  Search for {listingType === "RENT" ? "Rent" : "Buy"}
</Button>


        </div>
      </div>
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
          </div>
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setShowFilters(false)}>Cancel</Button>
            <Button onClick={applyFilters} className="bg-blue-500 hover:bg-blue-600 text-white">Apply Filters</Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
