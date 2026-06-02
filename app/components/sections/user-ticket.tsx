import type { Route } from ".react-router/types/app/routes/auth/+types/user-ticket";
import { ChevronRight } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Link } from "react-router";

export function UserTicketSection({
	componentProps,
}: {
	componentProps: Route.ComponentProps;
}) {
	const { userTicket, origin } = componentProps.loaderData;
	const { user, ticket, payment, participant_type } = userTicket.data;

	const qrcodeValue = `${origin}/auth/check-in?payment_id=${payment.id}`;

	return (
		<section className="w-full mx-auto px-6 lg:px-12 py-10">
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
					<span className="font-bold text-[#909090]">Transaction ID:</span>
					<span className="text-[#909090]">{payment.id}</span>
				</div>
				<div className="flex items-center gap-2 text-base">
					<span className="font-bold text-[#909090]">Ticket Type:</span>
					<span className="text-[#909090]">{ticket.name}</span>
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
								<span className="text-base text-[#282828]">{ticket.id}</span>
							</div>
							<div className="flex items-start gap-2">
								<span className="text-base font-bold text-[#282828] min-w-[160px]">
									Participant Name
								</span>
								<span className="text-base text-[#282828]">
									{user.first_name} {user.last_name}
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
									Saturday - Sunday, December 13th - 14th, 2025
								</span>
							</div>
							<div className="flex items-start gap-2">
								<span className="text-base font-bold text-[#282828] min-w-[160px]">
									Location
								</span>
								<span className="text-base text-[#282828]">
									BINUS KEMANGGISAN Jl. Kemanggisan Ilir III No.45, RT.12/RW.6,
									Kemanggisan, Kec. Palmerah, Kota Jakarta Barat, Daerah Khusus
									Ibukota Jakarta 11480
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
		</section>
	);
}
