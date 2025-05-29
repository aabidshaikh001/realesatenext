"use client"

import { useState, useEffect, useMemo, useRef, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, ChevronLeft, Search, ArrowRight, Calendar, Clock, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

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
  readTime?: string
  tags?: string[]
}

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
  hover: {
    y: -5,
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
}

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("all")
  const debouncedSearchTerm = useDebounce(searchTerm, 150)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const handleSearchSubmit = () => {
    setIsSearchOpen(false)
  }

  // Focus search input when popover opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/blogs")
        if (!response.ok) {
          throw new Error("Failed to fetch blog posts")
        }
        const data = await response.json()

        // Transform API data to match our BlogPost interface
        const formattedPosts = data.map((post: any) => ({
          id: post.id || post._id,
          title: post.title,
          category: post.category || "Uncategorized",
          date: new Date(post.createdAt || post.date || Date.now()).toLocaleDateString(),
          authorName: post.author?.name || "Anonymous",
          authorAvatar: post.author?.avatar || "/placeholder.svg",
          thumbnail: post.image || post.thumbnail || "/placeholder.svg",
          excerpt: post.excerpt || post.description || "No excerpt available",
          featured: post.featured || false,
          readTime: post.readTime || `${Math.floor(Math.random() * 10) + 3} min read`,
          tags: post.tags || [],
        }))

        setBlogPosts(formattedPosts)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching blog posts:", error)
        setIsLoading(false)
        // Fallback to mock data if API fails
        const mockPosts: BlogPost[] = Array(12)
          .fill(null)
          .map((_, index) => ({
            id: `post-${index + 1}`,
            title:
              index === 0
                ? "The Future of Real Estate: AI and Virtual Reality"
                : index === 1
                  ? "How to Invest in Property During Economic Uncertainty"
                  : index === 2
                    ? "Sustainable Housing: The New Market Trend"
                    : `Blog Post Title ${index + 1}`,
            category: ["Real Estate", "Investment", "Market Trends", "Home Buying", "Property Management"][
              Math.floor(Math.random() * 5)
            ],
            date: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
            authorName: ["John Doe", "Jane Smith", "Alex Johnson", "Sam Wilson", "Emma Davis"][
              Math.floor(Math.random() * 5)
            ],
            authorAvatar: "/placeholder.svg",
            thumbnail: `/placeholder.svg?height=600&width=800&text=Blog+${index + 1}`,
            excerpt:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            featured: index < 5,
            readTime: `${Math.floor(Math.random() * 10) + 3} min read`,
            tags: ["Real Estate", "Property", "Investment", "Market", "Housing", "Trends", "Tips"]
              .sort(() => 0.5 - Math.random())
              .slice(0, Math.floor(Math.random() * 3) + 1),
          }))
        setBlogPosts(mockPosts)
      }
    }

    fetchPosts()
  }, [])

  const featuredArticles = useMemo(() => blogPosts.filter((post) => post.featured), [blogPosts])
  const recentArticles = useMemo(() => blogPosts.slice(0, 4), [blogPosts])

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

  // Extract all unique tags from blog posts
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    blogPosts.forEach((post) => {
      if (post.tags) {
        post.tags.forEach((tag) => tags.add(tag))
      }
    })
    return Array.from(tags)
  }, [blogPosts])

  const filteredPosts = useMemo(() => {
    let filtered = blogPosts

    // Filter by search term
    if (debouncedSearchTerm) {
      const searchTermLower = debouncedSearchTerm.toLowerCase()
      filtered = filtered.filter((post) => {
        const searchableText = `
        ${post.title}
        ${post.category}
        ${post.excerpt}
        ${post.authorName}
        ${post.tags?.join(" ") || ""}
      `.toLowerCase()

        return searchableText.includes(searchTermLower)
      })
    }

    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter((post) => post.category === activeCategory)
    }

    return filtered
  }, [blogPosts, debouncedSearchTerm, activeCategory])

  // Get search suggestions based on current input
  const searchSuggestions = useMemo(() => {
    if (!searchTerm) return []

    const searchTermLower = searchTerm.toLowerCase()

    // Get matching titles
    const titleMatches = blogPosts
      .filter((post) => post.title.toLowerCase().includes(searchTermLower))
      .map((post) => ({ type: "title" as const, text: post.title, post }))
      .slice(0, 3)

    // Get matching categories
    const categoryMatches = Array.from(
      new Set(
        blogPosts.filter((post) => post.category.toLowerCase().includes(searchTermLower)).map((post) => post.category),
      ),
    )
      .map((category) => ({ type: "category" as const, text: category }))
      .slice(0, 2)

    // Get matching tags
    const tagMatches = allTags
      .filter((tag) => tag.toLowerCase().includes(searchTermLower))
      .map((tag) => ({ type: "tag" as const, text: tag }))
      .slice(0, 2)

    // Get matching authors
    const authorMatches = Array.from(
      new Set(
        blogPosts
          .filter((post) => post.authorName.toLowerCase().includes(searchTermLower))
          .map((post) => post.authorName),
      ),
    )
      .map((author) => ({ type: "author" as const, text: author }))
      .slice(0, 2)

    return [...titleMatches, ...categoryMatches, ...tagMatches, ...authorMatches]
  }, [searchTerm, blogPosts, allTags])

  const uniqueCategories = useMemo(() => {
    const categories = new Set(blogPosts.map((post) => post.category))
    return ["all", ...Array.from(categories)]
  }, [blogPosts])

  return (
    <motion.div className="min-h-screen bg-gray-50" initial="hidden" animate="visible" variants={fadeIn}>
      {/* Header with Parallax Effect */}
      <motion.header
        className="relative bg-white shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Background Image with Parallax */}
        <motion.div
          className="relative h-[350px] overflow-hidden"
          whileInView={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src="/bgheader.png"
            alt="Blog Header Background"
            fill
            className="object-cover brightness-50"
            priority
          />

          {/* Animated Overlay Pattern */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-rose-500/30 to-transparent mix-blend-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
        </motion.div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          {/* Header Content with Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.h1
              className="text-4xl sm:text-6xl font-black text-center text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Our Blog
            </motion.h1>

            <motion.p
              className="max-w-xl mx-auto text-gray-200 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Discover the latest insights, trends, and expert advice in real estate
            </motion.p>

            {/* Breadcrumb */}
            <motion.nav
              className="mt-4 text-gray-200 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <ul className="flex items-center justify-center space-x-2">
                <li>
                  <Link href="/" className="hover:underline transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <ChevronRight className="h-4 w-4" />
                </li>
                <li className="font-semibold">Blog</li>
              </ul>
            </motion.nav>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Search Bar with Animation */}
        <motion.div
          className="mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <PopoverTrigger asChild>
              <div className="relative">
                <Input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    if (!isSearchOpen) setIsSearchOpen(true)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearchSubmit()
                    }
                  }}
                  className="pl-10 pr-12 py-6 w-full rounded-full shadow-md border-0 focus-visible:ring-rose-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />

                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setSearchTerm("")}
                  >
                    <X size={16} />
                    <span className="sr-only">Clear search</span>
                  </Button>
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[400px] border-none shadow-lg rounded-xl" align="center">
              <Command>
                <CommandList>
                  <CommandEmpty>
                    <div className="py-6 text-center">
                      <Search className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">No results found for "{searchTerm}"</p>
                    </div>
                  </CommandEmpty>

                  {searchSuggestions.length > 0 && (
                    <CommandGroup heading="Suggestions">
                      {searchSuggestions.map((suggestion, i) => {
                        if (suggestion.type === "title") {
                          return (
                            <Link href={`/blog/${suggestion.post.id}`} key={`title-${i}`} className="block">
                              <CommandItem className="gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <div className="relative w-12 h-12 rounded overflow-hidden">
                                  <Image
                                    src={suggestion.post.thumbnail || "/placeholder.svg"}
                                    alt={suggestion.post.title}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex flex-col flex-1 gap-1">
                                  <p className="text-sm font-medium">{suggestion.text}</p>
                                  <div className="flex items-center gap-2">
                                    <Badge variant="secondary" className="text-xs">
                                      {suggestion.post.category}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">
                                      By {suggestion.post.authorName}
                                    </span>
                                  </div>
                                </div>
                              </CommandItem>
                            </Link>
                          )
                        } else {
                          return (
                            <CommandItem
                              key={`${suggestion.type}-${i}`}
                              className="gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              onSelect={() => {
                                if (suggestion.type === "category") {
                                  setActiveCategory(suggestion.text)
                                  setSearchTerm("")
                                  setIsSearchOpen(false)
                                } else if (suggestion.type === "tag" || suggestion.type === "author") {
                                  setSearchTerm(suggestion.text)
                                  handleSearchSubmit()
                                }
                              }}
                            >
                              <div className="flex items-center gap-2">
                                {suggestion.type === "category" && (
                                  <Badge variant="outline" className="text-xs">
                                    Category
                                  </Badge>
                                )}
                                {suggestion.type === "tag" && (
                                  <Badge variant="outline" className="text-xs">
                                    Tag
                                  </Badge>
                                )}
                                {suggestion.type === "author" && (
                                  <Badge variant="outline" className="text-xs">
                                    Author
                                  </Badge>
                                )}
                                <span className="text-sm">{suggestion.text}</span>
                              </div>
                            </CommandItem>
                          )
                        }
                      })}
                    </CommandGroup>
                  )}

                  <CommandGroup heading="Top Results">
                    {filteredPosts.slice(0, 3).map((post) => (
                      <Link href={`/blog/${post.id}`} key={post.id} className="block">
                        <CommandItem className="gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors">
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
          {debouncedSearchTerm && !isSearchOpen && (
            <motion.div
              className="mt-2 text-sm text-muted-foreground text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              Found {filteredPosts.length} {filteredPosts.length === 1 ? "result" : "results"} for "
              {debouncedSearchTerm}"
            </motion.div>
          )}
        </motion.div>

        {/* Featured Articles Section */}
        <motion.div className="mb-16" variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
          <motion.h2
            className="text-3xl font-bold mb-8 text-center relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="relative inline-block">
              Featured Articles
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-1 bg-rose-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.5 }}
              />
            </span>
          </motion.h2>

          {isLoading ? (
            <Skeleton className="w-full h-[500px] rounded-xl" />
          ) : (
            <MainCarousel articles={featuredArticles} />
          )}
        </motion.div>

        {/* Categories Section */}
        <motion.div className="mb-16" variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
          <motion.h2
            className="text-3xl font-bold mb-8 text-center relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="relative inline-block">
              Explore Categories
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-1 bg-rose-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.5 }}
              />
            </span>
          </motion.h2>

          {isLoading ? <Skeleton className="w-full h-48 rounded-xl" /> : <CategoryCarousel categories={categories} />}
        </motion.div>

        {/* Recent & All Articles Section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-4 gap-8"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        >
          {/* Recent Articles Sidebar */}
          <div className="lg:col-span-1">
            <motion.h2
              className="text-2xl font-bold mb-6 relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="relative inline-block">
                Recent Posts
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-rose-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                />
              </span>
            </motion.h2>

            <motion.div className="space-y-4" variants={staggerContainer} initial="hidden" animate="visible">
              {isLoading
                ? Array(4)
                    .fill(0)
                    .map((_, index) => <Skeleton key={index} className="w-full h-24 rounded-xl" />)
                : recentArticles.map((article, index) => (
                    <motion.div key={article.id} variants={cardVariants} whileHover="hover" custom={index}>
                      <Link href={`/blog/${article.id}`}>
                        <Card className="flex p-4 hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={article.thumbnail || "/placeholder.svg"}
                              alt={article.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="ml-4 flex-1">
                            <Badge
                              variant="secondary"
                              className="mb-2 text-xs bg-rose-100 text-rose-700 hover:bg-rose-200"
                            >
                              {article.category}
                            </Badge>
                            <h3 className="text-sm font-semibold line-clamp-2 mb-1">{article.title}</h3>
                            <div className="text-xs text-gray-500 flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {article.date}
                            </div>
                          </div>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
            </motion.div>

          </div>
          {/* All Articles */}
          <div className="lg:col-span-3">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <motion.h2
                className="text-2xl font-bold relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="relative inline-block">
                  {debouncedSearchTerm && !isSearchOpen ? "Search Results" : "All Articles"}
                  <motion.span
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-rose-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  />
                </span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {debouncedSearchTerm && !isSearchOpen ? (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSearchTerm("")
                      setIsSearchOpen(false)
                    }}
                    className="text-sm"
                  >
                    Clear Search
                  </Button>
                ) : (
                  <Tabs defaultValue="all" className="w-full" onValueChange={setActiveCategory}>
                    <TabsList className="bg-muted/50 p-1">
                      {uniqueCategories.slice(0, 5).map((category) => (
                        <TabsTrigger
                          key={category}
                          value={category}
                          className={cn(
                            "text-xs px-3 py-1.5 data-[state=active]:bg-white data-[state=active]:text-rose-600",
                            "transition-all duration-200",
                          )}
                        >
                          {category === "all" ? "All" : category}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                )}
              </motion.div>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {isLoading
                ? Array(6)
                    .fill(0)
                    .map((_, index) => <Skeleton key={index} className="w-full h-[350px] rounded-xl" />)
                : filteredPosts.map((post, index) => (
                    <motion.div key={post.id} variants={cardVariants} custom={index} whileHover="hover">
                      <Link href={`/blog/${post.id}`} className="block h-full">
                        <Card className="h-full overflow-hidden border-0 shadow-sm group">
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={post.thumbnail || "/placeholder.svg"}
                              alt={post.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                          <CardContent className="p-6">
                            <div className="flex items-center gap-2 mb-3">
                              <Badge
                                variant="secondary"
                                className="bg-rose-100 text-rose-700 hover:bg-rose-200 transition-colors"
                              >
                                {post.category}
                              </Badge>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Clock className="mr-1 h-3 w-3" />
                                {post.readTime || "5 min read"}
                              </div>
                            </div>

                            <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-rose-600 transition-colors">
                              {post.title}
                            </h3>

                            <p className="text-muted-foreground line-clamp-3 mb-4 text-sm">{post.excerpt}</p>

                            {post.tags && post.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-4">
                                {post.tags.map((tag, i) => (
                                  <Badge key={i} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}

                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-muted">
                              <div className="flex items-center gap-2">
                                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-muted">
                                  <Image
                                    src={post.authorAvatar || "/placeholder.svg"}
                                    alt={post.authorName}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <span className="text-sm font-medium">{post.authorName}</span>
                              </div>
                              <div className="text-xs text-muted-foreground flex items-center">
                                <Calendar className="mr-1 h-3 w-3" />
                                {post.date}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
            </motion.div>

            {filteredPosts.length > 0 && (
              <motion.div
                className="mt-10 flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Button className="rounded-full px-8 bg-rose-600 hover:bg-rose-700 text-white">
                  Load More Articles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            )}

            {filteredPosts.length === 0 && !isLoading && (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-4 text-muted-foreground">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                <p className="text-muted-foreground mb-6">
                  We couldn't find any articles matching your search criteria.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setActiveCategory("all")
                  }}
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </main>
    </motion.div>
  )
}

function MainCarousel({ articles }: { articles: BlogPost[] }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0) // -1 for left, 1 for right

  const nextSlide = useCallback(() => {
    setDirection(1)
    setCurrentSlide((prev) => (prev + 1) % articles.length)
  }, [articles.length])

  const prevSlide = useCallback(() => {
    setDirection(-1)
    setCurrentSlide((prev) => (prev - 1 + articles.length) % articles.length)
  }, [articles.length])

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(timer)
  }, [nextSlide])

  // Animation variants for slide transitions
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  }

  return (
    <div className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-xl">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute top-0 left-0 w-full h-full"
        >
          <div className="relative w-full h-full">
            <Image
              src={articles[currentSlide]?.thumbnail || "/placeholder.svg"}
              alt={articles[currentSlide]?.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            <motion.div
              className="absolute bottom-0 left-0 w-full p-8 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="max-w-3xl mx-auto">
                <Badge
                  variant="outline"
                  className="mb-4 border-white/30 text-white hover:bg-white/10 transition-colors"
                >
                  {articles[currentSlide]?.category}
                </Badge>

                <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{articles[currentSlide]?.title}</h3>

                <p className="text-gray-200 mb-6 max-w-2xl line-clamp-2 md:line-clamp-3">
                  {articles[currentSlide]?.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white/20">
                      <Image
                        src={articles[currentSlide]?.authorAvatar || "/placeholder.svg"}
                        alt={articles[currentSlide]?.authorName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium">{articles[currentSlide]?.authorName}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{articles[currentSlide]?.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{articles[currentSlide]?.readTime || "5 min read"}</span>
                  </div>
                </div>

                <Link href={`/blog/${articles[currentSlide]?.id}`}>
                  <Button className="rounded-full px-6 bg-rose-600 hover:bg-rose-700 text-white">
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-6 right-6 flex gap-2 z-10">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-black/30 border-white/20 text-white hover:bg-black/50 backdrop-blur-sm"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-black/30 border-white/20 text-white hover:bg-black/50 backdrop-blur-sm"
          onClick={nextSlide}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
        {articles.map((_, index) => (
          <motion.button
            key={index}
            className={`w-2 h-2 rounded-full ${index === currentSlide ? "bg-white" : "bg-white/30"}`}
            onClick={() => setCurrentSlide(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  )
}

function CategoryCarousel({ categories }: { categories: { name: string; articles: number; image: string }[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 300
    }
  }

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 300
    }
  }

  return (
    <div className="relative">
      <motion.div
        ref={containerRef}
        className="flex overflow-x-auto scroll-smooth gap-6 py-4 no-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            className="w-72 h-56 rounded-xl shadow-md overflow-hidden flex-shrink-0 relative group cursor-pointer"
            initial={{ opacity: 0, x: 50 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { delay: index * 0.1, duration: 0.5 },
            }}
            whileHover={{
              y: -5,
              transition: { duration: 0.2 },
            }}
          >
            <Image
              src={category.image || "/placeholder.svg"}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"
              initial={{ opacity: 0.7 }}
              whileHover={{ opacity: 0.85 }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute bottom-0 left-0 p-6 text-white w-full">
              <h3 className="text-xl font-bold mb-1 group-hover:text-rose-400 transition-colors">{category.name}</h3>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-300">{category.articles} articles</p>
                <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <ArrowRight className="h-5 w-5 text-rose-400" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.3 }}>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-white shadow-lg hover:bg-gray-100 rounded-full z-10"
          onClick={scrollLeft}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-white shadow-lg hover:bg-gray-100 rounded-full z-10"
          onClick={scrollRight}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </motion.div>
    </div>
  )
}
