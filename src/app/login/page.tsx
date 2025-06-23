import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 bg-white rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl text-black font-bold mb-4 text-center">Login</h1>
        <AuthForm mode="login" />
      </div>
    </div>
  );
}