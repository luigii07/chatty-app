import { Link } from "react-router-dom";
import { AuthImagePattern } from "../components/AuthImagePattern";
import { Loader2, Lock, Mail, User, Zap } from "lucide-react";
import { Input } from "../components/Input";
import { Controller, useForm } from "react-hook-form";
import { type SignUpFormData, signUpSchema } from "../schemas/authSchema"
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../store/useAuthStore";

export function SignUpPage() {
  const { signup, isSigningUp } = useAuthStore();

  const { control, handleSubmit, formState: { errors } } = useForm<SignUpFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    resolver: zodResolver(signUpSchema),
  });

  async function onSubmit(data: SignUpFormData) {
    await signup({ 
      fullName: data.fullName,
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
            <div className="flex flex-col items-center gap-2 group">
              <div className="rounded-xl bg-primary/10 flex items-center justify-center gap-2 py-2 px-3 hover:bg-primary/20 transition-colors">
                <Zap className="size-6 text-primary" />
                <h1 className="font-semibold text-primary">Chatty</h1>
              </div>
              <h1 className="text-2xl font-bold mt-2">Criar uma conta</h1>
              <p className="text-base-content/60">Comece a usar sua conta gratuita.</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Controller
              control={control}
              name="fullName"
              render={({ field }) => (
                <Input
                  icon={User}
                  legend="Nome completo"
                  placeholder="Nome completo"
                  errorMessage={errors.fullName?.message}
                  { ...field }
                />
              )}
            />

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

            <Controller
              control={control}
              name="passwordConfirm"
              render={({ field }) => (
                <Input
                  icon={Lock}
                  legend="Confirmar senha"
                  name="passwordConfirm"
                  type="password"
                  placeholder="••••••••"
                  errorMessage={errors.passwordConfirm?.message}
                  { ...field }
                />
              )}
            />

            <button type="submit" className="btn btn-primary w-full py-6 rounded-xl text-sm uppercase tracking-wider">
              {isSigningUp ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Carregando...
              </>
              ) : (
              "Cadastrar"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Já possui uma conta?{" "}
              <Link to="/login" className="link link-primary">
                Entre
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <AuthImagePattern
        title={"Junte-se à nossa comunidade!"}
        subtitle={
          "Conecte-se com amigos, compartilhe momentos e mantenha contato as pessoas que você gosta."
        }
      />
    </div>
  );
}
