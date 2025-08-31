"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Camera, CheckCircle, AlertCircle, Zap } from "lucide-react"

interface QRScannerProps {
  onBack: () => void
  onScanSuccess: (points: number) => void
}

// Mock waste types and their point values
const wasteTypes = [
  { id: "plastic", name: "Plastic Bottles", points: 50, color: "bg-blue-500" },
  { id: "paper", name: "Paper Waste", points: 25, color: "bg-yellow-500" },
  { id: "metal", name: "Metal Cans", points: 75, color: "bg-gray-500" },
  { id: "glass", name: "Glass Bottles", points: 60, color: "bg-green-500" },
]

export default function QRScanner({ onBack, onScanSuccess }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [earnedPoints, setEarnedPoints] = useState(0)
  const [wasteType, setWasteType] = useState<string>("")
  const [hasCamera, setHasCamera] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    return () => {
      // Cleanup camera stream when component unmounts
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // Use back camera on mobile
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setIsScanning(true)
      }
    } catch (error) {
      console.error("Camera access denied:", error)
      setHasCamera(false)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    setIsScanning(false)
  }

  const simulateQRScan = () => {
    setIsProcessing(true)

    // Simulate QR code detection after 2 seconds
    setTimeout(() => {
      const randomWaste = wasteTypes[Math.floor(Math.random() * wasteTypes.length)]
      const qrData = `owaste-bin-${randomWaste.id}-${Date.now()}`

      setScanResult(qrData)
      setWasteType(randomWaste.name)
      setEarnedPoints(randomWaste.points)
      setIsProcessing(false)
      stopCamera()

      // Auto-complete after showing result
      setTimeout(() => {
        onScanSuccess(randomWaste.points)
      }, 2000)
    }, 2000)
  }

  const handleManualScan = () => {
    // For demo purposes, simulate a successful scan
    simulateQRScan()
  }

  if (scanResult) {
    return (
      <div className="space-y-6 animate-in slide-in-from-bottom-5 duration-500">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-semibold text-foreground">Scan Complete</h2>
        </div>

        <Card className="text-center animate-in zoom-in-50 duration-300">
          <CardContent className="p-8 space-y-6">
            <div className="animate-bounce">
              <CheckCircle className="h-16 w-16 text-primary mx-auto" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-foreground">Success!</h3>
              <p className="text-muted-foreground">You've deposited {wasteType}</p>
            </div>

            <div className="flex items-center justify-center space-x-2">
              <Zap className="h-5 w-5 text-primary" />
              <Badge variant="secondary" className="text-lg px-4 py-2">
                +{earnedPoints} points
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground">Points will be added to your wallet automatically</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold text-foreground">QR Scanner</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Camera className="h-5 w-5 text-primary" />
            <span>Scan Waste Bin QR Code</span>
          </CardTitle>
          <CardDescription>Point your camera at the QR code on the waste bin to earn points</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!hasCamera ? (
            <div className="text-center space-y-4 p-8">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto" />
              <div className="space-y-2">
                <h3 className="font-medium text-foreground">Camera Access Required</h3>
                <p className="text-sm text-muted-foreground">Please allow camera access to scan QR codes</p>
              </div>
              <Button onClick={() => window.location.reload()} variant="outline">
                Try Again
              </Button>
            </div>
          ) : (
            <>
              <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
                {isScanning ? (
                  <>
                    <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                    {/* Scanning overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-48 h-48 border-2 border-primary rounded-lg relative">
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-primary rounded-tl-lg"></div>
                        <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-primary rounded-tr-lg"></div>
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-primary rounded-bl-lg"></div>
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-primary rounded-br-lg"></div>

                        {/* Scanning line animation */}
                        <div className="absolute inset-x-0 top-0 h-0.5 bg-primary animate-pulse"></div>
                      </div>
                    </div>

                    {isProcessing && (
                      <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                        <div className="text-center space-y-2">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                          <p className="text-sm text-foreground">Processing QR code...</p>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <Camera className="h-16 w-16 text-muted-foreground mx-auto" />
                      <p className="text-muted-foreground">Camera preview will appear here</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {!isScanning ? (
                  <Button onClick={startCamera} className="w-full" size="lg">
                    <Camera className="h-4 w-4 mr-2" />
                    Start Camera
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <Button onClick={handleManualScan} className="w-full" size="lg" disabled={isProcessing}>
                      {isProcessing ? "Processing..." : "Simulate QR Scan"}
                    </Button>
                    <Button onClick={stopCamera} variant="outline" className="w-full bg-transparent">
                      Stop Camera
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Waste types info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Earn Points</CardTitle>
          <CardDescription>Different waste types earn different points</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {wasteTypes.map((waste) => (
              <div key={waste.id} className="flex items-center space-x-2 p-2 rounded-lg bg-muted/50">
                <div className={`w-3 h-3 rounded-full ${waste.color}`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{waste.name}</p>
                  <p className="text-xs text-muted-foreground">{waste.points} pts</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
