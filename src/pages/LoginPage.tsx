import { Link } from "react-router-dom";
import { AuthImagePattern } from "../components/AuthImagePattern";
import { Loader2, Lock, Mail, Zap } from "lucide-react";
import { Input } from "../components/Input";
import { Controller, useForm } from "react-hook-form";
import { signInSchema, type SignInFormData } from "../schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../store/useAuthStore";

export function LoginPage() {
  const { login } = useAuthStore();

  const { control, handleSubmit, formState: { errors } } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
  });

  async function onSubmit(data: SignInFormData) {
    await login({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2">
              <div className="rounded-xl bg-primary/10 flex items-center justify-center gap-2 py-2 px-3 hover:bg-primary/20 transition-colors">
                <Zap className="size-6 text-primary" />
                <h1 className="font-semibold text-primary">Chatty</h1>
              </div>
              <h1 className="text-2xl font-bold mt-2">Bem vindo de volta</h1>
              <p className="text-base-content/60">Entre em sua conta</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <Input
                  icon={Mail}
                  legend="E-mail"
                  placeholder="email@gmail.com"
                  errorMessage={errors.email?.message}
                  { ...field }
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <Input
                  icon={Lock}
                  legend="Senha"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  errorMessage={errors.password?.message}
                  { ...field }
                />
              )}
            />

            <button type="submit" className="btn btn-primary w-full py-6 rounded-xl text-sm uppercase tracking-wider">
              {false ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Carregando...
              </>
              ) : (
              "Entrar"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Ainda não possui uma conta?{" "}
              <Link to="/signup" className="link link-primary">
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <AuthImagePattern
        title={"Bem vindo de volta!"}
        subtitle={
          "Entra para continuar suas conversas e ver suas mensagens."
        }
      />
    </div>
  );
}
