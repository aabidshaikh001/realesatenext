import PropertyGrid from "../components/PropertyGrid"


export default function PropertiesPage() {
  
  return (
    <main className="min-h-screen bg-gray-50">
     
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-extrabold mb-8">Our Properties</h1>
        <PropertyGrid />
      </div>
    </main>
  )
}

