'use client'
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  isSignedIn: boolean
  firstName?: string
  user?: any
  // Add other user properties as needed
}

const UserContext = createContext<User | null>(null)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Fetch user data from local storage, API, or other sources
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const isSignedIn = user?.isSignedIn || false

  return <UserContext.Provider value={{ isSignedIn, user }}>{children}</UserContext.Provider>
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === null) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

