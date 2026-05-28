import { useState } from "react";
import { formatRupiah } from "~/lib/utils";

interface Ticket {
	id: string;
	name: string;
	price: number;
	description: string;
}

interface TicketPurchaseModalProps {
	isOpen: boolean;
	onClose: () => void;
	ticket: Ticket | null;
}

type VoucherState = "empty" | "filled" | "verified";

const AccentDecoration = () => (
	<div className="absolute -left-[27px] -top-[44px] opacity-50 pointer-events-none">
		<svg
			width="97"
			height="100"
			viewBox="0 0 97 100"
			fill="none"
			role="img"
			aria-label="Decorative accent"
		>
			<path
				d="M51.31 11.31L94.79 58.23L40.95 53.01L1.83 42.22L12.31 0L51.31 11.31Z"
				fill="#F27F20"
			/>
			<path
				d="M40.95 53.01L1.83 42.22L12.31 0L51.31 11.31L40.95 53.01Z"
				fill="#224083"
			/>
		</svg>
	</div>
);

const CloseIcon = ({ onClick }: { onClick: () => void }) => (
	<button
		type="button"
		onClick={onClick}
		className="cursor-pointer p-0 bg-transparent border-none"
		aria-label="Close modal"
	>
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" role="img">
			<title>Close</title>
			<path
				d="M19 5L5 19"
				stroke="#F1F2F3"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M5 5L19 19"
				stroke="#F1F2F3"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	</button>
);

const CheckCircleIcon = () => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		role="img"
		aria-label="Voucher verified"
	>
		<title>Verified</title>
		<circle cx="12" cy="12" r="10" fill="#F1F2F3" />
		<path
			d="M8 12L11 15L16 9"
			stroke="#22835F"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const DashedSeparator = () => (
	<svg width="100%" height="1" role="img" aria-label="Separator">
		<line
			x1="0"
			y1="0.5"
			x2="100%"
			y2="0.5"
			stroke="#909090"
			strokeWidth="1"
			strokeDasharray="6 6"
		/>
	</svg>
);

export const TicketPurchaseModal = ({
	isOpen,
	onClose,
	ticket,
}: TicketPurchaseModalProps) => {
	const [voucherCode, setVoucherCode] = useState("");
	const [voucherState, setVoucherState] = useState<VoucherState>("empty");
	const [discount, setDiscount] = useState(0);

	if (!isOpen || !ticket) return null;

	const total = ticket.price - discount;

	const handleVoucherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setVoucherCode(value);
		if (value.trim() === "") {
			setVoucherState("empty");
			setDiscount(0);
		} else {
			setVoucherState("filled");
		}
	};

	const handleApplyVoucher = () => {
		if (voucherCode.trim()) {
			setVoucherState("verified");
			setDiscount(100000);
		}
	};

	const handleClearVoucher = () => {
		setVoucherCode("");
		setVoucherState("empty");
		setDiscount(0);
	};

	return (
		<div className="fixed inset-0 z-50 flex justify-center items-start pt-20 bg-black/30 backdrop-blur-[16px]">
			{/* Click outside to close */}
			<button
				type="button"
				className="absolute inset-0"
				onClick={onClose}
				aria-label="Close modal overlay"
			/>

			{/* Modal Content */}
			<div className="relative z-10 w-full max-w-[640px] mx-4 bg-[#282828] rounded-lg border-b border-[rgba(198,198,198,0.3)]">
				<div className="relative flex flex-col gap-6 p-8 lg:p-12">
					<AccentDecoration />

					{/* Header */}
					<div className="flex justify-between items-center">
						<h2 className="text-[#F1F2F3] text-2xl font-bold font-sans tracking-tight">
							Ticket Purchase
						</h2>
						<CloseIcon onClick={onClose} />
					</div>

					{/* Ticket Details */}
					<div className="flex flex-col gap-4">
						<p className="text-[#909090] text-base font-bold">Ticket</p>
						<div className="flex justify-between items-center">
							<span className="text-[#F1F2F3] text-base">
								1x {ticket.name.charAt(0) + ticket.name.slice(1).toLowerCase()}
							</span>
							<span className="text-[#F1F2F3] text-base font-bold">
								{formatRupiah(ticket.price)}
							</span>
						</div>
					</div>

					<DashedSeparator />

					{/* Voucher Section */}
					<div className="flex flex-col gap-4">
						<p className="text-[#909090] text-base font-bold">Voucher Code</p>

						{voucherState === "verified" ? (
							<div className="flex items-center justify-between bg-[#22835F] rounded-lg px-4 py-3">
								<div className="flex items-center gap-2">
									<CheckCircleIcon />
									<span className="text-[#F1F2F3] text-base font-medium">
										{voucherCode.toUpperCase()}
									</span>
								</div>
								<button
									type="button"
									onClick={handleClearVoucher}
									className="cursor-pointer p-1 bg-transparent border-none"
									aria-label="Remove voucher"
								>
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										role="img"
									>
										<title>Remove voucher</title>
										<path
											d="M18 6L6 18"
											stroke="#F1F2F3"
											strokeWidth="2"
											strokeLinecap="round"
										/>
										<path
											d="M6 6L18 18"
											stroke="#F1F2F3"
											strokeWidth="2"
											strokeLinecap="round"
										/>
									</svg>
								</button>
							</div>
						) : (
							<div className="flex gap-2">
								<input
									type="text"
									value={voucherCode}
									onChange={handleVoucherChange}
									placeholder="Enter voucher code"
									className="flex-1 px-4 py-3 rounded-lg bg-[#282828] border border-[#909090] text-[#F1F2F3] text-base placeholder:text-[#909090] focus:border-[#224083] focus:outline-none focus:ring-1 focus:ring-[#224083]"
								/>
								<button
									type="button"
									onClick={handleApplyVoucher}
									disabled={voucherState === "empty"}
									className="px-4 py-3 rounded-2xl text-[#282828] bg-[#FAFAFA] font-bold text-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors"
								>
									Apply Voucher
								</button>
							</div>
						)}
					</div>

					{/* Discount Row */}
					{discount > 0 && (
						<div className="flex justify-between items-center">
							<span className="text-[#F1F2F3] text-base">Discount Voucher</span>
							<span className="text-[#F1F2F3] text-base font-bold">
								{formatRupiah(discount)}
							</span>
						</div>
					)}

					<DashedSeparator />

					{/* Total */}
					<div className="flex justify-between items-center">
						<span className="text-[#F1F2F3] text-base">Total</span>
						<span className="text-[#F1F2F3] text-2xl font-bold font-sans">
							{formatRupiah(total)}
						</span>
					</div>

					{/* CTA Button */}
					<button
						type="button"
						className="w-full py-3 px-4 bg-[#FAFAFA] text-[#282828] font-bold text-lg rounded hover:bg-white transition-colors cursor-pointer"
					>
						Buy ticket
					</button>
				</div>
			</div>
		</div>
	);
};
