"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Award, Calendar, Clock, Gift, Star, Trophy, Users } from "lucide-react"
import confetti from "canvas-confetti"

// Mock user data
const userData = {
  id: 1,
  name: "Alex Johnson",
  avatar: "/placeholder.svg?height=100&width=100",
  level: 5,
  xp: 340,
  xpToNextLevel: 500,
  badges: [
    {
      id: 1,
      name: "Early Bird",
      description: "Visit the cafeteria before 9 AM",
      icon: <Clock className="h-5 w-5" />,
      achieved: true,
    },
    {
      id: 2,
      name: "Queue Skipper",
      description: "Skip long queues 5 times",
      icon: <Users className="h-5 w-5" />,
      achieved: true,
    },
    {
      id: 3,
      name: "Healthy Eater",
      description: "Order from Salad Bar 10 times",
      icon: <Award className="h-5 w-5" />,
      achieved: false,
    },
    {
      id: 4,
      name: "Cafeteria VIP",
      description: "Reach level 10",
      icon: <Trophy className="h-5 w-5" />,
      achieved: false,
    },
  ],
  rewards: [
    { id: 1, name: "Free Coffee", description: "Redeem a free coffee at any stall", points: 100, claimed: false },
    { id: 2, name: "Priority Queue", description: "Skip the line once", points: 200, claimed: false },
    { id: 3, name: "Lunch Discount", description: "20% off your next lunch", points: 300, claimed: true },
  ],
  history: [
    { id: 1, action: "Visited during off-peak hours", xp: 15, date: "2 hours ago" },
    { id: 2, action: "Pre-ordered lunch", xp: 10, date: "Yesterday" },
    { id: 3, action: 'Earned "Early Bird" badge', xp: 50, date: "3 days ago" },
  ],
  points: 450,
  theme: "default",
  availableThemes: [
    { id: "default", name: "Default", locked: false },
    { id: "dark", name: "Dark Mode", locked: false },
    { id: "neon", name: "Neon Glow", locked: true, requiredLevel: 8 },
    { id: "minimal", name: "Minimal", locked: true, requiredLevel: 10 },
  ],
}

// Leaderboard data
const leaderboardData = [
  { id: 1, name: "Sarah Chen", avatar: "/placeholder.svg?height=50&width=50", level: 8, points: 780 },
  { id: 2, name: "Alex Johnson", avatar: "/placeholder.svg?height=50&width=50", level: 5, points: 450, isUser: true },
  { id: 3, name: "Michael Brown", avatar: "/placeholder.svg?height=50&width=50", level: 7, points: 620 },
  { id: 4, name: "Emma Wilson", avatar: "/placeholder.svg?height=50&width=50", level: 10, points: 950 },
  { id: 5, name: "James Lee", avatar: "/placeholder.svg?height=50&width=50", level: 6, points: 510 },
].sort((a, b) => b.points - a.points)

export default function GamificationRewards() {
  const [activeTab, setActiveTab] = useState("profile")
  const [showRewardPopup, setShowRewardPopup] = useState(false)
  const [selectedReward, setSelectedReward] = useState(null)
  const [showXpGain, setShowXpGain] = useState(false)

  // Trigger XP gain animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowXpGain(true)

      // Trigger confetti when XP is gained
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })

      setTimeout(() => {
        setShowXpGain(false)
      }, 3000)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Handle reward claim
  const handleClaimReward = (reward) => {
    setSelectedReward(reward)
    setShowRewardPopup(true)

    // Trigger confetti when reward is claimed
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
      })
    }, 300)
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="text-2xl font-bold mb-2">Gamification & AI-Powered Rewards</h2>
        <p className="text-gray-300">
          Earn XP and unlock rewards by visiting during non-peak hours. Collect badges and compete on the leaderboard.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm overflow-hidden">
          <div className="h-2 w-full bg-gradient-to-r from-purple-600 to-pink-600"></div>
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-purple-500">
                  <AvatarImage src={userData.avatar} alt={userData.name} />
                  <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl">{userData.name}</CardTitle>
                  <CardDescription className="text-gray-300">Level {userData.level} Queue Master</CardDescription>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1 bg-purple-900/50 px-3 py-1 rounded-full">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-bold">{userData.points}</span>
                  <span className="text-xs text-gray-300">points</span>
                </div>
                <Badge className="bg-gradient-to-r from-purple-600 to-pink-600">Level {userData.level}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
                <span className="text-sm text-gray-300">
                  XP: {userData.xp}/{userData.xpToNextLevel}
                </span>
                <span className="text-sm text-purple-400">
                  {userData.xpToNextLevel - userData.xp} XP to Level {userData.level + 1}
                </span>
              </div>
              <div className="relative">
                <Progress value={(userData.xp / userData.xpToNextLevel) * 100} className="h-3" />

                {/* XP Gain Animation */}
                <AnimatePresence>
                  {showXpGain && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: -30 }}
                      exit={{ opacity: 0 }}
                      className="absolute top-0 right-1/4 text-green-400 font-bold"
                    >
                      +15 XP
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="flex overflow-x-auto border-b border-gray-700 mb-4 pb-1">
              <button
                className={`px-3 sm:px-4 py-2 font-medium whitespace-nowrap ${activeTab === "profile" ? "text-purple-400 border-b-2 border-purple-400" : "text-gray-400"}`}
                onClick={() => setActiveTab("profile")}
              >
                Profile
              </button>
              <button
                className={`px-3 sm:px-4 py-2 font-medium whitespace-nowrap ${activeTab === "badges" ? "text-purple-400 border-b-2 border-purple-400" : "text-gray-400"}`}
                onClick={() => setActiveTab("badges")}
              >
                Badges
              </button>
              <button
                className={`px-3 sm:px-4 py-2 font-medium whitespace-nowrap ${activeTab === "rewards" ? "text-purple-400 border-b-2 border-purple-400" : "text-gray-400"}`}
                onClick={() => setActiveTab("rewards")}
              >
                Rewards
              </button>
              <button
                className={`px-3 sm:px-4 py-2 font-medium whitespace-nowrap ${activeTab === "themes" ? "text-purple-400 border-b-2 border-purple-400" : "text-gray-400"}`}
                onClick={() => setActiveTab("themes")}
              >
                Themes
              </button>
            </div>

            {activeTab === "profile" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {userData.history.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: item.id * 0.1 }}
                      className="flex justify-between items-center p-3 rounded-lg bg-purple-900/20 border border-purple-500/20"
                    >
                      <div>
                        <p className="font-medium">{item.action}</p>
                        <p className="text-xs text-gray-400">{item.date}</p>
                      </div>
                      <Badge className="bg-green-600">+{item.xp} XP</Badge>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-4 p-3 rounded-lg bg-purple-900/30 border border-purple-500/30">
                  <h4 className="font-medium mb-1">AI Tip</h4>
                  <p className="text-sm">Visit the cafeteria between 2-3 PM to earn double XP points this week!</p>
                </div>
              </motion.div>
            )}

            {activeTab === "badges" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {userData.badges.map((badge) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: badge.id * 0.1 }}
                    className={`p-4 rounded-lg border ${
                      badge.achieved ? "bg-purple-900/30 border-purple-500/30" : "bg-gray-800/30 border-gray-700/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${badge.achieved ? "bg-purple-600" : "bg-gray-700"}`}>
                        {badge.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{badge.name}</h4>
                        <p className="text-xs text-gray-400">{badge.description}</p>
                      </div>
                    </div>
                    {badge.achieved ? (
                      <Badge className="mt-2 bg-green-600">Achieved</Badge>
                    ) : (
                      <Badge variant="outline" className="mt-2">
                        In Progress
                      </Badge>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === "rewards" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                {userData.rewards.map((reward) => (
                  <motion.div
                    key={reward.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reward.id * 0.1 }}
                    className="p-4 rounded-lg bg-purple-900/20 border border-purple-500/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-purple-900">
                        <Gift className="h-5 w-5 text-purple-300" />
                      </div>
                      <div>
                        <h4 className="font-medium">{reward.name}</h4>
                        <p className="text-xs text-gray-400">{reward.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end w-full sm:w-auto">
                      <Badge className="mb-2 bg-purple-600">{reward.points} points</Badge>
                      {reward.claimed ? (
                        <Badge variant="outline">Claimed</Badge>
                      ) : (
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 w-full sm:w-auto"
                          onClick={() => handleClaimReward(reward)}
                          disabled={userData.points < reward.points}
                        >
                          Claim
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === "themes" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {userData.availableThemes.map((theme) => (
                  <motion.div
                    key={theme.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: theme.id === "default" ? 0 : 0.1 }}
                    className={`p-4 rounded-lg border ${
                      theme.locked ? "bg-gray-800/30 border-gray-700/30" : "bg-purple-900/30 border-purple-500/30"
                    }`}
                  >
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <h4 className="font-medium">{theme.name}</h4>
                      {theme.locked ? (
                        <Badge variant="outline">Unlocks at Level {theme.requiredLevel}</Badge>
                      ) : (
                        <Button
                          size="sm"
                          variant={userData.theme === theme.id ? "default" : "outline"}
                          className={userData.theme === theme.id ? "bg-purple-600" : ""}
                        >
                          {userData.theme === theme.id ? "Active" : "Apply"}
                        </Button>
                      )}
                    </div>
                    <div
                      className={`mt-3 h-12 rounded-md ${
                        theme.id === "default"
                          ? "bg-gradient-to-r from-purple-600 to-pink-600"
                          : theme.id === "dark"
                            ? "bg-gradient-to-r from-gray-800 to-gray-900"
                            : theme.id === "neon"
                              ? "bg-gradient-to-r from-green-500 to-blue-500"
                              : "bg-gradient-to-r from-gray-200 to-gray-300"
                      }`}
                    ></div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                  Leaderboard
                </CardTitle>
                <CardDescription className="text-gray-300">Top queue-skippers this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboardData.map((user, index) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        user.isUser ? "bg-purple-900/30 border border-purple-500/30" : "bg-gray-800/20"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-800 text-sm font-bold">
                          {index + 1}
                        </div>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{user.name}</p>
                          <p className="text-xs text-gray-400">Level {user.level}</p>
                        </div>
                      </div>
                      <Badge className={index === 0 ? "bg-yellow-600" : "bg-purple-600"}>{user.points} pts</Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>AI Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-purple-900/20 border border-purple-500/20">
                    <h4 className="font-medium mb-1">Personalized Tip</h4>
                    <p className="text-sm">
                      Based on your history, you could earn 50 more XP this week by visiting the Salad Bar during
                      off-peak hours.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-purple-900/20 border border-purple-500/20">
                    <h4 className="font-medium mb-1">Next Badge Progress</h4>
                    <p className="text-sm mb-2">"Healthy Eater" - 4/10 Salad Bar visits</p>
                    <Progress value={40} className="h-2" />
                  </div>

                  <div className="p-3 rounded-lg bg-purple-900/20 border border-purple-500/20">
                    <h4 className="font-medium mb-1">Weekly Challenge</h4>
                    <p className="text-sm mb-2">Visit the cafeteria 3 days in a row during off-peak hours</p>
                    <Progress value={66} className="h-2" />
                    <p className="text-xs text-right mt-1 text-gray-400">2/3 completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Reward Claim Popup */}
      <AnimatePresence>
        {showRewardPopup && selectedReward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowRewardPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="bg-black/80 border-purple-500/30 overflow-hidden">
                <div className="h-2 w-full bg-gradient-to-r from-purple-600 to-pink-600"></div>
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-2xl">Reward Claimed!</CardTitle>
                  <CardDescription className="text-gray-300">You've successfully claimed your reward</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="h-20 w-20 rounded-full bg-purple-900/50 flex items-center justify-center mb-4">
                    <Gift className="h-10 w-10 text-purple-300" />
                  </div>

                  <h3 className="text-xl font-bold mb-1">{selectedReward.name}</h3>
                  <p className="text-gray-300 text-center mb-4">{selectedReward.description}</p>

                  <div className="bg-purple-900/30 border border-purple-500/30 p-3 rounded-lg w-full text-center mb-4">
                    <p className="text-sm">Reward code:</p>
                    <p className="font-mono font-bold text-lg">
                      CAFE-
                      {Math.floor(Math.random() * 10000)
                        .toString()
                        .padStart(4, "0")}
                    </p>
                  </div>

                  <p className="text-sm text-gray-400 mb-4">
                    Show this code to the cafeteria staff to redeem your reward
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
                    onClick={() => setShowRewardPopup(false)}
                  >
                    Close
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

