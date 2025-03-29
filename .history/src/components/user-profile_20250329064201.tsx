"use client"

import { useState } from "react"
import Image from "next/image"
import { Mail, Calendar, MapPin, Phone, Shield, Edit, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface UserData {
    id: string
    name: string
    email: string
    role: string
    joinDate: string
    location: string
    phone: string
    avatar: string
    status: "active" | "inactive" | "pending"
}

export default function UserProfile() {
    // In a real application, this would come from an API or auth context
    const [userData, setUserData] = useState<UserData>({
        id: "u_1234567890",
        name: "Dhwani Jiana",
        email: "tom.cook@example.com",
        role: "Administrator",
        joinDate: "January 10, 2023",
        location: "San Francisco, CA",
        phone: "+1 (555) 123-4567",
        avatar:
            "/vercel.svg",
        status: "active",
    })

    const [isEditing, setIsEditing] = useState(false)

    const statusColors = {
        active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        inactive: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
        pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    }

    return (
        <Card>
            <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>User Profile</CardTitle>
                        <CardDescription>Manage your account information</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                        <Edit className="h-4 w-4 mr-2" />
                        {isEditing ? "Cancel" : "Edit"}
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                <div className="flex flex-col items-center">
                    <div className="relative">
                        <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                            <Image
                                src={userData.avatar || "/placeholder.svg"}
                                alt={userData.name}
                                width={96}
                                height={96}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        {isEditing && (
                            <button className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full">
                                <Camera className="h-4 w-4" />
                            </button>
                        )}
                    </div>

                    <div className="mt-4 text-center">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{userData.name}</h3>
                        <div className="mt-1">
                            <Badge variant="outline" className={statusColors[userData.status]}>
                                {userData.status.charAt(0).toUpperCase() + userData.status.slice(1)}
                            </Badge>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center">
                        <Mail className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-500 dark:text-gray-400 w-20">Email:</span>
                        {isEditing ? (
                            <input
                                type="email"
                                value={userData.email}
                                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                className="flex-1 text-sm text-gray-900 dark:text-white bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-primary"
                            />
                        ) : (
                            <span className="text-sm text-gray-900 dark:text-white">{userData.email}</span>
                        )}
                    </div>

                    <div className="flex items-center">
                        <Shield className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-500 dark:text-gray-400 w-20">Role:</span>
                        {isEditing ? (
                            <select
                                value={userData.role}
                                onChange={(e) => setUserData({ ...userData, role: e.target.value })}
                                className="flex-1 text-sm text-gray-900 dark:text-white bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-primary"
                            >
                                <option value="Administrator">Administrator</option>
                                <option value="Editor">Editor</option>
                                <option value="Viewer">Viewer</option>
                            </select>
                        ) : (
                            <span className="text-sm text-gray-900 dark:text-white">{userData.role}</span>
                        )}
                    </div>

                    <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-500 dark:text-gray-400 w-20">Joined:</span>
                        <span className="text-sm text-gray-900 dark:text-white">{userData.joinDate}</span>
                    </div>

                    <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-500 dark:text-gray-400 w-20">Location:</span>
                        {isEditing ? (
                            <input
                                type="text"
                                value={userData.location}
                                onChange={(e) => setUserData({ ...userData, location: e.target.value })}
                                className="flex-1 text-sm text-gray-900 dark:text-white bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-primary"
                            />
                        ) : (
                            <span className="text-sm text-gray-900 dark:text-white">{userData.location}</span>
                        )}
                    </div>

                    <div className="flex items-center">
                        <Phone className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-500 dark:text-gray-400 w-20">Phone:</span>
                        {isEditing ? (
                            <input
                                type="tel"
                                value={userData.phone}
                                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                                className="flex-1 text-sm text-gray-900 dark:text-white bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-primary"
                            />
                        ) : (
                            <span className="text-sm text-gray-900 dark:text-white">{userData.phone}</span>
                        )}
                    </div>
                </div>
            </CardContent>

            {isEditing && (
                <CardFooter>
                    <Button className="w-full" onClick={() => setIsEditing(false)}>
                        Save Changes
                    </Button>
                </CardFooter>
            )}
        </Card>
    )
}

