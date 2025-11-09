import { Eye, EyeOff, type LucideIcon } from "lucide-react"
import { useState, type ComponentProps } from "react";

type InputTypeProps = ComponentProps<"input"> & {
  icon: LucideIcon
  legend: string
  errorMessage?: string
}

export function Input({ icon, legend, type = "text", errorMessage, ...rest }: InputTypeProps){
  const [showPassword, setShowPassword] = useState(null);
  
  const Icon = icon;

  return (
    <div className="form-control flex flex-col">
      <label className={`label mb-2 ml-0.5 ${errorMessage && "text-error"}`}>
        <span className="label-text font-medium">{legend}</span>
      </label>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-4">
          <Icon className="h-5 w-5 text-base-content/40" />
        </div>
        <input
          type={type === "password" ? showPassword ? "text" : "password" : type}
          name="email"
          className={`input input-bordered w-full pl-10 py-6 rounded-xl tracking-wider outline-none ${errorMessage && "border-error"}`}
          { ...rest }
        />

        {type === "password" && (
          <button
            type="button"
            className="absolute inset-y-4 right-0 pr-3 flex items-cente"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-base-content/40 z-4" />
            ) : (
              <Eye className="h-5 w-5 text-base-content/40 z-4" />
            )}
          </button>
        )}
      </div>

      <div className="pt-1 ml-0.5">
        {errorMessage && (
          <span className="text-error text-sm">{errorMessage}</span>
        )}
      </div>
    </div>
  )
}