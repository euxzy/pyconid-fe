import { redirect } from "react-router";
import { getMe } from "~/api/endpoint/.server/auth";
import { getUserProfile } from "~/api/endpoint/.server/user_profile";
import { getUserProfileSchema } from "~/api/schema/user_profile";
import { Main as MainLayout } from "~/components/layouts/app/main";
import { ProfileViewSection } from "~/components/sections/user-profile/profile-view";
import { authenticator } from "~/services/auth/$.server";
import type { Route } from "./+types/user-profile";

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
		return { userProfile };
	} catch (err) {
		if (err instanceof Response) {
			throw err;
		}
		console.error("Profile loader error", err);
		throw new Response("Failed to load profile data", { status: 500 });
	}
};

export default function UserProfilePage(componentProps: Route.ComponentProps) {
	return (
		<MainLayout className="bg-[#282828]">
			<ProfileViewSection userProfile={componentProps.loaderData.userProfile} />
		</MainLayout>
	);
}
