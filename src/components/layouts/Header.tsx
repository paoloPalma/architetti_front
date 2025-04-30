"use client"

import Link from "next/link"
import { useState } from "react"
import { ShoppingCart, User, Menu, X } from "lucide-react"
import { useCourse } from "@/context/Course"
import { useUser } from "@/context/UserProvider"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { courses ,idCourses } = useCourse();
  const { user } = useUser();   

  const cartCourses = courses.filter((course) =>
    idCourses?.includes(course.id)
  );
  
  return (
    <>
      {/* Top bar with contact, login, etc. */}
      <header className="bg-[#1e4e6f] text-white">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex space-x-6">
            <Link href="#" className="text-xs hover:text-[#c5dbd9] transition-colors">
              Contatti
            </Link>
            <Link href="#" className="text-xs hover:text-[#c5dbd9] transition-colors">
              FAQ
            </Link>
          </div>
          {user ? ('Ciao ' + user.name ) : (<div className="flex space-x-6">
            <Link href="/auth/login" className="text-xs hover:text-[#c5dbd9] transition-colors flex items-center">
              <User size={14} className="mr-1" /> Accedi
            </Link>
            <Link href="#" className="text-xs hover:text-[#c5dbd9] transition-colors">
              Registrati
            </Link>
          </div>)}
        </div>
      </header>

      {/* Main navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-[#1e4e6f] font-bold text-xl">
            <span className="uppercase tracking-wider">ARCHITETTI</span>
            <span className="text-[#c5dbd9] uppercase tracking-wider">CHPE</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium text-[#1e4e6f] hover:text-[#c5dbd9] transition-colors">
              Home
            </Link>
            <Link
              href="/formazione"
              className="text-sm font-medium text-[#1e4e6f] hover:text-[#c5dbd9] transition-colors"
            >
              Formazione
            </Link>
            <Link
              href="/chi-siamo"
              className="text-sm font-medium text-[#1e4e6f] hover:text-[#c5dbd9] transition-colors"
            >
              Chi Siamo
            </Link>
            <Link
              href="/convenzioni"
              className="text-sm font-medium text-[#1e4e6f] hover:text-[#c5dbd9] transition-colors"
            >
              Convenzioni
            </Link>
            <Link
              href="/newsletter"
              className="text-sm font-medium text-[#1e4e6f] hover:text-[#c5dbd9] transition-colors"
            >
              Newsletter
            </Link>
            <Link
              href="/contatti"
              className="text-sm font-medium text-[#1e4e6f] hover:text-[#c5dbd9] transition-colors"
            >
              Contatti
            </Link>

            {/* Shopping Cart */}
            <Link
              href="/carrello"
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#c5dbd9] text-[#1e4e6f] hover:bg-[#1e4e6f] hover:text-white transition-colors"
            >
              <ShoppingCart size={18} />
              <span className="absolute -top-1 -right-1 bg-[#1e4e6f] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCourses.length}
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link
              href="/carrello"
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#c5dbd9] text-[#1e4e6f]"
            >
              <ShoppingCart size={18} />
              <span className="absolute -top-1 -right-1 bg-[#1e4e6f] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCourses.length}
              </span>
            </Link>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#1e4e6f] focus:outline-none">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4">
            <div className="container mx-auto px-4 flex flex-col space-y-4">
              <Link
                href="/"
                className="text-sm font-medium text-[#1e4e6f] hover:text-[#c5dbd9] transition-colors py-2 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/formazione"
                className="text-sm font-medium text-[#1e4e6f] hover:text-[#c5dbd9] transition-colors py-2 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Formazione
              </Link>
              <Link
                href="/chi-siamo"
                className="text-sm font-medium text-[#1e4e6f] hover:text-[#c5dbd9] transition-colors py-2 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Chi Siamo
              </Link>
              <Link
                href="/convenzioni"
                className="text-sm font-medium text-[#1e4e6f] hover:text-[#c5dbd9] transition-colors py-2 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Convenzioni
              </Link>
              <Link
                href="/newsletter"
                className="text-sm font-medium text-[#1e4e6f] hover:text-[#c5dbd9] transition-colors py-2 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Newsletter
              </Link>
              <Link
                href="/contatti"
                className="text-sm font-medium text-[#1e4e6f] hover:text-[#c5dbd9] transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contatti
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}

export default Header

