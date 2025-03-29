"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart"
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  Clock,
  Download,
  FileText,
  Filter,
  PieChartIcon,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react"

// Dynamically import framer-motion for better performance
const motion = dynamic(() => import("framer-motion").then((mod) => mod.motion), { ssr: false })

// Define TypeScript types for mock data
type TrafficData = {
  time?: string
  day?: string
  visitors: number
  avgQueueLength: number
  isPeak?: boolean
  isLow?: boolean
}

type StallPerformance = {
  name: string
  orders: number
  revenue: number
  avgQueueTime: number
  satisfaction: number
}

type FoodCategory = {
  name: string
  value: number
  color: string
}

type UserBehavior = {
  category: string
  value: number
  color: string
}

type WaitTime = {
  stall: string
  avgWaitTime: number
  prevWaitTime: number
}

type TopSellingItem = {
  name: string
  stall: string
  sales: number
  trend: "up" | "down"
}

// Mock data for analytics
const dailyTrafficData: TrafficData[] = [
  { time: "8:00", visitors: 45, avgQueueLength: 3 },
  { time: "9:00", visitors: 75, avgQueueLength: 5 },
  // ...remaining data
]

const weeklyTrafficData: TrafficData[] = [
  { day: "Mon", visitors: 850, avgQueueLength: 8 },
  { day: "Tue", visitors: 740, avgQueueLength: 7 },
  // ...remaining data
]

const stallPerformanceData: StallPerformance[] = [
  { name: "Pizza Station", orders: 320, revenue: 3200, avgQueueTime: 24, satisfaction: 4.2 },
  { name: "Burger Joint", orders: 280, revenue: 2520, avgQueueTime: 18, satisfaction: 4.5 },
  // ...remaining data
]

const foodCategoryData: FoodCategory[] = [
  { name: "Fast Food", value: 45, color: "#8b5cf6" },
  { name: "Healthy Options", value: 20, color: "#22c55e" },
  // ...remaining data
]

const userBehaviorData: UserBehavior[] = [
  { category: "Pre-orders", value: 35, color: "#8b5cf6" },
  { category: "Walk-ins", value: 65, color: "#f59e0b" },
]

const waitTimeData: WaitTime[] = [
  { stall: "Pizza Station", avgWaitTime: 24, prevWaitTime: 26 },
  { stall: "Burger Joint", avgWaitTime: 18, prevWaitTime: 20 },
  // ...remaining data
]

const topSellingItems: TopSellingItem[] = [
  { name: "Pepperoni Pizza", stall: "Pizza Station", sales: 120, trend: "up" },
  { name: "Cheeseburger", stall: "Burger Joint", sales: 105, trend: "up" },
  // ...remaining data
]

// Utility functions with type annotations
const getTrendColor = (trend: "up" | "down"): string => {
  return trend === "up" ? "text-green-500" : "text-red-500"
}

const getTrendIcon = (trend: "up" | "down"): JSX.Element => {
  return trend === "up" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />
}

const getWaitTimeColor = (current: number, previous: number): string => {
  return current < previous ? "text-green-500" : "text-red-500"
}

const getWaitTimeIcon = (current: number, previous: number): JSX.Element => {
  return current < previous ? <ArrowDown className="h-4 w-4" /> : <ArrowUp className="h-4 w-4" />
}

const getPercentageChange = (current: number, previous: number): string => {
  const change = ((current - previous) / previous) * 100
  return Math.abs(change).toFixed(1)
}

// Main component
export default function AnalyticsDashboard(): JSX.Element {
  const [timeRange, setTimeRange] = useState<"daily" | "weekly">("daily")

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="text-2xl font-bold mb-2">Cafeteria Analytics Dashboard</h2>
        <p className="text-gray-300">
          Comprehensive analytics and insights to optimize cafeteria operations and improve customer experience.
        </p>
      </motion.div>

      {/* Time range and filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Apr 1 - Apr 30, 2025</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
        </div>

        <div className="flex gap-2">
          <Tabs defaultValue="daily" onValueChange={(value) => setTimeRange(value as "daily" | "weekly")}>
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
            </TabsList>
          </Tabs>

          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      {/* Key metrics */}
      {/* ...remaining JSX code for metrics, charts, and tables */}
    </div>
  )
}