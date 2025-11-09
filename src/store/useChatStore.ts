import { create } from "zustand";
import { api } from "../lib/api";
import { useAuthStore } from "./useAuthStore";

type ChatStore = {
    isUsersLoading: boolean
    isMessagesLoading: boolean

    users: UserAPIResponse[]
    messages: MessageAPIResponse[]
    selectedUser: UserAPIResponse | null

    getUsers: () => Promise<void>
    getMessages: (userId: string) => Promise<void>
    sendMessage: (messageData: { text: string, image: string }) => Promise<void>
    setSelectedUser: (user: UserAPIResponse) => void
    subscribeToMessages: () => void
    unsubscribeFromMessages: () => void
}

export const useChatStore = create<ChatStore>((set, get) => ({
    isUsersLoading: false,
    isMessagesLoading: false,
    
    messages: [],
    users: [],
    selectedUser: null,
    
    getUsers: async () => {
        try {
            set({ isUsersLoading: true });

            const res = await api.get<UserAPIResponse[]>("/users");

            set({ users: res.data });
        } catch (error) {
            console.log("Error in getUsers", error.response.data.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId) => {
        try {
            set({ isMessagesLoading: true });

            const res = await api.get<MessageAPIResponse[]>(`/messages/${userId}`);
            
            set({ messages: res.data });
        } catch (error) {
            console.log("Error in getMessages", error);
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        try {
            const { selectedUser } = get();

            const res = await api.post(`/messages/send/${selectedUser._id}`, messageData);

            set({ messages: [...get().messages, res.data] });
        } catch (error) {
            console.log("Error in sendMessage", error);
        }
    },

    setSelectedUser: (user) => set({ selectedUser: user }),

    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;
        const { socket } = useAuthStore.getState();

        socket.on("newMessage", (newMessage: MessageAPIResponse) => {
            const isMessageSentFormSelectedUser = newMessage.senderId === selectedUser._id;
            if (!isMessageSentFormSelectedUser) return;
            
            set({ messages: [...get().messages, newMessage] });
        });
    },

    unsubscribeFromMessages: () => {
        const { socket } = useAuthStore.getState();

        socket.off("newMessage");
    }
}));