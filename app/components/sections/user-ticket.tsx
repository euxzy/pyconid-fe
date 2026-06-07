import type { Route } from ".react-router/types/app/routes/auth/+types/user-ticket";
import { ChevronRight } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Link } from "react-router";
import { Hero } from "~/components/shared/hero/hero";

export function UserTicketSection({
	componentProps,
}: {
	componentProps: Route.ComponentProps;
}) {
	const loaderData = componentProps.loaderData;
	const userTicket = loaderData?.userTicket;
	const paymentList = loaderData?.payment;
	const origin = loaderData?.origin ?? "";
	const user = userTicket?.data?.user;
	const ticket = userTicket?.data?.ticket;
	const payment = userTicket?.data?.payment;
	const participant_type = userTicket?.data?.participant_type;

	const hasPaidTicket = !!payment?.paid_at;

	const isRecentUnpaid = (() => {
		if (hasPaidTicket) return false;
		const now = new Date();
		const recentUnpaid = paymentList?.results.find((txn) => {
			if (txn.paid_at) return false;
			const created = new Date(txn.created_at);
			const diffHours = (now.getTime() - created.getTime()) / (1000 * 60 * 60);
			return diffHours <= 24;
		});
		return !!recentUnpaid;
	})();

	const qrcodeValue = hasPaidTicket
		? `${origin}/auth/check-in?payment_id=${payment?.id}`
		: "";

	return (
		<div className="min-h-[calc(100dvh-120px)]">
			<div className="relative">
				<Hero text="My Ticket" />
			</div>

			<section className="w-full mx-auto px-6 lg:px-12 py-10">
				{!hasPaidTicket ? (
					<div className="flex flex-col items-center justify-center py-20">
						<div className="w-24 h-24 mb-6 text-[#909090]">
							<svg
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.5"
								className="w-full h-full"
								aria-labelledby="empty-ticket-title"
							>
								<title id="empty-ticket-title">Empty ticket illustration</title>
								<path d="M2 9a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V9Z" />
								<path d="M2 9a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v1H2V9Z" />
								<path d="M12 13h.01" />
								<path d="M8 13h.01" />
								<path d="M16 13h.01" />
							</svg>
						</div>
						{isRecentUnpaid ? (
							<>
								<h2 className="text-2xl font-bold text-[#282828] mb-2">
									Complete your payment to get your e-ticket.
								</h2>
								<p className="text-[#909090] text-center mb-8 max-w-md">
									You have unpaid ticket. Complete your payment to receive your
									e-ticket.
								</p>
							</>
						) : (
							<>
								<h2 className="text-2xl font-bold text-[#282828] mb-2">
									No Ticket Found
								</h2>
								<p className="text-[#909090] text-center mb-8 max-w-md">
									You haven't purchased any ticket yet.
								</p>
							</>
						)}
						<Link
							to={isRecentUnpaid ? "/auth/payment" : "/ticket"}
							className="inline-flex items-center justify-center px-6 py-3 bg-[#282828] text-[#FAFAFA] font-bold rounded hover:bg-[#3a3a3a] transition-colors"
						>
							{isRecentUnpaid ? "Pay Ticket" : "Buy Ticket"}
						</Link>
					</div>
				) : (
					<>
						{/* Breadcrumbs */}
						<div className="flex items-center gap-2 mb-6">
							<Link
								to="/auth/payment"
								className="text-sm font-bold text-[#282828] hover:underline"
							>
								Ticket Transaction List
							</Link>
							<ChevronRight size={16} className="text-[#282828]" />
							<span className="text-sm font-bold text-[#282828]">e-Ticket</span>
						</div>

						{/* Heading */}
						<h1
							className="text-[32px] font-extrabold text-[#282828] mb-4"
							style={{ letterSpacing: "-3.13%" }}
						>
							e-Ticket
						</h1>

						{/* Transaction Info */}
						<div className="flex flex-wrap gap-6 mb-10">
							<div className="flex items-center gap-2 text-base">
								<span className="font-bold text-[#909090]">
									Transaction ID:
								</span>
								<span className="text-[#909090]">{payment.id}</span>
							</div>
							<div className="flex items-center gap-2 text-base">
								<span className="font-bold text-[#909090]">Ticket Type:</span>
								<span className="text-[#909090]">{ticket?.name}</span>
							</div>
						</div>

						{/* Details Card */}
						<div className="border border-[#282828] rounded-lg p-6 lg:p-8">
							<div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
								{/* Ticket Details */}
								<div className="flex-1">
									<h2 className="text-2xl font-bold text-[#282828] mb-6">
										Ticket Details
									</h2>
									<div className="flex flex-col gap-3">
										<div className="flex items-start gap-2">
											<span className="text-base font-bold text-[#282828] min-w-[160px]">
												Ticket ID
											</span>
											<span className="text-base text-[#282828]">
												{ticket?.id}
											</span>
										</div>
										<div className="flex items-start gap-2">
											<span className="text-base font-bold text-[#282828] min-w-[160px]">
												Participant Name
											</span>
											<span className="text-base text-[#282828]">
												{user?.first_name} {user?.last_name}
											</span>
										</div>
										<div className="flex items-start gap-2">
											<span className="text-base font-bold text-[#282828] min-w-[160px]">
												Participant Type
											</span>
											<span className="text-base text-[#282828]">
												{participant_type}
											</span>
										</div>
									</div>
								</div>

								{/* Dashed Divider */}
								<div className="hidden lg:block w-px border-l border-dashed border-[#282828]" />
								<hr className="lg:hidden border-t border-dashed border-[#282828]" />

								{/* Event Details */}
								<div className="flex-1">
									<h2 className="text-2xl font-bold text-[#282828] mb-6">
										Event Details
									</h2>
									<div className="flex flex-col gap-3">
										<div className="flex items-start gap-2">
											<span className="text-base font-bold text-[#282828] min-w-[160px]">
												Date
											</span>
											<span className="text-base text-[#282828]">
												Saturday - Sunday, August 8th-9th, 2026
											</span>
										</div>
										<div className="flex items-start gap-2">
											<span className="text-base font-bold text-[#282828] min-w-[160px]">
												Location
											</span>
											<span className="text-base text-[#282828]">
												Binus University @Kemanggisan - Anggrek Campus <br />{" "}
												Jl. Raya Kb. Jeruk No.27, RT.1/RW.9, Kemanggisan, Kec.
												Palmerah, Kota Jakarta Barat, Daerah Khusus Ibukota
												Jakarta 11530
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* QR Code */}
						<div className="flex justify-center mt-10">
							<QRCodeSVG value={qrcodeValue} size={225} />
						</div>
					</>
				)}
			</section>
		</div>
	);
}
