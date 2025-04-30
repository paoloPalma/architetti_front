"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Building, Calendar, ChevronRight, Clock, Linkedin, X, ShoppingCart } from "lucide-react"
import Footer from "@/components/layouts/Footer"
import Header from "@/components/layouts/Header"
import { useCourse } from "@/context/Course"

export default function Home() {
  // State to track which courses are in the cart
  // const [cartItems, setCartItems] = useState<number[]>([])

  const { courses, idCourses, setIdCourses, cartCourses } = useCourse()
 
  

 

  // State to track which course type is selected
  const [selectedType, setSelectedType] = useState("asincrono")

  // Filter courses by type
  const filteredCourses = courses.filter((course) => course.typology_id === +selectedType);

  

  // Add to cart function
  const addToCart = (courseId: number) => {
    if (!idCourses.includes(courseId)) {
      // const course = courses.find((course) => course.id === courseId)
      setIdCourses([...idCourses, courseId])
      localStorage.setItem("idCourses", JSON.stringify([...idCourses, courseId]))

      // In a real app, you might want to show a notification or toast here
      console.log(`Course ${courseId} added to cart`)
    }
  }

  console.log(process.env.NEXT_PUBLIC_BACKEND_URL + '/' );
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Cart notification - show when items are in cart */}
      {idCourses.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <Link
            href="/carrello"
            className="flex items-center bg-[#1e4e6f] text-white px-4 py-3 rounded-full shadow-lg hover:bg-[#173d5a] transition-transform hover:scale-105"
          >
            <ShoppingCart size={20} className="mr-2" />
            <span className="font-medium">
              {cartCourses.length} {cartCourses.length === 1 ? "corso" : "corsi"}
            </span>
            <span className="ml-2 bg-white text-[#1e4e6f] w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
              →
            </span>
          </Link>
        </div>
      )}

      {/* Hero Section - Simplified with better visual hierarchy */}
      <section className="relative bg-[#c5dbd9] overflow-hidden">
        <div className="container mx-auto px-4 py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 z-10 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1e4e6f] mb-6 leading-tight">
              Formazione professionale <span className="text-white">di qualità</span>
            </h1>
            <p className="text-[#1e4e6f] mb-8 text-lg max-w-md">
              Scopri i nostri corsi professionali progettati per migliorare le tue competenze e avanzare nella tua
              carriera.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#courses"
                className="bg-[#1e4e6f] text-white px-8 py-3 rounded-md font-medium text-center transition-transform hover:scale-105"
              >
                Esplora i corsi
              </Link>
              <Link
                href="#about"
                className="bg-white text-[#1e4e6f] px-8 py-3 rounded-md font-medium text-center border border-[#1e4e6f] transition-transform hover:scale-105"
              >
                Chi siamo
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#1e4e6f] opacity-10 rounded-full"></div>
            <Image
              src="/placeholder.svg?height=600&width=600"
              alt="Formazione professionale"
              width={600}
              height={600}
              className="relative z-10 rounded-lg shadow-xl transform transition-transform hover:scale-105 duration-500"
            />
          </div>
        </div>
      </section>

      {/* Stats Section - More elegant with animations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-lg transition-all hover:shadow-md">
              <Building className="mx-auto text-[#1e4e6f] mb-4" size={36} />
              <h2 className="text-5xl font-bold text-[#1e4e6f] mb-2">528</h2>
              <p className="text-sm text-gray-600 uppercase tracking-wider">Professionisti formati</p>
            </div>
            <div className="p-6 rounded-lg transition-all hover:shadow-md">
              <Calendar className="mx-auto text-[#1e4e6f] mb-4" size={36} />
              <h2 className="text-5xl font-bold text-[#1e4e6f] mb-2">6</h2>
              <p className="text-sm text-gray-600 uppercase tracking-wider">Corsi in presenza</p>
            </div>
            <div className="p-6 rounded-lg transition-all hover:shadow-md">
              <Clock className="mx-auto text-[#1e4e6f] mb-4" size={36} />
              <h2 className="text-5xl font-bold text-[#1e4e6f] mb-2">37</h2>
              <p className="text-sm text-gray-600 uppercase tracking-wider">Ore di formazione</p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Categories - Unified design */}
      <section id="courses" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e4e6f] mb-4">I nostri corsi</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Offriamo diverse modalità di apprendimento per adattarsi alle tue esigenze. Scegli tra corsi asincroni,
              sincroni o frontali per un'esperienza formativa completa.
            </p>
          </div>

          {/* Course Types Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                selectedType === "2"
                  ? "bg-[#1e4e6f] text-white"
                  : "bg-white text-[#1e4e6f] border border-[#1e4e6f]"
              }`}
              onClick={() => setSelectedType("2")}
            >
              Asincroni
            </button>
            <button
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                selectedType === "1"
                  ? "bg-[#1e4e6f] text-white"
                  : "bg-white text-[#1e4e6f] border border-[#1e4e6f]"
              }`}
              onClick={() => setSelectedType("1")}
            >
              Sincroni
            </button>
            <button
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                selectedType === "3"
                  ? "bg-[#1e4e6f] text-white"
                  : "bg-white text-[#1e4e6f] border border-[#1e4e6f]"
              }`}
              onClick={() => setSelectedType("3")}
            >
              Frontali
            </button>
          </div>

          {/* Dynamic Courses from Backend */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden group transition-all hover:shadow-xl"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL + '/' + course.file_path}`}
                      alt={course.name}
                      width={400}
                      height={200}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                    {course.available && (
                      <div className="absolute top-4 left-0 bg-green-500 text-white px-4 py-1 text-sm font-medium">
                        DISPONIBILE
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-[#1e4e6f] mb-2">{course.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-xl text-[#1e4e6f]">€{course.list_price || "N/D"}</p>

                      {idCourses.includes(course.id) ? (
                        <Link
                          href="/carrello"
                          className="bg-[#c5dbd9] text-[#1e4e6f] px-4 py-2 rounded-md font-medium flex items-center hover:bg-[#b3ccc9] transition-colors"
                        >
                          <ShoppingCart size={16} className="mr-1" /> Nel carrello
                        </Link>
                      ) : (
                        <button
                          onClick={() => addToCart(course.id)}
                          className="bg-[#1e4e6f] text-white px-4 py-2 rounded-md font-medium flex items-center hover:bg-[#173d5a] transition-colors"
                        >
                          <ShoppingCart size={16} className="mr-1" /> Aggiungi
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-500 text-lg">Nessun corso disponibile in questa categoria.</p>
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <Link
              href="#"
              className="inline-flex items-center bg-[#1e4e6f] text-white px-8 py-3 rounded-md font-medium transition-transform hover:scale-105"
            >
              VISUALIZZA TUTTI I CORSI <ChevronRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Course Types Section - More visual */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e4e6f] mb-4">Modalità di formazione</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Scegli la modalità di apprendimento più adatta alle tue esigenze e al tuo stile di vita.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#1e4e6f] text-white p-8 rounded-lg shadow-md transform transition-transform hover:scale-105">
              <h3 className="text-2xl font-bold mb-4">Corsi online</h3>
              <p className="mb-4">
                Segui le lezioni comodamente da casa o dall'ufficio, con la massima flessibilità di orari e ritmi di
                apprendimento.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="mr-2">✓</span> Accesso illimitato ai contenuti
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span> Studia al tuo ritmo
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span> Materiali scaricabili
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-[#1e4e6f] transform transition-transform hover:scale-105">
              <h3 className="text-2xl font-bold text-[#1e4e6f] mb-4">Seminari</h3>
              <p className="text-gray-600 mb-4">
                Eventi formativi di breve durata, focalizzati su temi specifici e di attualità con esperti del settore.
              </p>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li className="flex items-start">
                  <span className="text-[#1e4e6f] mr-2">✓</span> Interazione con i docenti
                </li>
                <li className="flex items-start">
                  <span className="text-[#1e4e6f] mr-2">✓</span> Networking professionale
                </li>
                <li className="flex items-start">
                  <span className="text-[#1e4e6f] mr-2">✓</span> Certificati di partecipazione
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-[#1e4e6f] transform transition-transform hover:scale-105">
              <h3 className="text-2xl font-bold text-[#1e4e6f] mb-4">Corsi frontali</h3>
              <p className="text-gray-600 mb-4">
                Lezioni in aula con docenti qualificati e la possibilità di interagire direttamente con esercitazioni
                pratiche.
              </p>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li className="flex items-start">
                  <span className="text-[#1e4e6f] mr-2">✓</span> Esercitazioni pratiche
                </li>
                <li className="flex items-start">
                  <span className="text-[#1e4e6f] mr-2">✓</span> Feedback immediato
                </li>
                <li className="flex items-start">
                  <span className="text-[#1e4e6f] mr-2">✓</span> Materiale didattico completo
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Events and News Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-[#c5dbd9] rounded-full flex items-center justify-center mr-4">
                  <Calendar className="text-[#1e4e6f]" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-[#1e4e6f]">Eventi e Viaggi</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Scopri gli eventi formativi e le opportunità di networking per i professionisti del settore. Partecipa
                ai nostri viaggi studio per espandere le tue conoscenze e la tua rete professionale.
              </p>
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <div className="w-12 h-12 bg-[#c5dbd9] rounded-md flex items-center justify-center mr-4">
                    <span className="font-bold text-[#1e4e6f]">15</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1e4e6f]">Workshop di Architettura Sostenibile</h4>
                    <p className="text-sm text-gray-500">15 Aprile 2025 - Milano</p>
                  </div>
                </div>
              </div>
              <Link href="#" className="inline-flex items-center text-[#1e4e6f] font-medium hover:underline">
                Vedi tutti gli eventi <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-[#c5dbd9] rounded-full flex items-center justify-center mr-4">
                  <Building className="text-[#1e4e6f]" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-[#1e4e6f]">Corsi abilitanti</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Scopri i nostri corsi abilitanti e gli aggiornamenti professionali obbligatori per mantenere la tua
                certificazione e rimanere al passo con le normative più recenti.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-center p-3 border-l-4 border-[#1e4e6f] bg-gray-50">
                  <div className="ml-2">
                    <h4 className="font-bold text-[#1e4e6f]">Coordinatore Sicurezza Cantieri</h4>
                    <p className="text-sm text-gray-500">120 ore - Riconosciuto dal Ministero</p>
                  </div>
                </div>
                <div className="flex items-center p-3 border-l-4 border-[#1e4e6f] bg-gray-50">
                  <div className="ml-2">
                    <h4 className="font-bold text-[#1e4e6f]">Aggiornamento Antincendio</h4>
                    <p className="text-sm text-gray-500">40 ore - Conforme alle normative vigenti</p>
                  </div>
                </div>
              </div>
              <Link href="#" className="inline-flex items-center text-[#1e4e6f] font-medium hover:underline">
                Scopri tutti i corsi abilitanti <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-[#1e4e6f] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Resta aggiornato</h2>
            <p className="mb-8 text-lg">
              Iscriviti alla nostra newsletter per ricevere aggiornamenti sui nuovi corsi, eventi e opportunità
              formative.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="La tua email"
                className="flex-grow px-4 py-3 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#c5dbd9]"
              />
              <button
                type="submit"
                className="bg-[#c5dbd9] text-[#1e4e6f] px-6 py-3 rounded-md font-medium transition-transform hover:scale-105"
              >
                Iscriviti
              </button>
            </form>
            <p className="mt-4 text-sm text-gray-300">
              Iscrivendoti accetti la nostra privacy policy. Potrai disiscriverti in qualsiasi momento.
            </p>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-[#1e4e6f] mb-2">Seguici sui social</h3>
            <p className="text-gray-600">Resta connesso con noi per le ultime novità e aggiornamenti</p>
          </div>

          <div className="flex justify-center space-x-4 mb-8">
            <Link
              href="#"
              className="bg-[#1e4e6f] text-white w-12 h-12 flex items-center justify-center rounded-full transition-transform hover:scale-110"
            >
              <X size={20} />
            </Link>
            <Link
              href="#"
              className="bg-[#1e4e6f] text-white w-12 h-12 flex items-center justify-center rounded-full transition-transform hover:scale-110"
            >
              <Linkedin size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="overflow-hidden rounded-lg shadow-md group">
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  alt={`Social media ${item}`}
                  width={300}
                  height={200}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

