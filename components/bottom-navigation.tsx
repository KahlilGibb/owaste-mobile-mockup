"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, QrCode, Wallet, History } from "lucide-react"

interface BottomNavigationProps {
  currentView: "home" | "scanner" | "wallet" | "history"
  onNavigate: (view: "home" | "scanner" | "wallet" | "history") => void
  userPoints: number
}

export default function BottomNavigation({ currentView, onNavigate, userPoints }: BottomNavigationProps) {
  const navItems = [
    {
      id: "home" as const,
      label: "Home",
      icon: Home,
      active: currentView === "home",
    },
    {
      id: "scanner" as const,
      label: "Scan",
      icon: QrCode,
      active: currentView === "scanner",
      highlight: true, // Primary action
    },
    {
      id: "wallet" as const,
      label: "Wallet",
      icon: Wallet,
      active: currentView === "wallet",
      badge: userPoints > 0 ? userPoints.toString() : undefined,
    },
    {
      id: "history" as const,
      label: "History",
      icon: History,
      active: currentView === "history",
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border z-50">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center space-y-1 h-auto py-2 px-3 relative transition-all duration-200 ${
                item.active
                  ? "text-primary bg-primary/10 hover:bg-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              } ${item.highlight && !item.active ? "hover:scale-110 hover:text-primary" : ""}`}
            >
              <div className="relative">
                <Icon className={`h-5 w-5 ${item.highlight && item.active ? "animate-pulse" : ""}`} />
                {item.badge && (
                  <Badge
                    variant="secondary"
                    className="absolute -top-2 -right-2 h-4 min-w-4 text-xs px-1 animate-pulse"
                  >
                    {item.badge.length > 3 ? "999+" : item.badge}
                  </Badge>
                )}
                {item.active && (
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full animate-pulse"></div>
                )}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          )
        })}
      </div>
    </nav>
  )
}
