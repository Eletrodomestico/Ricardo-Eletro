"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, User } from "lucide-react"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { user, login, register, logout, getUserOrders, isAuthenticated } = useAuth()
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const success = await login(loginData.email, loginData.password)

    if (success) {
      onClose()
    } else {
      alert("Email ou senha incorretos!")
    }

    setIsLoading(false)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (registerData.password !== registerData.confirmPassword) {
      alert("Senhas não coincidem!")
      return
    }

    if (registerData.password.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres!")
      return
    }

    setIsLoading(true)

    const success = await register({
      name: registerData.name,
      email: registerData.email,
      password: registerData.password,
      phone: registerData.phone,
    })

    if (success) {
      onClose()
    } else {
      alert("Este email já está cadastrado!")
    }

    setIsLoading(false)
  }

  const handleLogout = () => {
    logout()
    onClose()
  }

  const formatCurrency = (value: number) => {
    return `R$ ${value.toFixed(2).replace(".", ",")}`
  }

  if (isAuthenticated && user) {
    const userOrders = getUserOrders()

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center">
              <div className="bg-yellow-400 px-4 py-2 rounded-lg inline-block mb-4">
                <span className="text-red-600 font-bold">Ricardo</span>
                <span className="text-green-600 font-bold ml-1">eletro</span>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Perfil do Usuário */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{user.name}</h3>
                      <p className="text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  <Button onClick={handleLogout} variant="outline" size="sm">
                    Sair
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-2">
                      <ShoppingBag className="h-6 w-6 text-green-600" />
                    </div>
                    <p className="text-2xl font-bold text-green-600">{user.totalOrders}</p>
                    <p className="text-sm text-gray-600">Pedidos</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-100 p-3 rounded-full w-fit mx-auto mb-2">
                      <span className="text-purple-600 font-bold text-xl">R$</span>
                    </div>
                    <p className="text-2xl font-bold text-purple-600">{formatCurrency(user.totalSpent)}</p>
                    <p className="text-sm text-gray-600">Total Gasto</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-orange-100 p-3 rounded-full w-fit mx-auto mb-2">
                      <span className="text-orange-600 font-bold text-xl">⭐</span>
                    </div>
                    <p className="text-2xl font-bold text-orange-600">
                      {user.totalOrders >= 10 ? "VIP" : user.totalOrders >= 5 ? "Gold" : "Silver"}
                    </p>
                    <p className="text-sm text-gray-600">Status</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Histórico de Pedidos */}
            <Card>
              <CardHeader>
                <h3 className="font-bold text-lg">📦 Meus Pedidos</h3>
              </CardHeader>
              <CardContent>
                {userOrders.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Você ainda não fez nenhum pedido</p>
                    <Button onClick={onClose} className="mt-4">
                      Começar a Comprar
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-60 overflow-y-auto">
                    {userOrders.map((order, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold">Pedido #{index + 1}</p>
                            <p className="text-sm text-gray-600">
                              {new Date(order.timestamp).toLocaleDateString("pt-BR")}
                            </p>
                          </div>
                          <Badge variant="secondary">{formatCurrency(order.total)}</Badge>
                        </div>
                        <div className="space-y-1">
                          {order.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="text-sm text-gray-600">
                              • {item.name} (x{item.quantity})
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            <div className="bg-yellow-400 px-4 py-2 rounded-lg inline-block mb-4">
              <span className="text-red-600 font-bold">Ricardo</span>
              <span className="text-green-600 font-bold ml-1">eletro</span>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Entrar</TabsTrigger>
            <TabsTrigger value="register">Cadastrar</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-red-500 hover:bg-red-600" disabled={isLoading}>
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="reg-email">E-mail</Label>
                <Input
                  id="reg-email"
                  type="email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefone (opcional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={registerData.phone}
                  onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="reg-password">Senha (mín. 6 caracteres)</Label>
                <Input
                  id="reg-password"
                  type="password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  required
                  minLength={6}
                />
              </div>
              <div>
                <Label htmlFor="confirm-password">Confirmar Senha</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                {isLoading ? "Cadastrando..." : "Cadastrar"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
