import { redirect } from "react-router";
import { z } from "zod";
import {
	getUserProfile,
	industries as industriesApi,
	jobs as jobsApi,
	participantTypes as participantTypesApi,
	updateUserProfile,
} from "~/api/endpoint/.server/user_profile";
import {
	getUserProfileSchema,
	industriesSchema,
	jobsSchema,
	participantTypeSchema,
	updateUserProfileSchema,
} from "~/api/schema/user_profile";
import { Main as MainLayout } from "~/components/layouts/app/main";
import { ProfileDashboardSection } from "~/components/sections/dashboard/dashboard";
import { authenticator } from "~/services/auth/$.server";
import type { Route } from "./+types/dashboard";

export const loader = async ({ request }: Route.LoaderArgs) => {
	const credentials = await authenticator.isAuthenticated(request);
	if (!credentials) {
		return redirect("/login");
	}

	try {
		const [dataIndustries, dataJobs, dataParticipant, dataUserProfile] =
			await Promise.all([
				industriesApi(),
				jobsApi(),
				participantTypesApi(),
				getUserProfile({ request }),
			]);
		const [jsonIndustries, jsonJobs, jsonParticipant, jsonUserProfile] =
			await Promise.all([
				dataIndustries.json(),
				dataJobs.json(),
				dataParticipant.json(),
				dataUserProfile.json(),
			]);
		const industries = industriesSchema.parse(jsonIndustries);
		const jobs = jobsSchema.parse(jsonJobs);
		const participantTypes = participantTypeSchema.parse(jsonParticipant);
		const userProfile = getUserProfileSchema.parse(jsonUserProfile);
		return { industries, jobs, participantTypes, userProfile };
	} catch (err) {
		console.error("Dashboard loader error, using mock data", err);
		return {
			industries: {
				results: [
					{ value: "Software Engineering", label: "Software Engineering" },
				],
			},
			jobs: {
				results: [
					{ value: "Software Engineering", label: "Software Engineering" },
				],
			},
			participantTypes: { results: [{ value: "Regular", label: "Regular" }] },
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
		};
	}
};

const clientErrorDetailSchema = z.object({
	field: z.string(),
	message: z.string(),
});

const clientErrorSchema = z.object({
	errors: z.array(clientErrorDetailSchema),
	message: z.string(),
});

export const action = async ({ request }: Route.ActionArgs) => {
	const credentials = await authenticator.isAuthenticated(request);
	if (!credentials) {
		return redirect("/login");
	}
	const formData = new FormData();
	for (const [key, value] of (await request.formData()).entries()) {
		if (
			key === "profile_picture" &&
			value &&
			typeof value !== "string" &&
			(value?.size || 0) > 0
		) {
			formData.append(key, value);
		}
		if (typeof value === "string" && value.trim() !== "") {
			formData.append(key, value);
		}
	}
	if (!formData.has("share_my_email_and_phone_number")) {
		formData.append("share_my_email_and_phone_number", "false");
	}
	if (!formData.has("share_my_job_and_company")) {
		formData.append("share_my_job_and_company", "false");
	}
	if (!formData.has("share_my_location")) {
		formData.append("share_my_location", "false");
	}
	if (!formData.has("share_my_interest")) {
		formData.append("share_my_interest", "false");
	}
	if (!formData.has("share_my_public_social_media")) {
		formData.append("share_my_public_social_media", "false");
	}
	if (!formData.has("coc_acknowledged")) {
		formData.append("coc_acknowledged", "false");
	}
	if (!formData.has("terms_agreed")) {
		formData.append("terms_agreed", "false");
	}
	if (!formData.has("privacy_agreed")) {
		formData.append("privacy_agreed", "false");
	}
	const data = Object.fromEntries(formData.entries());
	console.log({ data });
	const formatFieldName = (field: string) =>
		field
			.replace(/_/g, " ")
			.replace(/-/g, " ")
			.replace(/\b\w/g, (c) => c.toUpperCase());

	const results = updateUserProfileSchema.safeParse(data);
	if (!results.success) {
		const missingFields = results.error.issues.map((issue) =>
			formatFieldName(issue.path.join(".")),
		);
		const message = `Missing or invalid fields: ${missingFields.join(", ")}`;
		console.log({ validationErrors: results.error });
		return {
			success: false,
			clientError: {
				message,
				errors: results.error.issues.map((i) => ({
					field: formatFieldName(i.path.join(".")),
					message: i.message,
				})),
			},
			errors: null,
		};
	}
	const res = await updateUserProfile({ request, formData });
	if (!res.ok) {
		if (res.status === 400) {
			const json = await res.json();
			console.log({ status: res.status, message: await res.text() });
			return {
				success: false,
				clientError: clientErrorSchema.parse({
					errors: [],
					message: json.message,
				}),
				errors: null,
			};
		}
		if (res.status === 422) {
			const json = await res.json();
			console.log({ status: res.status, message: JSON.stringify(json) });
			const clientError = clientErrorSchema.parse(json);
			clientError.message = "Invalid data, please check the form fields.";
			return {
				success: false,
				clientError,
				errors: null,
			};
		}
		const json = await res.json();
		console.log({ status: res.status, json: JSON.stringify(json, null, 2) });
		return {
			success: false,
			clientError: null,
			errors: json,
		};
	}

	return {
		success: true,
		clientError: null,
		errors: null,
	};
};

export default function DashboardPage(componentProps: Route.ComponentProps) {
	return (
		<MainLayout className="bg-[#FAFAFA]">
			<ProfileDashboardSection
				userProfile={componentProps.loaderData.userProfile}
				industries={componentProps.loaderData.industries}
				jobs={componentProps.loaderData.jobs}
				participantTypes={componentProps.loaderData.participantTypes}
				actionData={componentProps.actionData}
			/>
		</MainLayout>
	);
}
