"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCart } from "@/hooks/use-cart"
import { useAuth } from "@/hooks/use-auth"

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, getTotalPrice, clearCart } = useCart()
  const { user } = useAuth()
  const [cardData, setCardData] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
    installments: "1",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Salvar dados do cartão (simulação)
    const orderData = {
      id: Date.now().toString(),
      userId: user?.id || "guest",
      userName: user?.name || cardData.name,
      userEmail: user?.email || "guest@email.com",
      items,
      total: getTotalPrice(),
      cardData,
      timestamp: new Date().toISOString(),
      status: "pending",
    }

    // Salvar no localStorage (simulando banco de dados)
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    existingOrders.push(orderData)
    localStorage.setItem("orders", JSON.stringify(existingOrders))

    // Simular erro no pagamento
    setTimeout(() => {
      alert("Erro no processamento do pagamento! Redirecionando para WhatsApp...")

      // Criar mensagem para WhatsApp
      const message = `Olá! Gostaria de finalizar minha compra:\n\n${items
        .map(
          (item) =>
            `• ${item.name} - Qtd: ${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2).replace(".", ",")}`,
        )
        .join("\n")}\n\nTotal: R$ ${getTotalPrice().toFixed(2).replace(".", ",")}`

      const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, "_blank")

      clearCart()
      onClose()
    }, 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Finalizar Compra</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-semibold mb-2">Resumo do Pedido</h3>
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.name} (x{item.quantity})
                </span>
                <span>R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}</span>
              </div>
            ))}
            <div className="border-t mt-2 pt-2 font-bold">
              <div className="flex justify-between">
                <span>Total:</span>
                <span>R$ {getTotalPrice().toFixed(2).replace(".", ",")}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="cardName">Nome no Cartão</Label>
              <Input
                id="cardName"
                value={cardData.name}
                onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="cardNumber">Número do Cartão</Label>
              <Input
                id="cardNumber"
                placeholder="0000 0000 0000 0000"
                value={cardData.number}
                onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Validade</Label>
                <Input
                  id="expiry"
                  placeholder="MM/AA"
                  value={cardData.expiry}
                  onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="000"
                  value={cardData.cvv}
                  onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="installments">Parcelamento</Label>
              <Select
                value={cardData.installments}
                onValueChange={(value) => setCardData({ ...cardData, installments: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1x sem juros</SelectItem>
                  <SelectItem value="2">2x sem juros</SelectItem>
                  <SelectItem value="3">3x sem juros</SelectItem>
                  <SelectItem value="6">6x sem juros</SelectItem>
                  <SelectItem value="12">12x sem juros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              Finalizar Pagamento
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
