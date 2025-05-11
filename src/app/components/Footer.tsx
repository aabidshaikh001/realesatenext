'use client'
import Link from "next/link"
import Image from "next/image"
import { FaGooglePlay, FaApple, FaFacebook, FaTwitter, FaLinkedin, FaYoutube, FaInstagram } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from 'sonner';


interface CityData {
  state: string;
  cities: string[];
}

interface ApiResponse {
  success: boolean;
  data: CityData[];
}

export default function Footer() {
  const router = useRouter();
  const [cityData, setCityData] = useState<CityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
  
      if (!response.ok) {
        throw new Error("You are already subscribed to our newsletter");
      }
  
      toast.success("Subscribed successfully!");
      setEmail("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "An unknown error occurred");
    }
  };
  

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/statecity');
        if (!response.ok) {
          throw new Error('Failed to fetch city data');
        }
        const data: ApiResponse = await response.json();
        if (data.success && data.data) {
          setCityData(data.data);
        } else {
          throw new Error('Invalid data format received');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCityData();
  }, []);

  // Function to handle property searches
  const handleCitySearch = (city: string) => {
    router.push(`/properties/search/${city.toLowerCase()}`);
  };

  // Get Rajasthan cities and other cities from the API data
  const rajasthanCities = cityData.find(item => item.state === 'Rajasthan')?.cities || [];
  const otherCities = cityData.filter(item => item.state !== 'Rajasthan').flatMap(item => item.cities);

  return (
    <footer className="w-full bg-gray-100 ">
      <div className="container max-w-full pt-8 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 ">
          <div className="p-6 bg-gray-100 rounded-lg shadow-sm">
            {/* About Section */}
            <div className="flex items-center">
              <Image 
                src="/logo.png" 
                alt="TREC Logo" 
                width={200} 
                height={50} 
                style={{ filter: "brightness(0) saturate(100%) invert(50%) sepia(92%) saturate(7400%) hue-rotate(0deg)" }}
                className="object-contain filter invert-[22%] sepia-[100%] saturate-[10000%] hue-rotate-[0deg] brightness-[103%] contrast-[104%]" 
              />
            </div>

            <p className="text-sm text-gray-600 mb-4">
              The Real Estate Company is a premier property consultancy specializing in residential, commercial, and industrial real estate solutions. With a deep understanding of market trends, legal frameworks, and investment opportunities, we provide expert guidance for property buyers, sellers, and investors.{" "}
              <Link href="/aboutus" className="text-blue-600 hover:underline">
                Read more
              </Link>
            </p>

            {/* Store Buttons */}
            <div className="flex gap-4 items-center mb-6">
              <Link href="#" passHref>
                <div className="flex items-center justify-center bg-black text-white font-medium px-2 py-1 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
                  <FaGooglePlay className="mr-3 h-6 w-6" />
                  <div className="text-left">
                    <p className="text-xs leading-none">GET IT ON</p>
                    <p className="text-sm font-bold leading-none">Google Play</p>
                  </div>
                </div>
              </Link>
              <Link href="#" passHref>
                <div className="flex items-center justify-center bg-gray-900 text-white font-medium px-2 py-1 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
                  <FaApple className="mr-3 h-6 w-6" />
                  <div className="text-left">
                    <p className="text-xs leading-none">AVAILABLE ON</p>
                    <p className="text-sm font-bold leading-none">App Store</p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Social Media Links */}
            <div className="flex gap-4 items-center mb-6">
              <Link href="#" className="text-blue-600 hover:text-blue-700">
                <FaFacebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-900 hover:text-gray-700">
                <FaTwitter className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-blue-600 hover:text-blue-700">
                <FaLinkedin className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-red-600 hover:text-red-700">
                <FaYoutube className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-pink-600 hover:text-pink-700">
                <FaInstagram className="h-6 w-6" />
              </Link>
            </div>

            <div className="mt-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Subscribe to Our Newsletter</h3>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-wrap gap-2">
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter your email"
      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      required
    />
    <button
      type="submit"
      className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-300"
    >
      Subscribe
    </button>
  </form>
            </div>
          </div>

          {/* Properties Section */}
          <div className="space-y-4 lg:mt-9 px-6">
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-6 w-48 bg-gray-200 rounded"></div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-6 w-48 bg-gray-200 rounded mt-4"></div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
              </div>
            ) : error ? (
              <p className="text-red-500">Error loading property data: {error}</p>
            ) : (
              <>
                <h2 className="text-lg font-semibold mb-4">Properties in Rajasthan</h2>
                <div className="text-sm text-gray-600 space-y-1">
                  {rajasthanCities.length > 0 ? (
                    <>
                      <p>
                        {rajasthanCities.slice(0, 4).map((city) => (
                          <span key={city}>
                            <button
                              className="hover:underline"
                              onClick={() => handleCitySearch(city)}
                            >
                              Property in {city}
                            </button>{" "}
                            |{" "}
                          </span>
                        ))}
                      </p>
                      <p>
                        {rajasthanCities.slice(4).map((city) => (
                          <span key={city}>
                            <button
                              className="hover:underline"
                              onClick={() => handleCitySearch(city)}
                            >
                              Property in {city}
                            </button>{" "}
                            |{" "}
                          </span>
                        ))}
                      </p>
                    </>
                  ) : (
                    <p>No Rajasthan cities available</p>
                  )}
                </div>

                <h2 className="text-lg font-semibold mb-4">Properties in Other Cities</h2>
                <div className="text-sm text-gray-600 space-y-1">
                  {otherCities.length > 0 ? (
                    <p>
                      {otherCities.map((city) => (
                        <span key={city}>
                          <button
                            className="hover:underline"
                            onClick={() => handleCitySearch(city)}
                          >
                            New Projects in {city}
                          </button>{" "}
                          |{" "}
                        </span>
                      ))}
                    </p>
                  ) : (
                    <p>No other cities available</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>     
        
        {/* Bottom Navigation */}
        <div className="border-t pt-3 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 px-3">
          <div className="flex flex-wrap gap-6 mb-4 md:mb-0">
            <Link href="/careers" className="hover:text-red-500 transition-all duration-300">
              Careers
            </Link>
            <Link href="/BusinessAssociate" className="hover:text-red-500 transition-all duration-300">
              Business Associate
            </Link>
          </div>

          <div className="flex flex-wrap gap-6">
            <Link href="/termsofservice" className="hover:text-red-500 transition-all duration-300">
              Terms of Service
            </Link>
            <Link href="/privacypolicy" className="hover:text-red-500 transition-all duration-300">
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-2 border-t bg-red-600">
          <p className="text-xs text-white p-4">
            Disclaimer: The Real Estate Company is only an intermediary offering its platform to advertise
            properties of Seller for a Customer/Buyer/User coming on its Website and is not and cannot be a party to or
            privy to or control in any manner any transactions between the Seller and the Customer/Buyer/User.
          </p>
        </div>

        {/* Copyright Section */}
        <div className="border-t pt-2 px-3 mb-3 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <div className="mb-3 md:mb-0">
            <p>
              All trademarks, logos, and names are properties of their respective owners.
            </p>
          </div>
          <div className="text-right">
            <p>All Rights Reserved. © Copyright 2025 The Real Estate Company.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}