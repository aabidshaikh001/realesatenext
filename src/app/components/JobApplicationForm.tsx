"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { FaTimes } from "react-icons/fa"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface JobApplicationFormProps {
  jobTitle: string
  onClose: () => void
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({ jobTitle, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: null as File | null,
    coverLetter: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prevState) => ({
        ...prevState,
        resume: e.target.files![0],
      }));
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.resume) {
      toast.error("Please upload a resume.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("coverLetter", formData.coverLetter);
      formDataToSend.append("jobTitle", jobTitle);
      formDataToSend.append("resume", formData.resume); // File upload

      const response = await fetch("https://api.realestatecompany.co.in/api/jobform/apply", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Application submitted successfully!");
        setMessage("Application submitted successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          resume: null,
          coverLetter: "",
        });
      } else {
        toast.error(result.error || "Failed to submit application.");
      }
    } catch (error) {
      toast.error("Error submitting application.");
    }

    setIsSubmitting(false);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="p-6">
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Apply for {jobTitle}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <FaTimes />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-6">
            {" "}
            {/* Added padding to the form */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
                Resume
              </label>
              <input
                type="file"
                id="resume"
                name="resume"
                accept=".pdf,.doc,.docx"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                onChange={handleFileChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
                Cover Letter
              </label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={formData.coverLetter}
                onChange={handleInputChange}
              ></textarea>
            </div>
            {message && <p className="text-red-500 text-sm mb-4">{message}</p>}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-red-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-red-700 transition-colors duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default JobApplicationForm

