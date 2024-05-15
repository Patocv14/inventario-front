import { LoginForm } from "@/auth/login/components/LoginForm";

export const metadata = {
  title: "Login",
  description: "Inicia sesion en tu cuenta de usuario",
};

export default function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div>
        <LoginForm />
      </div>
    </div>
  );
}
