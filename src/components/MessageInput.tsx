import { Image, Send, X } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { toast } from "react-hot-toast";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

export function MessageInput(){
  const { sendMessage } = useChatStore();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [text, setText] = useState("");

  function handleImage(e: React.ChangeEvent<HTMLInputElement>){
    const file = e.target.files[0];

    if (!file.type.startsWith("image/")) {
      toast.error("Você só pode enviar imagens!");
      return;
    }
    
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePreview(reader.result);
    }
  }

  function removeImage(){
    setImagePreview(null);
    if (fileInputRef.current.value) fileInputRef.current.value = "";
  }

  async function handleSendMessage(e: FormEvent) {
    e.preventDefault();
    if (!text.trim() && !imagePreview.trim()) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });
      
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.log("Failed to send message", error);
    }
  }
  
  return (
    <div className="w-full pt-4 md:p-4">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              alt="Preview"
              src={imagePreview}
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center cursor-pointer hover:bg-error hover:text-white"
              type="button"
              onClick={removeImage}
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <div className="w-full p-2 md:pl-6 rounded-xl bg-base-100">
        <form className="flex gap-2" onSubmit={handleSendMessage}>
          <input
            className="outline-none flex-1"
            placeholder="Escreve sua mensagem..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <input
            type="file"
            className="hidden"
            placeholder="Escreve sua mensagem..."
            ref={fileInputRef}
            onChange={handleImage}
          />
          
          <button
            type="button" className="p-1.5 md:p-3 rounded-lg md:rounded-xl cursor-pointer transition"
            onClick={() => fileInputRef.current.click()}
            >
            <Image className="size-5 hover:text-primary/85 transition duration-75" />
          </button>

          <button
            type="submit" 
            className="bg-primary p-1.5 md:p-3 rounded-lg md:rounded-xl cursor-pointer hover:bg-primary/75 transition"
          >
            <Send className="text-white size-5" />
          </button>
        </form>
      </div>
    </div>
  )
}