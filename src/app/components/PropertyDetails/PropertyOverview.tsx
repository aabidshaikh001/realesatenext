"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSearchParams, useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import {
  ChevronLeft,
  ChevronRight,
  Share2,
  Heart,

  MapPin,
  Bed,
  Bath,
  Square,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
  Check,
} from "lucide-react"

interface PropertyOverviewProps {
  id: string;
}
const propertiesData: Record<
  string,
  {
    title: string
    price: string
    address: string
    features: {
      bedrooms: number
      bathrooms: number
      area: string
      additionalFeatures?: string[]
    }
    images: string[]
    status: "rent" | "sell"
    location?: { lat: number; lng: number }
  }
> = {
  "1": {
    title: "Luxury Penthouse",
    price: "$2,500,000",
    address: "123 Skyline Avenue, Jaipur, NY 10001",
    features: {
      bedrooms: 3,
      bathrooms: 2.5,
      area: "2,500 sq ft",
      additionalFeatures: ["Private pool", "City view", "Rooftop terrace"],
    },
    images: [
      "https://t4.ftcdn.net/jpg/10/55/75/99/360_F_1055759931_iPxiO7Btj63LuGkuD0yDyLPM9teB89Lz.jpg",
      "https://t3.ftcdn.net/jpg/08/19/97/46/360_F_819974608_qHhGo79wUjOUsKSaEQVEH24CeOFyAPOx.jpg",
      "https://static.vecteezy.com/system/resources/thumbnails/044/021/390/small/ultramodern-open-plan-apartment-basks-in-city-lights-glow-against-night-sky-photo.jpeg",
    ],
    status: "sell",
    location: { lat: 26.9124, lng: 75.7873 },
  },
  "2": {
    title: "Beachfront Villa",
    price: "$3,800,000",
    address: "456 Ocean Drive, Malibu, CA 90265",
    features: {
      bedrooms: 4,
      bathrooms: 3,
      area: "3,500 sq ft",
      additionalFeatures: ["Ocean view", "Large garden", "Private beach access"],
    },
    images: [
      "https://t4.ftcdn.net/jpg/10/55/75/99/360_F_1055759931_iPxiO7Btj63LuGkuD0yDyLPM9teB89Lz.jpg",
      "https://t4.ftcdn.net/jpg/10/55/75/99/360_F_1055759931_iPxiO7Btj63LuGkuD0yDyLPM9teB89Lz.jpg",
      "https://t4.ftcdn.net/jpg/10/55/75/99/360_F_1055759931_iPxiO7Btj63LuGkuD0yDyLPM9teB89Lz.jpg",
      "https://t4.ftcdn.net/jpg/10/55/75/99/360_F_1055759931_iPxiO7Btj63LuGkuD0yDyLPM9teB89Lz.jpg",
    ],
    status: "rent",
    location: { lat: 34.0259, lng: -118.7798 },
  },
  "3": {
    title: "Mountain Retreat",
    price: "$1,950,000",
    address: "789 Alpine Road, Aspen, CO 81611",
    features: {
      bedrooms: 5,
      bathrooms: 4,
      area: "4,200 sq ft",
    },
    images: [
      "https://t4.ftcdn.net/jpg/10/55/75/99/360_F_1055759931_iPxiO7Btj63LuGkuD0yDyLPM9teB89Lz.jpg",
    ],
    status: "sell",
  },
}

export default function PropertyOverview({ id }: PropertyOverviewProps) {
  // State management
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isLiked, setIsLiked] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [copied, setCopied] = useState(false)
 


  // Router and params
  const searchParams = useSearchParams()
  const router = useRouter()
  const propertyId = searchParams.get("id") || "1"
  const property = propertiesData[id]

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, property.images.length])

  // Image navigation
  const navigate = (direction: "prev" | "next") => {
    setIsAutoPlaying(false)
    if (direction === "prev") {
      setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
    } else {
      setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
    }
  }
  const [shareLinks, setShareLinks] = useState({
    facebook: "",
    twitter: "",
    linkedin: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUrl = window.location.href;
      setShareLinks({
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(
          "Check out this property!"
        )}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}`,
      });
    }
  }, []);
  // Share functionality
  const copyToClipboard = async () => {
    const url = `${window.location.origin}${window.location.pathname}?id=${propertyId}`
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }



  // Render functions
  const renderImageCarousel = () => (
    <div className="relative h-[400px] md:h-[500px] w-full rounded-lg overflow-hidden group">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={property.images[currentImageIndex] || "/placeholder.svg"}
            alt={`Property image ${currentImageIndex + 1}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("prev")}
          className="bg-white/90 rounded-full p-2 shadow-lg"
        >
          <ChevronLeft className="h-6 w-6" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("next")}
          className="bg-white/90 rounded-full p-2 shadow-lg"
        >
          <ChevronRight className="h-6 w-6" />
        </motion.button>
      </div>

      {/* Badge */}
      <Badge className="absolute top-4 left-4 bg-red-500 text-white border-none ">{property.status}</Badge>

      {/* Image Counter */}
      <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
        {currentImageIndex + 1} / {property.images.length}
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {property.images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentImageIndex(index)
              setIsAutoPlaying(false)
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentImageIndex ? "bg-white w-4" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  )

  const renderShareModal = () => (
    <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>Share this property</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="flex justify-around">
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-blue-600 text-white"
            >
              <Facebook className="h-5 w-5" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-sky-500 text-white"
            >
              <Twitter className="h-5 w-5" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href={shareLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-blue-500 text-white"
            >
              <Linkedin className="h-5 w-5" />
            </motion.a>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={`${window.location.origin}${window.location.pathname}?id=${propertyId}`}
              readOnly
              className="flex-1 px-3 py-2 border rounded-md text-sm"
            />
            <Button size="sm" onClick={copyToClipboard} className="flex items-center gap-2">
              {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-8">
      {renderImageCarousel()}

      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-3xl font-bold mb-2 hover:text-red-500 cursor-pointer"
            >
              {property.title}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-primary"
            >
              {property.price}
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="border-t border-b py-6"
        >
          <h2 className="text-lg font-semibold mb-4">FEATURES:</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Bed className="h-5 w-5 text-red-500" />
              <span className="font-semibold">{property.features.bedrooms} Bedroom</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="h-5 w-5 text-red-500" />
              <span className="font-semibold">{property.features.bathrooms} Bathroom</span>
            </div>
            <div className="flex items-center gap-2">
              <Square className="h-5 w-5 text-red-500" />
              <span className="font-semibold">{property.features.area}</span>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="text-lg font-semibold mb-4">LOCATION:</h2>
          <div className="flex items-start gap-2 ">
            <MapPin className="h-5 w-5 mt-1 flex-shrink-0 text-red-600" />
            <p>{property.address}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-2"
        >
          
          <Button variant="outline" size="icon" className="rounded-full" onClick={() => setIsShareModalOpen(true)}>
            <Share2 className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={`rounded-full transition-colors ${isLiked ? "bg-red-50 border-red-200" : ""}`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`h-5 w-5 transition-colors ${isLiked ? "fill-red-500 stroke-red-500" : ""}`} />
          </Button>
        </motion.div>
      </div>

      {renderShareModal()}
    </div>
  )
}

