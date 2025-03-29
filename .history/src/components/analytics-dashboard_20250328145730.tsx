"use client"

import { useState } from "react"
import { motion } from "framer-motion"
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

// Mock data for analytics
const dailyTrafficData = [
  { time: "8:00", visitors: 45, avgQueueLength: 3 },
  { time: "9:00", visitors: 75, avgQueueLength: 5 },
  { time: "10:00", visitors: 90, avgQueueLength: 6 },
  { time: "11:00", visitors: 120, avgQueueLength: 8 },
  { time: "12:00", visitors: 220, avgQueueLength: 15 },
  { time: "13:00", visitors: 200, avgQueueLength: 14 },
  { time: "14:00", visitors: 110, avgQueueLength: 7 },
  { time: "15:00", visitors: 95, avgQueueLength: 6 },
  { time: "16:00", visitors: 85, avgQueueLength: 5 },
  { time: "17:00", visitors: 150, avgQueueLength: 10 },
  { time: "18:00", visitors: 130, avgQueueLength: 9 },
  { time: "19:00", visitors: 70, avgQueueLength: 4 },
]

const weeklyTrafficData = [
  { day: "Mon", visitors: 850, avgQueueLength: 8 },
  { day: "Tue", visitors: 740, avgQueueLength: 7 },
  { day: "Wed", visitors: 900, avgQueueLength: 9 },
  { day: "Thu", visitors: 880, avgQueueLength: 8 },
  { day: "Fri", visitors: 1100, avgQueueLength: 12 },
  { day: "Sat", visitors: 400, avgQueueLength: 4 },
  { day: "Sun", visitors: 300, avgQueueLength: 3 },
]

const stallPerformanceData = [
  { name: "Pizza Station", orders: 320, revenue: 3200, avgQueueTime: 24, satisfaction: 4.2 },
  { name: "Burger Joint", orders: 280, revenue: 2520, avgQueueTime: 18, satisfaction: 4.5 },
  { name: "Salad Bar", orders: 150, revenue: 1050, avgQueueTime: 12, satisfaction: 4.7 },
  { name: "Pasta Corner", orders: 210, revenue: 1890, avgQueueTime: 20, satisfaction: 4.0 },
  { name: "Sushi Station", orders: 190, revenue: 2280, avgQueueTime: 25, satisfaction: 4.8 },
]

const foodCategoryData = [
  { name: "Fast Food", value: 45, color: "#8b5cf6" },
  { name: "Healthy Options", value: 20, color: "#22c55e" },
  { name: "International", value: 25, color: "#f59e0b" },
  { name: "Desserts", value: 10, color: "#ec4899" },
]

const peakHoursData = [
  { time: "8:00-9:00", visitors: 45, isLow: true },
  { time: "9:00-10:00", visitors: 75, isLow: true },
  { time: "10:00-11:00", visitors: 90, isLow: false },
  { time: "11:00-12:00", visitors: 120, isLow: false },
  { time: "12:00-13:00", visitors: 220, isPeak: true },
  { time: "13:00-14:00", visitors: 200, isPeak: true },
  { time: "14:00-15:00", visitors: 110, isLow: false },
  { time: "15:00-16:00", visitors: 95, isLow: true },
  { time: "16:00-17:00", visitors: 85, isLow: true },
  { time: "17:00-18:00", visitors: 150, isPeak: true },
  { time: "18:00-19:00", visitors: 130, isLow: false },
  { time: "19:00-20:00", visitors: 70, isLow: true },
]

const userBehaviorData = [
  { category: "Pre-orders", value: 35, color: "#8b5cf6" },
  { category: "Walk-ins", value: 65, color: "#f59e0b" },
]

const waitTimeData = [
  { stall: "Pizza Station", avgWaitTime: 24, prevWaitTime: 26 },
  { stall: "Burger Joint", avgWaitTime: 18, prevWaitTime: 20 },
  { stall: "Salad Bar", avgWaitTime: 12, prevWaitTime: 15 },
  { stall: "Pasta Corner", avgWaitTime: 20, prevWaitTime: 18 },
  { stall: "Sushi Station", avgWaitTime: 25, prevWaitTime: 22 },
]

const topSellingItems = [
  { name: "Pepperoni Pizza", stall: "Pizza Station", sales: 120, trend: "up" },
  { name: "Cheeseburger", stall: "Burger Joint", sales: 105, trend: "up" },
  { name: "California Roll", stall: "Sushi Station", sales: 95, trend: "up" },
  { name: "Caesar Salad", stall: "Salad Bar", sales: 85, trend: "down" },
  { name: "Spaghetti Bolognese", stall: "Pasta Corner", sales: 80, trend: "down" },
]

// Get color based on trend
const getTrendColor = (trend) => {
  return trend === "up" ? "text-green-500" : "text-red-500"
}

// Get icon based on trend
const getTrendIcon = (trend) => {
  return trend === "up" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />
}

// Get color based on wait time comparison
const getWaitTimeColor = (current, previous) => {
  return current < previous ? "text-green-500" : "text-red-500"
}

// Get icon based on wait time comparison
const getWaitTimeIcon = (current, previous) => {
  return current < previous ? <ArrowDown className="h-4 w-4" /> : <ArrowUp className="h-4 w-4" />
}

// Get percentage change
const getPercentageChange = (current, previous) => {
  const change = ((current - previous) / previous) * 100
  return Math.abs(change).toFixed(1)
}

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("daily")

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
          <Tabs defaultValue="daily" onValueChange={setTimeRange}>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-400">Total Visitors</CardDescription>
              <CardTitle className="text-2xl">{timeRange === "daily" ? "1,390" : "5,170"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge className="bg-green-600/20 text-green-500 hover:bg-green-600/30">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  12.5%
                </Badge>
                <span className="text-xs text-gray-400">vs. last {timeRange === "daily" ? "day" : "week"}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-400">Avg. Queue Length</CardDescription>
              <CardTitle className="text-2xl">{timeRange === "daily" ? "7.6" : "7.3"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge className="bg-red-600/20 text-red-500 hover:bg-red-600/30">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  5.2%
                </Badge>
                <span className="text-xs text-gray-400">vs. last {timeRange === "daily" ? "day" : "week"}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-400">Avg. Wait Time</CardDescription>
              <CardTitle className="text-2xl">{timeRange === "daily" ? "19.8 min" : "18.5 min"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge className="bg-green-600/20 text-green-500 hover:bg-green-600/30">
                  <ArrowDown className="h-3 w-3 mr-1" />
                  3.8%
                </Badge>
                <span className="text-xs text-gray-400">vs. last {timeRange === "daily" ? "day" : "week"}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-400">Customer Satisfaction</CardDescription>
              <CardTitle className="text-2xl">4.4/5</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge className="bg-green-600/20 text-green-500 hover:bg-green-600/30">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  0.2
                </Badge>
                <span className="text-xs text-gray-400">vs. last {timeRange === "daily" ? "day" : "week"}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Traffic and queue analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Traffic & Queue Analysis</CardTitle>
              <CardDescription className="text-gray-300">
                {timeRange === "daily" ? "Hourly" : "Daily"} visitor count and average queue length
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={timeRange === "daily" ? dailyTrafficData : weeklyTrafficData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="visitorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="queueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis
                      dataKey={timeRange === "daily" ? "time" : "day"}
                      stroke="#9ca3af"
                      tick={{ fill: "#9ca3af" }}
                    />
                    <YAxis
                      yAxisId="left"
                      stroke="#9ca3af"
                      tick={{ fill: "#9ca3af" }}
                      label={{
                        value: "Visitors",
                        angle: -90,
                        position: "insideLeft",
                        style: { fill: "#9ca3af" },
                      }}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      stroke="#9ca3af"
                      tick={{ fill: "#9ca3af" }}
                      label={{
                        value: "Avg Queue Length",
                        angle: 90,
                        position: "insideRight",
                        style: { fill: "#9ca3af" },
                      }}
                    />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-gray-900 p-2 border border-gray-700 rounded-md shadow-lg">
                              <p className="font-medium">{label}</p>
                              <p className="text-purple-400">Visitors: {payload[0].value}</p>
                              <p className="text-amber-400">Avg Queue: {payload[1].value}</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="visitors"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#visitorGradient)"
                      yAxisId="left"
                      name="Visitors"
                    />
                    <Area
                      type="monotone"
                      dataKey="avgQueueLength"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#queueGradient)"
                      yAxisId="right"
                      name="Avg Queue Length"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Food Category Distribution</CardTitle>
              <CardDescription className="text-gray-300">Breakdown of food categories by popularity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex flex-col items-center justify-center">
                <ResponsiveContainer width="100%" height="80%">
                  <PieChart>
                    <Pie
                      data={foodCategoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {foodCategoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-gray-900 p-2 border border-gray-700 rounded-md shadow-lg">
                              <p className="font-medium">{payload[0].name}</p>
                              <p>{payload[0].value}% of orders</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 w-full mt-2">
                  {foodCategoryData.map((category) => (
                    <div key={category.name} className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                      <span className="text-xs">{category.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Stall performance and peak hours */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Stall Performance</CardTitle>
              <CardDescription className="text-gray-300">
                Orders, revenue, and customer satisfaction by stall
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="p-2 text-left border-b border-gray-700">Stall</th>
                      <th className="p-2 text-left border-b border-gray-700">Orders</th>
                      <th className="p-2 text-left border-b border-gray-700">Revenue</th>
                      <th className="p-2 text-left border-b border-gray-700">Satisfaction</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stallPerformanceData.map((stall, index) => (
                      <tr key={stall.name} className={index % 2 === 0 ? "bg-gray-800/20" : ""}>
                        <td className="p-2 border-b border-gray-700">{stall.name}</td>
                        <td className="p-2 border-b border-gray-700">{stall.orders}</td>
                        <td className="p-2 border-b border-gray-700">${stall.revenue}</td>
                        <td className="p-2 border-b border-gray-700">
                          <div className="flex items-center gap-1">
                            <span className={stall.satisfaction >= 4.5 ? "text-green-500" : "text-amber-500"}>
                              {stall.satisfaction}
                            </span>
                            <span>/5</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Peak Hours Analysis</CardTitle>
              <CardDescription className="text-gray-300">Identifying peak and low traffic periods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={peakHoursData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis
                      dataKey="time"
                      stroke="#9ca3af"
                      tick={{ fill: "#9ca3af" }}
                      angle={-45}
                      textAnchor="end"
                      height={70}
                    />
                    <YAxis
                      stroke="#9ca3af"
                      tick={{ fill: "#9ca3af" }}
                      label={{
                        value: "Visitors",
                        angle: -90,
                        position: "insideLeft",
                        style: { fill: "#9ca3af" },
                      }}
                    />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
                          return (
                            <div className="bg-gray-900 p-2 border border-gray-700 rounded-md shadow-lg">
                              <p className="font-medium">{label}</p>
                              <p>Visitors: {data.visitors}</p>
                              <p
                                className={
                                  data.isPeak ? "text-red-500" : data.isLow ? "text-green-500" : "text-amber-500"
                                }
                              >
                                {data.isPeak ? "Peak Hour" : data.isLow ? "Low Traffic" : "Moderate Traffic"}
                              </p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Bar dataKey="visitors">
                      {peakHoursData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.isPeak ? "#ef4444" : entry.isLow ? "#22c55e" : "#f59e0b"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <span className="text-xs">Peak</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                  <span className="text-xs">Moderate</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="text-xs">Low</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Wait time and top selling items */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Wait Time Trends</CardTitle>
              <CardDescription className="text-gray-300">
                Average wait time by stall compared to previous period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {waitTimeData.map((stall) => (
                  <div key={stall.stall} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{stall.stall}</p>
                      <div className="flex items-center gap-1">
                        <span className="text-lg">{stall.avgWaitTime} min</span>
                        <div className={`flex items-center ${getWaitTimeColor(stall.avgWaitTime, stall.prevWaitTime)}`}>
                          {getWaitTimeIcon(stall.avgWaitTime, stall.prevWaitTime)}
                          <span className="text-xs">{getPercentageChange(stall.avgWaitTime, stall.prevWaitTime)}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${stall.avgWaitTime > 20 ? "bg-red-500" : stall.avgWaitTime > 15 ? "bg-amber-500" : "bg-green-500"}`}
                        style={{ width: `${(stall.avgWaitTime / 30) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Top Selling Items</CardTitle>
              <CardDescription className="text-gray-300">
                Most popular menu items and their sales trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topSellingItems.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">{index + 1}</span>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-gray-400">{item.stall}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>{item.sales} sold</span>
                      <div className={getTrendColor(item.trend)}>{getTrendIcon(item.trend)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>User Behavior</CardTitle>
              <CardDescription className="text-gray-300">
                Pre-orders vs. walk-ins and AI recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={userBehaviorData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {userBehaviorData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-gray-900 p-2 border border-gray-700 rounded-md shadow-lg">
                              <p className="font-medium">{payload[0].name}</p>
                              <p>{payload[0].value}% of customers</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="p-3 rounded-lg bg-purple-900/20 border border-purple-500/30">
                <h4 className="font-medium mb-1">AI Recommendation</h4>
                <p className="text-sm">
                  Increase pre-orders by offering a 10% discount during peak hours (12-1 PM and 5-6 PM) to reduce queue
                  congestion.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* AI insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mb-6"
      >
        <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-purple-400" />
              AI-Powered Insights & Recommendations
            </CardTitle>
            <CardDescription className="text-gray-300">
              Smart suggestions to optimize cafeteria operations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-purple-900/20 border border-purple-500/30">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-purple-400" />
                  Queue Optimization
                </h3>
                <p className="text-sm">
                  Add 2 more staff members at Pizza Station and Sushi Station between 12-1 PM to reduce wait times by an
                  estimated 35%.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-purple-900/20 border border-purple-500/30">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4 text-purple-400" />
                  Traffic Management
                </h3>
                <p className="text-sm">
                  Implement a staggered lunch schedule for different departments to distribute traffic more evenly
                  between 11:30 AM and 1:30 PM.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-purple-900/20 border border-purple-500/30">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-purple-400" />
                  Menu Optimization
                </h3>
                <p className="text-sm">
                  Add more healthy options at Salad Bar based on customer feedback and increasing health-conscious
                  trends among users.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

