"use client"

import { motion } from "framer-motion"
import PropertyOverview from "../../components/PropertyDetails/PropertyOverview"
import Amenities from "../../components/PropertyDetails/Amenities"
import ProjectDetails from "../../components/PropertyDetails/AboutProject"
import FloorPlanAndUnits from "../../components/PropertyDetails/FloorPlanAndUnits"
import { Ratings } from "../../components/PropertyDetails/ratings"
import AboutLocality from "../../components/PropertyDetails/AboutLocality"
import PriceTrends from "../../components/PropertyDetails/PriceTrends"

import MapComponent from "@/app/components/PropertyDetails/map"
import VideoPlayer from "@/app/components/PropertyDetails/Video"
import SuggestedProperties from "@/app/components/PropertyDetails/Suggestedproperties"
import PropertyCTA from "@/app/components/PropertyDetails/property-cta"
import { BrochureCard } from "@/app/components/PropertyDetails/brochure-card"
import BuilderDetails from "../../components/PropertyDetails/AboutDeveloper"

export default function PropertyDetailsPage({ params }: { params: { PropertyId: string } }) {
  // Extract propertyId from params
  const propertyId = params.PropertyId

  return (
    <div>
      <PropertyOverview />
      <div className="min-h-screen bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-8"
        >
          <div className="space-y-12">
                 <MapComponent />
            <Amenities />
       
            <FloorPlanAndUnits />
            <Ratings />
            <VideoPlayer />
            <PriceTrends />
            <AboutLocality />
            <BrochureCard />

            {/* Project Details Component */}
            <ProjectDetails />

            {/* Builder Details Component */}
            <BuilderDetails  />

            <PropertyCTA />
            <SuggestedProperties />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
