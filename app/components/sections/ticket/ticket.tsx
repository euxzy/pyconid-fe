import { useState } from "react";
import { TicketCard } from "~/components/shared/ticket-card/ticket-card";
import { TicketErrorModal } from "~/components/shared/ticket-error-modal";
import { TicketPurchaseModal } from "~/components/shared/ticket-purchase-modal";

const STATIC_TICKETS = [
	{
		id: "student",
		name: "STUDENT",
		price: 25000,
		description:
			"This ticket is for students (school or university) only. The price of this ticket is heavily subsidized to give chance for students to join the conference.",
	},
	{
		id: "general",
		name: "GENERAL",
		price: 300000,
		description:
			"This ticket is for individual who pays for the ticket themselves. The price of this ticket is not the true cost, it is subsidized thanks for our sponsor.",
	},
	{
		id: "corporate",
		name: "CORPORATE",
		price: 500000,
		description:
			"This ticket is for individual who pays for the ticket themselves. The price of this ticket is the true cost of the conference.",
	},
	{
		id: "patron",
		name: "PATRON",
		price: 1500000,
		description:
			"This ticket is for individual who wants to support our conference. We recommend those who can, to buy this ticket.",
	},
	{
		id: "online",
		name: "ONLINE",
		price: 100000,
		description:
			"This ticket is for individual who wants to join our conference online.",
	},
];

export const Ticket = () => {
	const [selectedTicket, setSelectedTicket] = useState<
		(typeof STATIC_TICKETS)[0] | null
	>(null);
	const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
	const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

	const handleSelectTicket = (ticket: (typeof STATIC_TICKETS)[0]) => {
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

	return (
		<>
			{/* Hero Section */}
			<section className="relative bg-[#282828] overflow-hidden">
				{/* Decorative Ellipse */}
				<div className="absolute right-0 top-[21px] w-[522px] h-[522px] rounded-full border-[75px] border-[#909090] opacity-20" />

				{/* Accent decorations */}
				<div className="absolute -left-5 -top-5 opacity-50">
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
				<div className="absolute left-[429px] top-[245px] opacity-50">
					<svg
						width="97"
						height="100"
						viewBox="0 0 97 100"
						fill="none"
						role="img"
						aria-label="Decorative accent"
					>
						<path
							d="M1.83 11.31L45.31 58.23L51.44 42.22L12.19 53.01L1.83 11.31Z"
							fill="#F27F20"
						/>
						<path
							d="M12.19 53.01L51.44 42.22L40.95 0L1.83 11.31L12.19 53.01Z"
							fill="#224083"
						/>
					</svg>
				</div>
				<div className="absolute right-0 -top-[35px] opacity-50">
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

				<div className="container mx-auto px-6 lg:px-12 pt-[120px] pb-16 lg:pt-[160px] lg:pb-24 relative z-10">
					<div className="flex justify-between items-start">
						<h1 className="text-[#F1F2F3] text-4xl md:text-5xl lg:text-[60px] font-bold font-sans tracking-tight max-w-[600px]">
							Buy PyCon ID 2026 Ticket
						</h1>

						{/* Logo */}
						<div className="hidden lg:flex items-center gap-4">
							<img
								src="/images/logo-light.webp"
								alt="PyCon ID 2026"
								className="h-12"
							/>
							<img
								src="/images/logo-python-id-no-text.png"
								alt="Python ID"
								className="h-10"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Ticket Grid Section */}
			<section className="bg-[#FAF9F7] py-20 lg:py-24">
				<div className="container mx-auto px-6 lg:px-12">
					<div className="flex flex-wrap justify-center gap-6">
						{STATIC_TICKETS.map((ticket) => (
							<TicketCard
								key={ticket.id}
								name={ticket.name}
								price={ticket.price}
								description={ticket.description}
								onSelect={() => handleSelectTicket(ticket)}
							/>
						))}
					</div>
				</div>
			</section>

			{/* Purchase Modal */}
			<TicketPurchaseModal
				isOpen={isPurchaseModalOpen}
				onClose={handleClosePurchaseModal}
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
