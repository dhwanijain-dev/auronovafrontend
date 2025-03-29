"use client"

import { useState } from "react"
import { Plus, Minus, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Mock food data
const mockFoodCategories = [
  { id: "starters", name: "Starters" },
  { id: "mains", name: "Main Courses" },
  { id: "desserts", name: "Desserts" },
  { id: "drinks", name: "Drinks" },
]

const mockFoodItems = [
  // Starters
  { id: "s1", name: "Garlic Bread", price: 4.99, category: "starters", image: "/placeholder.svg?height=100&width=100" },
  { id: "s2", name: "Bruschetta", price: 5.99, category: "starters", image: "/placeholder.svg?height=100&width=100" },
  {
    id: "s3",
    name: "Soup of the Day",
    price: 3.99,
    category: "starters",
    image: "/placeholder.svg?height=100&width=100",
  },
  { id: "s4", name: "Calamari", price: 7.99, category: "starters", image: "/placeholder.svg?height=100&width=100" },

  // Mains
  {
    id: "m1",
    name: "Margherita Pizza",
    price: 12.99,
    category: "mains",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "m2",
    name: "Spaghetti Bolognese",
    price: 11.99,
    category: "mains",
    image: "/placeholder.svg?height=100&width=100",
  },
  { id: "m3", name: "Grilled Salmon", price: 16.99, category: "mains", image: "/placeholder.svg?height=100&width=100" },
  { id: "m4", name: "Beef Burger", price: 13.99, category: "mains", image: "/placeholder.svg?height=100&width=100" },

  // Desserts
  { id: "d1", name: "Tiramisu", price: 6.99, category: "desserts", image: "/placeholder.svg?height=100&width=100" },
  {
    id: "d2",
    name: "Chocolate Cake",
    price: 5.99,
    category: "desserts",
    image: "/placeholder.svg?height=100&width=100",
  },
  { id: "d3", name: "Ice Cream", price: 4.99, category: "desserts", image: "/placeholder.svg?height=100&width=100" },

  // Drinks
  { id: "dr1", name: "Soft Drink", price: 2.99, category: "drinks", image: "/placeholder.svg?height=100&width=100" },
  { id: "dr2", name: "Coffee", price: 3.49, category: "drinks", image: "/placeholder.svg?height=100&width=100" },
  { id: "dr3", name: "Wine (Glass)", price: 6.99, category: "drinks", image: "/placeholder.svg?height=100&width=100" },
]

interface FoodItem {
  id: string
  name: string
  price: number
  quantity: number
  category: string
}

interface FoodBookingProps {
  foodItems: FoodItem[]
  onUpdateFoodItems: (items: FoodItem[]) => void
}

export function FoodBooking({ foodItems, onUpdateFoodItems }: FoodBookingProps) {
  const [cartOpen, setCartOpen] = useState(false)

  const addToCart = (item: any) => {
    const existingItem = foodItems.find((cartItem) => cartItem.id === item.id)

    if (existingItem) {
      const updatedItems = foodItems.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
      )
      onUpdateFoodItems(updatedItems)
    } else {
      onUpdateFoodItems([...foodItems, { ...item, quantity: 1 }])
    }
  }

  const removeFromCart = (itemId: string) => {
    const existingItem = foodItems.find((item) => item.id === itemId)

    if (existingItem && existingItem.quantity > 1) {
      const updatedItems = foodItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item,
      )
      onUpdateFoodItems(updatedItems)
    } else {
      const updatedItems = foodItems.filter((item) => item.id !== itemId)
      onUpdateFoodItems(updatedItems)
    }
  }

  const totalItems = foodItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalAmount = foodItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Food Selection</h3>
        <Dialog open={cartOpen} onOpenChange={setCartOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="relative">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Cart
              {totalItems > 0 && (
                <Badge className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Your Order</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {foodItems.length > 0 ? (
                <ScrollArea className="h-[300px]">
                  <div className="space-y-4 pr-4">
                    {foodItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            ${item.price.toFixed(2)} x {item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span>{item.quantity}</span>
                          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => addToCart(item)}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="py-6 text-center text-muted-foreground">Your cart is empty</div>
              )}
              <div className="flex items-center justify-between border-t pt-4">
                <span className="font-bold">Total:</span>
                <span className="font-bold">${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue={mockFoodCategories[0].id}>
        <TabsList className="grid w-full grid-cols-4">
          {mockFoodCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {mockFoodCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {mockFoodItems
                .filter((item) => item.category === category.id)
                .map((item) => (
                  <Card key={item.id}>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <CardDescription>${item.price.toFixed(2)}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="aspect-square w-full overflow-hidden rounded-md">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full" onClick={() => addToCart(item)}>
                        Add to Order
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

