'use client'
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Facebook, Twitter, Linkedin, Link2, Check, Share2,ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

// Blog post data (same as in page.tsx)
const blogPosts = [
  {
    id: "pmayg-2024-25",
    title: "PMAYG or Pradhan Mantri Awas Yojana Gramin 2024-25: Eligibility, Status, & Updates @pmayg.nic.in",
    category: "Government Schemes",
    date: "February 13, 2025",
    author: {
      name: "Amruth Singh Chauhan",
      role: "Senior Reporter",
      avatar: "/placeholder.svg?height=100&width=100",
      bio: "Amruth has been covering government policies and schemes for over a decade. He specializes in housing and urban development initiatives.",
    },
    thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-RtLc79kG0WFDSigkkbzvr3IdqVeNbT.png",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-RtLc79kG0WFDSigkkbzvr3IdqVeNbT.png",
    excerpt:
      "Learn about the latest updates, eligibility criteria, and application process for the Pradhan Mantri Awas Yojana-Gramin (PMAY-G) scheme in 2024-25.",
    content: `
      <p>The Pradhan Mantri Awas Yojana-Gramin (PMAY-G) is the government's flagship program that aims to provide "Housing for All" by 2024. This comprehensive guide covers everything you need to know about PMAY-G for 2024-25.</p>
      
      <h2>Eligibility Criteria</h2>
      <ul>
        <li>The beneficiary must belong to households that are houseless</li>
        <li>Those living in 0, 1 or 2 room houses with kutcha walls and kutcha roof</li>
        <li>Must be listed in SECC 2011 data</li>
      </ul>

      <h2>Key Features</h2>
      <ul>
        <li>Unit assistance of Rs. 1.20 lakh in plain areas</li>
        <li>Rs. 1.30 lakh in hilly states/difficult areas/IAP districts</li>
        <li>Additional support of up to Rs. 12,000 for toilet construction</li>
      </ul>

      <h2>How to Apply</h2>
      <p>Visit the official PMAY-G website at pmayg.nic.in and follow these steps:</p>
      <ol>
        <li>Register on the portal</li>
        <li>Fill in the application form</li>
        <li>Upload required documents</li>
        <li>Submit and track your application</li>
      </ol>
    `,
    featured: true,
  },
  {
    id: "kumar-mangalam-birla-house",
    title: "Kumar Mangalam Birla House - Price, Net Worth, Latest News, and More",
    category: "Celeb Homes",
    date: "February 13, 2025",
    author: {
      name: "Vipra Chadha",
      role: "Celebrity Home Expert",
      avatar: "/placeholder.svg?height=100&width=100",
      bio: "Vipra specializes in covering luxury real estate and celebrity homes. She has been writing about high-end properties for over 8 years.",
    },
    thumbnail: "/placeholder.svg?height=400&width=600",
    image: "/placeholder.svg?height=800&width=1200",
    excerpt:
      "Explore the luxurious residence of Kumar Mangalam Birla, including its estimated price, the industrialist's net worth, and the latest news surrounding this iconic property.",
    content: `
      <p>Kumar Mangalam Birla, one of India's most prominent industrialists, resides in a magnificent mansion that reflects his status and success. This article delves into the details of his opulent home, its estimated value, and provides insights into the business tycoon's net worth.</p>

      <h2>The Birla House: A Glimpse into Luxury</h2>
      <p>Located in the heart of Mumbai, the Kumar Mangalam Birla residence is a testament to architectural brilliance and luxurious living. Some key features include:</p>
      <ul>
        <li>Sprawling area of over 30,000 square feet</li>
        <li>State-of-the-art security systems</li>
        <li>Private helipad</li>
        <li>Indoor swimming pool and gym</li>
        <li>Art collection worth millions</li>
      </ul>

      <h2>Estimated Value and Net Worth</h2>
      <p>While the exact value of the property is not disclosed, real estate experts estimate its worth to be around $250-300 million. This is just a fraction of Kumar Mangalam Birla's total net worth, which is estimated to be:</p>
      <ul>
        <li>Net Worth: Approximately $14.5 billion (as of 2025)</li>
        <li>Ranking: Among the top 10 richest individuals in India</li>
      </ul>

      <h2>Latest News and Developments</h2>
      <p>Recent news surrounding the Birla residence includes:</p>
      <ul>
        <li>Eco-friendly renovations to reduce the mansion's carbon footprint</li>
        <li>Hosting of high-profile business meetings and social events</li>
        <li>Philanthropic initiatives launched from the residence</li>
      </ul>
    `,
    featured: true,
  },
  {
    id: "hubli-dharwad-tax",
    title: "Hubli-Dharwad Municipal Corporation Property Tax and Online Services",
    category: "Taxation",
    date: "February 13, 2025",
    author: {
      name: "Vipra Chadha",
      role: "Tax Expert",
      avatar: "/placeholder.svg?height=100&width=100",
      bio: "Vipra is an expert in municipal taxation and has been covering property tax issues for various cities across India.",
    },
    thumbnail: "/placeholder.svg?height=400&width=600",
    image: "/placeholder.svg?height=800&width=1200",
    excerpt:
      "Get all the information you need about property tax in Hubli-Dharwad, including payment methods, online services, and recent updates from the Municipal Corporation.",
    content: `
      <p>The Hubli-Dharwad Municipal Corporation (HDMC) has made significant strides in simplifying property tax payments and offering a range of online services to its residents. This comprehensive guide covers everything you need to know about property tax in the twin cities.</p>

      <h2>Property Tax Calculation</h2>
      <p>The HDMC calculates property tax based on several factors:</p>
      <ul>
        <li>Built-up area of the property</li>
        <li>Age of the building</li>
        <li>Type of construction (RCC, tiled roof, etc.)</li>
        <li>Usage (residential, commercial, or industrial)</li>
        <li>Location within the city limits</li>
      </ul>

      <h2>Online Payment Options</h2>
      <p>The HDMC offers multiple channels for online property tax payment:</p>
      <ol>
        <li>Official HDMC website</li>
        <li>Mobile app (available on iOS and Android)</li>
        <li>Net banking</li>
        <li>Credit/Debit cards</li>
        <li>UPI payments</li>
      </ol>

      <h2>Additional Online Services</h2>
      <p>Besides tax payments, the HDMC portal offers various other services:</p>
      <ul>
        <li>Birth and death certificate applications</li>
        <li>Trade license renewals</li>
        <li>Building plan approvals</li>
        <li>Water bill payments</li>
        <li>Grievance redressal system</li>
      </ul>

      <h2>Recent Updates</h2>
      <p>The HDMC has introduced several new initiatives:</p>
      <ul>
        <li>Early bird discount of 5% for payments made before April 30th</li>
        <li>Integration with the state-wide e-governance portal</li>
        <li>GIS-based property mapping for more accurate assessments</li>
        <li>Chatbot assistance on the official website for quick query resolution</li>
      </ul>
    `,
    featured: false,
  },
  {
    id: "bhubaneswar-development",
    title: "Bhubaneswar Development Authority - Real Estate Insights",
    category: "Real Estate",
    date: "February 13, 2025",
    author: {
      name: "Rahul Sharma",
      role: "Urban Development Correspondent",
      avatar: "/placeholder.svg?height=100&width=100",
      bio: "Rahul has been tracking urban development projects across India for the past 5 years, with a focus on emerging cities.",
    },
    thumbnail: "/placeholder.svg?height=400&width=600",
    image: "/placeholder.svg?height=800&width=1200",
    excerpt:
      "Discover the latest developments, investment opportunities, and urban planning initiatives by the Bhubaneswar Development Authority (BDA) in this comprehensive analysis.",
    content: `
      <p>Bhubaneswar, the capital city of Odisha, has been witnessing rapid growth and development in recent years. The Bhubaneswar Development Authority (BDA) plays a crucial role in shaping the city's urban landscape. This article provides insights into the current real estate scenario and future prospects in Bhubaneswar.</p>

      <h2>Current Real Estate Trends</h2>
      <ul>
        <li>Rising demand for residential properties in developing areas</li>
        <li>Increase in commercial real estate investments</li>
        <li>Growing interest in eco-friendly and smart home concepts</li>
        <li>Steady appreciation of property values in key locations</li>
      </ul>

      <h2>BDA's Major Development Projects</h2>
      <ol>
        <li>Smart City Initiative: Transforming Bhubaneswar into a technologically advanced urban center</li>
        <li>Greenfield Airport: Boosting connectivity and real estate growth in surrounding areas</li>
        <li>Info Valley: IT hub attracting tech companies and creating job opportunities</li>
        <li>Eco-trails: Developing green corridors for sustainable urban living</li>
      </ol>

      <h2>Investment Opportunities</h2>
      <p>Bhubaneswar offers various investment prospects for real estate enthusiasts:</p>
      <ul>
        <li>Affordable housing projects in suburban areas</li>
        <li>High-end apartments in prime locations</li>
        <li>Commercial spaces in upcoming business districts</li>
        <li>Plot investments in BDA-approved layouts</li>
      </ul>

      <h2>Challenges and Future Outlook</h2>
      <p>While the city shows promising growth, there are challenges to address:</p>
      <ul>
        <li>Infrastructure development to keep pace with population growth</li>
        <li>Balancing modernization with preservation of cultural heritage</li>
        <li>Ensuring affordable housing for all income groups</li>
        <li>Implementing sustainable urban planning practices</li>
      </ul>
      <p>Despite these challenges, Bhubaneswar's real estate market is poised for significant growth, making it an attractive destination for investors and homebuyers alike.</p>
    `,
    featured: false,
  },
  {
    id: "mumbai-slum-rehabilitation",
    title: "Mumbai Slum Rehabilitation: Progress, Challenges, and Future Plans",
    category: "Urban Development",
    date: "February 14, 2025",
    author: {
      name: "Priya Desai",
      role: "Urban Planning Specialist",
      avatar: "/placeholder.svg?height=100&width=100",
      bio: "Priya has been studying and writing about urban development in Indian metros for over a decade, with a special focus on inclusive growth and slum rehabilitation.",
    },
    thumbnail: "/placeholder.svg?height=400&width=600",
    image: "/placeholder.svg?height=800&width=1200",
    excerpt:
      "An in-depth look at Mumbai's ongoing slum rehabilitation efforts, including recent successes, persistent challenges, and ambitious plans for the future.",
    content: `
      <p>Mumbai, India's financial capital, has long grappled with the challenge of providing adequate housing for its large slum population. This article examines the current state of slum rehabilitation in Mumbai, highlighting recent progress, ongoing challenges, and future plans.</p>

      <h2>Recent Progress</h2>
      <ul>
        <li>Completion of 500,000 rehabilitation homes in the past five years</li>
        <li>Implementation of new technologies for faster construction</li>
        <li>Improved coordination between government agencies and private developers</li>
        <li>Successful relocation of 100,000 families from high-risk areas</li>
      </ul>

      <h2>Ongoing Challenges</h2>
      <p>Despite progress, several challenges persist:</p>
      <ol>
        <li>Land scarcity in prime areas of the city</li>
        <li>Resistance from some slum dwellers to relocation</li>
        <li>Balancing the interests of slum dwellers and private developers</li>
        <li>Ensuring quality construction and maintenance of rehabilitated buildings</li>
        <li>Providing adequate infrastructure in rehabilitated areas</li>
      </ol>

      <h2>Innovative Solutions</h2>
      <p>The Slum Rehabilitation Authority (SRA) is implementing several innovative approaches:</p>
      <ul>
        <li>Vertical development to maximize land use</li>
        <li>Integration of slum rehabilitation with smart city initiatives</li>
        <li>Public-private partnerships for faster project execution</li>
        <li>Use of prefabricated construction techniques for rapid development</li>
      </ul>

      <h2>Future Plans</h2>
      <p>The government has outlined ambitious plans for the next decade:</p>
      <ul>
        <li>Aim to make Mumbai slum-free by 2035</li>
        <li>Development of 1 million more rehabilitation homes</li>
        <li>Creation of integrated townships with mixed income groups</li>
        <li>Implementation of sustainable and eco-friendly design in all new projects</li>
      </ul>

      <h2>Impact on Real Estate Market</h2>
      <p>The slum rehabilitation program is having a significant impact on Mumbai's real estate market:</p>
      <ul>
        <li>Increase in available land for development in prime areas</li>
        <li>Rise in property values in rehabilitated neighborhoods</li>
        <li>Growing interest from international investors in slum redevelopment projects</li>
        <li>Emergence of new business opportunities in affordable housing sector</li>
      </ul>

      <p>As Mumbai continues its journey towards becoming a slum-free city, the rehabilitation program faces both challenges and opportunities. The success of these initiatives will not only transform the lives of millions of slum dwellers but also reshape the urban landscape of one of India's most dynamic cities.</p>
    `,
    featured: false,
  },
]

interface BlogPostPageProps {
  params: {
    id: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const router = useRouter();
  const post = blogPosts.find((post) => post.id === params.id);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);


  if (!post) {
    notFound()
  }
  const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/blog/${post.id}`;
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`,
  };
  const relatedPosts = blogPosts.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 3)
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
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
                    <AvatarImage src={post.author.avatar} />
                    <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{post.author.name}</div>
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

             {/* Add the prose class to this div */}
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
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-3 py-2 border rounded-md text-sm"
              />
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
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{post.author.name}</div>
                  <div className="text-sm text-gray-500">{post.author.role}</div>
                </div>
              </div>
              <p className="text-sm text-gray-600">{post.author.bio}</p>
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
                          {related.date} • By {related.author.name}
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

