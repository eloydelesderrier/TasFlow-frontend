"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Task } from "@/types";

interface CreateTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (task: Omit<Task, "id">) => void;
  listId: number;
  boardId: number;
}

export default function CreateTaskModal({
  open,
  onOpenChange,
  onCreate,
  listId,
  boardId,
}: CreateTaskModalProps) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState<"Pendente" | "Em andamento" | "Concluído">("Pendente");
  const [venciData, setVenciData] = useState<string>("");  // ISO date string
  const [prioridade, setPrioridade] = useState<"Baixa" | "Média" | "Alta">("Média");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!titulo.trim()) {
      alert("Título é obrigatório");
      return;
    }

    onCreate({
      titulo,
      descricao,
      posicao: 0,
      venci_data: venciData ? venciData : undefined,
      prioridade,
      list_id: listId,
      board_id: boardId,
      status,
    });

    setTitulo("");
    setDescricao("");
    setStatus("Pendente");
    setVenciData("");
    setPrioridade("Média");
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Nova Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="border p-2 rounded text-black"
            required
          />
          <textarea
            placeholder="Descrição (opcional)"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="border p-2 rounded text-black"
          />
          <label className="flex flex-col text-sm">
            Data de Vencimento:
            <input
              type="date"
              value={venciData}
              onChange={(e) => setVenciData(e.target.value)}
              className="border p-2 rounded text-black"
            />
          </label>
          <label className="flex flex-col text-sm">
            Prioridade:
            <select
              value={prioridade}
              onChange={(e) =>
                setPrioridade(e.target.value as "Baixa" | "Média" | "Alta")
              }
              className="border p-2 rounded text-black"
            >
              <option value="Baixa">Baixa</option>
              <option value="Média">Média</option>
              <option value="Alta">Alta</option>
            </select>
          </label>
          <label className="flex flex-col text-sm">
            Status:
            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as "Pendente" | "Em andamento" | "Concluído")
              }
              className="border p-2 rounded text-black"
            >
              <option value="Pendente">Pendente</option>
              <option value="Em andamento">Em andamento</option>
              <option value="Concluído">Concluído</option>
            </select>
          </label>
          <button
            type="submit"
            className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
          >
            Criar Task
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
