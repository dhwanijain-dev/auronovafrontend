"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface ActivityItem {
    id: string
    user: {
        name: string
        avatar: string
        initials: string
    }
    action: string
    target: string
    timestamp: string
    type: "user" | "product" | "order" | "system"
}

export default function RecentActivity() {
    const [activities] = useState<ActivityItem[]>([
        {
            id: "act_1",
            user: {
                name: "John Smith",
                avatar:
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                initials: "JS",
            },
            action: "created",
            target: "New Product: Wireless Headphones",
            timestamp: "2 hours ago",
            type: "product",
        },
        {
            id: "act_2",
            user: {
                name: "Sarah Johnson",
                avatar:
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                initials: "SJ",
            },
            action: "completed",
            target: "Order #12345",
            timestamp: "5 hours ago",
            type: "order",
        },
        {
            id: "act_3",
            user: {
                name: "Michael Brown",
                avatar:
                    "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                initials: "MB",
            },
            action: "updated",
            target: "User Profile",
            timestamp: "1 day ago",
            type: "user",
        },
        {
            id: "act_4",
            user: {
                name: "System",
                avatar: "",
                initials: "SYS",
            },
            action: "performed",
            target: "Database Backup",
            timestamp: "1 day ago",
            type: "system",
        },
        {
            id: "act_5",
            user: {
                name: "Emily Davis",
                avatar:
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                initials: "ED",
            },
            action: "deleted",
            target: "Product: Outdated Item",
            timestamp: "2 days ago",
            type: "product",
        },
    ])

    const typeColors = {
        user: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
        product: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        order: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
        system: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest actions across the platform</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {activities.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-4">
                            <Avatar>
                                <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                                <AvatarFallback>{activity.user.initials}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1 flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-sm text-gray-900 dark:text-white">{activity.user.name}</span>
                                    <Badge variant="outline" className={typeColors[activity.type]}>
                                        {activity.type}
                                    </Badge>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {activity.action} {activity.target}
                                </p>
                                <p className="text-xs text-gray-400 dark:text-gray-500">{activity.timestamp}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

