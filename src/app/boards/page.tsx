"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Board } from "@/types";
import Link from "next/link";
import { Edit, Trash2, Check, X } from "lucide-react";

export default function BoardsPage() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [editBoardId, setEditBoardId] = useState<number | null>(null);
  const [editTitulo, setEditTitulo] = useState("");
  const [editDescricao, setEditDescricao] = useState("");
  

  const fetchBoards = async () => {
    try {
      const res = await api.get("fastapi-production-c6b2.up.railway.app/listar-boards/");
      setBoards(res.data);
    } catch (error) {
      console.error("Erro ao buscar boards:", error);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const handleCreateBoard = async () => {
    if (!titulo.trim()) return alert("Título é obrigatório");

    try {
      await api.post("https://fastapi-production-c6b2.up.railway.app/criar-boards/", {
        titulo,
        descricao,
      });
      setTitulo("");
      setDescricao("");
      fetchBoards();
    } catch (error) {
      console.error("Erro ao criar quadro:", error);
      alert("Erro ao criar quadro");
    }
  };

  const handleDeleteBoard = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este quadro?")) return;

    try {
      await api.delete(`https://fastapi-production-c6b2.up.railway.app/deletar-board/${id}`);
      fetchBoards();
    } catch (error) {
      console.error("Erro ao deletar quadro:", error);
      alert("Erro ao deletar quadro");
    }
  };

  const handleEditBoard = async () => {
    if (!editTitulo.trim()) return alert("Título é obrigatório");

    try {
      await api.put(`https://fastapi-production-c6b2.up.railway.app/editar-board/${editBoardId}`, {
        titulo: editTitulo,
        descricao: editDescricao,
      });
      setEditBoardId(null);
      setEditTitulo("");
      setEditDescricao("");
      fetchBoards();
    } catch (error) {
      console.error("Erro ao editar quadro:", error);
      alert("Erro ao editar quadro");
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-black min-h-screen text-white">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-purple-500 text-center">
        Meus Quadros
      </h1>

      {/* Formulário de criação */}
      <div className="bg-white text-black rounded p-4 max-w-xl mx-auto mb-6 shadow-lg space-y-3">
        <h2 className="text-xl font-semibold text-center text-purple-600">Criar Novo Quadro</h2>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
        />
        <textarea
          placeholder="Descrição (opcional)"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
        />
        <button
          onClick={handleCreateBoard}
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
        >
          Criar Quadro
        </button>
      </div>

      {/* Lista de quadros */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {boards.map((board) =>
          editBoardId === board.id ? (
            <div
              key={board.id}
              className="bg-purple-700 p-4 rounded shadow-md text-white space-y-2"
            >
              <input
                type="text"
                value={editTitulo}
                onChange={(e) => setEditTitulo(e.target.value)}
                className="w-full bg-white text-black rounded p-2"
              />
              <textarea
                value={editDescricao}
                onChange={(e) => setEditDescricao(e.target.value)}
                className="w-full bg-white text-black rounded p-2"
              />
              <div className="flex justify-end gap-2">
                <button onClick={() => setEditBoardId(null)} className="text-white">
                  <X />
                </button>
                <button onClick={handleEditBoard} className="text-white">
                  <Check />
                </button>
              </div>
            </div>
          ) : (
            <div
              key={board.id}
              className="p-4 bg-purple-700 rounded shadow-md hover:bg-purple-800 transition relative"
            >
              <Link href={`/boards/${board.id}`} className="block">
                <h2 className="text-lg font-semibold">{board.titulo}</h2>
                {board.descricao && (
                  <p className="text-sm text-gray-200 mt-1">{board.descricao}</p>
                )}
              </Link>
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => {
                    setEditBoardId(board.id);
                    setEditTitulo(board.titulo);
                    setEditDescricao(board.descricao || "");
                  }}
                  className="text-white hover:text-yellow-300"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteBoard(board.id)}
                  className="text-white hover:text-red-400"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
