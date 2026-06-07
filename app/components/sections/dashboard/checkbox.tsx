import { useMemo } from "react";

export const Checkbox = ({
	label,
	id,
	name,
	value = false,
	onChange,
	errorMessage,
	labelClassName,
}: {
	label: string | React.ReactNode;

	id: string;
	name: string;
	value?: boolean | null;
	onChange: (value: boolean) => void;
	errorMessage?: string;
	labelClassName?: string;
}) => {
	const isChecked = useMemo(() => {
		return value === true;
	}, [value]);
	return (
		<>
			<div className="flex gap-2 items-center">
				<input
					className="w-5 h-5"
					id={id}
					name={name}
					type="checkbox"
					checked={isChecked}
					value={isChecked ? "true" : "false"}
					onChange={(e) => onChange(e.target.checked)}
				/>
				<span className={labelClassName}>{label}</span>
			</div>
			{errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
		</>
	);
};
