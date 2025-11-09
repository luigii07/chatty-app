import { create } from "zustand";
import { api, BASE_URL } from "../lib/api";
import toast from "react-hot-toast";
import { io, Socket } from "socket.io-client";

type AuthStore = {
    isSigningUp: boolean
    isLoggingIn: boolean
    isCheckingAuth: boolean
    isUpdatingProfile: boolean

    authUser: UserAPIResponse | null

    signup: (data: { fullName: string, email: string, password: string }) => Promise<void>
    login: (data: { email: string, password: string }) => Promise<void>
    checkAuth: () => Promise<void>
    logout: () => Promise<void>
    updateProfile: ({ avatar }: { avatar: any }) => Promise<void>

    onlineUsers: string[]
    socket: Socket | null
    connectSocket: () => void
    disconnectSocket: () => void
}

export const useAuthStore = create<AuthStore>((set, get) => ({
    isSigningUp: false,
    isLoggingIn: false,
    isCheckingAuth: true,
    isUpdatingProfile: false,

    authUser: null,
    
    onlineUsers: [],
    socket: null,

    signup: async (data) => {
        try {
            set({ isSigningUp: true });

            const res = await api.post<UserAPIResponse>("/auth/signup", data);

            set({ authUser: res.data });
            toast.success("Conta criada! Bem-vindo à nossa comunidade!");
            
            get().connectSocket();
        } catch (error) {
            toast.error("Ops! Algo inesperado aconteceu. Tente novamente.");
            console.log("Error in signup", error);
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        try {
            set({ isLoggingIn: true });

            const res = await api.post<UserAPIResponse>("/auth/login", data);

            set({ authUser: res.data });
            toast.success("Bem-vindo de volta!");

            get().connectSocket();
        } catch (error) {
            if (error.status === 401) {
                toast.error("Usuários ou senhas incorretos.");
            } else {
                toast.error("Ops! Algo inesperado aconteceu. Tente novamente.");
            }

            console.log("Error in login", error);
        } finally {
            set({ isLoggingIn: false });
        }
    },

    checkAuth: async () => {
        try {
            const res = await api.get<UserAPIResponse>("auth/check");

            set({ authUser: res.data });

            get().connectSocket();
        } catch (error) {
            set({ authUser: null });
            
            console.log("Error in checkAuth:", error);
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    logout: async () => {
        try {
            await api.post("/auth/logout");

            set({ authUser: null });
            toast.success("Você saiu da sua conta. Até a próxima!");

            get().disconnectSocket();
        } catch (error) {
            toast.error("Ops! Algo inesperado aconteceu. Tente novamente.");
            console.log("Error in signup", error);
        }
    },

    updateProfile: async (avatar) => {
        try {
            set({ isUpdatingProfile: true });

            const res = await api.put<UserAPIResponse>("/auth/update-profile", avatar);

            set({ authUser: {
                    ...get().authUser,
                    avatar: res.data.avatar,
                }
            });

            toast.success("Foto de perfil atualizada!");
        } catch (error) {
            console.log("Error in updateProfile", error);
            toast.error("Ops! Algo inesperado aconteceu. Tente novamente.");
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket: () => {
        const { authUser } = useAuthStore.getState()

        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id,
            },
        });
        socket.connect();

        set({ socket: socket });

        socket.on("getOnlineUsers", (usersId) => {
            set({ onlineUsers: usersId });
        });
    },

    disconnectSocket: () => {
        if (get().socket.connected) get().socket.disconnect();
    },
}));