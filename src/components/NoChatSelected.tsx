import { Zap } from "lucide-react";

export function NoChatSelected() {
  return (
    <div className="flex-1 flex flex-col p-6">
      <div className="w-full flex flex-1 flex-col items-center justify-center p-16 rounded-2xl bg-base-300/65">
        <div className="max-w-md text-center space-y-6">
          {/* Icon Display */}
          <div className="flex justify-center gap-4 mb-4">
            <div className="relative">
              <div
                className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce"
              >
                <Zap className="w-8 h-8 text-primary " />
              </div>
            </div>
          </div>

          {/* Welcome Text */}
          <h2 className="text-2xl font-bold">Bem vindo ao Chatty!</h2>
          <p className="text-base-content/60">
            Quem vai ser a sua próxima conversa? Selecione um contato para conversar.
          </p>
        </div>
      </div>
    </div>
  );
};
