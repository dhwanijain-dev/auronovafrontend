import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Admin Panel - User Dashboard",
    description: "Admin panel for managing users and content",
}

export default function UserLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <div className="min-h-screen">{children}</div>
}

