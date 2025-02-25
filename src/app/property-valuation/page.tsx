"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const valuationFactors = [
  { 
    title: "Location", 
    content: "The location of a property plays a critical role in its valuation. This includes the quality of the neighborhood, the proximity to key amenities such as schools, shopping centers, parks, public transport, and the overall safety and appeal of the area. Properties in desirable locations typically hold higher value due to accessibility and lifestyle advantages." 
  },
  { 
    title: "Property Size", 
    content: "The size of a property is a key determinant in its value, which includes both the total square footage of the interior living space and the land area it sits on. Larger properties often offer more versatility for renovations, expansions, or outdoor space, and are generally valued higher compared to smaller ones. The overall layout, number of rooms, and floor plan also contribute to the valuation." 
  },
  { 
    title: "Age and Condition", 
    content: "The age of the property reflects how old the building is, which influences its overall appeal and the likelihood of needed repairs or renovations. Well-maintained older homes can sometimes hold higher value than newer properties if they have been upgraded with modern amenities. The current state of repair, including the condition of the roof, plumbing, electrical systems, and appliances, will significantly affect the market value." 
  },
  { 
    title: "Recent Sales", 
    content: "Recent sales of comparable properties (also known as 'comps') in the neighborhood provide a benchmark for valuing a property. By comparing the sale price of similar homes in terms of size, condition, and location, real estate professionals can determine a fair market value. These sales data help to identify market trends and potential price fluctuations." 
  },
  { 
    title: "Market Trends", 
    content: "The overall state of the real estate market influences property values. Factors such as interest rates, the supply and demand for housing, and economic conditions affect property prices. Additionally, market trends provide insight into whether property values are likely to rise or fall in the near future, allowing buyers and sellers to make informed decisions." 
  },
  { 
    title: "Unique Features", 
    content: "Unique features and amenities, such as a swimming pool, home theater, gourmet kitchen, or eco-friendly upgrades, can significantly enhance a property's value. Special characteristics like waterfront views, historical significance, or architecturally distinctive design elements can also make a property more desirable and thus more valuable in the eyes of buyers." 
  },
];


export default function PropertyValuationPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [formData, setFormData] = useState({ address: "", propertyType: "", bedrooms: "", bathrooms: "", squareFootage: "" });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("https://realestateapi-x9de.onrender.com/api/valuation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success("Thank you for submitting your property details. We will contact you with a valuation soon.");
      } else {
        toast.error("There was an error submitting your property details.");
      }
    } catch (error) {
      toast.error("Network error. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-12 bg-gray-50 rounded-lg shadow-lg">
      <ToastContainer />
      <div className="mb-16">
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/" className=" hover:underline">Home</Link> / <span className="text-red-600">Property Valuation</span>
        </nav>
        <h1 className="text-6xl font-black text-center text-gray-900 mb-8">Property Valuation</h1>
        <p className="text-lg text-center text-gray-600">Get an accurate estimate of your property's value with our professional valuation service. Understanding your property's worth is crucial for making informed real estate decisions.</p>
      </div>
      <div className="flex space-x-16 mb-16">
        <div className="w-1/3">
          <ul className="space-y-4">
            {valuationFactors.map((factor, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`cursor-pointer p-4 rounded-lg text-gray-900 font-medium shadow-sm transition-all duration-300 ${
                  activeIndex === index ? "bg-red-100 border-l-4 border-red-600 font-semibold" : "hover:bg-gray-100"
                }`}
                onClick={() => setActiveIndex(index)}
              >
                {index + 1}. {factor.title}
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="w-2/3 bg-white p-8 rounded-lg shadow-md">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-6 text-gray-900">{valuationFactors[activeIndex].title}</h2>
            <p className="text-gray-700 leading-relaxed text-lg tracking-wide">{valuationFactors[activeIndex].content}</p>
          </motion.div>
        </div>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">Request a Valuation</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="address" className="block text-lg font-medium text-gray-700">Property Address</label>
            <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your Property Address" required />
          </div>
          <div>
            <label htmlFor="propertyType" className="block text-lg font-medium text-gray-700">Property Type</label>
            <input type="text" id="propertyType" name="propertyType" value={formData.propertyType} onChange={handleInputChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Type of Property" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="bedrooms" className="block text-lg font-medium text-gray-700">Bedrooms</label>
              <input type="number" id="bedrooms" name="bedrooms" value={formData.bedrooms} onChange={handleInputChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label htmlFor="bathrooms" className="block text-lg font-medium text-gray-700">Bathrooms</label>
              <input type="number" id="bathrooms" name="bathrooms" value={formData.bathrooms} onChange={handleInputChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
          </div>
          <div>
            <label htmlFor="squareFootage" className="block text-lg font-medium text-gray-700">Square Footage</label>
            <input type="number" id="squareFootage" name="squareFootage" value={formData.squareFootage} onChange={handleInputChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div className="text-center">
            <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
              {loading ? "Submitting..." : "Request Valuation"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
