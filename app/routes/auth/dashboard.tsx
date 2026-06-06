import { redirect } from "react-router";
import { getMe } from "~/api/endpoint/.server/auth";
import { getUserProfile } from "~/api/endpoint/.server/user_profile";
import { getUserTicket } from "~/api/endpoint/.server/user_ticket";
import { meSchema } from "~/api/schema/auth";
import { getUserProfileSchema } from "~/api/schema/user_profile";
import { userTicketResponseSchema } from "~/api/schema/user_ticket";
import { Main as MainLayout } from "~/components/layouts/app/main";
import { DashboardSection } from "~/components/sections/dashboard/dashboard";
import { authenticator } from "~/services/auth/$.server";
import type { Route } from "./+types/dashboard";

export const loader = async ({ request }: Route.LoaderArgs) => {
	const credentials = await authenticator.isAuthenticated(request);
	if (!credentials) {
		return redirect("/login");
	}
	try {
		const dataMe = await getMe({ request });
		if (dataMe.status === 401) {
			authenticator.logout(request, {
				redirectTo: "/",
			});
			return redirect("/login");
		}
		if (dataMe.status !== 200) {
			console.error(
				"Failed to fetch user data",
				dataMe.status,
				await dataMe.text(),
			);
			throw new Response("Failed to fetch user data", {
				status: dataMe.status,
			});
		}
		const dataUserProfile = await getUserProfile({ request });
		if (dataUserProfile.status === 401) {
			return redirect("/login");
		}
		const jsonUserProfile = await dataUserProfile.json();
		const userProfile = getUserProfileSchema.parse(jsonUserProfile);
		const me = meSchema.parse(await dataMe.json());

		let hasPaidTicket = false;
		try {
			const dataUserTicket = await getUserTicket({ request });
			if (dataUserTicket.status === 200) {
				const jsonUserTicket = await dataUserTicket.json();
				const userTicket = userTicketResponseSchema.parse(jsonUserTicket);
				hasPaidTicket = !!userTicket.data.payment?.paid_at;
			}
		} catch {
			hasPaidTicket = false;
		}

		return { userProfile, me, hasPaidTicket };
	} catch (err) {
		if (err instanceof Response) {
			throw err;
		}
		console.error("Account profile loader error", err);
		throw new Response("Failed to load profile data", { status: 500 });
	}
};

export default function DashboardPage(componentProps: Route.ComponentProps) {
	return (
		<MainLayout className="bg-[#FAF9F7]" contentClassName="!pt-0">
			<DashboardSection
				userProfile={componentProps.loaderData.userProfile}
				me={componentProps.loaderData.me}
				hasPaidTicket={componentProps.loaderData.hasPaidTicket}
			/>
		</MainLayout>
	);
}
