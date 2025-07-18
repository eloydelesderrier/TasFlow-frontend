/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/api";
// import { useRouter } from "next/navigation";
import { useState } from "react";

const schema = z.object({
  nome: z.string().min(3).optional(),
  email: z.string().email(),
  senha: z.string().min(6),
});

type FormData = z.infer<typeof schema>;

interface AuthFormProps {
  mode: "login" | "register";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [loading, setLoading] = useState(false);
  // const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await api.post(
        mode === "register" ? "https://fastapi-production-c6b2.up.railway.app/register" : "https://fastapi-production-c6b2.up.railway.app/login",
        data
      );
      localStorage.setItem("access_token", res.data.access_token);
      window.location.href = "https://fastapi-production-c6b2.up.railway.app/boards/";
     
      
    } catch (err: any) {
      alert(err?.response?.data?.detail || "Erro");
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm mx-auto">
      {mode === "register" && (
        <div>
          <label className=" text-black">Nome</label>
          <input
            {...register("nome")}
            className="w-full border rounded p-2  text-black"
            placeholder="Seu nome"
          />
          {errors.nome && <p className="text-red-500">{errors.nome.message}</p>}
        </div>
      )}
      <div>
        <label className=" text-black">Email</label>
        <input
          {...register("email")}
          className="w-full border rounded p-2  text-black"
          placeholder="email@exemplo.com"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label className=" text-black">Senha</label>
        <input
          {...register("senha")}
          type="password"
          className="w-full border rounded p-2 text-black"
          placeholder="******"
        />
        {errors.senha && <p className="text-red-500">{errors.senha.message}</p>}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
      >
        {loading ? "Carregando..." : mode === "register" ? "Registrar" : "Entrar"}
      </button>
     
    </form>
  );
}