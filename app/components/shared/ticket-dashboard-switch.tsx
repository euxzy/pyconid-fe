import { User } from "lucide-react";
import { NavLink } from "react-router";

export const TicketDashboardSwitch = () => {
	return (
		<div className="flex items-center gap-4 px-6 lg:px-12 pt-6 absolute top-15 lg:top-20 left-0 right-0 z-20">
			<NavLink
				to="/auth/dashboard"
				end
				className="group relative flex items-center gap-3 pl-[11px] pr-4 w-[168px] h-8 text-sm font-bold transition-colors"
				style={{
					clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 100%, 0 100%)",
				}}
			>
				{({ isActive }) => (
					<>
						{isActive ? (
							<span className="absolute inset-0 bg-[#FAFAFA]" />
						) : (
							<>
								<span
									className="absolute inset-0 bg-white"
									style={{
										clipPath:
											"polygon(0 0, calc(100% - 12px) 0, 100% 100%, 0 100%)",
									}}
								/>
								<span
									className="absolute inset-[1px] bg-[#282828]"
									style={{
										clipPath:
											"polygon(0 0, calc(100% - 12px) 0, 100% 100%, 0 100%)",
									}}
								/>
							</>
						)}
						<span
							className={`relative z-10 flex items-center gap-3 ${
								isActive
									? "text-[#282828]"
									: "text-[#F1F2F3] group-hover:text-white"
							}`}
						>
							<User className="w-5 h-5" />
							<span>My Profile</span>
						</span>
					</>
				)}
			</NavLink>

			<NavLink
				to="/auth/payment"
				className="group relative flex items-center gap-3 pl-[11px] pr-4 w-[168px] h-8 text-sm font-bold transition-colors"
				style={{
					clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 100%, 0 100%)",
				}}
			>
				{({ isActive }) => (
					<>
						{isActive ? (
							<span className="absolute inset-0 bg-[#FAFAFA]" />
						) : (
							<>
								<span
									className="absolute inset-0 bg-white"
									style={{
										clipPath:
											"polygon(0 0, calc(100% - 12px) 0, 100% 100%, 0 100%)",
									}}
								/>
								<span
									className="absolute inset-[1px] bg-[#282828]"
									style={{
										clipPath:
											"polygon(0 0, calc(100% - 12px) 0, 100% 100%, 0 100%)",
									}}
								/>
							</>
						)}
						<span
							className={`relative z-10 flex items-center gap-3 ${
								isActive
									? "text-[#282828]"
									: "text-[#F1F2F3] group-hover:text-white"
							}`}
						>
							<img
								src="/svg/user-profile/ticket-icon.svg"
								alt=""
								width="20"
								height="20"
							/>
							<span>My Ticket</span>
						</span>
					</>
				)}
			</NavLink>
		</div>
	);
};
