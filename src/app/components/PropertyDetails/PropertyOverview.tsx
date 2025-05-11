"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSearchParams, useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Share2, Heart, MapPin, Bed, Bath, Square, Facebook, Twitter, Linkedin, Link2, Check, Camera, X, ZoomIn, ZoomOut, Maximize2, Download, Info } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"


interface PropertyOverviewProps {
  id: string
}

interface Property {
  id: string
  title: string
  price: string
  location: string
  bedrooms: number
  bathrooms: number
  area: string
  images: string[]
  carpetArea: string
  propertyFor: "rent" | "buy"
}

export default function PropertyOverview({ id }: PropertyOverviewProps) {
  // State management
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isLiked, setIsLiked] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [imageLoading, setImageLoading] = useState(true)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showInfo, setShowInfo] = useState(true)
  const [imagePositions, setImagePositions] = useState({ x: 0, y: 0 })
  
  // Refs
  const modalRef = useRef<HTMLDivElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)

  // Router and params
  const searchParams = useSearchParams()
  const router = useRouter()
  const propertyId = searchParams.get("id") || id

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/properties/${propertyId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch property data")
        }
        const data = await response.json()

        let images = data.images
        if (typeof images === "string") {
          try {
            const parsed = JSON.parse(images)
            images = typeof parsed === "string" ? JSON.parse(parsed) : parsed
          } catch (e) {
            console.error("Error parsing images:", e)
            images = []
          }
        }

        setProperty({
          ...data,
          images: Array.isArray(images) ? images : [],
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error fetching property data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProperty()
  }, [propertyId])

  // Auto-play functionality
  useEffect(() => {
    if (!property?.images?.length || isModalOpen) return

    let interval: NodeJS.Timeout
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
      }, 5000)
    }

    return () => clearInterval(interval)
  }, [isAutoPlaying, currentImageIndex, property?.images, isModalOpen])

  // Image navigation
  const navigate = useCallback((direction: "prev" | "next") => {
    if (!property?.images?.length) return

    setIsAutoPlaying(false) // Pause autoplay on manual navigation
    setZoomLevel(1) // Reset zoom level when changing images
    setImagePositions({ x: 0, y: 0 }) // Reset image position
    setImageLoading(true) // Set loading state for new image
    
    setCurrentImageIndex((prev) => {
      const length = property.images.length
      return direction === "prev" ? (prev - 1 + length) % length : (prev + 1) % length
    })

    // Resume autoplay after a short delay if not in modal
    if (!isModalOpen) {
      const timeout = setTimeout(() => setIsAutoPlaying(true), 3000)
      return () => clearTimeout(timeout)
    }
  }, [property?.images?.length, isModalOpen])

  // Keyboard navigation
  useEffect(() => {
    if (!isModalOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        navigate("prev")
      } else if (e.key === "ArrowRight") {
        navigate("next")
      } else if (e.key === "Escape") {
        setIsModalOpen(false)
      } else if (e.key === "+") {
        handleZoom("in")
      } else if (e.key === "-") {
        handleZoom("out")
      } else if (e.key === "f") {
        toggleFullscreen()
      } else if (e.key === "i") {
        setShowInfo(!showInfo)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isModalOpen, navigate, showInfo])

  // Share functionality
  const [shareLinks, setShareLinks] = useState({
    facebook: "",
    twitter: "",
    linkedin: "",
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUrl = window.location.href
      setShareLinks({
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}`,
      })
    }
  }, [])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  // Modal handlers
  const openModal = useCallback(() => {
    setIsModalOpen(true)
    setZoomLevel(1)
    setImagePositions({ x: 0, y: 0 })
    setImageLoading(true)
  }, [])
  
  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    setZoomLevel(1)
    setImagePositions({ x: 0, y: 0 })
  }, [])

  // Zoom functionality
  const handleZoom = useCallback((direction: "in" | "out") => {
    setZoomLevel(prev => {
      if (direction === "in" && prev < 3) {
        return prev + 0.5
      } else if (direction === "out" && prev > 1) {
        return prev - 0.5
      }
      return prev
    })
  }, [])

  // Fullscreen functionality
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      modalRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [])

  // Handle image drag
  const handleImageDrag = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (zoomLevel <= 1) return
    
    const container = imageContainerRef.current
    if (!container) return
    
    const startX = e.clientX
    const startY = e.clientY
    const startPositionX = imagePositions.x
    const startPositionY = imagePositions.y
    
    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - startX
      const dy = e.clientY - startY
      
      setImagePositions({
        x: startPositionX + dx,
        y: startPositionY + dy
      })
    }
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [zoomLevel, imagePositions])

  // Handle image touch drag for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (zoomLevel <= 1) return
    
    const touch = e.touches[0]
    const startX = touch.clientX
    const startY = touch.clientY
    const startPositionX = imagePositions.x
    const startPositionY = imagePositions.y
    
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0]
      const dx = touch.clientX - startX
      const dy = touch.clientY - startY
      
      setImagePositions({
        x: startPositionX + dx,
        y: startPositionY + dy
      })
    }
    
    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
    
    document.addEventListener('touchmove', handleTouchMove)
    document.addEventListener('touchend', handleTouchEnd)
  }, [zoomLevel, imagePositions])

  // Handle swipe for image navigation on mobile
  const handleSwipe = useCallback(() => {
    if (zoomLevel > 1) return // Don't navigate if zoomed in
    
    let touchStartX = 0
    let touchEndX = 0
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX
    }
    
    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].clientX
      handleSwipeGesture()
    }
    
    const handleSwipeGesture = () => {
      const swipeThreshold = 50
      if (touchStartX - touchEndX > swipeThreshold) {
        navigate("next")
      } else if (touchEndX - touchStartX > swipeThreshold) {
        navigate("prev")
      }
    }
    
    const element = modalRef.current
    if (!element) return
    
    element.addEventListener('touchstart', handleTouchStart)
    element.addEventListener('touchend', handleTouchEnd)
    
    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchend', handleTouchEnd)
    }
  }, [navigate, zoomLevel])

  // Set up swipe handler when modal is open
  useEffect(() => {
    if (isModalOpen) {
      const cleanup = handleSwipe()
      return cleanup
    }
  }, [isModalOpen, handleSwipe])

  // Download current image
  const downloadImage = useCallback(async () => {
    if (!property?.images?.[currentImageIndex]) return
    
    try {
      const response = await fetch(property.images[currentImageIndex])
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = `property-image-${currentImageIndex + 1}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading image:', error)
    }
  }, [property?.images, currentImageIndex])

  // Reset image loading state when image loads
  const handleImageLoad = useCallback(() => {
    setImageLoading(false)
  }, [])

  if (loading) return <div className="text-center py-10">Loading property...</div>
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>
  if (!property) return <div className="text-center py-10">Property not found</div>

  return (
    <div className="w-full mx-auto space-y-8 relative">
      {/* Image Carousel */}
      <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden group">
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
              className="object-cover cursor-pointer"
              priority
              onClick={openModal}
              onLoad={handleImageLoad}
            />
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <Skeleton className="h-full w-full" />
              </div>
            )}
            <button
              onClick={openModal}
              className="flex absolute top-4 right-4 items-center gap-2 bg-black/70 text-white px-4 py-2 rounded-full shadow-lg hover:bg-black/80 transition z-10"
            >
              <Camera className="w-5 h-5" />
              <span className="text-sm font-medium">Photos</span>
            </button>
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

        <Badge className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 rounded-md bg-neutral-900/70 text-white shadow-lg border border-neutral-700 backdrop-blur-md">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400 animate-ping"></div>
          <span className="text-sm font-medium tracking-wide">
            {property.propertyFor === "rent" ? "FOR RENT" : "FOR BUY"}
          </span>
        </Badge>

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
        {/* View All Photos button */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
          <Button
            onClick={openModal}
            className="bg-white/90 hover:bg-white text-black font-medium flex items-center gap-2 px-4 py-2 rounded-full shadow-lg"
          >
            <Camera className="h-5 w-5" />
            View All Photos
          </Button>
        </div>
      </div>

      {/* Property Details */}
      <div className="lg:absolute lg:bottom-0 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:translate-y-1/2 lg:w-[85%] bg-white rounded-lg shadow-lg p-6 z-10">
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
              <span className="font-semibold">{property.bedrooms} Bedroom</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="h-5 w-5 text-red-500" />
              <span className="font-semibold">{property.bathrooms} Bathroom</span>
            </div>
            <div className="flex items-center gap-2">
              <Square className="h-5 w-5 text-red-500" />
              <span className="font-semibold">{property.carpetArea}</span>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="text-lg font-semibold mb-4">LOCATION:</h2>
          <div className="flex items-start gap-2">
            <MapPin className="h-5 w-5 mt-1 flex-shrink-0 text-red-600" />
            <p>{property.location}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-2 mt-2"
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

      {/* Enhanced Photo Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="w-full max-w-7xl h-[90vh] p-0 bg-black border-none overflow-hidden" ref={modalRef}>
          <div className="relative h-full w-full flex flex-col">
            {/* Toolbar */}
            <div className={`absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent p-4 flex justify-between items-center transition-opacity duration-300 ${showInfo ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-black/50 text-white border-none">
                  {currentImageIndex + 1} / {property.images.length}
                </Badge>
                <Badge variant="outline" className="bg-black/50 text-white border-none hidden md:flex">
                  {zoomLevel}x
                </Badge>
              </div>
              
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="rounded-full bg-black/50 text-white hover:bg-black/70 hidden md:flex"
                        onClick={() => handleZoom("out")}
                        disabled={zoomLevel <= 1}
                      >
                        <ZoomOut className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Zoom Out (or press -)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="rounded-full bg-black/50 text-white hover:bg-black/70 hidden md:flex"
                        onClick={() => handleZoom("in")}
                        disabled={zoomLevel >= 3}
                      >
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Zoom In (or press +)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="rounded-full bg-black/50 text-white hover:bg-black/70 hidden md:flex"
                        onClick={toggleFullscreen}
                      >
                        <Maximize2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Fullscreen (or press F)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="rounded-full bg-black/50 text-white hover:bg-black/70"
                        onClick={downloadImage}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Download Image</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="rounded-full bg-black/50 text-white hover:bg-black/70"
                        onClick={() => setShowInfo(!showInfo)}
                      >
                        <Info className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Toggle Info (or press I)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full bg-black/50 text-white hover:bg-black/70"
                  onClick={closeModal}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Main image view */}
            <div 
              className="relative flex-1 flex items-center justify-center overflow-hidden"
              ref={imageContainerRef}
              onMouseDown={handleImageDrag}
              onTouchStart={handleTouchStart}
              onClick={() => setShowInfo(!showInfo)}
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative h-full w-full"
                  style={{
                    cursor: zoomLevel > 1 ? 'grab' : 'default'
                  }}
                >
                  {imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  <div 
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      transform: `scale(${zoomLevel}) translate(${imagePositions.x}px, ${imagePositions.y}px)`,
                      transition: zoomLevel === 1 ? 'transform 0.3s ease' : 'none'
                    }}
                  >
                    <Image
                      src={property.images[currentImageIndex] || "/placeholder.svg"}
                      alt={`Property image ${currentImageIndex + 1}`}
                      width={1200}
                      height={800}
                      className="max-h-full max-w-full object-contain"
                      priority
                      onLoad={handleImageLoad}
                      style={{
                        opacity: imageLoading ? 0 : 1,
                        transition: 'opacity 0.3s ease'
                      }}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation arrows - only show when not zoomed */}
              {zoomLevel === 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("prev");
                    }}
                    className="absolute left-4 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition transform hover:scale-110"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("next");
                    }}
                    className="absolute right-4 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition transform hover:scale-110"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>
            
            {/* Thumbnails */}
            <div className={`h-24 bg-black/90 p-2 overflow-x-auto transition-opacity duration-300 ${showInfo ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex gap-2 h-full">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setZoomLevel(1);
                      setImagePositions({ x: 0, y: 0 });
                      setImageLoading(true);
                    }}
                    className={`relative h-full aspect-square flex-shrink-0 rounded-md overflow-hidden transition transform ${
                      index === currentImageIndex 
                        ? "ring-2 ring-primary ring-offset-2 ring-offset-black scale-105" 
                        : "opacity-70 hover:opacity-100 hover:scale-105"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Mobile controls overlay - only visible on small screens when info is shown */}
            <div className={`md:hidden absolute bottom-28 left-0 right-0 flex justify-center gap-4 transition-opacity duration-300 ${showInfo ? 'opacity-100' : 'opacity-0'}`}>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={() => handleZoom("out")}
                disabled={zoomLevel <= 1}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={() => handleZoom("in")}
                disabled={zoomLevel >= 3}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Help text - only visible on desktop */}
            <div className={`hidden md:block absolute bottom-28 left-4 text-xs text-white/70 transition-opacity duration-300 ${showInfo ? 'opacity-100' : 'opacity-0'}`}>
              <p>Keyboard: Arrow keys to navigate • +/- to zoom • F for fullscreen • I to toggle info</p>
              <p>Mouse: Drag to pan when zoomed • Click to toggle controls</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Share Modal */}
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
                value={window.location.href}
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
    </div>
  )
}
