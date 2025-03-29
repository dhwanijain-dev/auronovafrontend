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
            <OrbitControls
              enablePan={true}
              enableZoom={false} // Disable zoom
              enableRotate={true}
              maxPolarAngle={Math.PI / 2} // Limit vertical rotation (up/down)
              minPolarAngle={Math.PI / 4} // Limit vertical rotation (up/down)
              maxAzimuthAngle={Math.PI / 4} // Limit horizontal rotation (left/right)
              minAzimuthAngle={-Math.PI / 4} // Limit horizontal rotation (left/right)
            />          </Canvas>
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

