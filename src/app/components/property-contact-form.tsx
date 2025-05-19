"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface PropertyContactFormProps {
  id: string | null
  onClose: () => void
}

export function PropertyContactForm({ id, onClose }: PropertyContactFormProps) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    consent: false,
    isSubmitting: false,
    isSubmitted: false,
    error: null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormState((prev) => ({ ...prev, consent: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setFormState((prev) => ({ ...prev, isSubmitting: true, error: null }))

    // Simulate API call
    try {
      // In a real app, you would send this data to your backend
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setFormState((prev) => ({
        ...prev,
        isSubmitting: false,
        isSubmitted: true,
      }))
    } catch (error) {
     console.error("Error submitting form:", error)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Contact About Property</h2>
              <div className="w-16 h-1 bg-rose-600 rounded-full mt-1"></div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {formState.isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-rose-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
              <p className="text-gray-600 mb-6">
                Your inquiry has been submitted successfully. Our luxury property expert will contact you shortly.
              </p>
              <Button onClick={onClose} className="bg-rose-600 hover:bg-rose-700 text-white">
                Close
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-gray-600 mb-4">Property ID: {id}</p>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="John Smith"
                  required
                  className="border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formState.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  required
                  className="border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Your Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="I'm interested in this property and would like to schedule a viewing..."
                  rows={4}
                  required
                  className="border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                />
              </div>

              <div className="flex items-start space-x-2 pt-2">
                <Checkbox id="consent" checked={formState.consent} onCheckedChange={handleCheckboxChange} required />
                <Label htmlFor="consent" className="text-sm font-normal">
                  I consent to receiving communications about this and other properties. I understand I can unsubscribe
                  at any time.
                </Label>
              </div>

              {formState.error && (
                <div className="bg-rose-50 text-rose-600 p-3 rounded-md text-sm">{formState.error}</div>
              )}

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
                  disabled={formState.isSubmitting || !formState.consent}
                >
                  {formState.isSubmitting ? "Submitting..." : "Send Inquiry"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
