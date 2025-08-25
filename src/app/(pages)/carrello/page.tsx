"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, Trash2, CreditCard, ShoppingBag } from "lucide-react";
import { useCourse } from "@/context/Course";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

export default function CartPage() {
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [promoCode, setPromoCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const { courses, idCourses, setIdCourses, cartCourses } = useCourse();

  // Calculate subtotal for all items in cart
  const calculateSubtotal = () => {
    return cartCourses.reduce((total, course) => {
      return total + +course.list_price;
    }, 0);
  };



  const subtotal = calculateSubtotal();
  const total = subtotal; // No additional fees in this example

  // Handle removing item from cart
  const handleRemoveItem = (courseId: number) => {
    console.log(courseId);

    // Remove course from cartCourses
    setIdCourses((prev) => prev.filter((i) => i !== courseId));
    localStorage.setItem(
      "idCourses",
      JSON.stringify(idCourses.filter((i) => i !== courseId))
    );

    // Also remove from quantities state
    const newQuantities = { ...quantities };
    delete newQuantities[courseId];
    setQuantities(newQuantities);
  };



  return (
    <div>
          <Header />
    <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <h1 className="text-3xl font-bold text-[#1e4e6f]">Il tuo carrello</h1>
          <div className="ml-auto bg-[#c5dbd9] text-[#1e4e6f] px-3 py-1 rounded-full text-sm font-medium">
            {cartCourses.length} {cartCourses.length === 1 ? "corso" : "corsi"}
          </div>
        </div>

        {/* Notification - only show if cart has items */}
        {cartCourses.length > 0 && (
          <div className="bg-[#e6f3f2] border-l-4 border-[#1e4e6f] p-4 mb-8 flex items-start">

            <div className="mr-2 text-[#1e4e6f]">✓</div>
            <p className="text-[#1e4e6f]">
              <span className="font-semibold">
                {cartCourses.length === 1
                  ? `"${cartCourses[0].name}"`
                  : `${cartCourses.length} corsi`}
              </span>{" "}
              {cartCourses.length === 1 ? "è stato" : "sono stati"} aggiunto al
              tuo carrello.
            </p>
          </div>
        )}

        {cartCourses.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="mb-4">
              <ShoppingBag size={48} className="mx-auto text-gray-300" />
            </div>
            <h2 className="text-xl font-bold text-[#1e4e6f] mb-2">
              Il tuo carrello è vuoto
            </h2>
            <p className="text-gray-500 mb-6">
              Non hai ancora aggiunto nessun corso al carrello.
            </p>
            <Link
              href="/"
              className="inline-flex items-center bg-[#1e4e6f] text-white px-6 py-3 rounded-md font-medium hover:bg-[#173d5a] transition-colors"
            >
              <ChevronLeft size={16} className="mr-2" /> Torna ai corsi
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-[#1e4e6f]">
                    Dettaglio ordine
                  </h2>
                </div>

                <div className="divide-y divide-gray-100">
                  {cartCourses.map((course) => (
                    <div
                      key={course.id}
                      className="p-6 flex flex-col md:flex-row"
                    >
                      <div className="md:w-1/4 mb-4 md:mb-0">
                        <div className="bg-gray-100 rounded-lg overflow-hidden">
                          <Image
                            src={
                              course.image ||
                              "/placeholder.svg?height=120&width=200"
                            }
                            alt={course.name}
                            width={200}
                            height={120}
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      </div>

                      <div className="md:w-3/4 md:pl-6 flex flex-col">
                        <div className="flex justify-between mb-2">
                          <h3 className="font-bold text-[#1e4e6f]">
                            {course.name}
                          </h3>
                          <button
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            onClick={() => handleRemoveItem(course.id)}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>

                        <p className="text-sm text-gray-500 mb-4">
                          {course.type === "asincrono"
                            ? "Corso online - Accesso illimitato"
                            : course.type === "sincrono"
                            ? "Corso online - Lezioni in diretta"
                            : "Corso in presenza"}
                        </p>

                        <div className="text-xl font-bold text-[#1e4e6f]">
                          €{course.list_price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 bg-gray-50 flex flex-wrap gap-4">
                  <div className="flex-grow md:flex-grow-0 flex">
                    <input
                      type="text"
                      placeholder="Codice promozionale"
                      className="p-2 border rounded-l w-full md:w-64 focus:outline-none focus:ring-1 focus:ring-[#1e4e6f]"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <button className="bg-[#1e4e6f] text-white px-4 py-2 rounded-r text-sm font-medium hover:bg-[#173d5a] transition-colors">
                      Applica
                    </button>
                  </div>

                  <Link
                    href="/"
                    className="ml-auto inline-flex items-center text-[#1e4e6f] hover:underline"
                  >
                    <ChevronLeft size={16} className="mr-1" /> Continua lo
                    shopping
                  </Link>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-24">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-[#1e4e6f]">
                    Riepilogo ordine
                  </h2>
                </div>

                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotale</span>
                      <span>€{subtotal}</span>
                    </div>

                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-gray-600">
                          Bollo e informativa
                        </span>
                        <div className="text-xs text-gray-500 mt-1">
                          esente IVA (art. 10 c.1 n.20 DPR 633/1972)
                        </div>
                      </div>
                      <span>€0,00</span>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex justify-between">
                        <span className="font-bold text-[#1e4e6f]">Totale</span>
                        <span className="font-bold text-[#1e4e6f]">
                          €{total}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-3 text-[#1e4e6f]">
                      Metodo di pagamento
                    </h3>

                    <div className="space-y-3">
                      <label className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50 transition-colors">
                        <input
                          type="radio"
                          name="payment"
                          value="card"
                          checked={paymentMethod === "card"}
                          onChange={() => setPaymentMethod("card")}
                          className="mr-3"
                        />
                        <CreditCard size={20} className="mr-2 text-gray-500" />
                        <span>Carta di credito</span>
                      </label>

                      <label className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50 transition-colors">
                        <input
                          type="radio"
                          name="payment"
                          value="paypal"
                          checked={paymentMethod === "paypal"}
                          onChange={() => setPaymentMethod("paypal")}
                          className="mr-3"
                        />
                        <Image
                          src="/placeholder.svg?height=24&width=80"
                          alt="PayPal"
                          width={80}
                          height={24}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Payment Form - Only show if card is selected */}
                  {paymentMethod === "card" && (
                    <div className="mb-6 space-y-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">
                          Numero carta
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-[#1e4e6f]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">
                            Scadenza
                          </label>
                          <input
                            type="text"
                            placeholder="MM/AA"
                            className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-[#1e4e6f]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">
                            CVV
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-[#1e4e6f]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-600 mb-1">
                          Intestatario carta
                        </label>
                        <input
                          type="text"
                          placeholder="Nome Cognome"
                          className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-[#1e4e6f]"
                        />
                      </div>
                    </div>
                  )}

                  <button className="w-full bg-[#1e4e6f] text-white py-3 rounded-md font-medium flex items-center justify-center hover:bg-[#173d5a] transition-colors">
                    <ShoppingBag size={18} className="mr-2" />
                    Completa acquisto
                  </button>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    Procedendo con l'acquisto, accetti i nostri{" "}
                    <Link href="#" className="underline">
                      Termini di servizio
                    </Link>{" "}
                    e{" "}
                    <Link href="#" className="underline">
                      Privacy Policy
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
