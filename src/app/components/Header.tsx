"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown, Menu, X, ChevronRight, UserCircle } from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useCallback } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { UserButton, SignInButton, SignUpButton, useUser } from "@clerk/nextjs"
import type React from "react" // Added import for React
import { useRouter } from "next/navigation"; // ✅ Import useRouter
import { Outfit } from "next/font/google";
import { LuHousePlus } from "react-icons/lu";
import { GiHouseKeys } from "react-icons/gi";
import { MdCurrencyRupee, MdLogin  } from "react-icons/md";
import { IoHelp, IoLocationOutline  } from "react-icons/io5";
import { RiHomeGearLine } from "react-icons/ri";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
});
export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCity, setSelectedCity] = useState("Jaipur")
  const [activeMenu, setActiveMenu] = useState<string | null>(null) // Track open submenu
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false) // ✅ NEW: State for city dropdown
  const router = useRouter(); // ✅ Initialize Next.js router
  const pathname = usePathname()
  
  const { isSignedIn, user } = useUser()
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.classList.remove("overflow-hidden")
    }

    return () => document.body.classList.remove("overflow-hidden") // Cleanup
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
    setIsOpen(false) // Close menu when route changes
  }, [])

  const handleCitySelect = useCallback((city: string) => {
    setSelectedCity(city);
    localStorage.setItem("selectedCity", city);
    setIsCityDropdownOpen(false);
    
    // ✅ Redirect to /properties/city-name
    router.push(`/properties/search/${city.toLowerCase()}`);
  }, [router]);

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
              <IoLocationOutline />  {selectedCity} <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
              <div className="z-10 invisible group-hover:visible absolute top-full left-0 w-[400px] bg-white shadow-lg rounded-md p-4 opacity-0 group-hover:opacity-100 transition-all duration-200">
                <div className="grid grid-cols-2 gap-4 ">
                  <div>
                    <h3 className="font-semibold mb-2">Rajasthan</h3>
                    <div className="space-y-2">
                      {[
                        "Ajmer",
                        "Bhilwara",
                        "Bikaner",
                        "Jaipur",
                        "Jaisalmer",
                        "Jodhpur",
                        "Kota",
                        "Pushkar",
                        "Udaipur",
                      ].map((city) => (
                        <button
                          key={city}
                          onClick={() => handleCitySelect(city)}
                          className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded"
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Other Cities</h3>
                    <div className="space-y-2">
                      {["Indore", "Ayodhya", "Hyderabad"].map((city) => (
                        <button
                          key={city}
                          onClick={() => handleCitySelect(city)}
                          className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded"
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Navigation - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            {isSignedIn ? (
              <>
              <UserButton afterSignOutUrl="/" /> {/* This will show the actual user's profile image */}
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
          categories: [
            {
              heading: "Status",
              items: ["Ready to move", "New Projects", "Premium", "Budget", "Elite", "Rental Income"],
            },
            {
              heading: "Property Type",
              items: ["Residential Plot", "Flat", "Mansion", "House", "Commercial Space", "Commercial Plot", "Office"],
            },
          ],
        },
        {
          title: "Rent",
          icon: <GiHouseKeys className="w-5 h-5" />,
          categories: [
            {
              heading: "Status",
              items: ["Full-Furnished", "Semi-Furnished", "Un-Furnished", "Immediate Available", "Bachelor Friendly", "Couple Friendly"],
            },
            {
              heading: "Property Type",
              items: ["Flat", "Villa", "House", "PG", "Hostel - Girls", "Hostel - Boys", "Commercial Space", "Office Space", "Co-working Space"],
            },
          ],
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
              items: ["Home Loan", "Home Insurance", "Legal Assistance"],
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
                          const formattedItem = item.toLowerCase().replace(/\s+/g, "-");
                          if (menu.title === "Buy" || menu.title === "Rent") {
                            const searchParams = new URLSearchParams({
                              [category.heading === "Status" ? "status" : "type"]: formattedItem,
                            }).toString();
                            router.push(`/properties/search/${selectedCity.toLowerCase()}?${searchParams}`);
                          } else {
                            router.push(`/${formattedItem}`);
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
      <div className="border-b pb-4">
        <h4 className="text-lg font-semibold mb-2">Select City</h4>
        <div className="grid grid-cols-2 gap-4">
          {["Ajmer", "Bhilwara", "Bikaner", "Jaipur", "Jaisalmer", "Jodhpur", "Kota", "Pushkar", "Udaipur"].map((city) => (
            <button
              key={city}
              onClick={() => {
                setSelectedCity(city);
                router.push(`/properties/search/${city.toLowerCase()}`);
                setIsOpen(false); // Close menu after selection
              }}
              className={`block w-full text-left px-3 py-2 rounded-md ${
                selectedCity === city ? "bg-red-100 text-red-700" : "hover:bg-gray-100"
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>
      {[
  {
    title: "Buy",
    icon: <LuHousePlus className="w-5 h-5" />,
    categories: [
      {
        heading: "Status",
        items: ["Ready to move", "New Projects", "Premium", "Budget", "Elite", "Rental Income"],
      },
      {
        heading: "Property Type",
        items: [
          "Residential Plot",
          "Flat",
          "Mansion",
          "House",
          "Commercial Space",
          "Commercial Plot",
          "Office",
        ],
      },
    ],
  },
  {
    title: "Rent",
    icon: <GiHouseKeys className="w-5 h-5" />,
    categories: [
      {
        heading: "Status",
        items: ["Full-Furnished", "Semi-Furnished", "Un-Furnished", "Immediate Available", "Bachelor Friendly", "Couple Friendly"],
      },
      {
        heading: "Property Type",
        items: ["Flat", "Villa", "House", "PG", "Hostel - Girls", "Hostel - Boys", "Commercial Space", "Office Space", "Co-working Space"],
      },
    ],
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
        items: ["Home Loan", "Home Insurance", "Legal Assistance"],
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
              {category.heading && <h4 className="text-base font-semibold text-gray-900 mb-2 mt-4">{category.heading}</h4>}
              {category.items.map((item) => {
                const formattedItem = item.toLowerCase().replace(/\s+/g, "-");
                const url =
                  menu.title === "Buy" || menu.title === "Rent"
                    ? `/properties/search/${selectedCity.toLowerCase()}?${category.heading === "Status" ? "status" : "type"}=${formattedItem}`
                    : `/${formattedItem}`; // For Sell, Services, and Help, create page navigation links

                return (
                  <Link
                    key={item}
                    href={url}
                    className="block w-full text-left py-2 px-2 text-gray-700 hover:text-red-700 hover:bg-gray-50 rounded-md transition-all duration-200"
                  >
                    {item}
                  </Link>
                );
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

            {/* Download App Section */}
            <div className="p-4 border-t">
              
              <Button className="mt-2 w-full bg-gray-800 text-white">Download App</Button>
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

