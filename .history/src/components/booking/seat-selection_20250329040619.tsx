"use client"

import { useState, useEffect } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { OrbitControls, Text, Environment } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

// Mock table data
const tables = [
  { id: "table1", position: [-3, 0, 0], size: [1.2, 0.8, 1.2], name: "Table 1", seats: 2 },
  { id: "table2", position: [0, 0, 0], size: [1.2, 0.8, 1.2], name: "Table 2", seats: 2 },
  { id: "table3", position: [3, 0, 0], size: [1.2, 0.8, 1.2], name: "Table 3", seats: 2 },
  { id: "table4", position: [-3, 0, 3], size: [1.2, 0.8, 1.2], name: "Table 4", seats: 4 },
  { id: "table5", position: [0, 0, 3], size: [1.2, 0.8, 1.2], name: "Table 5", seats: 4 },
  { id: "table6", position: [3, 0, 3], size: [1.2, 0.8, 1.2], name: "Table 6", seats: 4 },
  { id: "table7", position: [-3, 0, -3], size: [1.8, 0.8, 1.2], name: "Table 7", seats: 6 },
  { id: "table8", position: [0, 0, -3], size: [1.8, 0.8, 1.2], name: "Table 8", seats: 6 },
  { id: "table9", position: [3, 0, -3], size: [1.8, 0.8, 1.2], name: "Table 9", seats: 8 },
]

function Table({ position, size, name, isSelected, onClick, isAvailable }) {
  const [hovered, setHovered] = useState(false)

  // Determine color based on state
  const color = isSelected
    ? "#22c55e" // green-500 when selected
    : isAvailable
      ? hovered
        ? "#93c5fd" // blue-300 when hovered
        : "#60a5fa" // blue-400 default
      : "#ef4444" // red-500 when unavailable

  return (
    <group position={position}>
      {/* Table */}
      <mesh
        onClick={isAvailable ? onClick : undefined}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Table name */}
      <Text position={[0, 1, 0]} fontSize={0.3} color="white" anchorX="center" anchorY="middle">
        {name}
      </Text>
    </group>
  )
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#f5f5f4" />
    </mesh>
  )
}

function Scene({ selectedTable, onSelectTable, availableTables }) {
  const { camera } = useThree()

  // Set initial camera position
  useEffect(() => {
    camera.position.set(0, 5, 10)
  }, [camera])

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <Environment preset="lobby" />
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
      />

      <Floor />

      {tables.map((table) => (
        <Table
          key={table.id}
          position={table.position}
          size={table.size}
          name={table.name}
          isSelected={selectedTable === table.id}
          isAvailable={availableTables.includes(table.id)}
          onClick={() => onSelectTable(table.id)}
        />
      ))}
    </>
  )
}

interface SeatSelectionProps {
  selectedSeat: string | null
  onSelectSeat: (seatId: string) => void
}

export function SeatSelection({ selectedSeat, onSelectSeat }: SeatSelectionProps) {
  const { toast } = useToast()

  // Mock available tables (in a real app, this would come from an API)
  const availableTables = ["table1", "table2", "table4", "table5", "table7", "table9"]

  const handleSelectTable = (tableId: string) => {
    onSelectSeat(tableId)

    const tableName = tables.find((t) => t.id === tableId)?.name

    toast({
      title: "Table Selected",
      description: `You have selected ${tableName}`,
    })
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Select a Table</CardTitle>
          <CardDescription>
            Choose a table for your reservation. Green tables are selected, blue tables are available, and red tables
            are unavailable.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[500px] w-full rounded-md border">
            <Canvas>
              <Scene selectedTable={selectedSeat} onSelectTable={handleSelectTable} availableTables={availableTables} />
            </Canvas>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 rounded-full bg-blue-400" />
              <span className="text-sm">Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 rounded-full bg-green-500" />
              <span className="text-sm">Selected</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 rounded-full bg-red-500" />
              <span className="text-sm">Unavailable</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tables.map((table) => (
          <Card
            key={table.id}
            className={`cursor-pointer transition-all ${selectedSeat === table.id ? "border-green-500 ring-2 ring-green-500" : ""} ${!availableTables.includes(table.id) ? "opacity-50" : ""}`}
          >
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-lg">{table.name}</CardTitle>
              <CardDescription>Seats: {table.seats}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <Button
                className="w-full"
                variant={selectedSeat === table.id ? "default" : "outline"}
                disabled={!availableTables.includes(table.id)}
                onClick={() => handleSelectTable(table.id)}
              >
                {selectedSeat === table.id ? "Selected" : "Select Table"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

