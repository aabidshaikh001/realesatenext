"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Home,
  Maximize,
  BedDouble,
  
  ArrowRight,
  Phone,
  Heart,
  Share2,
  Crown,
  Star,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { PropertyContactForm } from "./property-contact-form"
import { PropertyFilter } from "./property-filter"
import Link from 'next/link';

interface Property {
  PropertyId: string
  title: string
  location: string
  price: string
  pricePerSqft: string
  carpetArea: string
  superBuiltUpArea: string
  bhkOptions: string
  status: string
  propertyType: string
  description: string
  images: string[]
  luxarfeature: boolean | null
  luxar: boolean | null
  propertyFor: "Rent" | "Buy"
  isFeatured: boolean
  tag: string
  type: string | null
}

export default function LuxuryPropertyShowcase() {
  const [currentTab, setCurrentTab] = useState<"Rent" | "Buy">("Buy")
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null)
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [amenities, setAmenities] = useState<Record<string, string[]>>({})

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/properties')
        const data = await response.json()
        setProperties(data)
        
        // Fetch amenities for each property
        const amenitiesData: Record<string, string[]> = {}
        for (const property of data) {
          try {
            const amenitiesResponse = await fetch(`http://localhost:5000/api/amenities/${property.PropertyId}`)
            if (amenitiesResponse.ok) {
              const amenities = await amenitiesResponse.json()
              amenitiesData[property.PropertyId] = amenities
            }
          } catch (error) {
            console.error(`Error fetching amenities for property ${property.PropertyId}:`, error)
            amenitiesData[property.PropertyId] = []
          }
        }
        setAmenities(amenitiesData)
      } catch (error) {
        console.error('Error fetching properties:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  // Filter properties by tab selection and luxure: true
  const filteredProperties = properties.filter(
    (property) => property.propertyFor === currentTab && property.luxar === true
  )

  // Featured properties (featurose: true and luxure: true)
  const featuredProperties = properties.filter(
    (property) => property.luxarfeature === true && property.luxar === true
  )

  const openContactModal = (propertyId: string) => {
    setSelectedPropertyId(propertyId)
    setIsContactModalOpen(true)
  }

  const closeContactModal = () => {
    setIsContactModalOpen(false)
    setSelectedPropertyId(null)
  }

  function parseImages(images: string | string[]): string[] {
    if (typeof images === "string") {
      try {
        return JSON.parse(images);
      } catch {
        return [];
      }
    }
    return images;
  }

  const parseBhkOptions = (bhkString: string) => {
    try {
      const options = JSON.parse(bhkString)
      if (Array.isArray(options)) {
        return options.join(", ")
      }
      return ""
    } catch {
      return bhkString
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-600"></div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://videos.pexels.com/video-files/5741489/5741489-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center mb-4"
          >
            <div className="w-16 h-1 bg-gold-600 rounded-full mr-4"></div>
            <Crown className="text-amber-400 h-10 w-10" />
            <div className="w-16 h-1 bg-gold-600 rounded-full ml-4"></div>
          </motion.div>
          <motion.h1    
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 text-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Luxury Properties Collection
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-white/90 max-w-3xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover our exclusive selection of luxury properties
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="#collection">
            <Button
              size="lg"
              className="bg-rose-600 hover:bg-rose-700 text-white rounded-full px-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Explore Collection
            </Button>
            </Link>
            <Link href="/contact-us">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 bg-white/10 rounded-full px-8">
              Schedule Consultation
            </Button>
            </Link>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
      </section>

      {/* Featured Properties Carousel */}
      <section className="py-20 luxury-gradient">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-2">
                <Sparkles className="text-rose-600 h-5 w-5 mr-2" />
                <span className="text-rose-600 uppercase tracking-wider text-sm font-semibold">
                  Featured Collection
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">Premium Luxury Properties</h2>
              <div className="w-24 h-1 bg-rose-600 rounded-full mx-auto md:mx-0 mb-3"></div>
              <p className="text-gray-600">Handpicked luxury properties for discerning buyers</p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <Button variant="outline" size="icon" className="rounded-full border-rose-300 hover:border-rose-600">
                <ChevronLeft className="h-5 w-5 text-rose-600" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full border-rose-300 hover:border-rose-600">
                <ChevronRight className="h-5 w-5 text-rose-600" />
              </Button>
            </div>
          </div>

          {featuredProperties.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No featured luxury properties available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((property) => (
                <motion.div
                  key={property.PropertyId}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Card className="overflow-hidden border-none luxury-card">
                    <div className="relative h-64 w-full overflow-hidden group">
                      <Image
                        src={parseImages(property.images)[0] || "/placeholder.svg"}
                        alt={property.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-rose-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-1 flex items-center gap-1">
                          <Crown className="h-3 w-3" />
                          <span>{property.tag || "Premium"}</span>
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Badge className="bg-gold-600 hover:bg-gold-700 text-white">Featured</Badge>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                          >
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">{property.title}</h3>
                        <Badge variant="outline" className="font-serif border-rose-200 text-rose-700">
                          {property.propertyType}
                        </Badge>
                      </div>
                      <div className="flex items-center text-gray-500 mb-4">
                        <MapPin className="h-4 w-4 mr-1 text-rose-400" />
                        <span className="text-sm">{property.location}</span>
                      </div>
                      <p className="text-gray-600 line-clamp-2 mb-4 text-sm">{property.description}</p>
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex gap-4">
                          <div className="flex items-center">
                            <BedDouble className="h-4 w-4 mr-1 text-rose-400" />
                            <span className="text-sm">{parseBhkOptions(property.bhkOptions)}</span>
                          </div>
                          <div className="flex items-center">
                            <Home className="h-4 w-4 mr-1 text-rose-400" />
                            <span className="text-sm">{property.superBuiltUpArea}</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Badge variant="secondary" className="bg-rose-50 text-rose-700">
                            {property.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-rose-200 to-transparent my-4"></div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-2xl font-bold text-gray-900 gold-accent">{property.price}</p>
                          <p className="text-sm text-gray-500">{property.pricePerSqft} per sq.ft.</p>
                        </div>
                        <Link href={`/properties/${property.PropertyId}`}>
                        <Button 
                          className="bg-rose-600 hover:bg-rose-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
                        >
                          View Details
                        </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Luxury Property Listing Section */}
      <section className="py-20 bg-white" id="collection">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            {/* Sidebar Filters */}
            <div className="w-full md:w-1/4">
              <PropertyFilter setCurrentTab={setCurrentTab} currentTab={currentTab} />
            </div>

            {/* Property Grid */}
            <div className="w-full md:w-3/4">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <div className="flex items-center mb-2">
                    <Star className="text-rose-600 h-5 w-5 mr-2" />
                    <span className="text-rose-600 uppercase tracking-wider text-sm font-semibold">
                      {currentTab === "Buy" ? "Luxury Listings" : "Luxury Rentals"}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">
                    {currentTab === "Buy" ? "Luxury Properties for Sale" : "Luxury Properties for Rent"}
                  </h2>
                  <div className="w-24 h-1 bg-rose-600 rounded-full mt-2"></div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={currentTab === "Buy" ? "default" : "outline"}
                    onClick={() => setCurrentTab("Buy")}
                    className={currentTab === "Buy" ? "bg-rose-600 hover:bg-rose-700 text-white" : ""}
                  >
                    Buy
                  </Button>
                  <Button
                    variant={currentTab === "Rent" ? "default" : "outline"}
                    onClick={() => setCurrentTab("Rent")}
                    className={currentTab === "Rent" ? "bg-rose-600 hover:bg-rose-700 text-white" : ""}
                  >
                    Rent
                  </Button>
                </div>
              </div>

              {filteredProperties.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <p className="text-gray-600">No luxury properties found matching your criteria.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredProperties.map((property) => (
                    <motion.div
                      key={property.PropertyId}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <Card className="overflow-hidden border-none luxury-card">
                        <div className="flex flex-col md:flex-row">
                          <div className="relative w-full md:w-1/3 h-64 md:h-auto overflow-hidden">
                            <Image
                              src={parseImages(property.images)[0] || "/placeholder.svg"}
                              alt={property.title}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-rose-900/30 to-transparent"></div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute top-2 right-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                            >
                              <Maximize className="h-4 w-4" />
                            </Button>
                            <div className="absolute top-2 left-2">
                              <Badge className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-1 flex items-center gap-1">
                                <Crown className="h-3 w-3" />
                                <span>{property.tag || "Premium"}</span>
                              </Badge>
                            </div>
                          </div>
                          <div className="flex-1 p-6">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-xl font-semibold text-gray-900">{property.title}</h3>
                              <Badge variant="outline" className="font-serif border-rose-200 text-rose-700">
                                {property.propertyType}
                              </Badge>
                            </div>
                            <div className="flex items-center text-gray-500 mb-4">
                              <MapPin className="h-4 w-4 mr-1 text-rose-400" />
                              <span className="text-sm">{property.location}</span>
                            </div>
                            <p className="text-gray-600 mb-4 line-clamp-2">{property.description}</p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                              <div className="flex items-center">
                                <BedDouble className="h-4 w-4 mr-2 text-rose-400" />
                                <span className="text-sm">{parseBhkOptions(property.bhkOptions)}</span>
                              </div>
                              <div className="flex items-center">
                                <Home className="h-4 w-4 mr-2 text-rose-400" />
                                <span className="text-sm">{property.superBuiltUpArea}</span>
                              </div>
                              <div className="flex items-center">
                                <Home className="h-4 w-4 mr-2 text-rose-400" />
                                <span className="text-sm">{property.carpetArea}</span>
                              </div>
                              <div className="flex items-center">
                                <Badge variant="secondary" className="bg-rose-50 text-rose-700">
                                  {property.status}
                                </Badge>
                              </div>
                            </div>

                            {amenities[property.PropertyId] && amenities[property.PropertyId].length > 0 && (
                              <div className="p-4 border-t border-gray-200 bg-white/50">
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">Amenities</h4>
                                <ul className="flex flex-wrap gap-2 text-sm text-gray-600">
                                  {amenities[property.PropertyId].map((amenity: any, index: number) => (
                                    <li
                                      key={index}
                                      className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full"
                                    >
                                      <span>{amenity.icon}</span>
                                      <span>{amenity.label}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            <div className="h-px w-full bg-gradient-to-r from-transparent via-rose-200 to-transparent my-4"></div>

                            <div className="flex flex-col md:flex-row justify-between items-center">
                              <div>
                                <p className="text-2xl font-bold text-gray-900 gold-accent">{property.price}</p>
                                <p className="text-sm text-gray-500">{property.pricePerSqft} per sq.ft.</p>
                              </div>
                              <div className="flex gap-2 mt-4 md:mt-0">
                                <Button
                                  variant="outline"
                                  onClick={() => openContactModal(property.PropertyId)}
                                  className="flex items-center gap-1 border-rose-200 text-rose-700 hover:bg-rose-50"
                                >
                                  <Phone className="h-4 w-4" />
                                  <span>Contact</span>
                                </Button>
                                <Link href={`/properties/${property.PropertyId}`}>
                                <Button 
                                  className="bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-1 shadow-md hover:shadow-lg transition-all duration-300"
                                >
                                  <span>View Details</span>
                                  <ArrowRight className="h-4 w-4" />
                                </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      <AnimatePresence>
        {isContactModalOpen && (
          <PropertyContactForm 
            id={selectedPropertyId} 
            onClose={closeContactModal}
          />
        )}
      </AnimatePresence>
    </div>
  )
}