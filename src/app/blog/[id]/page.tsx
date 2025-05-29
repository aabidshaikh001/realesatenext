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
import { BlogPostSkeleton } from "../../components/BlogPostSkeleton"

interface BlogPost {
  id: number
  title: string
  category: string
  date: string
  authorName: string | null
  authorRole: string | null
  authorAvatar: string | null
  authorBio: string | null
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

// This would normally be fetched from an API
const blogPosts = [
  {
    id: 13,
    title: "PMAYG or Pradhan Mantri Awas Yojana Gramin 2024-25: Eligibility, Status, & Updates @pmayg.nic.in",
    category: "Government Schemes",
    date: "February 13, 2025",
    authorName: null,
    authorRole: null,
    authorAvatar: null,
    authorBio: null,
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTUQKCIv9_TOuQFI2vbHzfXOPwUE1BRZz5KA&s",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTUQKCIv9_TOuQFI2vbHzfXOPwUE1BRZz5KA&s",
    excerpt:
      "Learn about the latest updates, eligibility criteria, benefits, and the step-by-step application process for the Pradhan Mantri Awas Yojana-Gramin (PMAY-G) scheme in 2024-25.",
    content:
      "<p>The Pradhan Mantri Awas Yojana-Gramin (PMAY-G) is the government's flagship program that aims to achieve 'Housing for All' by providing affordable, quality homes to the rural poor. As we move into 2024-25, the government continues to make strides in ensuring better living standards for millions of families across India. This comprehensive guide covers everything you need to know about PMAY-G for the upcoming year.</p><h2>Eligibility Criteria</h2><ul><li>The beneficiary must belong to houseless households or those living in houses with one or two rooms made of kutcha (temporary) material.</li><li>Families must be listed in the Socio-Economic and Caste Census (SECC) 2011 database.</li><li>Priority is given to vulnerable groups such as SC/ST, minorities, disabled persons, and widows.</li><li>Beneficiaries must not own a pucca (permanent) house anywhere in India.</li><li>Families who have not availed housing benefits under any other government scheme are preferred.</li></ul><h2>Key Features</h2><ul><li>Financial assistance of Rs. 1.20 lakh per unit for beneficiaries in plain areas.</li><li>Financial assistance of Rs. 1.30 lakh per unit for beneficiaries in hilly regions, difficult areas, or Integrated Action Plan (IAP) districts.</li><li>Provision of up to Rs. 12,000 under the Swachh Bharat Mission for the construction of toilets to ensure complete sanitation facilities.</li><li>Assistance for unskilled labor wages through MGNREGA (Mahatma Gandhi National Rural Employment Guarantee Act).</li><li>Use of advanced technologies like the AwaasSoft and AwaasApp platforms to ensure transparency and timely construction tracking.</li><li>Direct Benefit Transfer (DBT) to ensure funds are credited directly to the beneficiary's bank account, reducing leakages.</li></ul><h2>How to Apply</h2><p>Eligible applicants can apply for PMAY-G by visiting the official portal. Follow these simple steps:</p><ol><li>Visit the official PMAY-G website at <a href='https://pmayg.nic.in' target='_blank' rel='noopener noreferrer'>pmayg.nic.in</a>.</li><li>Register yourself using basic details like Aadhaar number and mobile number.</li><li>Fill in the online application form with accurate family and income information.</li><li>Upload the required documents such as Aadhaar card, bank passbook, and income certificate.</li><li>Submit your application and save your application number for future tracking.</li></ol><h2>Important Updates for 2024-25</h2><ul><li>The target is to construct over 25 lakh houses by March 2025 under the enhanced funding support announced recently.</li><li>Special provisions have been made for aspirational districts and areas affected by natural disasters.</li><li>Greater focus on using eco-friendly and sustainable building materials to promote green housing initiatives.</li><li>Real-time grievance redressal mechanism strengthened through the PMAY-G dashboard and mobile app.</li></ul><h2>How to Check Application Status</h2><p>Applicants can track the status of their PMAY-G application online:</p><ol><li>Visit <a href='https://pmayg.nic.in/netiayHome/home.aspx' target='_blank' rel='noopener noreferrer'>pmayg.nic.in</a>.</li><li>Click on 'Stakeholders' and then select 'IAY/PMAYG Beneficiary'.</li><li>Enter your Registration Number to view your application status and updates.</li></ol><h2>Conclusion</h2><p>PMAY-G continues to be a transformative scheme, bringing dignity, security, and a better quality of life to millions of rural families. If you or someone you know is eligible, make sure to apply and avail the benefits under the 2024-25 cycle. For more detailed guidance, visit the official website or contact your local Gram Panchayat office.</p>",
    featured: true,
  },
  // ... other blog posts would be here
]

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const router = useRouter()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        // Replace this with your actual API endpoint
        const response = await fetch(`http://localhost:5000/api/blogs/${params.id}`);
        if (!response.ok) {
          throw new Error("Post not found");
        }
        const foundPost = await response.json();
        setPost(foundPost);
      } catch (error) {
        console.error("Error fetching post:", error);
        notFound();
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [params.id]);useEffect(() => {
    const fetchRelatedPosts = async () => {
      if (!post) return;
      try {
        // Replace this with your actual API endpoint for related posts
        const response = await fetch(`http://localhost:5000/api/blogs/related?category=${post.category}&exclude=${post.id}`);
        if (!response.ok) {
          throw new Error("Error fetching related posts");
        }
        const related = await response.json();
        setRelatedPosts(related);
      } catch (error) {
        console.error("Error fetching related posts:", error);
      }
    };

    if (post) {
      fetchRelatedPosts();
    }
  }, [post]);


  if (isLoading) {
    return <BlogPostSkeleton />
  }

  if (!post) {
    return <div>Post not found</div>
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

  const authorName = post.authorName || "Real Estate Expert"
  const authorRole = post.authorRole || "Content Writer"
  const authorBio =
    post.authorBio ||
    "Our team of real estate experts brings you the latest insights and trends from the Indian property market."

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
                    <AvatarImage src={post.authorAvatar || "/placeholder.svg?height=40&width=40"} />
                    <AvatarFallback>{authorName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{authorName}</div>
                    <div className="text-sm text-gray-500">{post.date}</div>
                  </div>
                </div>
              </div>

              <div className="relative h-[400px] my-8">
                <Image
                  src={post.image || "/placeholder.svg?height=400&width=800"}
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
                  <AvatarImage src={post.authorAvatar || "/placeholder.svg?height=64&width=64"} />
                  <AvatarFallback>{authorName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{authorName}</div>
                  <div className="text-sm text-gray-500">{authorRole}</div>
                </div>
              </div>
              <p className="text-sm text-gray-600">{authorBio}</p>
            </Card>

            {/* Related Posts */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Related Articles</h2>
              <div className="space-y-4">
                {relatedPosts.map((related) => (
                  <Link href={`/blog/${related.id}`} key={related.id}>
                    <Card className="flex p-4 hover:shadow-lg transition-shadow">
                      <Image
                        src={related.thumbnail || "/placeholder.svg?height=80&width=80"}
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
                        <div className="text-xs text-gray-500 mt-1">{related.date}</div>
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
