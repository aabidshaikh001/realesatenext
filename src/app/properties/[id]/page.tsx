"use client";

import { motion } from "framer-motion";
import PropertyOverview from "../../components/PropertyDetails/PropertyOverview";
import Amenities from "../../components/PropertyDetails/Amenities";
import AboutProject from "../../components/PropertyDetails/AboutProject";
import FloorPlanAndUnits from "../../components/PropertyDetails/FloorPlanAndUnits";
import {Ratings} from "../../components/PropertyDetails/ratings";
import AboutLocality from "../../components/PropertyDetails/AboutLocality";
import PriceTrends from "../../components/PropertyDetails/PriceTrends";
import ProjectDetails from "../../components/PropertyDetails/ProjectDetails";
import AboutDeveloper from "../../components/PropertyDetails/AboutDeveloper";
import MapComponent from "@/app/components/PropertyDetails/map";
import VideoPlayer from "@/app/components/PropertyDetails/Video";
import SuggestedProperties from "@/app/components/PropertyDetails/Suggestedproperties";
import PropertyCTA from "@/app/components/PropertyDetails/property-cta";
import { BrochureCard } from "@/app/components/PropertyDetails/brochure-card";
// import PropertyPaymentPlan from "../../components/PropertyDetails/property-payment-plan";

export default function PropertyDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div ><PropertyOverview id={params.id} />
    <div className="min-h-screen bg-white">
       
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
       
        <div className="space-y-12">
          
          <Amenities  />
          
          <MapComponent />
          <FloorPlanAndUnits />
        
           <Ratings propertyId={params.id} />
            <VideoPlayer/>
             <PriceTrends />
          <AboutLocality />
          <BrochureCard propertyId={params.id} />
         
         <AboutProject />
          <ProjectDetails />
          <AboutDeveloper />
          <PropertyCTA propertyId={params.id} />
          
          {/* <PropertyPaymentPlan propertyId={params.id} /> */}
          <SuggestedProperties/>
        </div>
      </motion.div>
    </div>
    </div>
  );
}
