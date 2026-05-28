import { formatRupiah } from "~/lib/utils";

export const TicketBuyForm = () => {
	return (
		<div
			className="max-w-[1100px] mx-auto pt-14 flex flex-col gap-6 px-4"
			id="ticket-buy-form"
		>
			<h3 className="text-left text-[#282828] font-bold text-xl">
				Apply your voucher to get discount
			</h3>
			<div className="w-full flex gap-2">
				<input
					type="text"
					className="px-4 py-2 rounded-lg bg-white w-full border border-[#C6C6C6] focus:border-[#224083] focus:outline-none focus:ring-1 focus:ring-[#224083]"
					placeholder="Voucher Code"
					readOnly
				/>
				<button
					type="button"
					className="min-w-[150px] px-4 py-2 rounded-2xl text-white bg-[#F27F20] font-bold cursor-pointer"
				>
					Apply Voucher
				</button>
			</div>
			<div className="flex justify-between text-[#282828] font-bold text-xl">
				<p>Discount:</p>
				<p>{formatRupiah(0)}</p>
			</div>
			<div className="flex justify-between text-[#282828] font-bold text-2xl">
				<p>Grand Total:</p>
				<p>{formatRupiah(0)}</p>
			</div>
			<button
				type="button"
				className="mx-auto min-w-[200px] py-4 rounded-2xl text-white bg-[#282828] font-bold hover:bg-[#3a3a3a] transition-colors cursor-pointer"
			>
				Buy Ticket
			</button>
		</div>
	);
};
