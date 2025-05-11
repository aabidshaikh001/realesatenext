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

// Define the interface directly in this file
interface CityData {
  state: string
  cities: string[]
}

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
})

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

  const [buyCategories, setBuyCategories] = useState([])
  const [isBuyCategoriesLoading, setBuyCategoriesLoading] = useState(true)
  const [buyCategoriesError, setBuyCategoriesError] = useState<string | null>(null)

  // Add these state variables after the buyCategories related states
  const [rentCategories, setRentCategories] = useState([])
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
        setBuyCategoriesLoading(true)
        const response = await fetch("http://localhost:5000/api/buycategory")

        if (!response.ok) {
          throw new Error("Failed to fetch buy categories")
        }

        const result = await response.json()

        if (!result.success || !Array.isArray(result.data)) {
          throw new Error("Invalid data format received from API")
        }

        setBuyCategories(result.data)
        setBuyCategoriesError(null)
      } catch (err) {
        setBuyCategoriesError("Error loading buy categories")
        console.error(err)
      } finally {
        setBuyCategoriesLoading(false)
      }
    }

    fetchBuyCategories()
  }, [])

  // Add this useEffect after the fetchBuyCategories useEffect
  useEffect(() => {
    const fetchRentCategories = async () => {
      try {
        setRentCategoriesLoading(true)
        const response = await fetch("http://localhost:5000/api/rentcategory")

        if (!response.ok) {
          throw new Error("Failed to fetch rent categories")
        }

        const result = await response.json()

        if (!result.success || !Array.isArray(result.data)) {
          throw new Error("Invalid data format received from API")
        }

        setRentCategories(result.data)
        setRentCategoriesError(null)
      } catch (err) {
        setRentCategoriesError("Error loading rent categories")
        console.error(err)
      } finally {
        setRentCategoriesLoading(false)
      }
    }

    fetchRentCategories()
  }, [])

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

          {/* Mobile Menu Button */}
          <button className="lg:hidden z-10 text-white p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

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

function NavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link href={href} className="text-gray-600 hover:text-red-600 transition-colors duration-300" onClick={onClick}>
      {children}
    </Link>
  )
}

