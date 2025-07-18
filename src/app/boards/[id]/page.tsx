"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Plus } from "lucide-react";
import type { List, Task } from "@/types";
import { useParams } from "next/navigation";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "@/components/SortableItem";
import EditTaskModal from "@/components/EditTaskModal";
import CreateListModal from "@/components/modals/CreateListModal";
import CreateTaskModal from "@/components/modals/CreateTaskModal";

export default function BoardPage() {
  const params = useParams();
  const boardId = Array.isArray(params?.id) ? params.id[0] : params.id;

  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isCreateListOpen, setIsCreateListOpen] = useState(false);
  const [createTaskListId, setCreateTaskListId] = useState<number | null>(null);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const res = await api.get(`http://localhost:8000/${boardId}/lists`);
        setLists(res.data);
      } catch (err) {
        console.error("Erro ao buscar listas:", err);
      } finally {
        setLoading(false);
      }
    };

    if (boardId) fetchLists();
  }, [boardId]);

  // Criar lista
  const handleCreateList = async (titulo: string) => {
    try {
      await api.post("http://localhost:8000/criar-lista/", {
        titulo,
        posicao: lists.length,
        board_id: boardId,
      });
      const res = await api.get(`http://localhost:8000/${boardId}/lists`);
      setLists(res.data);
    } catch (err) {
      console.error("Erro ao criar lista:", err);
      alert("Erro ao criar lista");
    }
  };

  // Criar task
  const handleCreateTask = async (task: Omit<Task, "id">) => {
    try {
      await api.post("http://localhost:8000/criar-tasks/", task);
      const res = await api.get(`http://localhost:8000/${boardId}/lists`);
      setLists(res.data);
    } catch (err) {
      console.error("Erro ao criar task:", err);
      alert("Erro ao criar task");
    }
  };
  
  // Editar task
  const handleSaveEdit = async (task: Task) => {
    try {
      await api.put(`http://localhost:8000/editar-task/${task.id}`, task);
      const res = await api.get(`http://localhost:8000/${boardId}/lists`);
      setLists(res.data);
      setEditingTask(null);
    } catch (err) {
      console.error("Erro ao editar task:", err);
      alert("Erro ao editar task");
    }
  };

  // Deletar task
  const handleDeleteTask = async (taskId: number) => {
    try {
      await api.delete(`https://tas-flow-frontend.vercel.app/deletar-task/${taskId}`);
      const res = await api.get(`http://localhost:8000/${boardId}/lists`);
      setLists(res.data);
    } catch (err) {
      console.error("Erro ao deletar task:", err);
    }
  };

  // Drag and drop handler
  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      let sourceListIndex = -1;
      let sourceTaskIndex = -1;
      let targetListIndex = -1;
      let targetTaskIndex = -1;

      for (let i = 0; i < lists.length; i++) {
        const sourceIdx = lists[i].tasks.findIndex(t => t.id.toString() === active.id);
        if (sourceIdx !== -1) {
          sourceListIndex = i;
          sourceTaskIndex = sourceIdx;
        }
        const targetIdx = lists[i].tasks.findIndex(t => t.id.toString() === over.id);
        if (targetIdx !== -1) {
          targetListIndex = i;
          targetTaskIndex = targetIdx;
        }
      }

      if (sourceListIndex === -1 || sourceTaskIndex === -1 || targetListIndex === -1 || targetTaskIndex === -1) return;

      const newLists = [...lists];
      const [movedTask] = newLists[sourceListIndex].tasks.splice(sourceTaskIndex, 1);
      newLists[targetListIndex].tasks.splice(targetTaskIndex, 0, movedTask);

      // Atualiza posicao e list_id das tasks
      newLists[targetListIndex].tasks = newLists[targetListIndex].tasks.map((task, index) => ({
        ...task,
        posicao: index,
        list_id: newLists[targetListIndex].id,
      }));

      if (sourceListIndex !== targetListIndex) {
        newLists[sourceListIndex].tasks = newLists[sourceListIndex].tasks.map((task, index) => ({
          ...task,
          posicao: index,
        }));
      }

      setLists(newLists);

      try {
        await api.put(`http://localhost:8000/editar-task/${movedTask.id}`, {
          ...movedTask,
          posicao: movedTask.posicao,
          list_id: newLists[targetListIndex].id,
        });
      } catch (error) {
        console.error("Erro ao atualizar task no backend", error);
        alert("Erro ao atualizar task. Recarregue a página.");
      }
    }
  }

  return (
    <div className="p-4 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-purple-500">Detalhes do Quadro</h1>

      {loading ? (
        <p>Carregando listas...</p>
      ) : (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={lists.map((list) => list.id)} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-4 md:flex-row md:gap-6 overflow-x-auto pb-6">
              {lists.map((list) => (
                <div
                  key={list.id}
                  className="bg-white rounded shadow p-4 min-w-full md:min-w-[280px] w-full md:w-72 flex flex-col"
                >
                  <h2 className="font-bold text-lg text-black">{list.titulo}</h2>

                  <SortableContext
                    items={list.tasks.map((task) => task.id.toString())}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-2 flex-grow overflow-y-auto max-h-[400px] text-black">
                      {list.tasks.map((task: Task) => (
                        <SortableItem
                          key={task.id}
                          id={task.id.toString()}
                          task={task}
                          onEdit={() => setEditingTask(task)}
                          onDelete={() => handleDeleteTask(task.id)}
                        />
                      ))}
                    </div>
                  </SortableContext>

                  <button
                    onClick={() => setCreateTaskListId(list.id)}
                    className="text-purple-600 hover:underline mt-2 self-start"
                  >
                    <Plus size={20} /> Nova Task
                  </button>
                </div>
              ))}

              <div
                className="bg-white rounded shadow p-4 min-w-full md:min-w-[280px] w-full md:w-72 h-fit flex flex-col justify-center items-center cursor-pointer hover:bg-purple-100 text-purple-600 font-bold"
                onClick={() => setIsCreateListOpen(true)}
              >
                + Nova Lista
              </div>
            </div>
          </SortableContext>
        </DndContext>
      )}

      {/* Modais */}
      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={handleSaveEdit}
        />
      )}

      {createTaskListId && (
        <CreateTaskModal
          open={!!createTaskListId}
          onOpenChange={(open) => !open && setCreateTaskListId(null)}
          onCreate={handleCreateTask}
          listId={createTaskListId}
          boardId={Number(boardId)}
        />
      )}

      <CreateListModal
        open={isCreateListOpen}
        onOpenChange={setIsCreateListOpen}
        onCreate={handleCreateList}
      />
    </div>
  );
}
