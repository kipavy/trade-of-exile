import { Routes, Route } from 'react-router-dom'
import { Navbar } from "@/components/ui/Navbar"
import { Home, About } from '@/pages'

export default function App() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Navbar />
      <main className="container mx-auto mt-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  )
}

