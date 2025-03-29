"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, ShoppingCart, BarChart, Settings, LogOut, X } from "lucide-react"

interface SidebarProps {
    open: boolean
    setOpen: (open: boolean) => void
}

interface NavItem {
    name: string
    href: string
    icon: React.ElementType
    current: boolean
}

export default function AdminSidebar({ open, setOpen }: SidebarProps) {
    const pathname = usePathname()

    const [navigation, setNavigation] = useState<NavItem[]>([
        { name: "Dashboard", href: "/", icon: LayoutDashboard, current: true },
        
    ])

    useEffect(() => {
        const updatedNavigation = navigation.map((item) => ({
            ...item,
            current: item.href === pathname,
        }))
        setNavigation(updatedNavigation)
    }, [pathname])

    return (
        <>
            {/* Mobile sidebar */}
            <div className={`fixed inset-0 z-40 lg:hidden ${open ? "block" : "hidden"}`} role="dialog" aria-modal="true">
                <div
                    className="fixed inset-0 bg-gray-600 bg-opacity-75"
                    aria-hidden="true"
                    onClick={() => setOpen(false)}
                ></div>

                <div className="fixed inset-0 flex z-40">
                    <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-800 shadow-xl">
                        <div className="absolute top-0 right-0 -mr-12 pt-2">
                            <button
                                type="button"
                                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                onClick={() => setOpen(false)}
                            >
                                <span className="sr-only">Close sidebar</span>
                                <X className="h-6 w-6 text-white" aria-hidden="true" />
                            </button>
                        </div>

                        <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                            <div className="flex-shrink-0 flex items-center px-4">
                                <span className="text-xl font-bold text-gray-900 dark:text-white">Admin Panel</span>
                            </div>
                            <nav className="mt-5 px-2 space-y-1">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${item.current
                                                ? "bg-gray-100 dark:bg-gray-900 text-primary"
                                                : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                            }`}
                                        onClick={() => setOpen(false)}
                                    >
                                        <item.icon
                                            className={`mr-4 h-6 w-6 ${item.current
                                                    ? "text-primary"
                                                    : "text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                                                }`}
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
                            <Link
                                href="/logout"
                                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                            >
                                <LogOut className="h-5 w-5 mr-3 text-gray-400" />
                                <span>Logout</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop sidebar */}
            <div className="hidden lg:flex lg:flex-shrink-0">
                <div className="flex flex-col w-64">
                    <div className="flex flex-col h-0 flex-1 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                        <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-gray-200 dark:border-gray-700">
                            <span className="text-xl font-bold text-gray-900 dark:text-white">Admin Panel</span>
                        </div>

                        <div className="flex-1 flex flex-col overflow-y-auto">
                            <nav className="flex-1 px-2 py-4 space-y-1">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${item.current
                                                ? "bg-gray-100 dark:bg-gray-900 text-primary"
                                                : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                            }`}
                                    >
                                        <item.icon
                                            className={`mr-3 h-5 w-5 ${item.current
                                                    ? "text-primary"
                                                    : "text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                                                }`}
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
                            <Link
                                href="/logout"
                                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm"
                            >
                                <LogOut className="h-5 w-5 mr-3 text-gray-400" />
                                <span>Logout</span>
                            </Link>
                        </div>

                        <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
                            <div className="flex-shrink-0 w-full group block">
                                <div className="flex items-center">
                                    <div>
                                        <img
                                            className="inline-block h-9 w-9 rounded-full"
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt=""
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-700 dark:text-white">Tom Cook</p>
                                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Administrator</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

