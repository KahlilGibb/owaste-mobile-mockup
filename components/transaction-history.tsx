"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  History,
  Search,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  TrendingUp,
  TrendingDown,
  Gift,
  Recycle,
} from "lucide-react"

interface TransactionHistoryProps {
  onBack: () => void
}

// Mock comprehensive transaction data
const allTransactions = [
  {
    id: "txn_001",
    type: "earned",
    category: "recycling",
    amount: 50,
    description: "Plastic bottles recycled",
    location: "Bin #A123 - Main Street",
    date: "2024-01-15T10:30:00Z",
    status: "completed",
    wasteType: "plastic",
    icon: "♻️",
  },
  {
    id: "txn_002",
    type: "redeemed",
    category: "reward",
    amount: -500,
    description: "Coffee voucher redeemed",
    location: "Green Cafe - Downtown",
    date: "2024-01-14T14:15:00Z",
    status: "completed",
    rewardType: "voucher",
    icon: "☕",
  },
  {
    id: "txn_003",
    type: "earned",
    category: "recycling",
    amount: 75,
    description: "Metal cans deposited",
    location: "Bin #B456 - Park Avenue",
    date: "2024-01-13T09:45:00Z",
    status: "completed",
    wasteType: "metal",
    icon: "🥫",
  },
  {
    id: "txn_004",
    type: "converted",
    category: "cashout",
    amount: -1000,
    description: "Points converted to cash",
    location: "O'Waste App",
    date: "2024-01-12T16:20:00Z",
    status: "processing",
    cashAmount: "$10.00",
    icon: "💰",
  },
  {
    id: "txn_005",
    type: "earned",
    category: "recycling",
    amount: 25,
    description: "Paper waste recycled",
    location: "Bin #C789 - University Campus",
    date: "2024-01-12T11:10:00Z",
    status: "completed",
    wasteType: "paper",
    icon: "📄",
  },
  {
    id: "txn_006",
    type: "earned",
    category: "bonus",
    amount: 100,
    description: "Weekly recycling bonus",
    location: "O'Waste Rewards",
    date: "2024-01-10T00:00:00Z",
    status: "completed",
    bonusType: "weekly",
    icon: "🎉",
  },
  {
    id: "txn_007",
    type: "redeemed",
    category: "reward",
    amount: -750,
    description: "Plant a tree donation",
    location: "EcoForest Initiative",
    date: "2024-01-08T13:30:00Z",
    status: "completed",
    rewardType: "donation",
    icon: "🌱",
  },
  {
    id: "txn_008",
    type: "earned",
    category: "recycling",
    amount: 60,
    description: "Glass bottles recycled",
    location: "Bin #D012 - Shopping Mall",
    date: "2024-01-07T15:45:00Z",
    status: "completed",
    wasteType: "glass",
    icon: "🍾",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 border-green-200"
    case "processing":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "failed":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return {
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  }
}

export default function TransactionHistory({ onBack }: TransactionHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null)

  // Filter transactions based on search and filters
  const filteredTransactions = allTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = filterType === "all" || transaction.type === filterType
    const matchesStatus = filterStatus === "all" || transaction.status === filterStatus

    return matchesSearch && matchesType && matchesStatus
  })

  // Calculate statistics
  const totalEarned = allTransactions.filter((t) => t.type === "earned").reduce((sum, t) => sum + t.amount, 0)

  const totalSpent = Math.abs(
    allTransactions
      .filter((t) => t.type === "redeemed" || t.type === "converted")
      .reduce((sum, t) => sum + t.amount, 0),
  )

  const thisMonthTransactions = allTransactions.filter((t) => {
    const transactionDate = new Date(t.date)
    const now = new Date()
    return transactionDate.getMonth() === now.getMonth() && transactionDate.getFullYear() === now.getFullYear()
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold text-foreground">Transaction History</h2>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm text-muted-foreground">Total Earned</span>
            </div>
            <p className="text-xl font-bold text-foreground mt-1">{totalEarned}</p>
            <p className="text-xs text-muted-foreground">points</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingDown className="h-4 w-4 text-orange-500" />
              <span className="text-sm text-muted-foreground">Total Spent</span>
            </div>
            <p className="text-xl font-bold text-foreground mt-1">{totalSpent}</p>
            <p className="text-xs text-muted-foreground">points</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex space-x-2">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="earned">Earned</SelectItem>
                <SelectItem value="redeemed">Redeemed</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="month">This Month</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-3">
          {filteredTransactions.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium text-foreground mb-2">No transactions found</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
              </CardContent>
            </Card>
          ) : (
            filteredTransactions.map((transaction) => {
              const { date, time } = formatDate(transaction.date)
              return (
                <Card
                  key={transaction.id}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedTransaction(selectedTransaction === transaction.id ? null : transaction.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-xl">{transaction.icon}</div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-foreground">{transaction.description}</h4>
                          <div className="flex items-center space-x-1">
                            {transaction.type === "earned" ? (
                              <ArrowDownLeft className="h-4 w-4 text-green-500" />
                            ) : (
                              <ArrowUpRight className="h-4 w-4 text-orange-500" />
                            )}
                            <span
                              className={`font-medium ${
                                transaction.type === "earned" ? "text-green-600" : "text-orange-600"
                              }`}
                            >
                              {transaction.amount > 0 ? "+" : ""}
                              {transaction.amount}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">{transaction.location}</p>
                          <Badge variant="outline" className={getStatusColor(transaction.status)}>
                            {transaction.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {date} at {time}
                        </p>
                      </div>
                    </div>

                    {/* Expanded details */}
                    {selectedTransaction === transaction.id && (
                      <div className="mt-4 pt-4 border-t border-border space-y-2 animate-in slide-in-from-top-2 duration-200">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Transaction ID:</span>
                            <p className="font-mono text-xs text-foreground">{transaction.id}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Category:</span>
                            <p className="text-foreground capitalize">{transaction.category}</p>
                          </div>
                          {transaction.wasteType && (
                            <div>
                              <span className="text-muted-foreground">Waste Type:</span>
                              <p className="text-foreground capitalize">{transaction.wasteType}</p>
                            </div>
                          )}
                          {transaction.cashAmount && (
                            <div>
                              <span className="text-muted-foreground">Cash Value:</span>
                              <p className="text-foreground">{transaction.cashAmount}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })
          )}
        </TabsContent>

        <TabsContent value="month" className="space-y-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>This Month Summary</span>
              </CardTitle>
              <CardDescription>
                {thisMonthTransactions.length} transactions in{" "}
                {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {thisMonthTransactions.filter((t) => t.type === "earned").reduce((sum, t) => sum + t.amount, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Earned</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-600">
                    {Math.abs(
                      thisMonthTransactions
                        .filter((t) => t.type === "redeemed" || t.type === "converted")
                        .reduce((sum, t) => sum + t.amount, 0),
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">Spent</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{thisMonthTransactions.length}</p>
                  <p className="text-sm text-muted-foreground">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {thisMonthTransactions.slice(0, 5).map((transaction) => {
            const { date, time } = formatDate(transaction.date)
            return (
              <Card key={transaction.id}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-xl">{transaction.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-foreground">{transaction.description}</h4>
                        <span
                          className={`font-medium ${
                            transaction.type === "earned" ? "text-green-600" : "text-orange-600"
                          }`}
                        >
                          {transaction.amount > 0 ? "+" : ""}
                          {transaction.amount}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {date} at {time}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Recycle className="h-5 w-5 text-primary" />
                  <span>Recycling Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["plastic", "metal", "paper", "glass"].map((wasteType) => {
                    const count = allTransactions.filter((t) => t.wasteType === wasteType).length
                    const points = allTransactions
                      .filter((t) => t.wasteType === wasteType)
                      .reduce((sum, t) => sum + t.amount, 0)

                    return (
                      <div key={wasteType} className="flex items-center justify-between">
                        <span className="text-sm text-foreground capitalize">{wasteType}</span>
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">{count} deposits</p>
                          <p className="text-xs text-muted-foreground">{points} points</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Gift className="h-5 w-5 text-primary" />
                  <span>Rewards Redeemed</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {allTransactions
                    .filter((t) => t.type === "redeemed")
                    .map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between">
                        <span className="text-sm text-foreground">{transaction.description}</span>
                        <span className="text-sm font-medium text-orange-600">{Math.abs(transaction.amount)} pts</span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
