"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Improved blog post data
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

      <p>As Mumbai continues its journey towards becoming a slum-free city, the rehabilitation program faces both challenges and opportunities. The success of these initiatives will not only transform the lives of millions of slum dwellers but also reshape the urban landscape of one of India's most dynamic cities. As stakeholders work together to overcome obstacles and implement innovative solutions, Mumbai's slum rehabilitation efforts could serve as a model for other rapidly urbanizing areas around the world.</p>

      <h2>Conclusion</h2>
      <p>The Mumbai slum rehabilitation program represents a complex and ambitious undertaking that balances social welfare with urban development. While significant progress has been made, the road ahead remains challenging. However, with continued commitment from the government, private sector, and communities, Mumbai has the potential to achieve its goal of providing dignified housing for all its residents, setting a new standard for inclusive urban growth in the 21st century.</p>
    `,
    featured: false,
  },
]

export default function BlogPage() {
  const featuredArticles = blogPosts.filter((post) => post.featured)
  const recentArticles = blogPosts.slice(0, 3)

  // Derive categories from blogPosts
  const categories = useMemo(() => {
    const categoryMap: Record<
      string,
      { name: string; articles: number; image: string }
    > = {}
  
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
  }, [])
  
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-900">Blog</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Article Carousel */}
          <div className="lg:col-span-2">
            <MainCarousel articles={featuredArticles} />
          </div>

          {/* Recent Articles */}
          <div
  className={`space-y-6 ${recentArticles.length > 3 ? "max-h-[400px] overflow-y-scroll" : ""}`}
>
  <h2 className="text-2xl font-bold mb-4">Recent Articles</h2>
  {recentArticles.map((article) => (
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
          <p className="text-sm text-gray-500 line-clamp-2 mb-2">{article.excerpt}</p>
          <div className="text-xs text-gray-400">
            {article.date} • By {article.author.name}
          </div>
        </div>
      </Card>
    </Link>
  ))}
</div>

        </div>

        {/* Categories Carousel */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Explore Categories</h2>
          <CategoryCarousel categories={categories} />
        </div>
      </div>
    </div>
  )
}
type Article = {
  id: string
  title: string
  category: string
  date: string
  author: {
    name: string
  }
  thumbnail?: string
  image?: string
  excerpt: string
}
function MainCarousel({ articles }: { articles: Article[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + articles.length) % articles.length)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(timer)
  }, [nextSlide]) // Added nextSlide to dependencies

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {articles.map((article) => (
            <div key={article.id} className="flex-[0_0_100%] min-w-0">
              <Link href={`/blog/${article.id}`}>
                <Card className="overflow-hidden">
                  <div className="relative h-[400px]">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <Badge variant="secondary" className="mb-2">
                        {article.category}
                      </Badge>
                      <h1 className="text-white text-2xl font-bold mb-2">{article.title}</h1>
                      <p className="text-white/80 line-clamp-2 mb-2">{article.excerpt}</p>
                      <div className="flex items-center text-white/60 text-sm">
                        <span>{article.date}</span>
                        <span className="mx-2">•</span>
                        <span>By {article.author.name}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
type Category = {
  name: string
  articles: number
  image: string
}
function CategoryCarousel({ categories }: { categories: Category[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 4

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, categories.length - itemsPerPage))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0))
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 25}%)` }}
        >
          {categories.map((category, index) => (
            <div key={index} className="flex-[0_0_25%] min-w-0 px-2">
              <Card className="group cursor-pointer hover:shadow-lg transition-shadow">
                <div className="relative h-[120px]">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">{category.name}</h3>
                  <p className="text-sm text-gray-500">
                    {category.articles} Article{category.articles !== 1 ? "s" : ""}
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white shadow-lg hover:bg-white"
        onClick={prevSlide}
        disabled={currentIndex === 0}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white shadow-lg hover:bg-white"
        onClick={nextSlide}
        disabled={currentIndex >= categories.length - itemsPerPage}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

