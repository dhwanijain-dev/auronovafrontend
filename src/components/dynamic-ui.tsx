"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Clock, Users, Utensils, X } from "lucide-react"

// Mock data for cafeteria stalls
const cafeteriaStalls = [
  {
    id: 1,
    name: "Pizza Station",
    queueLength: 12,
    estimatedWait: 24,
    menuItems: ["Margherita", "Pepperoni", "Vegetarian"],
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Burger Joint",
    queueLength: 5,
    estimatedWait: 10,
    menuItems: ["Cheeseburger", "Veggie Burger", "Chicken Burger"],
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Salad Bar",
    queueLength: 3,
    estimatedWait: 6,
    menuItems: ["Caesar Salad", "Greek Salad", "Garden Salad"],
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Pasta Corner",
    queueLength: 8,
    estimatedWait: 16,
    menuItems: ["Spaghetti", "Fettuccine", "Penne Arrabiata"],
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 5,
    name: "Sushi Station",
    queueLength: 15,
    estimatedWait: 30,
    menuItems: ["California Roll", "Salmon Nigiri", "Vegetable Roll"],
    image: "/placeholder.svg?height=100&width=100",
  },
]

// Function to determine UI theme based on queue length
const getThemeColors = (queueLength) => {
  if (queueLength >= 10) {
    return {
      primary: "from-red-600 to-red-800",
      secondary: "bg-red-900/20",
      border: "border-red-500/30",
      text: "text-red-400",
      button: "bg-red-600 hover:bg-red-700",
      badge: "bg-red-600",
    }
  } else if (queueLength >= 5) {
    return {
      primary: "from-amber-600 to-amber-800",
      secondary: "bg-amber-900/20",
      border: "border-amber-500/30",
      text: "text-amber-400",
      button: "bg-amber-600 hover:bg-amber-700",
      badge: "bg-amber-600",
    }
  } else {
    return {
      primary: "from-green-600 to-green-800",
      secondary: "bg-green-900/20",
      border: "border-green-500/30",
      text: "text-green-400",
      button: "bg-green-600 hover:bg-green-700",
      badge: "bg-green-600",
    }
  }
}

export default function DynamicUI() {
  const [selectedStall, setSelectedStall] = useState(null)
  const [notification, setNotification] = useState(null)
  const [isPeakHours, setIsPeakHours] = useState(true)

  // Simulate peak hours toggle
  useEffect(() => {
    const interval = setInterval(() => {
      setIsPeakHours((prev) => !prev)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Show notification when peak hours change
  useEffect(() => {
    if (isPeakHours) {
      setNotification({
        message: "Peak hours detected! Consider visiting later.",
        type: "warning",
      })
    } else {
      setNotification({
        message: "Queue levels are low! Great time to visit.",
        type: "success",
      })
    }

    const timer = setTimeout(() => {
      setNotification(null)
    }, 4000)

    return () => clearTimeout(timer)
  }, [isPeakHours])

  // Get theme colors based on peak hours
  const getGlobalTheme = () => {
    return isPeakHours ? "from-red-900/50 to-purple-900/50" : "from-green-900/50 to-blue-900/50"
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="text-2xl font-bold mb-2">AI-Powered Dynamic UI</h2>
        <p className="text-gray-300">
          The UI adapts based on queue conditions. During peak hours, the interface shifts to red tones. During
          low-traffic periods, it uses calming green/blue colors.
        </p>
      </motion.div>

      <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-br ${getGlobalTheme()} backdrop-blur-lg border border-purple-500/20">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Cafeteria Status</h3>
          <Badge className={isPeakHours ? "bg-red-600" : "bg-green-600"}>
            {isPeakHours ? "Peak Hours" : "Low Traffic"}
          </Badge>
        </div>

        {/* Notification */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mb-6 p-3 rounded-lg flex items-center justify-between ${
                notification.type === "warning"
                  ? "bg-red-900/30 border border-red-500/30"
                  : "bg-green-900/30 border border-green-500/30"
              }`}
            >
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                <span>{notification.message}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setNotification(null)} className="h-6 w-6">
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cafeteriaStalls.map((stall) => {
            const theme = getThemeColors(stall.queueLength)

            return (
              <motion.div
                key={stall.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedStall(stall)}
                className="cursor-pointer"
              >
                <Card className={`overflow-hidden ${theme.secondary} ${theme.border} backdrop-blur-sm`}>
                  <div className={`h-2 w-full bg-gradient-to-r ${theme.primary}`}></div>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex justify-between items-center flex-wrap gap-2">
                      <span>{stall.name}</span>
                      <Badge className={theme.badge}>{stall.queueLength} in queue</Badge>
                    </CardTitle>
                    <CardDescription className={theme.text}>Estimated wait: {stall.estimatedWait} mins</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-md overflow-hidden">
                        <img
                          src={stall.image || "/placeholder.svg"}
                          alt={stall.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Today's Specials:</h4>
                        <ul className="text-sm space-y-1">
                          {stall.menuItems.map((item, i) => (
                            <li key={i} className="flex items-center gap-1">
                              <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className={`w-full ${theme.button}`}>View Details</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Selected stall details */}
      <AnimatePresence>
        {selectedStall && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedStall(null)}
          >
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              exit={{ y: 50 }}
              className="w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const theme = getThemeColors(selectedStall.queueLength)

                return (
                  <Card className={`overflow-hidden ${theme.secondary} ${theme.border} backdrop-blur-sm`}>
                    <div className={`h-2 w-full bg-gradient-to-r ${theme.primary}`}></div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{selectedStall.name}</CardTitle>
                          <CardDescription className={theme.text}>Detailed Information</CardDescription>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setSelectedStall(null)} className="h-8 w-8">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${theme.secondary}`}>
                          <Users className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Current Queue</p>
                          <p className={`font-bold ${theme.text}`}>{selectedStall.queueLength} people</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${theme.secondary}`}>
                          <Clock className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Estimated Wait Time</p>
                          <p className={`font-bold ${theme.text}`}>{selectedStall.estimatedWait} minutes</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${theme.secondary}`}>
                          <Utensils className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Today's Menu</p>
                          <ul className="mt-1 space-y-1">
                            {selectedStall.menuItems.map((item, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-2"
                              >
                                <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                                {item}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-4 p-3 rounded-lg bg-purple-900/30 border border-purple-500/30">
                        <h4 className="font-medium mb-1">AI Recommendation</h4>
                        <p className="text-sm">
                          {selectedStall.queueLength > 10
                            ? "The queue is currently long. Consider visiting after 2:00 PM for shorter wait times."
                            : selectedStall.queueLength > 5
                              ? "Moderate queue detected. Wait time is reasonable but you might want to pre-order."
                              : "Great time to visit! The queue is short and you'll be served quickly."}
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button className={`flex-1 ${theme.button}`}>Join Queue</Button>
                      <Button variant="outline" className="flex-1">
                        Pre-order
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

