"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown, Menu, X, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useCallback } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { UserButton, SignInButton, SignUpButton, useUser } from "@clerk/nextjs"
import type React from "react"
import { useRouter } from "next/navigation"
import { Outfit } from "next/font/google"
import { LuHousePlus } from "react-icons/lu"
import { GiHouseKeys } from "react-icons/gi"
import { MdCurrencyRupee, MdLogin } from "react-icons/md"
import { IoHelp, IoLocationOutline } from "react-icons/io5"
import { RiHomeGearLine } from "react-icons/ri"
import { PiSparkleBold } from "react-icons/pi"

// Define the interface directly in this file
interface CityData {
  state: string
  cities: string[]
}

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
})
type BuyCategory = {
  heading: string;
  items: any[]; // You can replace `any` with a more specific type if you know the shape
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCity, setSelectedCity] = useState("Jaipur")
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // State for location data
  const [locationData, setLocationData] = useState<CityData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { isSignedIn, user } = useUser()

const [buyCategories, setBuyCategories] = useState<BuyCategory[]>([]);
  const [isBuyCategoriesLoading, setBuyCategoriesLoading] = useState(true)
  const [buyCategoriesError, setBuyCategoriesError] = useState<string | null>(null)

  // Add these state variables after the buyCategories related states
  const [rentCategories, setRentCategories] = useState<BuyCategory[]>([]);
  const [isRentCategoriesLoading, setRentCategoriesLoading] = useState(true)
  const [rentCategoriesError, setRentCategoriesError] = useState<string | null>(null)

  // Fetch location data from external API
  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("http://localhost:5000/api/statecity")

        if (!response.ok) {
          throw new Error("Failed to fetch location data")
        }

        const result = await response.json()

        // Check if the response has the expected structure
        if (!result.success || !Array.isArray(result.data)) {
          throw new Error("Invalid data format received from API")
        }

        setLocationData(result.data) // Use result.data instead of the whole response
        setError(null)
      } catch (err) {
        setError("Error loading location data")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLocationData()
  }, [])

 useEffect(() => {
  const fetchBuyCategories = async () => {
    try {
      setBuyCategoriesLoading(true);
      const response = await fetch("http://localhost:5000/api/buycategory");

      if (!response.ok) {
        throw new Error("Failed to fetch buy categories");
      }

      const result = await response.json();

      if (!result.success || !result.data) {
        throw new Error("Invalid data format received from API");
      }

      // Transform the API data into the expected format
      const transformedData = [
        {
          heading: "Status",
          items: result.data.Status || []
        },
        {
          heading: "PropertyType",
          items: result.data.PropertyType || []
        }
      ];

      setBuyCategories(transformedData);
      setBuyCategoriesError(null);
    } catch (err) {
      setBuyCategoriesError("Error loading buy categories");
      console.error(err);
    } finally {
      setBuyCategoriesLoading(false);
    }
  };

  fetchBuyCategories();
}, []);
  // Add this useEffect after the fetchBuyCategories useEffect
  useEffect(() => {
  const fetchRentCategories = async () => {
    try {
      setRentCategoriesLoading(true);
      const response = await fetch("http://localhost:5000/api/rentcategory");

      if (!response.ok) {
        throw new Error("Failed to fetch rent categories");
      }

      const result = await response.json();

      if (!result.success || !result.data) {
        throw new Error("Invalid data format received from API");
      }

      // Transform the API data into the expected format
      const transformedData = [
        {
          heading: "Status",
          items: result.data.Status || []
        },
        {
          heading: "PropertyType",
          items: result.data.PropertyType || []
        }
      ];

      setRentCategories(transformedData);
      setRentCategoriesError(null);
    } catch (err) {
      setRentCategoriesError("Error loading rent categories");
      console.error(err);
    } finally {
      setRentCategoriesLoading(false);
    }
  };

  fetchRentCategories();
}, []);
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.classList.remove("overflow-hidden")
    }

    return () => document.body.classList.remove("overflow-hidden")
  }, [isOpen])

  useEffect(() => {
    const savedCity = localStorage.getItem("selectedCity")
    if (savedCity) {
      setSelectedCity(savedCity)
    }
  }, [])

  const toggleMenu = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu)
  }

  useEffect(() => {
    localStorage.setItem("selectedCity", selectedCity)
  }, [selectedCity])

  useEffect(() => {
    setIsOpen(false)
  }, [])

  const handleCitySelect = useCallback(
    (city: string) => {
      setSelectedCity(city)
      localStorage.setItem("selectedCity", city)
      setIsCityDropdownOpen(false)

      router.push(`/properties/search/${city.toLowerCase()}`)
    },
    [router],
  )

  // Find the state for the currently selected city
  const getSelectedCityState = useCallback(() => {
    if (locationData.length === 0) return null

    for (const stateData of locationData) {
      if (stateData.cities.includes(selectedCity)) {
        return stateData.state
      }
    }
    return null
  }, [locationData, selectedCity])

  return (
    <header className={`w-full relative z-40 font-sans ${outfit.className}`}>
      {isSignedIn && (
        <div className="bg-green-100 text-green-800 px-4 py-2 text-center">Welcome back, {user.firstName}!</div>
      )}
      {/* Top Navigation */}
      <div className="bg-red-600 fixed w-full z-40 top-0 left-0">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center" prefetch={true}>
            <Image src="/logo.png" alt="Real Estate" width={200} height={40} />
          </Link>

          {/* Mobile Menu Button and Luxar Button */}
          <div className="lg:hidden flex items-center gap-3 z-10">
            <div className="scale-90">
              <LuxarButton />
            </div>
            <button className="text-white p-2" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 items-center ">
            {/* City Selector */}
            <div className="group relative ml-8">
              <Button variant="ghost" className="text-white hover:text-white hover:bg-red-700 text-xl">
                <IoLocationOutline /> {selectedCity} <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
              <div className="z-10 invisible group-hover:visible absolute top-full left-0 w-[400px] bg-white shadow-lg rounded-md p-4 opacity-0 group-hover:opacity-100 transition-all duration-200">
                {isLoading ? (
                  <div className="flex justify-center items-center h-20">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
                  </div>
                ) : error ? (
                  <div className="text-red-500 p-4 text-center">{error}</div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto">
                    {locationData.map((stateData) => (
                      <div key={stateData.state}>
                        <h3 className="font-semibold mb-2">{stateData.state}</h3>
                        <div className="space-y-2">
                          {stateData.cities.map((city) => (
                            <button
                              key={city}
                              onClick={() => handleCitySelect(city)}
                              className={`block w-full text-left px-2 py-1 hover:bg-gray-100 rounded ${
                                selectedCity === city ? "bg-red-50 text-red-600 font-medium" : ""
                              }`}
                            >
                              {city}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Navigation - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <LuxarButton />
            {isSignedIn ? (
              <>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <>
                <SignInButton mode="modal">
                  <Button variant="ghost" className="text-white hover:text-white hover:bg-red-700 text-lg">
                    <MdLogin /> Login
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="bg-white text-red-600 hover:bg-gray-100 text-lg rounded-full">Sign Up</Button>
                </SignUpButton>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Secondary Navigation - Desktop */}
      <nav className="hidden lg:block border-b bg-white shadow-lg mt-16">
        <div className="container mx-auto px-10">
          <div className="flex items-center space-x-14 h-16">
            {[
              {
                title: "Buy",
                icon: <LuHousePlus className="w-5 h-5" />,
                categories: isBuyCategoriesLoading
                  ? []
                  : buyCategoriesError
                    ? [{ heading: "Error", items: ["Failed to load categories"] }]
                    : buyCategories,
              },
              // Replace the hardcoded Rent categories in the desktop navigation section with:
              {
                title: "Rent",
                icon: <GiHouseKeys className="w-5 h-5" />,
                categories: isRentCategoriesLoading
                  ? []
                  : rentCategoriesError
                    ? [{ heading: "Error", items: ["Failed to load categories"] }]
                    : rentCategories,
              },
              {
                title: "Sell",
                icon: <MdCurrencyRupee className="w-5 h-5" />,
                categories: [
                  {
                    heading: "",
                    items: ["For Owner", "For Builder", "For Agent"],
                  },
                ],
              },
              {
                title: "Services",
                icon: <RiHomeGearLine className="w-5 h-5" size={30} />,
                categories: [
                  {
                    heading: "Home Services",
                    items: ["Home Interior", "Home Construction"],
                  },
                  {
                    heading: "Other Services",
                    items: ["Home Loan", "Home Insurance"],
                  },
                ],
              },
              {
                title: "Help",
                icon: <IoHelp className="w-5 h-5" />,
                categories: [
                  {
                    heading: "Support",
                    items: ["Contact Us", "FAQs"],
                  },
                  {
                    heading: "Resources",
                    items: ["Blog", "Legal Assistance", "Property Valuation"],
                  },
                ],
              },
            ].map((menu) => (
              <div key={menu.title} className="group relative">
                <Button
                  variant="ghost"
                  className={`h-20 px-6 -ml-8 font-sans text-lg text-gray-900 hover:text-red-700 transition-all duration-200 ${outfit.className}`}
                >
                  {menu.icon}
                  {menu.title}
                  <ChevronDown className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:rotate-180" />
                </Button>
                {menu.categories && (
                  <div className="invisible group-hover:visible absolute top-full left-0 w-96 bg-white shadow-2xl rounded-lg py-5 opacity-0 group-hover:opacity-100 transition-all duration-300 border border-gray-200 -mt-2 -ml-8">
                    <div className="grid grid-cols-2 gap-2 px-10">
                      {menu.categories.map((category, index) => (
                        <div key={index} className="w-full">
                          {category.heading && (
                            <h4 className="text-base font-semibold text-gray-900 mb-4 pb-2 border-b">
                              {category.heading}
                            </h4>
                          )}
                          {category.items.map((item) => (
                            <button
                              key={item}
                              onClick={() => {
                                const formattedItem = item.toLowerCase().replace(/\s+/g, "-")
                                if (menu.title === "Buy" || menu.title === "Rent") {
                                  const searchParams = new URLSearchParams({
                                    [category.heading === "Status" ? "status" : "type"]: formattedItem,
                                  }).toString()
                                  router.push(`/properties/search/${selectedCity.toLowerCase()}?${searchParams}`)
                                } else {
                                  router.push(`/${formattedItem}`)
                                }
                              }}
                              className="block py-2 text-gray-700 hover:text-red-700 hover:bg-gray-50 rounded-md transition-all duration-200"
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white z-40 w-[80%] sm:w-[60%] md:w-[50%] shadow-lg overflow-y-auto"
          >
            {/* Close Button */}
            <div className="flex items-center justify-between p-4 border-b">
              <Image
                src={"/logo.png"}
                alt="Real Estate"
                width={150}
                height={30}
                style={{
                  filter: "brightness(0) saturate(100%) invert(18%) sepia(92%) saturate(7400%) hue-rotate(0deg)",
                }}
              />

              <button onClick={() => setIsOpen(false)}>
                <X size={24} />
              </button>
            </div>

            {/* Main Navigation */}
            <nav className="p-4 space-y-4">
              {/* Location Selection */}
              <div className="border-b pb-2">
                <button
                  className="w-full flex justify-between items-center text-lg font-medium px-2 py-2"
                  onClick={() => toggleMenu("Select City")}
                >
                  Select City
                  {activeMenu === "Select City" ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </button>
                <AnimatePresence>
                  {activeMenu === "Select City" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="pl-4 py-2"
                    >
                      {isLoading ? (
                        <div className="flex justify-center items-center h-20">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
                        </div>
                      ) : error ? (
                        <div className="text-red-500 p-4 text-center">{error}</div>
                      ) : (
                        locationData.map((stateData) => (
                          <div key={stateData.state} className="mb-4">
                            <h4 className="text-base font-semibold text-gray-900 mb-2">{stateData.state}</h4>
                            {stateData.cities.map((city) => (
                              <button
                                key={city}
                                onClick={() => {
                                  handleCitySelect(city)
                                  setIsOpen(false)
                                }}
                                className={`block w-full text-left py-2 px-2 text-gray-700 hover:text-red-700 hover:bg-gray-50 rounded-md transition-all duration-200 ${
                                  selectedCity === city ? "bg-red-50 text-red-600 font-medium" : ""
                                }`}
                              >
                                {city}
                              </button>
                            ))}
                          </div>
                        ))
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Other menu items */}
              {[
                {
                  title: "Buy",
                  icon: <LuHousePlus className="w-5 h-5" />,
                  categories: isBuyCategoriesLoading
                    ? []
                    : buyCategoriesError
                      ? [{ heading: "Error", items: ["Failed to load categories"] }]
                      : buyCategories,
                },
                // Replace the hardcoded Rent categories in the mobile menu section with:
                {
                  title: "Rent",
                  icon: <GiHouseKeys className="w-5 h-5" />,
                  categories: isRentCategoriesLoading
                    ? []
                    : rentCategoriesError
                      ? [{ heading: "Error", items: ["Failed toload categories"] }]
                      : rentCategories,
                },
                {
                  title: "Sell",
                  icon: <MdCurrencyRupee className="w-5 h-5" />,
                  categories: [
                    {
                      heading: "",
                      items: ["For Owner", "For Builder", "For Agent"],
                    },
                  ],
                },
                {
                  title: "Services",
                  icon: <RiHomeGearLine className="w-5 h-5" />,
                  categories: [
                    {
                      heading: "Home Services",
                      items: ["Home Interior", "Home Construction"],
                    },
                    {
                      heading: "Other Services",
                      items: ["Home Loan", "Home Insurance"],
                    },
                  ],
                },
                {
                  title: "Help",
                  icon: <IoHelp className="w-5 h-5" />,
                  categories: [
                    {
                      heading: "Support",
                      items: ["Contact Us", "FAQs"],
                    },
                    {
                      heading: "Resources",
                      items: ["Blog", "Legal Assistance", "Property Valuation"],
                    },
                  ],
                },
              ].map((menu) => (
                <div key={menu.title} className="border-b pb-2">
                  <button
                    className="w-full flex justify-between items-center text-lg font-medium px-2 py-2"
                    onClick={() => toggleMenu(menu.title)}
                  >
                    {menu.title}
                    {activeMenu === menu.title ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </button>
                  <AnimatePresence>
                    {activeMenu === menu.title && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="pl-4 py-2"
                      >
                        {menu.categories.map((category) => (
                          <div key={category.heading}>
                            {category.heading && (
                              <h4 className="text-base font-semibold text-gray-900 mb-2 mt-4">{category.heading}</h4>
                            )}
                            {category.items.map((item) => {
                              const formattedItem = item.toLowerCase().replace(/\s+/g, "-")
                              const url =
                                menu.title === "Buy" || menu.title === "Rent"
                                  ? `/properties/search/${selectedCity.toLowerCase()}?${category.heading === "Status" ? "status" : "type"}=${formattedItem}`
                                  : `/${formattedItem}`

                              return (
                                <Link
                                  key={item}
                                  href={url}
                                  className="block w-full text-left py-2 px-2 text-gray-700 hover:text-red-700 hover:bg-gray-50 rounded-md transition-all duration-200"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {item}
                                </Link>
                              )
                            })}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Authentication Section */}
            <div className="p-4 border-t">
              {isSignedIn ? (
                <>
                  <Link href="/profile" className="block py-2 text-gray-700 hover:bg-gray-100 rounded">
                    Profile
                  </Link>
                  <UserButton afterSignOutUrl="/" />
                </>
              ) : (
                <>
                  <SignInButton mode="modal">
                    <Button variant="ghost" className="w-full justify-start text-red-600 hover:bg-red-50">
                      Login
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button variant="ghost" className="w-full justify-start text-red-600 hover:bg-red-50 mt-2">
                      Sign Up
                    </Button>
                  </SignUpButton>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function LuxarButton() {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  return (
    <motion.a
      className="relative group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onTapStart={() => setIsPressed(true)}
      onTap={() => setTimeout(() => setIsPressed(false), 300)}
      onTapCancel={() => setIsPressed(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      href="/luxar"
    >
      {/* Outer glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400 via-orange-500 to-red-600 blur-xl"
        initial={{ scale: 0.85, opacity: 0.3 }}
        animate={{
          scale: isHovered ? [0.85, 1.2, 1] : 0.85,
          opacity: isHovered ? [0.3, 0.7, 0.5] : 0.3,
        }}
        transition={{
          scale: {
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          },
          opacity: {
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          },
        }}
      />

      {/* Middle glow layer */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/60 via-red-600/60 to-red-700/60 blur-md"
        animate={{
          scale: isHovered ? [0.9, 1.1, 0.95] : 0.9,
          opacity: isHovered ? [0.4, 0.8, 0.6] : 0.4,
        }}
        transition={{
          scale: {
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          },
          opacity: {
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          },
        }}
      />

      {/* Button content with gradient background */}
      <motion.div
        className="relative px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 via-purple-900 to-purple-500 text-white font-medium tracking-wider uppercase text-sm border border-white/20 shadow-lg flex items-center gap-1.5 z-10"
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{
          backgroundPosition: isHovered ? ["0% 50%", "100% 50%"] : "0% 50%",
          boxShadow: isPressed
            ? "0 0 15px rgba(239, 68, 68, 0.7), inset 0 0 10px rgba(255, 255, 255, 0.3)"
            : isHovered
              ? "0 0 20px rgba(239, 68, 68, 0.5), inset 0 0 5px rgba(255, 255, 255, 0.2)"
              : "0 0 10px rgba(239, 68, 68, 0.3)",
        }}
        transition={{
          backgroundPosition: {
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          },
          boxShadow: { duration: 0.2 },
        }}
      >
        {/* Sparkle icon with animation */}
        <motion.span
          animate={{
            rotate: isHovered ? [0, 15, -15, 0] : 0,
            scale: isHovered ? [1, 1.2, 1] : 1,
          }}
          transition={{
            rotate: { duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" },
            scale: { duration: 0.8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
          }}
          className="text-yellow-200"
        >
          <PiSparkleBold className="h-4 w-4" />
        </motion.span>
        LUXAR
        {/* Horizontal shimmer effect */}
        <motion.span
          className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: -100, opacity: 0 }}
          animate={{
            x: ["-100%", "200%"],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            x: { duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.5 },
            opacity: { duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.5 },
          }}
        />
        {/* Radial pulse effect on press */}
        {isPressed && (
          <motion.span
            className="absolute inset-0 rounded-full bg-white/30"
            initial={{ scale: 0.8, opacity: 0.8 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        )}
      </motion.div>
    </motion.a>
  )
}

function NavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link href={href} className="text-gray-600 hover:text-red-600 transition-colors duration-300" onClick={onClick}>
      {children}
    </Link>
  )
}
