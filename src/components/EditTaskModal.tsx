"use client";

import { useState } from "react";
import { Task } from "@/types";

interface Props {
  task: Task;
  onClose: () => void;
  onSave: (task: Task) => void;
}

export default function EditTaskModal({ task, onClose, onSave }: Props) {
  const [formData, setFormData] = useState({
    titulo: task.titulo,
    descricao: task.descricao || "",
    venci_data: task.venci_data || "",
    prioridade: task.prioridade || "",
    status: task.status || "Pendente"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave({ ...task, ...formData });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md text-black">
        <h2 className="text-xl font-semibold mb-4">Editar Tarefa</h2>
        <input
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          placeholder="Título"
          className="w-full border rounded px-3 py-2 mb-2"
        />
        <textarea
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
          placeholder="Descrição"
          className="w-full border rounded px-3 py-2 mb-2"
        />
        <input
          name="venci_data"
          type="date"
          value={formData.venci_data?.slice(0, 10) || ""}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mb-2"
        />
        <input
          name="prioridade"
          value={formData.prioridade}
          onChange={handleChange}
          placeholder="Prioridade"
          className="w-full border rounded px-3 py-2 mb-2"
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mb-4"
        >
          <option value="Pendente">Pendente</option>
          <option value="Em andamento">Em andamento</option>
          <option value="Concluído">Concluído</option>
        </select>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
