"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

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

// Article Card Component
function ArticleCard({ post }: { post: BlogPost }) {
  return (
    <article className="group relative flex flex-col space-y-3">
      <Link href={`/blog/${post.id}`}>
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-x-2 text-sm">
            <time
              dateTime={post.date}
              className="rounded bg-red-600 px-2 py-1 text-xs font-semibold uppercase tracking-wider text-white"
            >
              {format(new Date(post.date), "MMMM dd, yyyy")}
            </time>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-x-1 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{post.authorName}</span>
              {post?.category && (
                <>
                  <span>•</span>
                  <span>{post?.category}</span>
                </>
              )}
            </div>
            <h2 className="text-xl font-semibold leading-tight tracking-tight text-foreground transition-colors group-hover:text-primary">
              {post.title}
            </h2>
            <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
          </div>
        </div>
      </Link>
    </article>
  )
}

// Skeleton Card Component
function SkeletonCard() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-[200px] w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
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
        const response = await fetch("https://realestateapi-x9de.onrender.com/api/blogs")
        if (!response.ok) {
          throw new Error("Failed to fetch blog posts")
        }
        const data = await response.json()
        setBlogPosts(data)
      } catch (error) {
        setError("Error fetching blog posts. Please try again.")
        console.error("Error fetching blog posts:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  const handleShowMore = () => {
    setVisiblePosts((prevVisible) => prevVisible + 3)
  }

  return (
    <main className="min-h-screen bg-background py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        {/* Header Section */}
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="flex justify-center">
              <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-600">BLOGS</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Latest News/Updates</h1>
          </div>
        </div>

        {/* Error Handling */}
        {error && <p className="text-center text-red-600 mt-6">{error}</p>}

        {/* Blog Grid */}
        <div className="mx-auto grid max-w-5xl gap-8 pt-12 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
          {isLoading
            ? Array(3)
                .fill(0)
                .map((_, index) => <SkeletonCard key={index} />)
            : blogPosts.slice(0, visiblePosts).map((post) => <ArticleCard key={post.id} post={post} />)}
        </div>

        {/* Show More Button */}
        {!isLoading && !error && visiblePosts < blogPosts.length && (
          <div className="mt-12 text-center">
            <Button onClick={handleShowMore} variant="outline" className="text-lg bg-red-600 text-white hover:bg-red-700 focus:bg-red-700 focus:ring-red-300 hover:text-gray-300"> 
              Show More
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}

