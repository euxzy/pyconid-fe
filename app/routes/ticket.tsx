import { Footer } from "~/components/layouts/navigation/footer";
import { Header } from "~/components/layouts/navigation/header";
import { Ticket } from "~/components/sections/ticket/ticket";

export function meta() {
	return [
		{ title: "PyCon ID 2026 Ticket" },
		{ name: "PyCon ID 2026 Ticket Page", content: "Ticket page" },
	];
}

export default function TicketPage() {
	return (
		<main>
			<Header />
			<Ticket />
			<Footer />
		</main>
	);
}
