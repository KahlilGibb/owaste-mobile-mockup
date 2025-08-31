"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Wallet,
  CreditCard,
  Gift,
  TrendingUp,
  Zap,
  DollarSign,
  ArrowUpRight,
  ArrowDownLeft,
  Star,
} from "lucide-react";

interface User {
  name: string;
  email: string;
  points: number;
}

interface EWalletDashboardProps {
  user: User | null;
  onBack: () => void;
  onUpdatePoints: (newPoints: number) => void;
}

// Mock rewards data
const rewards = [
  {
    id: 1,
    name: "Coffee Voucher",
    points: 500,
    image: "☕",
    description: "Free coffee at partner cafes",
  },
  {
    id: 2,
    name: "Shopping Discount",
    points: 1000,
    image: "🛍️",
    description: "10% off at eco-friendly stores",
  },
  {
    id: 3,
    name: "Plant a Tree",
    points: 750,
    image: "🌱",
    description: "Plant a tree in your name",
  },
  {
    id: 4,
    name: "Bus Pass",
    points: 1500,
    image: "🚌",
    description: "1-day public transport pass",
  },
];

// Mock transaction data
const recentTransactions = [
  {
    id: 1,
    type: "earned",
    amount: 50,
    description: "Plastic bottles recycled",
    date: "2024-01-15",
    icon: "♻️",
  },
  {
    id: 2,
    type: "redeemed",
    amount: -500,
    description: "Coffee voucher redeemed",
    date: "2024-01-14",
    icon: "☕",
  },
  {
    id: 3,
    type: "earned",
    amount: 75,
    description: "Metal cans deposited",
    date: "2024-01-13",
    icon: "🥫",
  },
  {
    id: 4,
    type: "earned",
    amount: 25,
    description: "Paper waste recycled",
    date: "2024-01-12",
    icon: "📄",
  },
];

export default function EWalletDashboard({
  user,
  onBack,
  onUpdatePoints,
}: EWalletDashboardProps) {
  const [convertAmount, setConvertAmount] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [selectedReward, setSelectedReward] = useState<number | null>(null);

  const handleConvertToCash = async () => {
    const amount = Number.parseInt(convertAmount);
    if (!amount || amount <= 0 || !user || amount > user.points) return;

    setIsConverting(true);

    // Simulate conversion process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    onUpdatePoints(user.points - amount);
    setConvertAmount("");
    setIsConverting(false);
  };

  const handleRedeemReward = async (reward: (typeof rewards)[0]) => {
    if (!user || user.points < reward.points) return;

    setSelectedReward(reward.id);

    // Simulate redemption process
    await new Promise((resolve) => setTimeout(resolve, 1500));

    onUpdatePoints(user.points - reward.points);
    setSelectedReward(null);
  };

  const cashValue = user ? (user.points * 0.01).toFixed(2) : "0.00"; // Base value in USD for conversion to IDR
  const nextRewardThreshold = 500;
  const progressToNextReward = user
    ? Math.min(
        ((user.points % nextRewardThreshold) / nextRewardThreshold) * 100,
        100
      )
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold text-foreground">E-Wallet</h2>
      </div>

      {/* Balance Card */}
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Wallet className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                Total Balance
              </span>
            </div>
            <Badge variant="secondary" className="animate-pulse">
              <Star className="h-3 w-3 mr-1" />
              Active
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold text-foreground">
                {user?.points || 0}
              </span>
              <span className="text-lg text-muted-foreground">points</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>
                Rp {(Number(cashValue) * 15000).toLocaleString("id-ID")} cash
                value
              </span>
            </div>
          </div>

          {/* Progress to next reward */}
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Next reward milestone
              </span>
              <span className="text-foreground font-medium">
                {nextRewardThreshold} pts
              </span>
            </div>
            <Progress value={progressToNextReward} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="convert" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="convert">Convert</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="convert" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <span>Convert to Cash</span>
              </CardTitle>
              <CardDescription>
                Convert your points to cash (1 point = Rp 150)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="convert-amount">Points to convert</Label>
                <Input
                  id="convert-amount"
                  type="number"
                  placeholder="Enter points amount"
                  value={convertAmount}
                  onChange={(e) => setConvertAmount(e.target.value)}
                  max={user?.points || 0}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Available: {user?.points || 0} points</span>
                  <span>
                    Cash value: Rp{" "}
                    {convertAmount
                      ? (Number.parseInt(convertAmount) * 150).toLocaleString(
                          "id-ID"
                        )
                      : "0"}
                  </span>
                </div>
              </div>

              <Button
                onClick={handleConvertToCash}
                disabled={
                  !convertAmount ||
                  Number.parseInt(convertAmount) <= 0 ||
                  !user ||
                  Number.parseInt(convertAmount) > user.points ||
                  isConverting
                }
                className="w-full"
                size="lg"
              >
                {isConverting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Converting...
                  </>
                ) : (
                  <>
                    <ArrowUpRight className="h-4 w-4 mr-2" />
                    Convert to Cash
                  </>
                )}
              </Button>

              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <h4 className="font-medium text-foreground">Conversion Info</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Minimum conversion: 100 points</li>
                  <li>• Processing time: 1-3 business days</li>
                  <li>• No conversion fees</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-4">
          <div className="grid gap-4">
            {rewards.map((reward) => (
              <Card
                key={reward.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{reward.image}</div>
                    <div className="flex-1 space-y-1">
                      <h4 className="font-medium text-foreground">
                        {reward.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {reward.description}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">
                          {reward.points} points
                        </span>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleRedeemReward(reward)}
                      disabled={
                        !user ||
                        user.points < reward.points ||
                        selectedReward === reward.id
                      }
                      variant={
                        user && user.points >= reward.points
                          ? "default"
                          : "secondary"
                      }
                      size="sm"
                    >
                      {selectedReward === reward.id ? (
                        <>
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                          Redeeming...
                        </>
                      ) : user && user.points >= reward.points ? (
                        <>
                          <Gift className="h-3 w-3 mr-1" />
                          Redeem
                        </>
                      ) : (
                        "Insufficient"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>Recent Activity</span>
              </CardTitle>
              <CardDescription>Your latest point transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center space-x-4 p-3 rounded-lg bg-muted/30"
                  >
                    <div className="text-lg">{transaction.icon}</div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium text-foreground">
                        {transaction.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {transaction.date}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {transaction.type === "earned" ? (
                        <ArrowDownLeft className="h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 text-orange-500" />
                      )}
                      <span
                        className={`font-medium ${
                          transaction.type === "earned"
                            ? "text-green-600"
                            : "text-orange-600"
                        }`}
                      >
                        {transaction.amount > 0 ? "+" : ""}
                        {transaction.amount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
