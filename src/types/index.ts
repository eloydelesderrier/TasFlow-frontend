export interface User {
  id: number;
  nome: string;
  email: string;
  senha: string;
}

export interface Board {
  id: number;
  titulo: string;
  descricao?: string;
  created_at: string;
  lists:List[];
}

export interface List {
  id: number;
  titulo: string;
  posicao: number;
  board_id: number;
  tasks: Task[];
}
export type TaskStatus = "Pendente" | "Em andamento" | "Concluído";

export interface Task {
  id: number;
  titulo: string;
  descricao?: string;
  posicao?: number;
  venci_data?: string;
  prioridade?: string;
  list_id: number;
  board_id: number;
  status?: TaskStatus;
}