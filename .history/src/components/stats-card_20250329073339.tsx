"use client"

import type React from "react"

import { Users, ShoppingCart, DollarSign, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface StatCardProps {
    title: string
    value: string
    description: string
    icon: React.ReactNode
    trend: {
        value: string
        isPositive: boolean
    }
}

function StatCard({ title, value, description, icon, trend }: StatCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">{icon}</div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <div className="flex items-center space-x-2">
                    <span className={`text-xs ${trend.isPositive ? "text-green-500" : "text-red-500"}`}>{trend.value}</span>
                    <CardDescription className="text-xs">{description}</CardDescription>
                </div>
            </CardContent>
        </Card>
    )
}

export default function StatsCards() {
    const stats = [
        {
            title: "Total Visitors",
            value: "2,853",
            description: "compared to last month",
            icon: <Users className="h-4 w-4 text-gray-500" />,
            trend: {
                value: "+12.5%",
                isPositive: true,
            },
        },
        {
            title: "Active Products",
            value: "1,253",
            description: "compared to last month",
            icon: <ShoppingCart className="h-4 w-4 text-gray-500" />,
            trend: {
                value: "+8.2%",
                isPositive: true,
            },
        },
        {
            title: "Total Revenue",
            value: "$45,231",
            description: "compared to last month",
            icon: <DollarSign className="h-4 w-4 text-gray-500" />,
            trend: {
                value: "+5.4%",
                isPositive: true,
            },
        },
        {
            title: "Conversion Rate",
            value: "3.2%",
            description: "compared to last month",
            icon: <TrendingUp className="h-4 w-4 text-gray-500" />,
            trend: {
                value: "-0.5%",
                isPositive: false,
            },
        },
    ]

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
            ))}
        </div>
    )
}

