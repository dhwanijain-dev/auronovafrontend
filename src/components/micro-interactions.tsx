"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Bell, Check, ChevronRight, Clock, Search, ThumbsUp, X, Users } from "lucide-react"
import confetti from "canvas-confetti"

// Food stall data
const foodStalls = [
  { id: 1, name: "Pizza Station", queueLength: 12, estimatedWait: 24, status: "busy" },
  { id: 2, name: "Burger Joint", queueLength: 5, estimatedWait: 10, status: "moderate" },
  { id: 3, name: "Salad Bar", queueLength: 3, estimatedWait: 6, status: "quiet" },
  { id: 4, name: "Pasta Corner", queueLength: 8, estimatedWait: 16, status: "moderate" },
  { id: 5, name: "Sushi Station", queueLength: 15, estimatedWait: 30, status: "busy" },
]

// Menu items
const menuItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    price: 8.99,
    stall: "Pizza Station",
    image: "/placeholder.svg?height=80&width=80",
  },
  { id: 2, name: "Pepperoni Pizza", price: 9.99, stall: "Pizza Station", image: "/placeholder.svg?height=80&width=80" },
  { id: 3, name: "Cheeseburger", price: 7.99, stall: "Burger Joint", image: "/placeholder.svg?height=80&width=80" },
  { id: 4, name: "Caesar Salad", price: 6.99, stall: "Salad Bar", image: "/placeholder.svg?height=80&width=80" },
  {
    id: 5,
    name: "Spaghetti Bolognese",
    price: 8.49,
    stall: "Pasta Corner",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 6,
    name: "California Roll",
    price: 10.99,
    stall: "Sushi Station",
    image: "/placeholder.svg?height=80&width=80",
  },
]

// Get status color
const getStatusColor = (status) => {
  switch (status) {
    case "busy":
      return "bg-red-500"
    case "moderate":
      return "bg-amber-500"
    case "quiet":
      return "bg-green-500"
    default:
      return "bg-gray-500"
  }
}

// Get status text color
const getStatusTextColor = (status) => {
  switch (status) {
    case "busy":
      return "text-red-500"
    case "moderate":
      return "text-amber-500"
    case "quiet":
      return "text-green-500"
    default:
      return "text-gray-500"
  }
}

// Get status background color
const getStatusBgColor = (status) => {
  switch (status) {
    case "busy":
      return "bg-red-500/10"
    case "moderate":
      return "bg-amber-500/10"
    case "quiet":
      return "bg-green-500/10"
    default:
      return "bg-gray-500/10"
  }
}

export default function MicroInteractions() {
  const [searchQuery, setSearchQuery] = useState("")
  const [notifications, setNotifications] = useState(true)
  const [showOrderSuccess, setShowOrderSuccess] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  // Filter menu items based on search query
  const filteredItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.stall.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Handle pre-order
  const handlePreOrder = () => {
    setShowOrderSuccess(true)

    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowOrderSuccess(false)
      setSelectedItem(null)
    }, 3000)
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="text-2xl font-bold mb-2">Micro-Interactions & AI-Powered UX</h2>
        <p className="text-gray-300">
          Experience smooth animations and micro-interactions that enhance the user experience. Hover over elements,
          click buttons, and see the interface respond with delightful animations.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-purple-600 to-pink-600"></div>
          <CardHeader>
            <CardTitle>Quick Order</CardTitle>
            <CardDescription className="text-gray-300">Pre-order your food to skip the queue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search for food or stall..."
                className="pl-10 bg-black/20 border-gray-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4 text-gray-400 hover:text-white" />
                </motion.button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-lg border border-gray-700 cursor-pointer ${
                      selectedItem?.id === item.id ? "bg-purple-900/30 border-purple-500/30" : "bg-black/20"
                    }`}
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="flex gap-3">
                      <div className="h-16 w-16 rounded-md overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-400">{item.stall}</p>
                        <div className="flex items-center justify-between mt-2">
                          <p className="font-bold">${item.price.toFixed(2)}</p>
                          <Badge className={getStatusBgColor(foodStalls.find((s) => s.name === item.stall)?.status)}>
                            <span
                              className={`h-2 w-2 rounded-full ${getStatusColor(foodStalls.find((s) => s.name === item.stall)?.status)} mr-1`}
                            ></span>
                            <span className={getStatusTextColor(foodStalls.find((s) => s.name === item.stall)?.status)}>
                              {foodStalls.find((s) => s.name === item.stall)?.queueLength} in queue
                            </span>
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredItems.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full p-8 text-center text-gray-400"
                >
                  No items found matching "{searchQuery}"
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Current Queue Status</CardTitle>
                  <CardDescription className="text-gray-300">Real-time updates with micro-animations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {foodStalls.map((stall, index) => (
                      <motion.div
                        key={stall.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-3 rounded-lg ${getStatusBgColor(stall.status)} border border-gray-700`}
                      >
                        <div className="flex justify-between items-center flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <motion.div
                              className={`h-3 w-3 rounded-full ${getStatusColor(stall.status)}`}
                              animate={{
                                scale: [1, 1.2, 1],
                                opacity: [1, 0.8, 1],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "reverse",
                              }}
                            />
                            <h3 className="font-medium">{stall.name}</h3>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 text-sm">
                              <Users className="h-4 w-4" />
                              <span>{stall.queueLength}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <Clock className="h-4 w-4" />
                              <span>{stall.estimatedWait} min</span>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="h-8 w-8 rounded-full bg-purple-900/50 flex items-center justify-center"
                            >
                              <ChevronRight className="h-4 w-4" />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Order Details</CardTitle>
                  <CardDescription className="text-gray-300">
                    {selectedItem ? "Review your selection" : "Select an item to order"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedItem ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="flex gap-4 mb-4">
                        <div className="h-20 w-20 rounded-md overflow-hidden">
                          <img
                            src={selectedItem.image || "/placeholder.svg"}
                            alt={selectedItem.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">{selectedItem.name}</h3>
                          <p className="text-sm text-gray-400">{selectedItem.stall}</p>
                          <p className="font-bold mt-1">${selectedItem.price.toFixed(2)}</p>
                        </div>
                      </div>

                      <div className="space-y-4 mb-4">
                        <div>
                          <Label htmlFor="pickup-time" className="text-sm">
                            Pickup Time
                          </Label>
                          <div className="grid grid-cols-3 gap-2 mt-1">
                            {["10:30 AM", "11:00 AM", "11:30 AM"].map((time) => (
                              <motion.button
                                key={time}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2 text-sm rounded-md bg-purple-900/30 border border-purple-500/30 hover:bg-purple-800/50"
                              >
                                {time}
                              </motion.button>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Bell className="h-4 w-4" />
                            <Label htmlFor="notifications" className="text-sm">
                              Notifications
                            </Label>
                          </div>
                          <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-purple-900/20 border border-purple-500/20 mb-4">
                        <h4 className="font-medium mb-1 flex items-center gap-2">
                          <ThumbsUp className="h-4 w-4 text-purple-400" />
                          AI Suggestion
                        </h4>
                        <p className="text-sm">
                          Order now and pick up at 11:00 AM to avoid the lunch rush and save 5 minutes of waiting time!
                        </p>
                      </div>

                      <Button
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        onClick={handlePreOrder}
                      >
                        Pre-order Now
                      </Button>
                    </motion.div>
                  ) : (
                    <div className="text-center py-12 text-gray-400">
                      <motion.div
                        animate={{
                          y: [0, -10, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                        }}
                        className="mb-4"
                      >
                        <Search className="h-12 w-12 mx-auto text-gray-500 opacity-50" />
                      </motion.div>
                      <p>Select an item from the menu to place an order</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6"
        >
          <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Interactive Elements</CardTitle>
              <CardDescription className="text-gray-300">Try hovering and clicking on these elements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full p-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 font-medium"
              >
                Hover & Click Me
              </motion.button>

              <div className="grid grid-cols-3 gap-3">
                {["#8b5cf6", "#ec4899", "#06b6d4"].map((color, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="aspect-square rounded-lg"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              <div className="p-3 rounded-lg border border-gray-700 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <h4 className="font-medium mb-1">Hover over this card</h4>
                <p className="text-sm text-gray-400">See the subtle background animation</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Order Success Notification */}
      <AnimatePresence>
        {showOrderSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 max-w-md"
          >
            <Card className="bg-green-900/90 border-green-500/30 backdrop-blur-sm overflow-hidden">
              <div className="h-1 w-full bg-green-500"></div>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-medium text-green-300">Order Successful!</h3>
                  <p className="text-sm text-green-300/80">Your order has been placed. Pick up at 11:00 AM.</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

