"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAxios } from "@/context/AxiosProvider"
import { useCourse } from "@/context/Course"

export default function EditCourse() {
  const router = useRouter()
  const params = useParams()
  const courseId = params.id
  const {courses, setCourses, handleGetCourses} = useCourse()

  const course = courses.find((course) => course.id === +courseId);
  
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState(course);

  const myaxios = useAxios();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
      // Convert numeric fields
      const dataToSubmit = {
        ...formData,
        list_price: Number.parseFloat(formData.list_price),
        max_number_partecipants: Number.parseInt(formData.max_number_partecipants),
        category_id: Number.parseInt(formData.category_id),
        typology_id: Number.parseInt(formData.typology_id),
        method_id: Number.parseInt(formData.method_id),
      }

      await myaxios.put(`/courses/${courseId}`, dataToSubmit)
      router.push("/editor/courses")
    } catch (error) {
      console.error("Error updating course:", error)
      alert("Si è verificato un errore durante l'aggiornamento del corso.")
    } finally {
      setSaving(false)
      handleGetCourses()
    }
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
        <Link href="/editor/courses">
          <Button variant="outline" className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Indietro
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-[#1e4e6f]">Modifica Corso</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Informazioni di base */}
          <Card>
            <CardHeader>
              <CardTitle>Informazioni di Base</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome del Corso *</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrizione</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="list_price">Prezzo (€) *</Label>
                  <Input
                    id="list_price"
                    name="list_price"
                    type="number"
                    step="0.01"
                    value={formData.list_price}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max_number_partecipants">Numero Max Partecipanti *</Label>
                  <Input
                    id="max_number_partecipants"
                    name="max_number_partecipants"
                    type="number"
                    value={formData.max_number_partecipants}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="remaining_places_alert">Avviso Posti Rimanenti</Label>
                <Input
                  id="remaining_places_alert"
                  name="remaining_places_alert"
                  value={formData.remaining_places_alert}
                  onChange={handleChange}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="enable_booking"
                  name="enable_booking"
                  checked={formData.enable_booking}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, enable_booking: checked }))}
                />
                <Label htmlFor="enable_booking">Abilita Prenotazione</Label>
              </div>
            </CardContent>
          </Card>

          {/* Codici e Categorie */}
          <Card>
            <CardHeader>
              <CardTitle>Codici e Categorie</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="course_code">Codice Corso *</Label>
                  <Input
                    id="course_code"
                    name="course_code"
                    value={formData.course_code}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alphanumeric_code">Codice Alfanumerico</Label>
                  <Input
                    id="alphanumeric_code"
                    name="alphanumeric_code"
                    value={formData.alphanumeric_code}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category_id">Categoria *</Label>
                <Select
                  value={formData.category_id}
                  onValueChange={(value) => handleSelectChange("category_id", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Categoria 1</SelectItem>
                    <SelectItem value="2">Categoria 2</SelectItem>
                    <SelectItem value="3">Categoria 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="typology_id">Tipologia *</Label>
                <Select
                  value={formData.typology_id}
                  onValueChange={(value) => handleSelectChange("typology_id", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona tipologia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Sincrono</SelectItem>
                    <SelectItem value="2">Asincrono</SelectItem>
                    <SelectItem value="3">Frontale</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="method_id">Metodo *</Label>
                <Select
                  value={formData.method_id}
                  onValueChange={(value) => handleSelectChange("method_id", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona metodo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Online</SelectItem>
                    <SelectItem value="2">In presenza</SelectItem>
                    <SelectItem value="3">Misto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Dettagli del Corso */}
          <Card>
            <CardHeader>
              <CardTitle>Dettagli del Corso</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tutor">Tutor *</Label>
                <Input id="tutor" name="tutor" value={formData.tutor} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accessibility">Accessibilità *</Label>
                <Input
                  id="accessibility"
                  name="accessibility"
                  value={formData.accessibility}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Durata *</Label>
                <Input id="duration" name="duration" value={formData.duration} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lesson_timetable">Orario Lezioni *</Label>
                <Input
                  id="lesson_timetable"
                  name="lesson_timetable"
                  value={formData.lesson_timetable}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="plan">Piano *</Label>
                <Input id="plan" name="plan" value={formData.plan} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="attendance_obligation">Obbligo di Frequenza *</Label>
                <Input
                  id="attendance_obligation"
                  name="attendance_obligation"
                  value={formData.attendance_obligation}
                  onChange={handleChange}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Informazioni Aggiuntive */}
          <Card>
            <CardHeader>
              <CardTitle>Informazioni Aggiuntive</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="activation">Attivazione *</Label>
                <Input id="activation" name="activation" value={formData.activation} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="payment_in_installments">Pagamento a Rate</Label>
                <Input
                  id="payment_in_installments"
                  name="payment_in_installments"
                  value={formData.payment_in_installments}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">Città *</Label>
                <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Indirizzo *</Label>
                <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="info">Informazioni Aggiuntive</Label>
                <Textarea id="info" name="info" value={formData.info} onChange={handleChange} rows={3} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex justify-end">
          <Button type="submit" className="bg-[#1e4e6f] hover:bg-[#173d5a]" disabled={saving}>
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
      </form>
    </div>
  )
}

