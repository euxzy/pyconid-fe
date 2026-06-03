import { twMerge } from "tailwind-merge";

export const Input = ({
  label,
  id,
  name,
  placeholder,
  value,
  type = "text",
  disabled = false,
  readonly = false,
  onChange,
  defaultValue,
  errorMessage,
  className,
  inputClassName,
}: {
  label: string;
  id: string;
  name: string;
  placeholder: string;
  type?: string;
  value?: string;
  disabled?: boolean;
  readonly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
  errorMessage?: string;
  className?: string;
  inputClassName?: string;
}) => {
  return (
    <div className={twMerge("w-full", className)}>
      <label htmlFor={id} className="block mb-2 text-xs text-[#282828]">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        className={twMerge(
          "w-full px-4 py-3 border bg-white text-sm text-[#282828] placeholder:text-gray-400",
          disabled || readonly ? "bg-gray-100 cursor-not-allowed" : "bg-white",
          errorMessage ? "border-red-500" : "border-[#282828]",
          inputClassName,
        )}
        {...(value !== undefined
          ? { value, onChange }
          : { defaultValue, onChange })}
        disabled={disabled}
        readOnly={readonly}
      />
      {errorMessage && (
        <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};
