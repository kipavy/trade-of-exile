import { Navbar } from "@/components/ui/Navbar"

export default function App() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Navbar />
      <main className="container mx-auto mt-8">
        <h1 className="text-4xl font-bold">Welcome to My App</h1>
        <p className="mt-4">This is a clean navbar example with a theme toggle and radial animation.</p>
      </main>
    </div>
  )
}

