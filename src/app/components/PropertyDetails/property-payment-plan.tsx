"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { AlertCircle, Calendar,  CheckCircle2, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FaIndianRupeeSign } from "react-icons/fa6";

interface PaymentPlan {
  payment: string
  milestone: string
}

interface PropertyPaymentPlanProps {
  propertyId: string
}

export default function PropertyPaymentPlan({ propertyId }: PropertyPaymentPlanProps) {
  const [paymentPlanData, setPaymentPlanData] = useState<PaymentPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPaymentPlanData = async () => {
      try {
        const response = await fetch(`https://api.realestatecompany.co.in/api/paymentplan/${propertyId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch payment plan data")
        }
        const data = await response.json()
        setPaymentPlanData(data)
      } catch (err) {
        console.error("Error loading payment plan data:", err)
        setError(`Failed to load payment plan data: ${err instanceof Error ? err.message : String(err)}`)
      } finally {
        setLoading(false)
      }
    }

    fetchPaymentPlanData()
  }, [propertyId])

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
      <Card className="border-0 shadow-xl rounded-2xl overflow-hidden bg-white">
        <CardHeader className="py-6 px-8 border-b border-gray-100 bg-gradient-to-r from-white to-red-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Payment Schedule</h3>
              <p className="text-gray-500 text-sm mt-1">Flexible payment options for your convenience</p>
            </div>
            <Badge variant="outline" className="bg-white text-red-600 border-red-200 px-3 py-1.5">
              <FaIndianRupeeSign className="w-3.5 h-3.5 mr-1" />
              Payment Plan
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-10 h-10 border-4 border-red-100 border-t-red-600 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-500">Loading payment schedule...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-6 rounded-xl text-center my-4 border border-red-100">
              <AlertCircle className="h-10 w-10 mx-auto mb-2" />
              <p className="font-medium">{error}</p>
              <Button
                variant="outline"
                className="mt-4 border-red-200 text-red-600 hover:bg-red-50"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          ) : paymentPlanData.length > 0 ? (
            <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
              <div className="grid grid-cols-5 bg-gradient-to-r from-red-600 to-red-500 text-white p-5">
                <div className="col-span-1 font-semibold text-white flex items-center">
                  <FaIndianRupeeSign className="w-4 h-4 mr-1.5" />
                  Payment %
                </div>
                <div className="col-span-4 font-semibold text-white flex items-center">
                  <Calendar className="w-4 h-4 mr-1.5" />
                  Milestone
                </div>
              </div>

              {paymentPlanData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`grid grid-cols-5 p-5 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } border-t border-gray-200 hover:bg-red-50 transition-colors duration-200`}
                >
                  <div className="col-span-1 font-bold text-red-600 flex items-center">
                    <div className="bg-red-100 text-red-600 rounded-lg px-3 py-1.5 inline-flex items-center">
                      {item.payment}
                    </div>
                  </div>
                  <div className="col-span-4 text-gray-700 flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" />
                    <span>{item.milestone}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-16 bg-gray-50 rounded-xl border border-gray-100">
              <FaIndianRupeeSign className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="font-medium text-gray-600 mb-1">No Payment Plan Available</p>
              <p className="text-sm text-gray-500">Payment details for this property have not been specified</p>
            </div>
          )}

          {!loading && !error && paymentPlanData.length > 0 && (
            <div className="mt-6 bg-gray-50 border border-gray-100 rounded-xl p-4 flex items-start">
              <Info className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600">
                Payment schedules are subject to change. Please contact our sales team for the most up-to-date
                information and to discuss customized payment options that may be available for your situation.
              </p>
            </div>
          )}
        </CardContent>

        {!loading && !error && paymentPlanData.length > 0 && (
          <CardFooter className="px-8 py-5 border-t border-gray-100 bg-gray-50 flex justify-center">
            <Button className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 h-11 rounded-full transition-all">
              Request Payment Consultation
            </Button>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  )
}
