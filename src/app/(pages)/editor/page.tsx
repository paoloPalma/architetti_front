import Link from "next/link"
import { Book, Users, CreditCard, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function EditorDashboard() {

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-[#1e4e6f] mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Corsi Totali</CardTitle>
            <Book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">+2 nell'ultimo mese</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Utenti Registrati</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">528</div>
            <p className="text-xs text-muted-foreground">+32 nell'ultimo mese</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Vendite</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€12,234</div>
            <p className="text-xs text-muted-foreground">+8% rispetto al mese scorso</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tasso di Conversione</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-muted-foreground">+0.5% rispetto al mese scorso</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Azioni Rapide</CardTitle>
            <CardDescription>Accedi rapidamente alle funzioni principali</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Link
              href="/editor/courses/new"
              className="flex items-center p-3 bg-[#1e4e6f] text-white rounded-md hover:bg-[#173d5a] transition-colors"
            >
              <Book className="mr-2 h-5 w-5" />
              Aggiungi Nuovo Corso
            </Link>

            <Link
              href="/editor/courses"
              className="flex items-center p-3 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              <Book className="mr-2 h-5 w-5 text-[#1e4e6f]" />
              Gestisci Corsi Esistenti
            </Link>

            <Link
              href="/editor/users"
              className="flex items-center p-3 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              <Users className="mr-2 h-5 w-5 text-[#1e4e6f]" />
              Gestisci Utenti
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Corsi Recenti</CardTitle>
            <CardDescription>Gli ultimi corsi aggiunti</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Corso di Sicurezza sul Lavoro", date: "12/03/2025", price: "€199.99" },
                { name: "Aggiornamento Normative Edilizie", date: "05/03/2025", price: "€149.99" },
                { name: "Certificazione Energetica", date: "28/02/2025", price: "€299.99" },
                { name: "Corso BIM Avanzato", date: "15/02/2025", price: "€399.99" },
              ].map((course, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div>
                    <p className="font-medium">{course.name}</p>
                    <p className="text-sm text-gray-500">Aggiunto il {course.date}</p>
                  </div>
                  <div className="font-medium">{course.price}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

