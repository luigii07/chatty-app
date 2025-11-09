import { z } from "zod";

export const signUpSchema = z.object({
    fullName: z
        .string()
        .trim()
        .min(2, { message: "Informa seu nome completo!" }),
    email: z
        .email({ message: "Informe um email válido!" }),
    password: z
        .string()
        .trim()
        .min(6, { message: "A senha deve possuir no mínimo 6 caracteres!" }),
    passwordConfirm: z
        .string({ message: "Confirme a senha!" })
        .trim(),
})
.refine((data) => data.password === data.passwordConfirm, {
    message: "As senhas são diferentes!",
    path: ["passwordConfirm"],
});

export type SignUpFormData = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
    email: z
        .email({ message: "Informe o email!" }),
    password: z
        .string()
        .trim()
        .min(1, { message: "Informe a senha!" }),
});

export type SignInFormData = z.infer<typeof signInSchema>;