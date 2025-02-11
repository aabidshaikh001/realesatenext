export type PropertyTag = "Full-Furnished" | "Semi-Furnished" | "Unfurnished"
export type PropertyType = "Flat" | "House" | "Villa" | "Apartment"
export type ListingType = "BUY" | "RENT"

export interface SearchParams {
  location: string
  propertyTag: PropertyTag
  propertyType: PropertyType
  listingType: ListingType
}

