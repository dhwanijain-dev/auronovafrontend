"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart"

// Mock data for the heatmap
const timeSlots = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]
const foodStalls = ["Pizza Station", "Burger Joint", "Salad Bar", "Pasta Corner", "Sushi Station"]

// Generate heatmap data
const generateHeatmapData = () => {
  const data = []

  for (let i = 0; i < foodStalls.length; i++) {
    const stall = foodStalls[i]
    const stallData = { name: stall }

    for (let j = 0; j < timeSlots.length; j++) {
      const time = timeSlots[j]
      // Generate random queue length (higher at lunch time)
      let queueLength
      if (time === "12:00" || time === "13:00") {
        queueLength = Math.floor(Math.random() * 15) + 10 // 10-25 people at lunch
      } else {
        queueLength = Math.floor(Math.random() * 10) + 1 // 1-10 people at other times
      }

      stallData[time] = queueLength
    }

    data.push(stallData)
  }

  return data
}

// Generate trend data for a specific stall
const generateTrendData = (stallName, currentTime) => {
  const data = []
  const currentIndex = timeSlots.indexOf(currentTime)

  for (let i = 0; i < timeSlots.length; i++) {
    // Generate random queue length (higher at lunch time)
    let queueLength
    if (timeSlots[i] === "12:00" || timeSlots[i] === "13:00") {
      queueLength = Math.floor(Math.random() * 15) + 10 // 10-25 people at lunch
    } else {
      queueLength = Math.floor(Math.random() * 10) + 1 // 1-10 people at other times
    }

    // Add some prediction uncertainty for future times
    if (i > currentIndex) {
      queueLength = Math.floor(queueLength * (0.8 + Math.random() * 0.4)) // 80-120% of the original value
    }

    data.push({
      time: timeSlots[i],
      queue: queueLength,
      isPrediction: i > currentIndex,
    })
  }

  return data
}

// Get color based on queue length
const getQueueColor = (queueLength) => {
  if (queueLength >= 15) return "#ef4444" // Red
  if (queueLength >= 8) return "#f59e0b" // Amber
  return "#22c55e" // Green
}

// Get text color based on queue length
const getTextColor = (queueLength) => {
  if (queueLength >= 15) return "text-red-500"
  if (queueLength >= 8) return "text-amber-500"
  return "text-green-500"
}

// Get background color based on queue length
const getBgColor = (queueLength) => {
  if (queueLength >= 15) return "bg-red-500/20"
  if (queueLength >= 8) return "bg-amber-500/20"
  return "bg-green-500/20"
}

export default function QueueHeatmap() {
  const [currentTime, setCurrentTime] = useState("12:00")
  const [selectedStall, setSelectedStall] = useState("Pizza Station")
  const [heatmapData] = useState(generateHeatmapData())
  const [trendData, setTrendData] = useState(generateTrendData(selectedStall, currentTime))

  // Handle time slider change
  const handleTimeChange = (value) => {
    const newTime = timeSlots[value[0]]
    setCurrentTime(newTime)
    setTrendData(generateTrendData(selectedStall, newTime))
  }

  // Handle stall selection
  const handleStallSelect = (stall) => {
    setSelectedStall(stall)
    setTrendData(generateTrendData(stall, currentTime))
  }

  // Find best time to visit
  const findBestTime = () => {
    const stallData = heatmapData.find((d) => d.name === selectedStall)
    let bestTime = timeSlots[0]
    let minQueue = stallData[timeSlots[0]]

    for (let i = 1; i < timeSlots.length; i++) {
      const time = timeSlots[i]
      if (stallData[time] < minQueue) {
        minQueue = stallData[time]
        bestTime = time
      }
    }

    return { time: bestTime, queue: minQueue }
  }

  const bestTime = findBestTime()

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="text-2xl font-bold mb-2">Real-Time Animated Queue Heatmap</h2>
        <p className="text-gray-300">
          View queue density across different time slots. Green indicates low queue times, yellow for medium, and red
          for high. Drag the timeline slider to see predictions for different times of the day.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex justify-between items-center flex-wrap gap-2">
              <span>Queue Heatmap</span>
              <Badge className="bg-purple-600">{currentTime}</Badge>
            </CardTitle>
            <CardDescription className="text-gray-300">Click on a stall to see detailed queue trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="p-2 border border-gray-700 bg-gray-800">Food Stall</th>
                    {timeSlots.map((time) => (
                      <th
                        key={time}
                        className={`p-2 border border-gray-700 ${time === currentTime ? "bg-purple-900/50" : "bg-gray-800"}`}
                      >
                        {time}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {heatmapData.map((stall, index) => (
                    <motion.tr
                      key={stall.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`cursor-pointer ${selectedStall === stall.name ? "bg-purple-900/30" : ""}`}
                      onClick={() => handleStallSelect(stall.name)}
                    >
                      <td className="p-2 border border-gray-700 font-medium">{stall.name}</td>
                      {timeSlots.map((time) => {
                        const queueLength = stall[time]
                        return (
                          <td
                            key={time}
                            className={`p-2 border border-gray-700 text-center ${getBgColor(queueLength)} ${getTextColor(queueLength)}`}
                          >
                            <motion.div
                              initial={{ scale: 0.8 }}
                              animate={{
                                scale: time === currentTime ? [1, 1.1, 1] : 1,
                              }}
                              transition={{
                                duration: 0.5,
                                repeat: time === currentTime ? Number.POSITIVE_INFINITY : 0,
                                repeatType: "reverse",
                              }}
                            >
                              {queueLength}
                            </motion.div>
                          </td>
                        )
                      })}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">Timeline Slider</h3>
              <Slider
                defaultValue={[timeSlots.indexOf(currentTime)]}
                max={timeSlots.length - 1}
                step={1}
                onValueChange={handleTimeChange}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-gray-400">
                {timeSlots.map((time, index) => (
                  <span
                    key={time}
                    className={`${time === currentTime ? "text-purple-400 font-medium" : ""} ${index % 2 !== 0 ? "hidden sm:block" : ""}`}
                  >
                    {time}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Queue Trend for {selectedStall}</CardTitle>
                <CardDescription className="text-gray-300">
                  Solid line shows current data, dashed line shows AI predictions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] md:h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trendData}>
                      <defs>
                        <linearGradient id="queueGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="time" stroke="#9ca3af" tick={{ fill: "#9ca3af" }} />
                      <YAxis
                        stroke="#9ca3af"
                        tick={{ fill: "#9ca3af" }}
                        label={{
                          value: "Queue Length",
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
                                <p className={getTextColor(data.queue)}>Queue: {data.queue} people</p>
                                {data.isPrediction && <p className="text-purple-400 text-xs mt-1">AI Prediction</p>}
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="queue"
                        stroke="#8b5cf6"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#queueGradient)"
                        strokeDasharray={(d) => (d.isPrediction ? "5 5" : "0")}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>AI Recommendations</CardTitle>
                  <CardDescription className="text-gray-300">Smart suggestions to avoid long queues</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <motion.div
                      className="p-3 rounded-lg bg-purple-900/30 border border-purple-500/30"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className="font-medium mb-1 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        Best Time to Visit {selectedStall}
                      </h3>
                      <p className="text-green-400 text-lg font-bold">
                        {bestTime.time} ({bestTime.queue} people in queue)
                      </p>
                    </motion.div>

                    <motion.div
                      className="p-3 rounded-lg bg-purple-900/30 border border-purple-500/30"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h3 className="font-medium mb-1 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                        Current Status
                      </h3>
                      <p
                        className={`text-lg font-bold ${getTextColor(heatmapData.find((d) => d.name === selectedStall)[currentTime])}`}
                      >
                        {heatmapData.find((d) => d.name === selectedStall)[currentTime]} people in queue
                      </p>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Queue Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[150px] md:h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: "Short", value: 3, color: "#22c55e" },
                          { name: "Medium", value: 5, color: "#f59e0b" },
                          { name: "Long", value: 2, color: "#ef4444" },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="name" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-gray-900 p-2 border border-gray-700 rounded-md shadow-lg">
                                  <p>
                                    {label} Queues: {payload[0].value}
                                  </p>
                                </div>
                              )
                            }
                            return null
                          }}
                        />
                        <Bar dataKey="value">
                          {[
                            { name: "Short", value: 3, color: "#22c55e" },
                            { name: "Medium", value: 5, color: "#f59e0b" },
                            { name: "Long", value: 2, color: "#ef4444" },
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

