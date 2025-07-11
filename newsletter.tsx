"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você pode adicionar a lógica para salvar o email
    console.log("Newsletter signup:", { name, email })
    setEmail("")
    setName("")
    alert("Cadastro realizado com sucesso!")
  }

  return (
    <div className="bg-yellow-400 py-16">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-black mb-4">RECEBA NOSSAS NOVIDADES, E DESCONTOS!</h2>
          <p className="text-black mb-8">
            Inscreva-se em nossa newsletter para receber promoções e conteúdos exclusivos.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white"
              required
            />
            <Input
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white"
              required
            />
            <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3">
              CADASTRAR
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
