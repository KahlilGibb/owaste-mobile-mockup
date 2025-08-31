"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { QrCode, Wallet, History, User, Recycle, Bell } from "lucide-react"
import LoginForm from "@/components/auth/login-form"
import RegisterForm from "@/components/auth/register-form"
import QRScanner from "@/components/qr-scanner"
import EWalletDashboard from "@/components/e-wallet-dashboard"
import TransactionHistory from "@/components/transaction-history"
import BottomNavigation from "@/components/bottom-navigation"

export default function HomePage() {
  const [currentView, setCurrentView] = useState<"home" | "login" | "register" | "scanner" | "wallet" | "history">(
    "home",
  )
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string; points: number } | null>(null)
  const [hasNotifications, setHasNotifications] = useState(true)

  const handleLogin = (email: string, password: string) => {
    // Mock authentication
    setUser({ name: "John Doe", email, points: 1250 })
    setIsAuthenticated(true)
    setCurrentView("home")
  }

  const handleRegister = (name: string, email: string, password: string) => {
    // Mock registration
    setUser({ name, email, points: 0 })
    setIsAuthenticated(true)
    setCurrentView("home")
  }

  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
    setCurrentView("home")
  }

  const handleNavigation = (view: "home" | "scanner" | "wallet" | "history") => {
    setCurrentView(view)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Recycle className="h-8 w-8 text-primary animate-pulse" />
              <h1 className="text-2xl font-bold text-foreground">O'Waste</h1>
            </div>
            <p className="text-muted-foreground">Smart Waste Management</p>
          </div>

          <div className="animate-in fade-in-50 duration-500">
            {currentView === "login" ? (
              <LoginForm onLogin={handleLogin} onSwitchToRegister={() => setCurrentView("register")} />
            ) : currentView === "register" ? (
              <RegisterForm onRegister={handleRegister} onSwitchToLogin={() => setCurrentView("login")} />
            ) : (
              <Card className="animate-in slide-in-from-bottom-5 duration-300">
                <CardHeader className="text-center">
                  <CardTitle>Welcome to O'Waste</CardTitle>
                  <CardDescription>Turn your waste into rewards</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button onClick={() => setCurrentView("login")} className="w-full" size="lg">
                    Sign In
                  </Button>
                  <Button onClick={() => setCurrentView("register")} variant="outline" className="w-full" size="lg">
                    Create Account
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card/95 backdrop-blur-sm border-b border-border p-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Recycle className="h-6 w-6 text-primary" />
            <h1 className="text-lg font-semibold text-foreground">O'Waste</h1>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="secondary" className="text-sm animate-pulse">
              {user?.points} pts
            </Badge>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              {hasNotifications && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-ping"></div>
              )}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="p-4">
        <div className="animate-in fade-in-50 duration-300">
          {currentView === "home" && (
            <div className="space-y-6 animate-in slide-in-from-right-5 duration-300">
              <div className="text-center space-y-2">
                <h2 className="text-xl font-semibold text-foreground">Welcome back, {user?.name}!</h2>
                <p className="text-muted-foreground">Ready to make a difference?</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card
                  className="cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20"
                  onClick={() => setCurrentView("scanner")}
                >
                  <CardContent className="p-6 text-center space-y-2">
                    <QrCode className="h-8 w-8 text-primary mx-auto animate-pulse" />
                    <h3 className="font-medium text-foreground">Scan QR</h3>
                    <p className="text-sm text-muted-foreground">Scan waste bins</p>
                  </CardContent>
                </Card>

                <Card
                  className="cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200 bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20"
                  onClick={() => setCurrentView("wallet")}
                >
                  <CardContent className="p-6 text-center space-y-2">
                    <Wallet className="h-8 w-8 text-primary mx-auto" />
                    <h3 className="font-medium text-foreground">E-Wallet</h3>
                    <p className="text-sm text-muted-foreground">Manage points</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Recent Activity
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentView("history")}
                      className="hover:bg-primary/10"
                    >
                      <History className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">♻️</span>
                        <span className="text-sm text-foreground">Plastic bottles recycled</span>
                      </div>
                      <Badge variant="secondary" className="animate-in zoom-in-50 duration-200">
                        +50 pts
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">📄</span>
                        <span className="text-sm text-foreground">Paper waste deposited</span>
                      </div>
                      <Badge variant="secondary" className="animate-in zoom-in-50 duration-200 animation-delay-100">
                        +25 pts
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span className="text-lg">🏆</span>
                    <span>Weekly Challenge</span>
                  </CardTitle>
                  <CardDescription>Recycle 10 items this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-foreground font-medium">7/10 items</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: "70%" }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground">3 more items to earn 100 bonus points!</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {currentView === "scanner" && (
            <div className="animate-in slide-in-from-right-5 duration-300">
              <QRScanner
                onBack={() => setCurrentView("home")}
                onScanSuccess={(points) => {
                  setUser((prev) => (prev ? { ...prev, points: prev.points + points } : null))
                  setCurrentView("home")
                }}
              />
            </div>
          )}

          {currentView === "wallet" && (
            <div className="animate-in slide-in-from-right-5 duration-300">
              <EWalletDashboard
                user={user}
                onBack={() => setCurrentView("home")}
                onUpdatePoints={(newPoints) => setUser((prev) => (prev ? { ...prev, points: newPoints } : null))}
              />
            </div>
          )}

          {currentView === "history" && (
            <div className="animate-in slide-in-from-right-5 duration-300">
              <TransactionHistory onBack={() => setCurrentView("home")} />
            </div>
          )}
        </div>
      </main>

      <BottomNavigation currentView={currentView} onNavigate={handleNavigation} userPoints={user?.points || 0} />
    </div>
  )
}
