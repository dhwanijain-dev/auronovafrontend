"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment, useGLTF, Text } from "@react-three/drei"
import { Vector3, type Group } from "three"

interface ThreeDSceneProps {
    step: "booking" | "seats" | "payment"
    selectedSeats: number[]
}

export default function ThreeDScene({ step, selectedSeats }: ThreeDSceneProps) {
    return (
        <Canvas shadows>
            <color attach="background" args={["#000"]} />
            <fog attach="fog" args={["#000", 5, 20]} />
            <ambientLight intensity={0.5} />
            <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} castShadow />

            <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={40} />
            <OrbitControls
                enableZoom={true}
                enablePan={false}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 2}
                minDistance={3}
                maxDistance={10}
            />

            <Environment preset="night" />

            {step === "booking" ? <RestaurantModel /> : <SeatsModel selectedSeats={selectedSeats} />}
        </Canvas>
    )
}

function RestaurantModel() {
    const duck = useGLTF("/assets/3d/duck.glb")
    const group = useRef<Group>(null)

    useFrame((state) => {
        if (group.current) {
            group.current.rotation.y = state.clock.getElapsedTime() * 0.2
        }
    })

    return (
        <group ref={group} position={[0, 0, 0]} scale={2}>
            <primitive object={duck.scene} position={[0, -1, 0]} />
            <Text
                position={[0, 1.5, 0]}
                fontSize={0.5}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                font="/fonts/Inter_Bold.json"
            >
                Gourmet Restaurant
            </Text>
        </group>
    )
}

function SeatsModel({ selectedSeats }: { selectedSeats: number[] }) {
    const { viewport } = useThree()
    const [hoveredSeat, setHoveredSeat] = useState<number | null>(null)

    // Calculate grid layout
    const rows = 4
    const cols = 5
    const spacing = 1.2
    const startX = -((cols - 1) * spacing) / 2
    const startZ = -((rows - 1) * spacing) / 2

    return (
        <group position={[0, -1, 0]}>
            {/* Table */}
            <mesh position={[0, 0.5, 0]} receiveShadow castShadow>
                <boxGeometry args={[5, 0.1, 3]} />
                <meshStandardMaterial color="#8B4513" />
            </mesh>

            {/* Seats */}
            {Array.from({ length: 20 }, (_, i) => i + 1).map((seatNumber) => {
                const row = Math.floor((seatNumber - 1) / cols)
                const col = (seatNumber - 1) % cols
                const x = startX + col * spacing
                const z = startZ + row * spacing

                const isSelected = selectedSeats.includes(seatNumber)
                const isHovered = hoveredSeat === seatNumber

                return (
                    <Seat
                        key={seatNumber}
                        position={new Vector3(x, 0, z)}
                        seatNumber={seatNumber}
                        isSelected={isSelected}
                        isHovered={isHovered}
                        onHover={() => setHoveredSeat(seatNumber)}
                        onBlur={() => setHoveredSeat(null)}
                    />
                )
            })}

            {/* Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial color="#111" />
            </mesh>
        </group>
    )
}

interface SeatProps {
    position: Vector3
    seatNumber: number
    isSelected: boolean
    isHovered: boolean
    onHover: () => void
    onBlur: () => void
}

function Seat({ position, seatNumber, isSelected, isHovered, onHover, onBlur }: SeatProps) {
    const color = isSelected
        ? "#9333ea" // Purple for selected
        : isHovered
            ? "#d946ef" // Pink for hovered
            : "#4b5563" // Gray for default

    return (
        <group position={position}>
            <mesh castShadow receiveShadow onPointerOver={onHover} onPointerOut={onBlur}>
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshStandardMaterial color={color} />
            </mesh>
            <Text
                position={[0, 0.4, 0]}
                fontSize={0.2}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                font="/fonts/Inter_Bold.json"
            >
                {seatNumber}
            </Text>
        </group>
    )
}

