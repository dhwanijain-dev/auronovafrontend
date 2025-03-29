"use client"


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CafeteriaQueueMap from "@/components/cafeteria-queue-map"

import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react"
import { Dashboard } from "@/components/DashBoard"
import  BookingForm  from "../components/booking-form"
import SeatSelection from "../components/seat-selection"
import three

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [step, setStep] = useState<"booking" | "seats" | "payment">("booking")
  const [bookingData, setBookingData] = useState({
    name: "dhwani",
    restaurant: "jain",
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
    // In a real app, this would redirect to a payment gateway
    alert("Redirecting to payment gateway...")
  }
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-2 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6"> 
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Cafeteria Queue Management
          </h1>

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

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList
            className={`${isMobileMenuOpen ? "grid" : "hidden"} md:grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 mb-6 md:mb-8`}
          >
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-purple-700">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="3d-map" className="data-[state=active]:bg-purple-700">
              3D Queue Map
            </TabsTrigger>
            
          </TabsList>

          <TabsContent value="dashboard" className="mt-0 flex flex-col gap-10">

            <Dashboard/>
            <CafeteriaQueueMap />

          </TabsContent>

          <TabsContent value="3d-map" className="mt-0">

            <div className="container mx-auto py-8 px-4">
              <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Gourmet Dining Experience
              </h1>

              <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 items-start">
                {/* <div className="h-[500px] rounded-xl overflow-hidden border border-gray-800">
                  <Canvas>

                  <ThreeDScene step={step} selectedSeats={bookingData.seats} />
                  </Canvas>
                </div> */}

                <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                  {step === "booking" && <BookingForm onSubmit={handleBookingSubmit} />}

                  {step === "seats" && (
                    <SeatSelection onSubmit={handleSeatSubmit} selectedSeats={bookingData.seats} bookingData={bookingData} />
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
  
}

