"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface CTAFormProps {
  defaultService: string
}

export function CTAForm({ defaultService }: CTAFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [personalNumber, setPersonalNumber] = useState('')
  const [whatsappNumber, setWhatsappNumber] = useState('')
  const [usePersonalForWhatsapp, setUsePersonalForWhatsapp] = useState(false)
  const [selectedService, setSelectedService] = useState(defaultService)

  const handlePersonalNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPersonalNumber(value)
    if (usePersonalForWhatsapp) {
      setWhatsappNumber(value)
    }
  }

  const handleCheckboxChange = (checked: boolean) => {
    setUsePersonalForWhatsapp(checked)
    if (checked) {
      setWhatsappNumber(personalNumber)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', { name, email, personalNumber, whatsappNumber, selectedService })
    // Reset form fields
    setName('')
    setEmail('')
    setPersonalNumber('')
    setWhatsappNumber('')
    setUsePersonalForWhatsapp(false)
    setSelectedService(defaultService)
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-8 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold mb-6 text-primary">Get a Free Consultation</h3>
      <div>
        <Label htmlFor="name" className="text-sm font-medium">Name</Label>
        <Input 
          id="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="email" className="text-sm font-medium">Email</Label>
        <Input 
          id="email" 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          className="mt-1"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="personal-number" className="text-sm font-medium">Personal Number</Label>
          <Input
            id="personal-number"
            type="tel"
            placeholder="Your Phone Number"
            value={personalNumber}
            onChange={handlePersonalNumberChange}
            required
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="whatsapp-number" className="text-sm font-medium">WhatsApp Number</Label>
          <Input
            id="whatsapp-number"
            type="tel"
            placeholder="Your WhatsApp Number"
            value={usePersonalForWhatsapp ? personalNumber : whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            disabled={usePersonalForWhatsapp}
            required
            className="mt-1"
          />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="use-personal-for-whatsapp"
          checked={usePersonalForWhatsapp}
          onCheckedChange={handleCheckboxChange}
        />
        <Label htmlFor="use-personal-for-whatsapp" className="text-sm">Use personal number for WhatsApp</Label>
      </div>
      <div>
        <Label htmlFor="service" className="text-sm font-medium">Service</Label>
        <Select value={selectedService} onValueChange={setSelectedService}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Sell For Owner">Sell For Owner</SelectItem>
            <SelectItem value="Sell For Builder">Sell For Builder</SelectItem>
            <SelectItem value="Sell For Agent">Sell For Agent</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full">Submit</Button>
    </motion.form>
  )
}
