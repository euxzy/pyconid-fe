import { twMerge } from "tailwind-merge";

export const Textarea = ({
	label,
	id,
	name,
	placeholder,
	value,
	onChange,
	defaultValue,
	errorMessage,
	className,
}: {
	label: string;
	id: string;
	name: string;
	placeholder: string;
	value?: string;
	onChange?: (value: string) => void;
	defaultValue?: string;
	errorMessage?: string;
	className?: string;
}) => {
	return (
		<div className={twMerge("w-full", className)}>
			<label htmlFor={id} className="block mb-2 text-xs text-[#282828]">
				{label}
			</label>
			<textarea
				id={id}
				name={name}
				placeholder={placeholder}
				className={twMerge(
					"w-full px-4 py-3 border bg-white text-sm text-[#282828] placeholder:text-gray-400",
					errorMessage ? "border-red-500" : "border-[#282828]",
				)}
				rows={4}
				{...(value !== undefined
					? {
							value,
							onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
								onChange?.(e.target.value);
							},
						}
					: {
							defaultValue,
							onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
								onChange?.(e.target.value);
							},
						})}
			/>
			{errorMessage && (
				<p className="mt-2 text-sm text-red-500">{errorMessage}</p>
			)}
		</div>
	);
};
