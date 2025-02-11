import Hero from "./components/Hero"
import Testimonials from "./components/Testimonials"
import ContactCTA from "./components/ContactCTA"
import FeaturedPropertiesRent from "./components/FeaturedPropertiesRent"
import FeaturedPropertiesSale from "./components/FeaturedPropertiesSale"
import Services from "./components/services"
import ExploreCities from "./components/OurLocations"
import OurServices from "./components/ourserices"
import StatsCounter from "./components/StatsCounter"
import BrandCarousel from "./components/BrandCarousel"
import Blog from "./components/blog"


export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    
      <Hero />
      <FeaturedPropertiesSale/>
      <FeaturedPropertiesRent />
      {/* <Our Locations /> */}
      <ExploreCities/>
     <OurServices/>
      <Services />
      {/* <Key Pointers/> */}
     <StatsCounter/>

   
     
      <Testimonials />   {/* // desgin as per current design */}

      {/* <Blogs/> */}
      {/* <Our Partners/> */}
      <BrandCarousel/>
      <ContactCTA />
      <Blog/>
    </main>
  )
}

