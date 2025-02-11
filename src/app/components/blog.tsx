"use client"

import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"

// Types
interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  author: {
    name: string
    category: string
  }
  image: string
}

// Sample Data
const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Building Gains Into Housing Stocks And How To Trade The Sector",
    excerpt:
      "The average contract interest rate for 30-year fixed-rate mortgages with conforming loan balances decreased to 6.78%...",
    date: "2024-01-28",
    author: {
      name: "Esther",
      category: "Furniture",
    },
    image: "https://5.imimg.com/data5/SELLER/Default/2021/2/CH/ED/HB/34513560/interior-wallpaper-designs-jfif-500x500.jpg",
  },
  {
    id: "2",
    title: "92% Of Millennial Homebuyers Say Inflation Has Impacted Their Plans",
    excerpt: "Mortgage applications to purchase a home, however, dropped 4% last week compared...",
    date: "2024-01-31",
    author: {
      name: "Angel",
      category: "Interior",
    },
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HrtpAKLcgiqDLdmDFAnr6YB6PbcdKc.png",
  },
  {
    id: "3",
    title: "We Are Hiring 'Moderately,' Says Compass CEO",
    excerpt: "New listings were down 20% year over year in March, according to Realtor.com, and total inventory...",
    date: "2024-01-28",
    author: {
      name: "Colleen",
      category: "Architecture",
    },
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HrtpAKLcgiqDLdmDFAnr6YB6PbcdKc.png",
  },
]

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
              <span className="font-medium text-foreground">{post.author.name}</span>
              <span>•</span>
              <span>{post.author.category}</span>
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

// Main Blog Component
export default function Blog() {
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

        {/* Blog Grid */}
        <div className="mx-auto grid max-w-5xl gap-8 pt-12 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <ArticleCard key={post.id} post={post} />
          ))}
        </div>

      </div>
    </main>
  )
}

