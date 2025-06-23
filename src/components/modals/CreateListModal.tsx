"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CreateListModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (titulo: string) => void;
}

export default function CreateListModal({
  open,
  onOpenChange,
  onCreate,
}: CreateListModalProps) {
  const [titulo, setTitulo] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!titulo.trim()) {
      alert("Título é obrigatório");
      return;
    }
    onCreate(titulo);
    setTitulo("");
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Nova Lista</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Título da lista"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="border p-2 rounded text-black"
            required
          />
          <button
            type="submit"
            className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
          >
            Criar Lista
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}