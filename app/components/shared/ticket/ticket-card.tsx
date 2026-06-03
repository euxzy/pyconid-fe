import { CheckCircle2, Tag } from "lucide-react";

const formatRupiah = (amount: number) => {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
	}).format(amount);
};

export const TicketCard = ({
	name,
	price,
	description,
	isSoldOut,
	onSelect,
}: {
	name: string;
	price: number;
	description: string;
	isSoldOut?: boolean;
	onSelect?: () => void;
}) => {
	const descriptionFiltered = description.split(":")[1].split("-");
	const benefits = descriptionFiltered.filter(
		(predicate) => predicate !== "\n",
	);

	return (
		<div
			className={`w-full sm:w-[378px] rounded-lg border-b border-[rgba(198,198,198,0.3)] flex flex-col relative overflow-hidden ${isSoldOut ? "bg-[#1a1a1a] opacity-60" : "bg-[#282828]"}`}
		>
			{/* Decorative Accent */}
			<div className="absolute -right-10 -bottom-10 w-[320px] h-[340px] pointer-events-none">
				<img
					src="/svg/accent-dark.svg"
					alt=""
					className="w-full h-full object-contain"
					aria-hidden="true"
				/>
			</div>

			<div className="px-8 pt-12 pb-8 flex flex-col gap-6 flex-1 relative z-10">
				{/* Normal Price Label */}
				<div className="flex items-center gap-2">
					<Tag className="w-4 h-4 text-[#909090]" />
					<span className="text-[#909090] text-base font-bold font-sans">
						Normal Price
					</span>
				</div>

				{/* Price Row */}
				<div className="flex items-center justify-between gap-4">
					<span className="text-[#F1F2F3] text-2xl lg:text-[32px] font-extrabold font-sans tracking-tight">
						{formatRupiah(price)}
					</span>
					<span className="px-3 py-1 border border-[#FAFAFA] text-[#FAFAFA] text-xs font-medium rounded">
						{name}
					</span>
				</div>

				{/* Description */}
				<p className="text-[#909090] text-sm leading-relaxed">{description}</p>

				{/* Benefits List */}
				<div className="flex flex-col gap-4">
					<p className="text-[#F1F2F3] text-sm font-bold">You will get:</p>
					<div className="flex flex-col gap-3">
						{benefits.map((benefit) => (
							<div key={benefit} className="flex items-start gap-3">
								<CheckCircle2 className="w-4 h-4 text-[#F1F2F3] mt-0.5 shrink-0" />
								<span className="text-[#F1F2F3] text-sm">{benefit}</span>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* CTA Button */}
			<div className="px-8 pb-8 relative z-10">
				<button
					type="button"
					onClick={onSelect}
					disabled={isSoldOut}
					className="w-full py-3 px-4 bg-[#FAFAFA] text-[#282828] font-bold text-lg rounded hover:bg-white transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#FAFAFA]"
				>
					{isSoldOut ? "Sold Out" : "Buy ticket"}
				</button>
			</div>
		</div>
	);
};
