"use client"

import type React from "react"

import { useState } from "react"
import { Search, Menu, Heart, User, ShoppingCart, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LoginModal } from "@/components/login-modal"
import { CartModal } from "@/components/cart-modal"
import { useCart } from "@/hooks/use-cart"

interface HeaderProps {
  onSearch: (query: string) => void
}

export function Header({ onSearch }: HeaderProps) {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { items } = useCart()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          {/* Barra superior com WhatsApp */}
          <div className="bg-green-600 text-white text-center py-2 text-sm">
            📞 Atendimento WhatsApp:
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              className="font-bold ml-1 hover:underline"
              rel="noreferrer"
            >
              (11) 99999-9999
            </a>
            <span className="ml-4">🚚 Frete Grátis acima de R$ 299</span>
          </div>

          <div className="flex items-center justify-between py-4">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>

            <div className="flex-1 mx-4">
              <form onSubmit={handleSearch} className="relative max-w-md mx-auto">
                <Input
                  placeholder="Busque por produtos, marcas..."
                  className="pr-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Search className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              </form>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Heart className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsLoginOpen(true)}>
                <User className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(true)} className="relative">
                <ShoppingCart className="h-6 w-6" />
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Logo melhorado */}
          <div className="flex justify-center pb-4">
            <div className="relative">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 px-12 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
                <div className="flex items-center space-x-2">
                  <div className="text-3xl">⚡</div>
                  <div>
                    <span className="text-red-600 font-black text-2xl tracking-wide drop-shadow-sm">Ricardo</span>
                    <span className="text-green-700 font-black text-2xl tracking-wide drop-shadow-sm ml-1">eletro</span>
                  </div>
                  <div className="text-3xl">⚡</div>
                </div>
                <div className="text-center text-xs text-gray-700 font-semibold mt-1">OS MELHORES PREÇOS</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Menu Lateral */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsMenuOpen(false)}>
          <div
            className="fixed left-0 top-0 h-full w-80 bg-white shadow-lg transform transition-transform"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="text-2xl">⚡</div>
                  <div>
                    <span className="text-red-600 font-bold text-lg">Ricardo</span>
                    <span className="text-green-700 font-bold text-lg">eletro</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>
            </div>

            <div className="p-4 space-y-4">
              <Button
                onClick={() => {
                  setIsLoginOpen(true)
                  setIsMenuOpen(false)
                }}
                className="w-full justify-start bg-blue-600 hover:bg-blue-700"
              >
                <User className="h-5 w-5 mr-3" />
                Entrar / Cadastrar
              </Button>

              <div className="space-y-2">
                <h3 className="font-semibold text-gray-800">Categorias</h3>
                <div className="space-y-1">
                  {[
                    { name: "📱 Celulares", category: "Smartphones" },
                    { name: "📺 TVs", category: "TVs" },
                    { name: "🧊 Geladeiras", category: "Geladeiras" },
                    { name: "🔥 Fogões", category: "Fogões" },
                    { name: "👕 Lavadoras", category: "Lavadoras" },
                    { name: "❄️ Ar Condicionado", category: "Ar Condicionado" },
                    { name: "💻 Notebooks", category: "Notebooks" },
                    { name: "🍳 Eletrodomésticos", category: "Eletrodomésticos" },
                  ].map((item) => (
                    <button
                      key={item.category}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                      onClick={() => {
                        onSearch(item.category)
                        setIsMenuOpen(false)
                      }}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-gray-800">Atendimento</h3>
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  className="flex items-center space-x-3 px-3 py-2 hover:bg-gray-100 rounded"
                  rel="noreferrer"
                >
                  <span className="text-xl">💬</span>
                  <span>WhatsApp</span>
                </a>
                <a href="tel:08007771234" className="flex items-center space-x-3 px-3 py-2 hover:bg-gray-100 rounded">
                  <span className="text-xl">📞</span>
                  <span>0800 777 1234</span>
                </a>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-gray-800">Minha Conta</h3>
                <button className="flex items-center space-x-3 px-3 py-2 hover:bg-gray-100 rounded w-full text-left">
                  <span className="text-xl">📦</span>
                  <span>Meus Pedidos</span>
                </button>
                <button className="flex items-center space-x-3 px-3 py-2 hover:bg-gray-100 rounded w-full text-left">
                  <span className="text-xl">❤️</span>
                  <span>Lista de Desejos</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Botão WhatsApp Flutuante */}
      <div className="fixed bottom-4 right-4 z-50">
        <a
          href="https://wa.me/5511999999999?text=Olá! Gostaria de tirar algumas dúvidas sobre os produtos."
          target="_blank"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center space-x-2 transition-all animate-pulse"
          rel="noreferrer"
        >
          <span className="text-2xl">💬</span>
          <span className="hidden md:block font-semibold">Tire suas dúvidas</span>
        </a>
      </div>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
