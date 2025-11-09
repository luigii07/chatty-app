import { Camera, LogOut, Mail, User } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { formatDate } from "../lib/utils";

export function ProfilePage(){
  const { authUser, logout, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ avatar: base64Image });
    }
  };

  return (
    <div className="h-full w-full md:pt-12 overflow-auto rounded-2xl bg-base-300 md:bg-inherit">
      <div className="md:max-w-2xl mx-auto md:p-4 md:py-8">
        <div className="bg-base-300 rounded-2xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Perfil</h1>
            <p className="mt-2">Informações do seu perfil</p>
          </div>

          {/* avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.avatar || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Atualizando..." : "Clique no ícone da camera para atualizar sua foto."}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2 mb-3">
                <User className="w-4 h-4" />
                <span>Nome completo</span>
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-xl border">{authUser.fullName}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2 mb-3">
                <Mail className="w-4 h-4" />
                <span>E-mail</span>
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-xl border">{authUser.email}</p>
            </div>
          </div>

          <div className="mt-6 bg-base-300 rounded-xl py-6">
            <h2 className="text-lg font-medium mb-4">Informações da conta</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Membro desde</span>
                <span>{formatDate({ date: authUser.createdAt })}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Status da conta</span>
                <span className="text-green-500">Ativo</span>
              </div>
            </div>
          </div>

          <div className="w-full flex items-center">
            <button onClick={logout} className="flex gap-2 text-error-content cursor-pointer bg-error/85 px-4 py-3 rounded-xl hover:bg-error transition duration-300">
              <LogOut />
              Desconectar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};