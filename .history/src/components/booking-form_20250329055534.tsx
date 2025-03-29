"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, ChevronUp, Plus, Minus, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const RESTAURANTS = ["Gourmet Palace", "Spice Garden", "Ocean Delights", "Rustic Kitchen", "Urban Bistro"]

const MENU_ITEMS = {
    "Gourmet Palace": [
        { name: "Truffle Pasta", price: 450 },
        { name: "Wagyu Steak", price: 1200 },
        { name: "Lobster Bisque", price: 350 },
        { name: "Chocolate Soufflé", price: 250 },
    ],
    "Spice Garden": [
        { name: "Butter Chicken", price: 350 },
        { name: "Paneer Tikka", price: 280 },
        { name: "Biryani", price: 320 },
        { name: "Gulab Jamun", price: 150 },
    ],
    "Ocean Delights": [
        { name: "Grilled Salmon", price: 520 },
        { name: "Prawn Curry", price: 480 },
        { name: "Seafood Platter", price: 950 },
        { name: "Key Lime Pie", price: 220 },
    ],
    "Rustic Kitchen": [
        { name: "Wood-fired Pizza", price: 380 },
        { name: "Risotto", price: 340 },
        { name: "Lamb Chops", price: 560 },
        { name: "Tiramisu", price: 240 },
    ],
    "Urban Bistro": [
        { name: "Avocado Toast", price: 280 },
        { name: "Quinoa Bowl", price: 320 },
        { name: "Gourmet Burger", price: 380 },
        { name: "Cheesecake", price: 220 },
    ],
}

interface BookingFormProps {
    onSubmit: (data: {
        name: string
        restaurant: string
        items: { name: string; price: number; quantity: number }[]
    }) => void
}

export default function BookingForm({ onSubmit }: BookingFormProps) {
    const [name, setName] = useState("")
    const [restaurant, setRestaurant] = useState("")
    const [showMenu, setShowMenu] = useState(false)
    const [cart, setCart] = useState<{ name: string; price: number; quantity: number }[]>([])

    const handleAddItem = (item: { name: string; price: number }) => {
        const existingItem = cart.find((cartItem) => cartItem.name === item.name)

        if (existingItem) {
            setCart(
                cart.map((cartItem) =>
                    cartItem.name === item.name ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
                ),
            )
        } else {
            setCart([...cart, { ...item, quantity: 1 }])
        }
    }

    const handleRemoveItem = (itemName: string) => {
        const existingItem = cart.find((item) => item.name === itemName)

        if (existingItem && existingItem.quantity > 1) {
            setCart(cart.map((item) => (item.name === itemName ? { ...item, quantity: item.quantity - 1 } : item)))
        } else {
            setCart(cart.filter((item) => item.name !== itemName))
        }
    }

    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!name || !restaurant || cart.length === 0) {
            alert("Please fill all fields and add at least one item to your cart")
            return
        }

        onSubmit({
            name,
            restaurant,
            items: cart,
        })
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Book Your Table</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="bg-gray-800 border-gray-700"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="restaurant">Select Restaurant</Label>
                    <Select value={restaurant} onValueChange={setRestaurant} required>
                        <SelectTrigger className="bg-gray-800 border-gray-700">
                            <SelectValue placeholder="Select a restaurant" />
                        </SelectTrigger>
                        <SelectContent>
                            {RESTAURANTS.map((r) => (
                                <SelectItem key={r} value={r}>
                                    {r}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {restaurant && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setShowMenu(!showMenu)}
                                className="w-full flex justify-between items-center"
                            >
                                <span>View Menu</span>
                                {showMenu ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </Button>
                        </div>

                        {showMenu && (
                            <div className="bg-gray-800 rounded-lg p-4 space-y-3">
                                <h3 className="font-medium">Menu Items</h3>
                                <div className="space-y-2">
                                    {MENU_ITEMS[restaurant as keyof typeof MENU_ITEMS].map((item, index) => (
                                        <div key={index} className="flex justify-between items-center">
                                            <div>
                                                <p className="font-medium">{item.name}</p>
                                                <p className="text-sm text-gray-400">₹{item.price}</p>
                                            </div>
                                            <Button
                                                type="button"
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleAddItem(item)}
                                                className="h-8 w-8 p-0"
                                            >
                                                <Plus size={16} />
                                                <span className="sr-only">Add {item.name}</span>
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {cart.length > 0 && (
                            <div className="bg-gray-800 rounded-lg p-4 space-y-3">
                                <div className="flex items-center gap-2">
                                    <ShoppingCart size={18} />
                                    <h3 className="font-medium">Your Order</h3>
                                </div>

                                <div className="space-y-2">
                                    {cart.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center">
                                            <div>
                                                <p>{item.name}</p>
                                                <p className="text-sm text-gray-400">
                                                    ₹{item.price} x {item.quantity}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleRemoveItem(item.name)}
                                                    className="h-7 w-7 p-0"
                                                >
                                                    <Minus size={14} />
                                                    <span className="sr-only">Remove {item.name}</span>
                                                </Button>
                                                <span className="w-6 text-center">{item.quantity}</span>
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleAddItem(item)}
                                                    className="h-7 w-7 p-0"
                                                >
                                                    <Plus size={14} />
                                                    <span className="sr-only">Add {item.name}</span>
                                                </Button>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="pt-2 mt-2 border-t border-gray-700 flex justify-between font-medium">
                                        <span>Total</span>
                                        <span>₹{totalAmount}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <Button
                    type="submit"
                    className="w-full py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    disabled={!name || !restaurant || cart.length === 0}
                >
                    Next: Select Seats
                </Button>
            </form>
        </div>
    )
}

