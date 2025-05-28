"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Star, ChevronRight, MessageSquare, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { useParams } from "next/navigation"

type Review = {
  id: number
  name: string
  avatar: string
  rating: number
  review: string
  date?: string // Optional date field
}

export function Ratings() {
     const { id } = useParams()
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedReview, setExpandedReview] = useState<number | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`https://api.realestatecompany.co.in/api/ratings/${id}`)
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

    fetchReviews()
  }, [id])

  // Calculate average rating
  const averageRating = reviews.length
    ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
    : "0.0"

  return (
    <Card className="border-0 shadow-xl rounded-2xl overflow-hidden bg-white">
      <CardHeader className="flex flex-row items-center justify-between py-6 px-8 border-b border-gray-100 bg-gradient-to-r from-white to-red-50">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-gray-900">Client Reviews</h2>
          <p className="text-gray-500 text-sm mt-1">What our clients are saying</p>
        </div>
        <Button
          variant="outline"
          className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 font-medium px-5 h-10 rounded-full transition-all"
          onClick={() => router.push(`/ratings/${id}`)}
        >
          <span>View All</span>
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>

      {!loading && !error && reviews.length > 0 && (
        <div className="bg-red-50 px-8 py-4 border-b border-red-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-lg p-2 shadow-sm">
              <span className="text-2xl font-bold text-red-600">{averageRating}</span>
              <span className="text-sm text-gray-500">/5</span>
            </div>
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(Number.parseFloat(averageRating))
                      ? "fill-red-500 text-red-500"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>
          <Badge variant="outline" className="bg-white text-red-600 border-red-200 px-3 py-1 text-sm">
            <MessageSquare className="w-3.5 h-3.5 mr-1" />
            {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
          </Badge>
        </div>
      )}

      <CardContent className="px-8 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-10 h-10 border-4 border-red-100 border-t-red-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500">Loading reviews...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-6 rounded-xl text-center my-4 border border-red-100">
            <p className="font-medium">{error}</p>
            <Button
              variant="outline"
              className="mt-4 border-red-200 text-red-600 hover:bg-red-50"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        ) : reviews.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-2">
            {reviews.slice(0, 4).map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-white border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  <CardContent className="p-6 flex-grow">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="h-14 w-14 border-2 border-red-100 shadow-sm">
                        <AvatarImage src={review.avatar || "/placeholder-user.jpg"} alt={review.name} />
                        <AvatarFallback className="bg-gradient-to-br from-red-500 to-red-600 text-white font-medium">
                          {review.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{review.name}</h3>
                        <div className="flex mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? "fill-red-500 text-red-500" : "fill-gray-200 text-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                        {review.date && (
                          <div className="flex items-center text-gray-400 text-xs mt-1">
                            <Calendar className="w-3 h-3 mr-1" />
                            {review.date}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <AnimatePresence>
                        {expandedReview === review.id ? (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="italic"
                          >
                            "{review.review}"
                          </motion.p>
                        ) : (
                          <p className="italic">
                            "{review.review.length > 150 ? `${review.review.slice(0, 150)}...` : review.review}"
                          </p>
                        )}
                      </AnimatePresence>
                    </div>
                  </CardContent>
                  {review.review.length > 150 && (
                    <CardFooter className="px-6 py-3 border-t border-gray-100 bg-gray-50">
                      <Button
                        variant="ghost"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 p-0 h-auto text-sm font-medium w-full justify-center"
                        onClick={() => setExpandedReview(expandedReview === review.id ? null : review.id)}
                      >
                        {expandedReview === review.id ? "Read less" : "Read full review"}
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-16 bg-gray-50 rounded-xl border border-gray-100">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="font-medium text-gray-600 mb-1">No Reviews Yet</p>
            <p className="text-sm text-gray-500">Be the first to review this property</p>
          </div>
        )}
      </CardContent>

    </Card>
  )
}
