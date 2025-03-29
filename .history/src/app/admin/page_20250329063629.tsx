"use client"

import { useState } from "react"
import AdminSidebar from "@/app/admin"
import UserProfile from "@/"
import StatsCards from "@/"
import RecentActivity from "@/"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminPanel() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header */}
                <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
                    <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                        <button
                            className="lg:hidden text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <div className="text-xl font-semibold text-gray-800 dark:text-white lg:block">Admin Dashboard</div>
                        <div className="flex items-center">
                            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none">
                                <span className="sr-only">View notifications</span>
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                            {/* User Profile Section */}
                            <div className="lg:col-span-1">
                                <UserProfile />
                            </div>

                            {/* Dashboard Content */}
                            <div className="lg:col-span-2">
                                <Tabs defaultValue="dashboard" className="w-full">
                                    <TabsList className="grid w-full grid-cols-3">
                                        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                                        <TabsTrigger value="settings">Settings</TabsTrigger>
                                        <TabsTrigger value="analytics">Analytics</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="dashboard" className="space-y-6 mt-6">
                                        <StatsCards />
                                        <RecentActivity />
                                    </TabsContent>

                                    <TabsContent value="settings" className="mt-6">
                                        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Account Settings</h3>
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                        Email Notifications
                                                    </label>
                                                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600">
                                                        <option>All notifications</option>
                                                        <option>Important only</option>
                                                        <option>None</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                        Two-Factor Authentication
                                                    </label>
                                                    <div className="flex items-center mt-1">
                                                        <button className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium">
                                                            Enable
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="analytics" className="mt-6">
                                        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Analytics Overview</h3>
                                            <div className="h-80 flex items-center justify-center border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                                                <p className="text-gray-500 dark:text-gray-400">Analytics charts will appear here</p>
                                            </div>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

