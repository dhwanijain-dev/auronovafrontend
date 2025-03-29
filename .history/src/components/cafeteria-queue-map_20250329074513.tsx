"use client"

import { useState, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Text, Html, Environment } from "@react-three/drei"
import { Vector3 } from "three"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Queue data for different food stalls
const queueData = [
  {
    id: 1,
    name: "Pizza Station",
    queueLength: 12,
    position: [-3, 0, 2],
    menuItems: ["Margherita", "Pepperoni", "Vegetarian"],
  },
  {
    id: 2,
    name: "Burger Joint",
    queueLength: 5,
    position: [0, 0, 2],
    menuItems: ["Cheeseburger", "Veggie Burger", "Chicken Burger"],
  },
  {
    id: 3,
    name: "Salad Bar",
    queueLength: 3,
    position: [3, 0, 2],
    menuItems: ["Caesar Salad", "Greek Salad", "Garden Salad"],
  },
  {
    id: 4,
    name: "Pasta Corner",
    queueLength: 8,
    position: [-3, 0, -2],
    menuItems: ["Spaghetti", "Fettuccine", "Penne Arrabiata"],
  },
  {
    id: 5,
    name: "Sushi Station",
    queueLength: 15,
    position: [3, 0, -2],
    menuItems: ["California Roll", "Salmon Nigiri", "Vegetable Roll"],
  },
]

// Person in queue component
function Person({ position, queueLength }) {
  const color = queueLength > 10 ? "#ef4444" : queueLength > 5 ? "#f59e0b" : "#22c55e"

  return (
    <mesh position={position}>
      <boxGeometry args={[0.3, 0.8, 0.3]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

// Food stall component
function FoodStall({ stall, setSelectedStall }) {
  const { name, queueLength, position, menuItems } = stall
  const color = queueLength > 10 ? "#ef4444" : queueLength > 5 ? "#f59e0b" : "#22c55e"
  const [hovered, setHovered] = useState(false)

  // Generate queue of people
  const queue = []
  for (let i = 0; i < queueLength; i++) {
    const offset = i * 0.4
    queue.push(
      <Person key={i} position={[position[0], position[1], position[2] + offset + 1]} queueLength={queueLength} />,
    )
  }

  return (
    <group>
      {/* Food stall counter */}
      <mesh
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setSelectedStall(stall)}
      >
        <boxGeometry args={[2, 1, 1]} />
        <meshStandardMaterial color="#1e293b" />

        {/* Stall name */}
        <Text position={[0, 0.6, 0]} fontSize={0.2} color="white" anchorX="center" anchorY="middle">
          {name}
        </Text>

        {/* Wait time popup on hover */}
        {hovered && (
          <Html position={[0, 1.5, 0]} center>
            <div className="bg-black/80 text-white p-2 rounded-md text-sm whitespace-nowrap">
              Est. wait: {queueLength * 2} mins
            </div>
          </Html>
        )}
      </mesh>

      {/* Queue of people */}
      {queue}

      {/* Queue length indicator */}
      <mesh position={[position[0], position[1] + 0.1, position[2] - 0.6]}>
        <planeGeometry args={[1.8, 0.3]} />
        <meshBasicMaterial color={color} />
        <Text position={[0, 0, 0.1]} fontSize={0.15} color="white" anchorX="center" anchorY="middle">
          {`Queue: ${queueLength} people`}
        </Text>
      </mesh>
    </group>
  )
}

// Auto-focus camera on high queue zones
function CameraController({ stalls }) {
  const { camera } = useThree()
  const longestQueue = useRef(null)

  // Find stall with longest queue
  useFrame(() => {
    const maxQueue = Math.max(...stalls.map((s) => s.queueLength))
    const busyStall = stalls.find((s) => s.queueLength === maxQueue)

    if (busyStall && longestQueue.current !== busyStall.id) {
      longestQueue.current = busyStall.id

      // Smoothly move camera to focus on the busiest stall
      const targetPosition = new Vector3(busyStall.position[0], busyStall.position[1] + 5, busyStall.position[2] + 5)

      camera.position.lerp(targetPosition, 0.01)
    }
  })

  return null
}

// Floor component
function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#0f172a" />
    </mesh>
  )
}

export default function CafeteriaQueueMap() {
  const [selectedStall, setSelectedStall] = useState(null)

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4"
      >
        <h2 className="text-2xl font-bold mb-2">3D Interactive Cafeteria Queue Map</h2>
        <p className="text-gray-300">
          Explore the cafeteria in 3D. Green indicates short queues, yellow for medium, and red for long queues. Click
          on any food stall to see its current menu.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-black/20 rounded-xl overflow-hidden h-[400px] md:h-[500px] lg:h-[600px]">
          <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Environment preset="city" />

            <Floor />

            {queueData.map((stall) => (
              <FoodStall key={stall.id} stall={stall} setSelectedStall={setSelectedStall} />
            ))}

            <CameraController stalls={queueData} />
"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CafeteriaQueueMap from "@/components/cafeteria-queue-map"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react"
import { Dashboard } from "@/components/DashBoard"
import BookingForm from "../components/booking-form"
import SeatSelection from "../components/seat-selection"

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [step, setStep] = useState<"booking" | "seats" | "payment">("booking")
  const [bookingData, setBookingData] = useState({
    name: "ajsdflka",
    restaurant: "asldfkjd",
    items: [] as { name: string; price: number; quantity: number }[],
    seats: [] as number[],
  })

  const handleBookingSubmit = (data: {
    name: string
    restaurant: string
    items: { name: string; price: number; quantity: number }[]
  }) => {
    setBookingData({ ...bookingData, ...data })
    setStep("seats")
  }

  const handleSeatSubmit = (seats: number[]) => {
    setBookingData({ ...bookingData, seats })
    setStep("payment")
  }

  const handlePaymentRedirect = () => {
    alert("Redirecting to payment gateway...")
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Cafeteria Queue Management
          </h1>

          {/* Mobile Menu Button */}
          <div className="md:hidden mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-full flex items-center justify-between"
            >
              <span>Menu</span>
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="dashboard" className="w-full">
          {/* Tabs List */}
          <TabsList
            className={`${
              isMobileMenuOpen ? "grid" : "hidden"
            } md:grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 mb-6 md:mb-8`}
          >
            <TabsTrigger value="3d-map" className="data-[state=active]:bg-purple-700">
              Booking
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-purple-700">
              Dashboard
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab Content */}
          <TabsContent value="dashboard" className="mt-0 flex flex-col gap-10">
            <Dashboard />
            <CafeteriaQueueMap />
          </TabsContent>

          {/* Booking Tab Content */}
          <TabsContent value="3d-map" className="mt-0">
            <div className="container mx-auto py-8 px-4">
              <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Gourmet Dining Experience
              </h1>

              <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 items-start">
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                  {step === "booking" && <BookingForm onSubmit={handleBookingSubmit} />}

                  {step === "seats" && (
                    <SeatSelection
                      onSubmit={handleSeatSubmit}
                      selectedSeats={bookingData.seats}
                      bookingData={bookingData}
                    />
                  )}

                  {step === "payment" && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold">Payment</h2>

                      <div className="space-y-4">
                        <div className="p-4 bg-gray-800 rounded-lg">
                          <h3 className="font-medium text-lg mb-2">Booking Summary</h3>
                          <p>
                            <span className="text-gray-400">Name:</span> {bookingData.name}
                          </p>
                          <p>
                            <span className="text-gray-400">Restaurant:</span> {bookingData.restaurant}
                          </p>

                          <div className="mt-4">
                            <h4 className="text-sm text-gray-400 mb-2">Items</h4>
                            {bookingData.items.map((item, i) => (
                              <div key={i} className="flex justify-between">
                                <span>
                                  {item.name} x{item.quantity}
                                </span>
                                <span>₹{item.price * item.quantity}</span>
                              </div>
                            ))}
                          </div>

                          <div className="mt-4">
                            <h4 className="text-sm text-gray-400 mb-2">Seats</h4>
                            <div className="flex justify-between">
                              <span>Selected seats: {bookingData.seats.join(", ")}</span>
                              <span>₹{bookingData.seats.length}</span>
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t border-gray-700">
                            <div className="flex justify-between font-bold">
                              <span>Total</span>
                              <span>
                                ₹
                                {bookingData.items.reduce((sum, item) => sum + item.price * item.quantity, 0) +
                                  bookingData.seats.length}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={handlePaymentRedirect}
                        className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-colors"
                      >
                        Proceed to Payment
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}          </Canvas>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Queue Information</CardTitle>
                <CardDescription className="text-gray-300">Click on a food stall to see details</CardDescription>
              </CardHeader>
              <CardContent>
                {selectedStall ? (
                  <div>
                    <h3 className="text-xl font-bold mb-2">{selectedStall.name}</h3>
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <Badge
                        className={
                          selectedStall.queueLength > 10
                            ? "bg-red-500"
                            : selectedStall.queueLength > 5
                              ? "bg-amber-500"
                              : "bg-green-500"
                        }
                      >
                        {selectedStall.queueLength} people in queue
                      </Badge>
                      <span className="text-sm">Est. wait: {selectedStall.queueLength * 2} mins</span>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Today's Menu:</h4>
                      <ul className="space-y-1">
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
                ) : (
                  <div className="text-center py-8 text-gray-400">Click on any food stall to view details</div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Queue Legend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 bg-green-500 rounded"></div>
                    <span>Short Queue (0-5 people)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 bg-amber-500 rounded"></div>
                    <span>Medium Queue (6-10 people)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 bg-red-500 rounded"></div>
                    <span>Long Queue (11+ people)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

