import { useState } from "react";
import type { TicketType } from "~/api/schema/ticket";
import { Hero } from "~/components/shared/hero/hero";
import { EarlyBirdTicketCard } from "~/components/shared/ticket/early-bird-ticket-card";
import { TicketCard } from "~/components/shared/ticket/ticket-card";
import { TicketErrorModal } from "~/components/shared/ticket/ticket-error-modal";
import { TicketPurchaseModal } from "~/components/shared/ticket/ticket-purchase-modal";

export const Ticket = ({ tickets }: { tickets: TicketType[] }) => {
	const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null);
	const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
	const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

	const handleSelectTicket = (ticket: TicketType) => {
		setSelectedTicket(ticket);
		setIsPurchaseModalOpen(true);
	};

	const handleClosePurchaseModal = () => {
		setIsPurchaseModalOpen(false);
		setSelectedTicket(null);
	};

	const handleCloseErrorModal = () => {
		setIsErrorModalOpen(false);
	};

	const handleShowError = () => {
		setIsPurchaseModalOpen(false);
		setSelectedTicket(null);
		setIsErrorModalOpen(true);
	};

	const isEarlyBird = (name: string) =>
		name.toLowerCase().includes("early bird");

	return (
		<>
			{/* Hero Section */}
			<Hero text="Buy PyCon ID 2026 Ticket" />
			{/* Ticket Grid Section */}
			<section className="bg-[#FAF9F7] py-20 lg:py-24">
				<div className="container mx-auto px-6 lg:px-12">
					<div className="flex flex-wrap justify-center gap-6">
						{tickets.map((ticket) =>
							isEarlyBird(ticket.name) ? (
								<EarlyBirdTicketCard
									key={ticket.id}
									name={ticket.name}
									price={ticket.price}
									description={ticket.description ?? ""}
									isSoldOut={ticket.is_sold_out}
									onSelect={() => handleSelectTicket(ticket)}
								/>
							) : (
								<TicketCard
									key={ticket.id}
									name={ticket.name}
									price={ticket.price}
									description={ticket.description ?? ""}
									isSoldOut={ticket.is_sold_out}
									onSelect={() => handleSelectTicket(ticket)}
								/>
							),
						)}
					</div>
				</div>
			</section>

			{/* Purchase Modal */}
			<TicketPurchaseModal
				isOpen={isPurchaseModalOpen}
				onClose={handleClosePurchaseModal}
				onShowError={handleShowError}
				ticket={selectedTicket}
			/>

			{/* Error Modal */}
			<TicketErrorModal
				isOpen={isErrorModalOpen}
				onClose={handleCloseErrorModal}
			/>
		</>
	);
};
