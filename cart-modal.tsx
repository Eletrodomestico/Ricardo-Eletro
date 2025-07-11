"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { Minus, Plus, Trash2 } from "lucide-react"
import { CheckoutModal } from "@/components/checkout-modal"
import { useState } from "react"

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, updateQuantity, removeFromCart, getTotalPrice } = useCart()
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const handleCheckout = () => {
    if (items.length === 0) {
      alert("Seu carrinho está vazio!")
      return
    }
    setIsCheckoutOpen(true)
  }

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) {
      alert("Seu carrinho está vazio!")
      return
    }

    const message = `🛒 *PEDIDO RICARDO ELETRO*\n\n${items
      .map(
        (item) =>
          `• ${item.name}\n  Qtd: ${item.quantity} | Valor: R$ ${(item.price * item.quantity).toFixed(2).replace(".", ",")}\n`,
      )
      .join(
        "\n",
      )}\n💰 *TOTAL: R$ ${getTotalPrice().toFixed(2).replace(".", ",")}*\n\nGostaria de finalizar esta compra!`

    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>🛒 Meu Carrinho ({items.length} itens)</DialogTitle>
          </DialogHeader>

          {items.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Seu carrinho está vazio</p>
              <Button onClick={onClose}>Continuar Comprando</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                  <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-2xl">📱</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <p className="text-green-600 font-bold">R$ {item.price.toFixed(2).replace(".", ",")}</p>
                    <p className="text-xs text-gray-500">{item.brand}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => removeFromCart(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold">Total:</span>
                  <span className="text-2xl font-bold text-green-600">
                    R$ {getTotalPrice().toFixed(2).replace(".", ",")}
                  </span>
                </div>

                <div className="space-y-2">
                  <Button
                    onClick={handleWhatsAppCheckout}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    💬 Finalizar no WhatsApp
                  </Button>

                  <Button onClick={handleCheckout} variant="outline" className="w-full bg-transparent">
                    💳 Pagar com Cartão
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </>
  )
}
