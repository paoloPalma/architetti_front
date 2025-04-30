"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Book, Home, LayoutDashboard, LogOut, Settings, Users } from "lucide-react"
import { useUser } from "@/context/UserProvider"
import { useEffect } from "react"

export default function EditorLayout({ children }) {
  const pathname = usePathname()
  const router = useRouter()
  const {user} = useUser();
  console.log(user);
  
  
  useEffect(() => {
    if(!user) {
      return router.push('/auth/login'); 
    }
  
    if(user?.role !== "admin" && user?.role !== "editor") {
      return  router.push('/'); 
    }

  }, [user,router])

  if (!user || user?.role !== "editor" || user?.role !== "admin") {
    return null // oppure un loader/spinner
  }


  return (
    <div className="min-h-screen  flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#1e4e6f] text-white">
        <div className="p-4 border-b border-[#173d5a]">
          <h1 className="text-xl font-bold">Editor Dashboard</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/editor"
                className={`flex items-center p-2 rounded-md hover:bg-[#173d5a] transition-colors ${
                  pathname === "/editor" ? "bg-[#173d5a]" : ""
                }`}
              >
                <LayoutDashboard className="mr-3 h-5 w-5" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/editor/courses"
                className={`flex items-center p-2 rounded-md hover:bg-[#173d5a] transition-colors ${
                  pathname.includes("/editor/courses") ? "bg-[#173d5a]" : ""
                }`}
              >
                <Book className="mr-3 h-5 w-5" />
                Corsi
              </Link>
            </li>
            {user?.role == 'admin' && (<li>
              <Link
                href="/editor/users"
                className={`flex items-center p-2 rounded-md hover:bg-[#173d5a] transition-colors ${
                  pathname.includes("/editor/users") ? "bg-[#173d5a]" : ""
                }`}
              >
                <Users className="mr-3 h-5 w-5" />
                Utenti
              </Link>
            </li>)}
            <li>
              <Link
                href="/editor/settings"
                className={`flex items-center p-2 rounded-md hover:bg-[#173d5a] transition-colors ${
                  pathname.includes("/editor/settings") ? "bg-[#173d5a]" : ""
                }`}
              >
                <Settings className="mr-3 h-5 w-5" />
                Impostazioni
              </Link>
            </li>
            <li className="pt-6 mt-6 border-t border-[#173d5a]">
              <Link href="/" className="flex items-center p-2 rounded-md hover:bg-[#173d5a] transition-colors">
                <Home className="mr-3 h-5 w-5" />
                Torna al Sito
              </Link>
            </li>
            <li>
              <Link href="/logout" className="flex items-center p-2 rounded-md hover:bg-[#173d5a] transition-colors">
                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-x-auto">{children}</main>
    </div>
  )
}

