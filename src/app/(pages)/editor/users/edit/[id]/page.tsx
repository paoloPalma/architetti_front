"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import axios from "axios"
import { useAxios } from "@/context/AxiosProvider"

export default function EditUser() {
  const router = useRouter()
  const params = useParams()
  const userId = params.id

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "", // Empty by default for edit
  })

  const myaxios = useAxios();

  useEffect(() => {
    fetchUser()
  }, [userId])

  const fetchUser = async () => {
    try {
      setLoading(true)
      const response = await myaxios.get(`/users/${userId}`)

      // Format the data for the form
      const userData = response.data
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        role: userData.role || "",
        password: "", // Don't populate password for security
      })

      setLoading(false)
    } catch (error) {
      console.error("Error fetching user:", error)
      setLoading(false)
      alert("Errore nel caricamento dell'utente.")
      router.push("/editor/users")
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      // Only include password in the update if it's not empty
      const dataToSubmit = { ...formData }
      if (!dataToSubmit.password) {
        delete dataToSubmit.password
      }

      await myaxios.put(`/users/${userId}`, dataToSubmit)
      router.push("/editor/users")
    } catch (error) {
      console.error("Error updating user:", error)
      alert("Si è verificato un errore durante l'aggiornamento dell'utente.")
    } finally {
      setSaving(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e4e6f]"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/editor/users">
          <Button variant="outline" className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Indietro
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-[#1e4e6f]">Modifica Utente</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Informazioni Utente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome *</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Ruolo *</Label>
              <Select value={formData.role} onValueChange={(value) => handleSelectChange("role", value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona ruolo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Amministratore</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="user">Utente</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password {formData.password ? "*" : "(lascia vuoto per non modificare)"}</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full bg-[#1e4e6f] hover:bg-[#173d5a]" disabled={saving}>
                {saving ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Salvataggio...
                  </div>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Salva Modifiche
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
