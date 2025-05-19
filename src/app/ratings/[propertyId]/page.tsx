"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Star, ChevronLeft, MessageSquare, Calendar, ArrowUpDown, Search, Home, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { motion, AnimatePresence } from "framer-motion"

type Review = {
  id: number
  name: string
  avatar: string
  rating: number
  review: string
  date?: string
}

export default function RatingsPage({ params }: { params: { propertyId: string } }) {
  const propertyId = params.propertyId
  const router = useRouter()

  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedReview, setExpandedReview] = useState<number | null>(null)
  const [propertyName, setPropertyName] = useState<string>("Property")
  const [sortOption, setSortOption] = useState<string>("newest")
  const [filterRating, setFilterRating] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState<string>("")

  // Form state
  const [name, setName] = useState<string>("")
  const [reviewText, setReviewText] = useState<string>("")
  const [userRating, setUserRating] = useState<number>(0)
  const [hoverRating, setHoverRating] = useState<number>(0)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState<boolean>(false)
  const [formErrors, setFormErrors] = useState<{
    name?: string
    review?: string
    rating?: string
  }>({})

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
      
        const response = await fetch(`https://api.realestatecompany.co.in/api/properties/${propertyId}`)
        const data = await response.json()
        setPropertyName(data.title)

    
       
      } catch (err) {
        console.error("Error loading property details:", err)
      }
    }

    const fetchReviews = async () => {
      try {
        const response = await fetch(`https://api.realestatecompany.co.in/api/ratings/${propertyId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch ratings")
        }
        const data = await response.json()
        setReviews(data)
      } catch (err) {
        console.error("Error loading ratings:", err)
        setError(`Failed to load ratings: ${err instanceof Error ? err.message : String(err)}`)
      } finally {
        setLoading(false)
      }
    }

    fetchPropertyDetails()
    fetchReviews()
  }, [propertyId])

  // Calculate average rating
  const averageRating = reviews.length
    ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
    : "0.0"

  // Handle form submission
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const errors: {
      name?: string
      review?: string
      rating?: string
    } = {}

    if (!name.trim()) errors.name = "Name is required"
    if (!reviewText.trim()) errors.review = "Review text is required"
    if (userRating === 0) errors.rating = "Please select a rating"

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call to submit the review
      // const response = await fetch(`https://api.realestatecompany.co.in/api/ratings/${propertyId}`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     name,
      //     rating: userRating,
      //     review: reviewText,
      //   }),
      // })

      // if (!response.ok) throw new Error('Failed to submit review')

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Add the new review to the list (in a real app, you'd get the ID from the API)
      const newReview: Review = {
        id: Date.now(),
        name,
        avatar: "",
        rating: userRating,
        review: reviewText,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      }

      setReviews([newReview, ...reviews])

      // Reset form
      setName("")
      setReviewText("")
      setUserRating(0)
      setFormErrors({})
      setShowSuccessDialog(true)
    } catch (err) {
      console.error("Error submitting review:", err)
      alert("Failed to submit review. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Filter and sort reviews
  const filteredAndSortedReviews = reviews
    .filter((review) => {
      // Filter by rating
      if (filterRating !== "all" && review.rating !== Number.parseInt(filterRating)) {
        return false
      }

      // Filter by search term
      if (
        searchTerm &&
        !review.review.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !review.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      // Sort by selected option
      switch (sortOption) {
        case "highest":
          return b.rating - a.rating
        case "lowest":
          return a.rating - b.rating
        case "newest":
        default:
          // Assuming newer reviews have higher IDs
          return b.id - a.id
      }
    })

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto py-4 px-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" className="text-gray-600 hover:text-red-600" onClick={() => router.back()}>
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Property
            </Button>

            <div className="flex items-center">
              <Home className="h-5 w-5 text-red-600 mr-2" />
              <span className="font-medium text-gray-700">{propertyName}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-10 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Ratings & Reviews</h1>
            <p className="text-gray-500">See what others are saying about this property</p>
          </div>

          <div className="grid gap-10 lg:grid-cols-3">
            {/* Left Column - Add Review Form */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-xl rounded-2xl overflow-hidden bg-white sticky top-24">
                <CardHeader className="py-6 px-6 border-b border-gray-100 bg-gradient-to-r from-white to-red-50">
                  <h3 className="text-xl font-bold text-gray-900">Share Your Experience</h3>
                  <p className="text-gray-500 text-sm mt-1">Your review helps others make better decisions</p>
                </CardHeader>

                <CardContent className="p-6">
                  <form onSubmit={handleSubmitReview}>
                    <div className="space-y-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name
                        </label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={`border-gray-200 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 ${
                            formErrors.name ? "border-red-500" : ""
                          }`}
                          placeholder="Enter your name"
                        />
                        {formErrors.name && <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Your Rating</label>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              className="p-1 focus:outline-none"
                              onClick={() => setUserRating(star)}
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(0)}
                            >
                              <Star
                                className={`w-8 h-8 ${
                                  star <= (hoverRating || userRating)
                                    ? "fill-red-500 text-red-500"
                                    : "fill-gray-200 text-gray-200"
                                } transition-colors duration-150`}
                              />
                            </button>
                          ))}
                        </div>
                        {formErrors.rating && <p className="mt-1 text-sm text-red-600">{formErrors.rating}</p>}
                      </div>

                      <div>
                        <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Review
                        </label>
                        <Textarea
                          id="review"
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          className={`min-h-[150px] border-gray-200 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 ${
                            formErrors.review ? "border-red-500" : ""
                          }`}
                          placeholder="Share your experience with this property..."
                        />
                        {formErrors.review && <p className="mt-1 text-sm text-red-600">{formErrors.review}</p>}
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-medium py-2 h-12 rounded-xl transition-all"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Review"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Reviews List */}
            <div className="lg:col-span-2">
              {/* Stats and Filters */}
              <Card className="border-0 shadow-xl rounded-2xl overflow-hidden bg-white mb-8">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-red-50 rounded-xl p-3 text-center min-w-[100px]">
                        <span className="text-3xl font-bold text-red-600">{averageRating}</span>
                        <div className="flex justify-center mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.round(Number.parseFloat(averageRating))
                                  ? "fill-red-500 text-red-500"
                                  : "fill-gray-200 text-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
                        </p>
                      </div>

                      <div className="hidden md:block h-14 w-px bg-gray-200 mx-2"></div>

                      <div className="flex flex-wrap gap-2">
                        {[5, 4, 3, 2, 1].map((rating) => {
                          const count = reviews.filter((r) => r.rating === rating).length
                          const percentage = reviews.length ? Math.round((count / reviews.length) * 100) : 0

                          return (
                            <button
                              key={rating}
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-colors ${
                                filterRating === rating.toString()
                                  ? "bg-red-50 border-red-200 text-red-600"
                                  : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                              }`}
                              onClick={() =>
                                setFilterRating(filterRating === rating.toString() ? "all" : rating.toString())
                              }
                            >
                              <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3 h-3 ${
                                      i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs font-medium">{percentage}%</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4 md:mt-0">
                      <div className="relative flex-grow max-w-[200px]">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search reviews"
                          className="pl-9 border-gray-200"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>

                      <Select value={sortOption} onValueChange={setSortOption}>
                        <SelectTrigger className="w-[160px] border-gray-200">
                          <div className="flex items-center">
                            <ArrowUpDown className="mr-2 h-3.5 w-3.5 text-gray-500" />
                            <SelectValue placeholder="Sort by" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="newest">Newest First</SelectItem>
                          <SelectItem value="highest">Highest Rated</SelectItem>
                          <SelectItem value="lowest">Lowest Rated</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reviews List */}
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="w-12 h-12 border-4 border-red-100 border-t-red-600 rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-500">Loading reviews...</p>
                </div>
              ) : error ? (
                <div className="bg-red-50 text-red-600 p-8 rounded-xl text-center my-8 border border-red-100">
                  <p className="font-medium">{error}</p>
                  <Button
                    variant="outline"
                    className="mt-4 border-red-200 text-red-600 hover:bg-red-50"
                    onClick={() => window.location.reload()}
                  >
                    Try Again
                  </Button>
                </div>
              ) : filteredAndSortedReviews.length > 0 ? (
                <div className="space-y-6">
                  {filteredAndSortedReviews.map((review) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="border-0 shadow-lg rounded-xl overflow-hidden bg-white">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <Avatar className="h-14 w-14 border-2 border-red-100 shadow-sm">
                              <AvatarImage src={review.avatar || "/placeholder-user.jpg"} alt={review.name} />
                              <AvatarFallback className="bg-gradient-to-br from-red-500 to-red-600 text-white font-medium">
                                {review.name.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                                <div>
                                  <h3 className="font-semibold text-gray-900 text-lg">{review.name}</h3>
                                  <div className="flex items-center mt-1">
                                    <div className="flex mr-2">
                                      {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`w-4 h-4 ${
                                            i < review.rating
                                              ? "fill-red-500 text-red-500"
                                              : "fill-gray-200 text-gray-200"
                                          }`}
                                        />
                                      ))}
                                    </div>
                                    <Badge variant="secondary" className="bg-gray-100 text-gray-700 font-normal">
                                      {review.rating}/5
                                    </Badge>
                                  </div>
                                </div>

                                {review.date && (
                                  <div className="flex items-center text-gray-500 text-sm">
                                    <Calendar className="w-3.5 h-3.5 mr-1" />
                                    {review.date}
                                  </div>
                                )}
                              </div>

                              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mt-2">
                                <AnimatePresence>
                                  {expandedReview === review.id ? (
                                    <motion.p
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.3 }}
                                      className="text-gray-700 leading-relaxed italic"
                                    >
                                      "{review.review}"
                                    </motion.p>
                                  ) : (
                                    <p className="text-gray-700 leading-relaxed italic">
                                      "
                                      {review.review.length > 300 ? `${review.review.slice(0, 300)}...` : review.review}
                                      "
                                    </p>
                                  )}
                                </AnimatePresence>

                                {review.review.length > 300 && (
                                  <Button
                                    variant="ghost"
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50 p-0 h-auto text-sm font-medium mt-2"
                                    onClick={() => setExpandedReview(expandedReview === review.id ? null : review.id)}
                                  >
                                    {expandedReview === review.id ? "Read less" : "Read full review"}
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-16 bg-white rounded-xl border border-gray-100 shadow-lg">
                  <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="font-medium text-gray-600 mb-2">No Reviews Found</p>
                  <p className="text-sm text-gray-500 mb-6">
                    {searchTerm || filterRating !== "all"
                      ? "Try adjusting your filters to see more reviews"
                      : "Be the first to review this property"}
                  </p>
                  {(searchTerm || filterRating !== "all") && (
                    <Button
                      variant="outline"
                      className="border-red-200 text-red-600 hover:bg-red-50"
                      onClick={() => {
                        setSearchTerm("")
                        setFilterRating("all")
                      }}
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-xl">Thank You for Your Review!</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Your feedback has been successfully submitted and will help others make informed decisions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-center">
            <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white">Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
