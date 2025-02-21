"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Facebook, Twitter, Linkedin, Link2, Check, Share2, ChevronRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

interface BlogPost {
  id: string
  title: string
  category: string
  date: string
  authorName: string
  authorRole: string
  authorAvatar: string
  authorBio: string
  thumbnail: string
  image: string
  excerpt: string
  content: string
  featured: boolean
}

interface BlogPostPageProps {
  params: {
    id: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const router = useRouter()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://realestateapi-x9de.onrender.com/api/blogs/${params.id}`)
        if (!response.ok) {
          throw new Error("Post not found")
        }
        const data = await response.json()
        setPost(data)
      } catch (error) {
        console.error("Error fetching post:", error)
        notFound()
      }
    }

    fetchPost()
  }, [params.id])

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      if (!post) return
      try {
        const response = await fetch("http://localhost:5000/api/blogs")
        if (!response.ok) {
          throw new Error("Failed to fetch related posts")
        }
        const data = await response.json()
        const related = data.filter((p: BlogPost) => p.category === post?.category && p.id !== post?.id).slice(0, 3)
        setRelatedPosts(related)
      } catch (error) {
        console.error("Error fetching related posts:", error)
      }
    }

    if (post) {
      fetchRelatedPosts()
    }
  }, [post, post?.category, post?.id])

  if (!post) {
    return <div>Loading...</div>
  }

  const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/blog/${post.id}`
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`,
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link href="/blog" className="hover:text-gray-900">
            Blog
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-900 truncate">{post.title}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article className="prose prose-gray max-w-none">
              <div className="space-y-4 not-prose">
                <Badge variant="secondary">{post.category}</Badge>
                <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={post.authorAvatar} />
                    <AvatarFallback>{post.authorName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{post.authorName}</div>
                    <div className="text-sm text-gray-500">{post.date}</div>
                  </div>
                </div>
              </div>

              <div className="relative h-[400px] my-8">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>

              <div className="flex items-center space-x-4 mt-8">
                <Button variant="outline" onClick={() => setIsShareModalOpen(true)}>
                  <Share2 className="h-4 w-4 mr-2" /> Share this article
                </Button>
              </div>
            </article>
          </div>

          {/* Share Modal */}
          <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
            <DialogContent className="sm:max-w-md bg-white">
              <DialogHeader>
                <DialogTitle>Share this article</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4">
                {/* Social Media Buttons */}
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

                {/* Copy Link Section */}
                <div className="flex items-center gap-2">
                  <input type="text" value={shareUrl} readOnly className="flex-1 px-3 py-2 border rounded-md text-sm" />
                  <Button size="sm" onClick={copyToClipboard} className="flex items-center gap-2">
                    {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Author Bio */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">About the Author</h2>
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={post.authorAvatar} />
                  <AvatarFallback>{post.authorName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{post.authorName}</div>
                  <div className="text-sm text-gray-500">{post.authorRole}</div>
                </div>
              </div>
              <p className="text-sm text-gray-600">{post.authorBio}</p>
            </Card>

            {/* Related Posts */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Related Articles</h2>
              <div className="space-y-4">
                {relatedPosts.map((related) => (
                  <Link href={`/blog/${related.id}`} key={related.id}>
                    <Card className="flex p-4 hover:shadow-lg transition-shadow">
                      <Image
                        src={related.thumbnail || "/placeholder.svg"}
                        alt={related.title}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                      <div className="ml-4">
                        <Badge variant="secondary" className="mb-1">
                          {related.category}
                        </Badge>
                        <h3 className="text-sm font-semibold line-clamp-2">{related.title}</h3>
                        <div className="text-xs text-gray-500 mt-1">
                          {related.date} • By {related.authorName}
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

