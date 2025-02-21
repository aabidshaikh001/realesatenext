"use client"

import { useState, useEffect, useMemo, useRef, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, ChevronLeft, Search } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
interface BlogPost {
  id: string
  title: string
  category: string
  date: string
  authorName: string
  authorAvatar: string
  thumbnail: string
  excerpt: string
  featured: boolean
}

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const debouncedSearchTerm = useDebounce(searchTerm, 150)

  const handleSearchSubmit = () => {
    setIsSearching(false)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://realestateapi-x9de.onrender.com/api/blogs")
        if (!response.ok) {
          throw new Error("Failed to fetch blog posts")
        }
        const data = await response.json()
        setBlogPosts(data)
      } catch (error) {
        console.error("Error fetching blog posts:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const featuredArticles = useMemo(() => blogPosts.filter((post) => post.featured), [blogPosts])
  const recentArticles = useMemo(() => blogPosts.slice(0, 3), [blogPosts])

  const categories = useMemo(() => {
    const categoryMap: Record<string, { name: string; articles: number; image: string }> = {}
    blogPosts.forEach((post) => {
      if (!categoryMap[post.category]) {
        categoryMap[post.category] = {
          name: post.category,
          articles: 0,
          image: post.thumbnail || "/placeholder.svg",
        }
      }
      categoryMap[post.category].articles++
    })
    return Object.values(categoryMap)
  }, [blogPosts])

  const filteredPosts = useMemo(() => {
    if (!debouncedSearchTerm) return blogPosts

    const searchTermLower = debouncedSearchTerm.toLowerCase()
    return blogPosts.filter((post) => {
      const searchableText = `
      ${post.title}
      ${post.category}
      ${post.excerpt}
      ${post.authorName}
    `.toLowerCase()

      return searchableText.includes(searchTermLower)
    })
  }, [blogPosts, debouncedSearchTerm])
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <nav className="container mx-auto px-4 py-4 text-gray-600">
        <ul className="flex items-center space-x-2 text-sm">
          <li>
            <Link href="/">
              <a className="hover:underline">Home</a>
            </Link>
          </li>
          <li>
            <ChevronRight className="h-4 w-4" />
          </li>
          <li className="text-red-600 font-semibold">Blog</li>
        </ul>
      </nav>
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Our Blog</h1>
          <p className="mt-2 text-lg text-gray-600">Discover the latest insights and trends</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <Popover>
            <PopoverTrigger asChild>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setIsSearching(true)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearchSubmit()
                    }
                  }}
                  className="pl-10 pr-4 py-2 w-full"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[400px]" align="start">
              <Command>
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Top Results">
                    {filteredPosts.slice(0, 3).map((post) => (
                      <Link href={`/blog/${post.id}`} key={post.id} className="block">
                        <CommandItem className="gap-2">
                          <div className="relative w-12 h-12 rounded overflow-hidden">
                            <Image
                              src={post.thumbnail || "/placeholder.svg"}
                              alt={post.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex flex-col flex-1 gap-1">
                            <p className="text-sm font-medium">{post.title}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs">
                                {post.category}
                              </Badge>
                              <span className="text-xs text-muted-foreground">By {post.authorName}</span>
                            </div>
                          </div>
                        </CommandItem>
                      </Link>
                    ))}
                  </CommandGroup>
                  {debouncedSearchTerm && filteredPosts.length > 3 && (
                    <div className="p-2 text-center border-t">
                      <Button variant="ghost" className="text-xs w-full" onClick={handleSearchSubmit}>
                        View all {filteredPosts.length} results
                      </Button>
                    </div>
                  )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {/* Search Results Summary - only show when actively viewing all results */}
          {debouncedSearchTerm && !isSearching && (
            <div className="mt-2 text-sm text-muted-foreground">
              Found {filteredPosts.length} {filteredPosts.length === 1 ? "result" : "results"} for "
              {debouncedSearchTerm}"
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Article Carousel */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Featured Articles</h2>
            {isLoading ? (
              <Skeleton className="w-full h-[400px] rounded-lg" />
            ) : (
              <MainCarousel articles={featuredArticles} />
            )}
          </div>

          {/* Recent Articles */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Recent Articles</h2>
            <div className="space-y-4">
              {isLoading
                ? Array(5)
                    .fill(0)
                    .map((_, index) => <Skeleton key={index} className="w-full h-24 rounded-lg" />)
                : recentArticles.map((article) => (
                    <Link href={`/blog/${article.id}`} key={article.id}>
                      <Card className="flex p-4 hover:shadow-lg transition-shadow">
                        <Image
                          src={article.thumbnail || "/placeholder.svg"}
                          alt={article.title}
                          width={80}
                          height={80}
                          className="rounded-lg object-cover"
                        />
                        <div className="ml-4">
                          <Badge variant="secondary" className="mb-2">
                            {article.category}
                          </Badge>
                          <h3 className="text-lg font-semibold line-clamp-2 mb-1">{article.title}</h3>
                          <div className="text-xs text-gray-500">
                            {article.date} • By {article.authorName}
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Explore Categories</h2>
          {isLoading ? <Skeleton className="w-full h-48 rounded-lg" /> : <CategoryCarousel categories={categories} />}
        </div>

        {/* All Articles */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {debouncedSearchTerm && !isSearching ? "Search Results" : "All Articles"}
            </h2>
            {debouncedSearchTerm && !isSearching && (
              <Button
                variant="ghost"
                onClick={() => {
                  setSearchTerm("")
                  setIsSearching(false)
                }}
              >
                Clear Search
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading
              ? Array(6)
                  .fill(0)
                  .map((_, index) => <Skeleton key={index} className="w-full h-[300px] rounded-lg" />)
              : filteredPosts.map((post) => (
                  <Link href={`/blog/${post.id}`} key={post.id}>
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <Image
                          src={post.thumbnail || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover rounded-t-lg"
                        />
                      </div>
                      <div className="p-4">
                        <Badge variant="secondary" className="mb-2">
                          {post.category}
                        </Badge>
                        <h3 className="text-xl font-semibold mb-2 line-clamp-2">{post.title}</h3>
                        <p className="text-gray-600 line-clamp-3 mb-4">{post.excerpt}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{post.date}</span>
                          <span>By {post.authorName}</span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
          </div>
        </div>
      </main>
    </div>
  )
}

function MainCarousel({ articles }: { articles: BlogPost[] }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % articles.length)
  }, [articles.length])

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + articles.length) % articles.length)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
      {articles.map((article, index) => (
        <div
          key={article.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image src={article.thumbnail || "/placeholder.svg"} alt={article.title} layout="fill" objectFit="cover" />
          <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent text-white">
            <Badge variant="secondary" className="mb-2">
              {article.category}
            </Badge>
            <h3 className="text-2xl font-bold line-clamp-2">{article.title}</h3>
            <p className="line-clamp-2">{article.excerpt}</p>
            <Link href={`/blog/${article.id}`}>
              <Button
                variant="link"
                className="mt-2 text-white hover:text-gray-200 bg-red-600 hover:bg-red-700 rounded-full"
              >
                Read More
              </Button>
            </Link>
          </div>
        </div>
      ))}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  )
}

function CategoryCarousel({ categories }: { categories: { name: string; articles: number; image: string }[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 200;
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 200;
    }
  };

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="flex overflow-x-auto scroll-smooth gap-4 py-4 no-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((category) => (
          <div
            key={category.name}
            className="w-64 h-48 rounded-lg shadow-md overflow-hidden flex-shrink-0 relative group cursor-pointer"
          >
            <Image
              src={category.image || "/placeholder.svg"}
              alt={category.name}
              layout="fill"
              objectFit="cover"
              className="absolute inset-0 transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <p className="text-sm">{category.articles} articles</p>
            </div>
          </div>
        ))}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-white shadow-lg hover:bg-gray-100"
        onClick={scrollLeft}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-white shadow-lg hover:bg-gray-100"
        onClick={scrollRight}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  );
}


