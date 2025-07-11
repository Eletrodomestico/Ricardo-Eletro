"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  })

  const [currentSlide, setCurrentSlide] = useState(0)

  const bannerImages = [
    {
      title: "📺 SMART TVs",
      subtitle: "Até 50% OFF",
      description: "As melhores marcas com preços incríveis!",
      emoji: "📺",
    },
    {
      title: "📱 SMARTPHONES",
      subtitle: "iPhone e Samsung",
      description: "Últimos lançamentos com desconto!",
      emoji: "📱",
    },
    {
      title: "🧊 GELADEIRAS",
      subtitle: "Frost Free",
      description: "Para toda família com economia!",
      emoji: "🧊",
    },
    {
      title: "❄️ AR CONDICIONADO",
      subtitle: "Inverter",
      description: "Climatização perfeita para sua casa!",
      emoji: "❄️",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length)
    }, 4000)

    return () => clearInterval(slideTimer)
  }, [bannerImages.length])

  const currentBanner = bannerImages[currentSlide]

  return (
    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white py-12 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="text-9xl animate-bounce absolute top-4 left-4">📺</div>
        <div className="text-7xl animate-pulse absolute top-8 right-8">📱</div>
        <div className="text-8xl animate-bounce absolute bottom-4 left-1/4">🧊</div>
        <div className="text-6xl animate-pulse absolute bottom-8 right-1/4">❄️</div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Banner Carousel */}
        <div className="mb-8">
          <div className="text-8xl mb-4 animate-bounce">{currentBanner.emoji}</div>
          <h1 className="text-4xl font-bold mb-2">{currentBanner.title}</h1>
          <h2 className="text-2xl font-semibold text-yellow-300 mb-2">{currentBanner.subtitle}</h2>
          <p className="text-lg mb-4">{currentBanner.description}</p>
        </div>

        {/* Indicadores do Carousel */}
        <div className="flex justify-center space-x-2 mb-6">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-yellow-400" : "bg-white bg-opacity-50"
              }`}
            />
          ))}
        </div>

        <div className="bg-black bg-opacity-30 rounded-lg p-6 mb-6 inline-block">
          <h3 className="text-2xl font-bold mb-4">⏰ OFERTA RELÂMPAGO</h3>
          <div className="flex justify-center items-center space-x-2 mb-4">
            <span className="text-lg font-semibold">Termina em:</span>
            <div className="flex space-x-1">
              <div className="bg-red-700 px-3 py-2 rounded text-xl font-bold min-w-[50px]">
                {String(timeLeft.hours).padStart(2, "0")}
              </div>
              <span className="text-xl">:</span>
              <div className="bg-red-700 px-3 py-2 rounded text-xl font-bold min-w-[50px]">
                {String(timeLeft.minutes).padStart(2, "0")}
              </div>
              <span className="text-xl">:</span>
              <div className="bg-red-700 px-3 py-2 rounded text-xl font-bold min-w-[50px]">
                {String(timeLeft.seconds).padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Button className="bg-yellow-400 text-black hover:bg-yellow-500 font-bold px-8 py-4 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all">
            🔥 APROVEITAR OFERTAS
          </Button>
          <div className="text-sm">
            <span className="bg-green-500 px-3 py-1 rounded-full">✅ Frete Grátis acima de R$ 299</span>
            <span className="bg-blue-500 px-3 py-1 rounded-full ml-2">💳 12x sem juros</span>
          </div>
        </div>
      </div>
    </div>
  )
}
