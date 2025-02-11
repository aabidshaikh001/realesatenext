"use client"

import { motion } from "framer-motion"

const reviews = [
  { id: 1, author: "John Doe", rating: 5, comment: "Absolutely stunning property with breathtaking views!" },
  { id: 2, author: "Jane Smith", rating: 4, comment: "Great amenities and location, but a bit pricey." },
  { id: 3, author: "Mike Johnson", rating: 5, comment: "The best luxury living experience I've ever had." },
]

export default function RatingsAndReviews() {
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="section bg-white rounded-lg shadow-lg max-w-6xl mx-auto p-4 space-y-8"
    >
      <h2 className="text-2xl font-bold mb-4">Ratings & Reviews</h2>
      <div className="flex items-center mb-4">
        <div className="text-4xl font-bold mr-4">{averageRating.toFixed(1)}</div>
        <div>
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className={`text-2xl ${star <= averageRating ? "text-yellow-400" : "text-gray-300"}`}>
              ★
            </span>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="border-b pb-4"
          >
            <div className="flex items-center mb-2">
              <div className="font-semibold mr-2">{review.author}</div>
              <div className="text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={star <= review.rating ? "text-yellow-400" : "text-gray-300"}>
                    ★
                  </span>
                ))}
              </div>
            </div>
            <p className="text-gray-600">{review.comment}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

