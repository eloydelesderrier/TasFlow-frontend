"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { VscAccount } from "react-icons/vsc";


export default function Navbar() {
  const [isLogged, setIsLogged] = useState(false);
  const [nome, setNome] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const user = localStorage.getItem("nome");

    setIsLogged(!!token);
    if (user) setNome(user);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // executa uma vez
    window.addEventListener("resize", handleResize); // escuta mudanças

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-blue-600">
        TaskFlowAI
      </Link>

      <div className="relative">
        {isLogged ? (
          <div className="flex items-center gap-4">
            <button
              onClick={() => isMobile && setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
            >
              <VscAccount size={20} />
              <span className="font-medium text-black">{nome}</span>
              {isMobile && <ChevronDown className="w-4 h-4" />}
            </button>

            {isMobile ? (
              dropdownOpen && (
                <div className="absolute right-0 top-10 bg-white border rounded shadow-lg w-40 z-10">
                  <Link
                    href="/boards"
                    className="block px-4 py-2 hover:bg-gray-100 text-sm text-blue-600"
                  >
                    Meus Quadros
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                  >
                    Sair
                  </button>
                </div>
              )
            ) : (
              <>
                <Link
                  href="/boards"
                  className="text-sm px-3 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white transition"
                >
                  Meus Quadros
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm px-3 py-2 text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white transition"
                >
                  Sair
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <Link href="/login" className="text-gray-700 hover:text-blue-600">
              Entrar
            </Link>
            <Link
              href="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Cadastrar
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
