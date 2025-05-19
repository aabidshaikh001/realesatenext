"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

interface PropertyFilterProps {
  currentTab: "rent" | "buy"
  setCurrentTab: (tab: "rent" | "buy") => void
}

export function PropertyFilter({ currentTab, setCurrentTab }: PropertyFilterProps) {
  const [priceRange, setPriceRange] = useState([200, 2500])
  const [areaRange, setAreaRange] = useState([1000, 10000])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])

  const amenities = [
    "Swimming Pool",
    "Garden",
    "Gym",
    "Parking",
    "Security",
    "Elevator",
    "Balcony",
    "Air Conditioning",
    "Furnished",
    "Pet Friendly",
    "Sea View",
    "Mountain View",
    "Smart Home",
    "Wine Cellar",
    "Home Theater",
  ]

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities((prev) => (prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]))
  }

  const clearFilters = () => {
    setPriceRange([200, 2500])
    setAreaRange([1000, 10000])
    setSelectedAmenities([])
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 luxury-card">
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <span className="text-rose-600 uppercase tracking-wider text-sm font-semibold">Property Type</span>
        </div>
        <h3 className="text-lg font-semibold mb-4">Select Category</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={currentTab === "buy" ? "default" : "outline"}
            onClick={() => setCurrentTab("buy")}
            className={
              currentTab === "buy"
                ? "bg-rose-600 hover:bg-rose-700 text-white"
                : "border-rose-200 text-rose-700 hover:bg-rose-50"
            }
          >
            Buy
          </Button>
          <Button
            variant={currentTab === "rent" ? "default" : "outline"}
            onClick={() => setCurrentTab("rent")}
            className={
              currentTab === "rent"
                ? "bg-rose-600 hover:bg-rose-700 text-white"
                : "border-rose-200 text-rose-700 hover:bg-rose-50"
            }
          >
            Rent
          </Button>
        </div>
      </div>

      <Accordion type="single" collapsible defaultValue="price" className="w-full">
        <AccordionItem value="price">
          <AccordionTrigger className="text-lg font-semibold text-gray-900">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                value={priceRange}
                min={200}
                max={2500}
                step={100}
                onValueChange={setPriceRange}
                className="my-6"
              />
              <div className="flex justify-between items-center">
                <div className="w-[45%]">
                  <Label htmlFor="min-price">Min (Crore)</Label>
                  <Input
                    id="min-price"
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
                    className="mt-1 border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                  />
                </div>
                <div className="w-[45%]">
                  <Label htmlFor="max-price">Max (Crore)</Label>
                  <Input
                    id="max-price"
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                    className="mt-1 border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="location">
          <AccordionTrigger className="text-lg font-semibold text-gray-900">Location</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Select>
                <SelectTrigger className="border-rose-200 focus:ring-rose-400">
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mumbai">Mumbai</SelectItem>
                  <SelectItem value="delhi">Delhi</SelectItem>
                  <SelectItem value="bangalore">Bangalore</SelectItem>
                  <SelectItem value="pune">Pune</SelectItem>
                  <SelectItem value="hyderabad">Hyderabad</SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder="Enter locality, landmark or project"
                className="border-rose-200 focus:border-rose-400 focus:ring-rose-400"
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="property-type">
          <AccordionTrigger className="text-lg font-semibold text-gray-900">Property Type</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="justify-start border-rose-200 text-rose-700 hover:bg-rose-50">
                Apartment
              </Button>
              <Button variant="outline" className="justify-start border-rose-200 text-rose-700 hover:bg-rose-50">
                Villa
              </Button>
              <Button variant="outline" className="justify-start border-rose-200 text-rose-700 hover:bg-rose-50">
                Penthouse
              </Button>
              <Button variant="outline" className="justify-start border-rose-200 text-rose-700 hover:bg-rose-50">
                Bungalow
              </Button>
              <Button variant="outline" className="justify-start border-rose-200 text-rose-700 hover:bg-rose-50">
                Farmhouse
              </Button>
              <Button variant="outline" className="justify-start border-rose-200 text-rose-700 hover:bg-rose-50">
                Mansion
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="bedrooms">
          <AccordionTrigger className="text-lg font-semibold text-gray-900">Bedrooms</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="border-rose-200 text-rose-700 hover:bg-rose-50">
                1+
              </Button>
              <Button variant="outline" className="border-rose-200 text-rose-700 hover:bg-rose-50">
                2+
              </Button>
              <Button variant="outline" className="border-rose-200 text-rose-700 hover:bg-rose-50">
                3+
              </Button>
              <Button variant="outline" className="border-rose-200 text-rose-700 hover:bg-rose-50">
                4+
              </Button>
              <Button variant="outline" className="border-rose-200 text-rose-700 hover:bg-rose-50">
                5+
              </Button>
              <Button variant="outline" className="border-rose-200 text-rose-700 hover:bg-rose-50">
                6+
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="area">
          <AccordionTrigger className="text-lg font-semibold text-gray-900">Area (sq.ft.)</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                value={areaRange}
                min={1000}
                max={10000}
                step={500}
                onValueChange={setAreaRange}
                className="my-6"
              />
              <div className="flex justify-between items-center">
                <div className="w-[45%]">
                  <Label htmlFor="min-area">Min</Label>
                  <Input
                    id="min-area"
                    type="number"
                    value={areaRange[0]}
                    onChange={(e) => setAreaRange([Number.parseInt(e.target.value), areaRange[1]])}
                    className="mt-1 border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                  />
                </div>
                <div className="w-[45%]">
                  <Label htmlFor="max-area">Max</Label>
                  <Input
                    id="max-area"
                    type="number"
                    value={areaRange[1]}
                    onChange={(e) => setAreaRange([areaRange[0], Number.parseInt(e.target.value)])}
                    className="mt-1 border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="amenities">
          <AccordionTrigger className="text-lg font-semibold text-gray-900">Amenities</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {selectedAmenities.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {selectedAmenities.map((amenity) => (
                    <Badge
                      key={amenity}
                      variant="secondary"
                      className="flex items-center gap-1 bg-rose-100 text-rose-700"
                    >
                      {amenity}
                      <button onClick={() => handleAmenityToggle(amenity)} className="ml-1 text-xs hover:text-rose-500">
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                {amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      id={`amenity-${amenity}`}
                      checked={selectedAmenities.includes(amenity)}
                      onCheckedChange={() => handleAmenityToggle(amenity)}
                    />
                    <Label htmlFor={`amenity-${amenity}`} className="text-sm font-normal">
                      {amenity}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-6 flex gap-2">
        <Button className="flex-1 bg-rose-600 hover:bg-rose-700 text-white shadow-md hover:shadow-lg transition-all duration-300">
          Apply Filters
        </Button>
        <Button
          variant="outline"
          onClick={clearFilters}
          className="flex-1 border-rose-200 text-rose-700 hover:bg-rose-50"
        >
          Clear All
        </Button>
      </div>
    </div>
  )
}
