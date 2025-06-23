"use client";


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black to-purple-900 text-white text-center px-4">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
        Bem-vindo ao <span className="text-purple-400">TaskFlowAI</span>
      </h1>
      <p className="text-lg md:text-xl max-w-xl mb-8">
        Organize suas tarefas com inteligência. Crie quadros, listas, mova tarefas com facilidade e aumente sua produtividade com estilo.
      </p>
    </div>
  );
}