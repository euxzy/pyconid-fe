import { Main as MainLayout } from "~/components/layouts/app/main";
import { ProfileViewSection } from "~/components/sections/user-profile/profile-view";
import type { Route } from "./+types/user-profile";

export const loader = async () => {
	// Mock data for testing without login
	const userProfile = {
		profile_picture: null,
		first_name: "John",
		last_name: "Doe",
		job_category: "Software Engineering",
		job_title: "Senior Developer",
		country: { id: 1, name: "Indonesia" },
		bio: "Passionate software developer with 10 years of experience in building scalable web applications. Loves Python and open source.",
		participant_type: "Regular",
		coc_acknowledged: true,
		terms_agreed: true,
		privacy_agreed: true,
		email: "john.doe@example.com",
		industry_categories: "Technology",
		company: "PyCon ID",
		experience: 10,
		t_shirt_size: "L",
		gender: "Male",
		date_of_birth: "1990-01-01",
		phone: "+6281234567890",
		state: { id: 1, name: "Jakarta" },
		city: { id: 1, name: "Jakarta Selatan" },
		zip_code: "12345",
		address: "Jl. Python No. 1",
		interest: ["Python", "AI", "Web Development"],
		looking_for: "Networking",
		expertise: ["Python", "Django", "FastAPI"],
		website: "https://johndoe.dev",
		github_username: "johndoe",
		facebook_username: null,
		linkedin_username: "johndoe",
		twitter_username: "johndoe",
		instagram_username: null,
		share_my_email_and_phone_number: true,
		share_my_job_and_company: true,
		share_my_location: true,
		share_my_interest: true,
		share_my_public_social_media: true,
		attendance_day_1: true,
		attendance_day_2: true,
	};

	return { userProfile };
};

export default function UserProfilePage(componentProps: Route.ComponentProps) {
	return (
		<MainLayout className="bg-[#282828]">
			<ProfileViewSection userProfile={componentProps.loaderData.userProfile} />
		</MainLayout>
	);
}
