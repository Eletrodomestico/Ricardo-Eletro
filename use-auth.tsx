"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

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

interface Order {
  id: string
  userId: string
  userName: string
  userEmail: string
  items: any[]
  total: number
  cardData: any
  timestamp: string
  status: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: { name: string; email: string; password: string; phone?: string }) => Promise<boolean>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
  getUserOrders: () => Order[]
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Verificar se há usuário logado no localStorage
    const savedUser = localStorage.getItem("currentUser")
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setUser(userData)
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Buscar usuários salvos
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const foundUser = users.find((u: any) => u.email === email && u.password === password)

      if (foundUser) {
        // Calcular estatísticas do usuário
        const orders = JSON.parse(localStorage.getItem("orders") || "[]")
        const userOrders = orders.filter((order: any) => order.userEmail === email)

        const userWithStats = {
          ...foundUser,
          totalOrders: userOrders.length,
          totalSpent: userOrders.reduce((sum: number, order: any) => sum + order.total, 0),
        }

        setUser(userWithStats)
        setIsAuthenticated(true)
        localStorage.setItem("currentUser", JSON.stringify(userWithStats))
        return true
      }
      return false
    } catch (error) {
      console.error("Erro no login:", error)
      return false
    }
  }

  const register = async (userData: {
    name: string
    email: string
    password: string
    phone?: string
  }): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]")

      // Verificar se email já existe
      if (users.find((u: any) => u.email === userData.email)) {
        return false
      }

      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        registeredAt: new Date().toISOString(),
        totalOrders: 0,
        totalSpent: 0,
      }

      // Salvar usuário (incluindo senha para autenticação)
      const userWithPassword = { ...newUser, password: userData.password }
      users.push(userWithPassword)
      localStorage.setItem("users", JSON.stringify(users))

      // Fazer login automático
      setUser(newUser)
      setIsAuthenticated(true)
      localStorage.setItem("currentUser", JSON.stringify(newUser))

      return true
    } catch (error) {
      console.error("Erro no registro:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("currentUser")
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem("currentUser", JSON.stringify(updatedUser))

      // Atualizar também na lista de usuários
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const userIndex = users.findIndex((u: any) => u.id === user.id)
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...userData }
        localStorage.setItem("users", JSON.stringify(users))
      }
    }
  }

  const getUserOrders = (): Order[] => {
    if (!user) return []
    const orders = JSON.parse(localStorage.getItem("orders") || "[]")
    return orders.filter((order: Order) => order.userEmail === user.email)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateUser,
        getUserOrders,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
