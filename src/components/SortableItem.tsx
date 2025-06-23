import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "@/types";

interface SortableItemProps {
  id: string;
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
}

export default function SortableItem({ id, task, onEdit, onDelete }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-2 bg-gray-100 rounded shadow flex justify-between items-center"
    >
      <div>
        <strong>{task.titulo}</strong> <span className="text-xs ml-2 italic">[{task.status}]</span>
      </div>
      <div className="flex gap-2">
        <button onClick={onEdit} className="text-blue-600 hover:underline">Editar</button>
        <button onClick={onDelete} className="text-red-600 hover:underline">Excluir</button>
      </div>
    </div>
  );
}
