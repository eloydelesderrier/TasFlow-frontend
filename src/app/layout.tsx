import Navbar from "@/components/NavBar"
import "./globals.css"


export const metadata = {
  title: "TaskFlowAI",
  description: "Organize suas tarefas com Kanban",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Navbar/>
        
        <main className="p-4">
          {children}
        </main>
      </body>
    </html>
  )
}
