"use client"


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CafeteriaQueueMap from "@/components/cafeteria-queue-map"

import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react"
import { Dashboard } from "@/components/DashBoard"

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
            <Boo
          </TabsContent>
        </Tabs>
      </div>
    </main>
    
  )
  
}

