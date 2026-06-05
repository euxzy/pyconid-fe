import type { ReactNode } from "react";
import { Header } from "~/components/layouts/navigation/header";

type MainProps = {
	children: ReactNode;
	className?: string;
	contentClassName?: string;
};

export const Main = ({ children, className, contentClassName }: MainProps) => {
	return (
		<main className={`min-h-dvh relative overflow-hidden ${className ?? ""}`}>
			<Header />
			<div
				className={`flex items-center justify-center pt-[120px] ${contentClassName ?? ""}`}
			>
				<div className="container">{children}</div>
			</div>
		</main>
	);
};
