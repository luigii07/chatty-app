import { MessageCircleMore, Settings2, User, type LucideIcon } from "lucide-react"

export type NavLinkType = {
  path: string,
  label: string,
  icon: LucideIcon,
}

export const navLinks: NavLinkType[] = [
  { path: "/", label: "Chat", icon: MessageCircleMore },
  { path: "/profile", label: "Perfil", icon: User },
  { path: "/settings", label: "Preferências", icon: Settings2 },
]

export function getInitialFromFullName({ fullName }: { fullName: string}) {
    return fullName.slice(0, 1)
}

export function formatMessageTime({ date }: { date: string }) {
    return new Date(date).toLocaleTimeString("pt-BR", {
        hour: "numeric",
        minute: "numeric",
    })
}

export function formatDate({ date }: { date: string }) {
  return new Date(date).toLocaleString("pt-BR", {
    dateStyle: "full",
    timeStyle: "medium",
  });
}