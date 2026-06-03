import { redirect } from "react-router";
import { getMe } from "~/api/endpoint/.server/auth";
import { getUserProfile } from "~/api/endpoint/.server/user_profile";
import { meSchema } from "~/api/schema/auth";
import { getUserProfileSchema } from "~/api/schema/user_profile";
import { Main as MainLayout } from "~/components/layouts/app/main";
import { UserProfileSection } from "~/components/sections/user-profile/user-profile";
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
    const me = meSchema.parse(await dataMe.json());

    return { userProfile, me };
  } catch (err) {
    if (err instanceof Response) {
      throw err;
    }
    console.error("Account profile loader error, using mock data", err);
    return {
      userProfile: {
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
      },
      me: { id: "1", username: "johndoe", participant_type: "Regular" },
    };
  }
};

export default function AccountProfilePage(
  componentProps: Route.ComponentProps,
) {
  return (
    <MainLayout className="bg-[#FAF9F7]" contentClassName="!pt-0">
      <UserProfileSection
        userProfile={componentProps.loaderData.userProfile}
        me={componentProps.loaderData.me}
      />
    </MainLayout>
  );
}
