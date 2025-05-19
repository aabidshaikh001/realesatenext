"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronRight, Calendar, User, Tag } from "lucide-react"

// Blog Post Type Definition
interface BlogPost {
  id: string
  title: string
  category: string
  date: string
  authorName: string
  image: string
  excerpt: string
}

// Fisher-Yates shuffle algorithm for better randomization
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

// Article Card Component
function ArticleCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md"
    >
      <Link href={`/blog/${post.id}`} className="flex h-full flex-col">
        <div className="relative aspect-[16/9] overflow-hidden">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }} className="h-full w-full">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            />
          </motion.div>
          <div className="absolute left-4 top-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white"
            >
              <Calendar className="h-3 w-3" />
              <time dateTime={post.date}>{format(new Date(post.date), "MMM dd, yyyy")}</time>
            </motion.div>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between p-5">
          <div className="space-y-3">
            <div className="flex items-center gap-x-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span className="font-medium">{post.authorName}</span>
              </div>
              {post?.category && (
                <div className="flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  <span>{post?.category}</span>
                </div>
              )}
            </div>

            <h2 className="text-xl font-bold leading-tight tracking-tight text-foreground group-hover:text-red-600 transition-colors">
              {post.title}
            </h2>

            <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
          </div>

          <motion.div
            className="mt-4 flex items-center text-sm font-medium text-red-600"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Read more <ChevronRight className="ml-1 h-4 w-4" />
          </motion.div>
        </div>
      </Link>
    </motion.article>
  )
}

// Skeleton Card Component
function SkeletonCard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-sm"
    >
      <Skeleton className="h-[200px] w-full" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/3 mt-4" />
      </div>
    </motion.div>
  )
}

// Main Blog Component
export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [visiblePosts, setVisiblePosts] = useState(3)

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        // Simulate loading for demo purposes
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const response = await fetch("https://api.realestatecompany.co.in/api/blogs")
        if (!response.ok) {
          throw new Error("Failed to fetch blog posts")
        }
        const data = await response.json()
        setBlogPosts(data)
        setBlogPosts((prevPosts) => shuffleArray(prevPosts))
      } catch (error) {
        setError("Error fetching blog posts. Please try again.")
        console.error("Error fetching blog posts:", error)

        // Fallback data for demo purposes
        setBlogPosts([
          {
            id: "1",
            title: "The Future of Real Estate: Trends to Watch in 2024",
            category: "Market Trends",
            date: "2024-04-15",
            authorName: "Sarah Johnson",
            image: "/placeholder.svg?height=400&width=600",
            excerpt:
              "Discover the emerging trends that are reshaping the real estate landscape in 2024, from sustainable housing to technology integration.",
          },
          {
            id: "2",
            title: "Investment Strategies for First-Time Property Buyers",
            category: "Investment",
            date: "2024-04-10",
            authorName: "Michael Chen",
            image: "/placeholder.svg?height=400&width=600",
            excerpt:
              "Learn proven strategies to maximize your return on investment when purchasing your first property in today's competitive market.",
          },
          {
            id: "3",
            title: "How to Stage Your Home for a Quick Sale",
            category: "Selling Tips",
            date: "2024-04-05",
            authorName: "Emily Rodriguez",
            image: "/placeholder.svg?height=400&width=600",
            excerpt:
              "Expert tips on how to prepare your home for viewings to attract more buyers and secure a faster sale at the best possible price.",
          },
          {
            id: "4",
            title: "Understanding Property Taxes: A Comprehensive Guide",
            category: "Finance",
            date: "2024-03-28",
            authorName: "David Wilson",
            image: "/placeholder.svg?height=400&width=600",
            excerpt:
              "Navigate the complex world of property taxes with our detailed guide covering exemptions, calculations, and money-saving strategies.",
          },
          {
            id: "5",
            title: "The Rise of Smart Homes: Technology Transforming Real Estate",
            category: "Technology",
            date: "2024-03-20",
            authorName: "Priya Patel",
            image: "/placeholder.svg?height=400&width=600",
            excerpt:
              "Explore how smart home technology is changing buyer expectations and adding value to properties in the modern real estate market.",
          },
          {
            id: "6",
            title: "Commercial Real Estate Outlook: Post-Pandemic Recovery",
            category: "Commercial",
            date: "2024-03-15",
            authorName: "Robert Thompson",
            image: "/placeholder.svg?height=400&width=600",
            excerpt:
              "Analysis of the commercial real estate sector's recovery and growth opportunities following the global pandemic disruption.",
          },
        ])
        setBlogPosts((prevPosts) => shuffleArray(prevPosts))
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  const handleShowMore = () => {
    setVisiblePosts((prevVisible) => prevVisible + 3)
  }

  // Filter categories for the filter section
  const categories = Array.from(new Set(blogPosts.map((post) => post.category)))

  return (
    <section className="relative overflow-hidden bg-background py-16 md:py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-red-600 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-red-600 blur-3xl" />
      </div>

      <div className="container relative z-10 px-4 md:px-6 mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block rounded-full bg-red-100 px-4 py-1.5 text-sm font-medium text-red-600 mb-4"
          >
            OUR BLOG
          </motion.div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">Latest News & Insights</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Stay informed with our expert analysis, market trends, and valuable tips for navigating the real estate
            landscape.
          </p>
        </motion.div>

        {/* Category Filter - Optional */}
        {!isLoading && categories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full border border-red-200 bg-background px-4 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Error Handling */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mx-auto max-w-md rounded-lg bg-red-50 p-4 text-center text-red-600 mb-12"
            >
              <p>{error}</p>
              <Button
                variant="outline"
                className="mt-2 border-red-200 text-red-600 hover:bg-red-100"
                onClick={() => setError(null)}
              >
                Dismiss
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Blog Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mx-auto max-w-7xl">
          <AnimatePresence>
            {isLoading
              ? Array(3)
                  .fill(0)
                  .map((_, index) => <SkeletonCard key={index} />)
              : blogPosts
                  .slice(0, visiblePosts)
                  .map((post, index) => <ArticleCard key={post.id} post={post} index={index} />)}
          </AnimatePresence>
        </div>

        {/* Show More Button */}
        {!isLoading && !error && visiblePosts < blogPosts.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 text-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleShowMore}
                className="bg-red-600 text-white hover:bg-red-700 px-8 py-6 text-lg font-medium rounded-full"
              >
                Load More Articles
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
