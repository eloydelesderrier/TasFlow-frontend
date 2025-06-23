import AuthForm from "@/components/AuthForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 bg-white  text-black  rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-black">Criar Conta</h1>
        <AuthForm mode="register" />
      </div>
    </div>
  );
}