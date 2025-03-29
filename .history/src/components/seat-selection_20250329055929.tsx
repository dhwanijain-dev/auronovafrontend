"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface SeatSelectionProps {
    onSubmit: (seats: number[]) => void
    selectedSeats: number[]
    bookingData: {
        name: string
        restaurant: string
        items: { name: string; price: number; quantity: number }[]
    }
}

export default function SeatSelection({ onSubmit, selectedSeats, bookingData }: SeatSelectionProps) {
    const [seats, setSeats] = useState<number[]>(selectedSeats || [])

    const toggleSeat = (seatNumber: number) => {
        if (seats.includes(seatNumber)) {
            setSeats(seats.filter((s) => s !== seatNumber))
        } else {
            setSeats([...seats, seatNumber])
        }
    }

    const handleSubmit = () => {
        if (seats.length === 0) {
            alert("Please select at least one seat")
            return
        }

        onSubmit(seats)
    }

    const foodTotal = bookingData.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const seatsTotal = seats.length
    const total = foodTotal + seatsTotal

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Select Your Seats</h2>
            <p className="text-gray-400">Each seat costs ₹1 (for demonstration purposes)</p>

            <div className="grid grid-cols-5 gap-3">
                {Array.from({ length: 20 }, (_, i) => i + 1).map((seatNumber) => (
                    <button
                        key={seatNumber}
                        onClick={() => toggleSeat(seatNumber)}
                        className={`aspect-square flex items-center justify-center rounded-md text-sm font-medium transition-colors ${seats.includes(seatNumber)
                                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                                : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                            }`}
                    >
                        {seatNumber}
                    </button>
                ))}
            </div>

            <div className="bg-gray-800 rounded-lg p-4 space-y-3">
                <h3 className="font-medium">Your Selection</h3>

                <div>
                    <div className="flex justify-between">
                        <span>Food & Beverages</span>
                        <span>₹{foodTotal}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Seats ({seats.length})</span>
                        <span>₹{seatsTotal}</span>
                    </div>
                    <div className="flex justify-between font-bold mt-2 pt-2 border-t border-gray-700">
                        <span>Total</span>
                        <span>₹{total}</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                <Button variant="outline" className="flex-1" onClick={() => window.history.back()}>
                    Back
                </Button>
                <Button
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    onClick={handleSubmit}
                    disabled={seats.length === 0}
                >
                    Continue to Payment
                </Button>
            </div>
        </div>
    )
}

