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
		console.error("Dashboard loader error", err);
		throw new Response("Failed to load dashboard data", { status: 500 });
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
	if (!formData.has("share_my_data_to_sponsor")) {
		formData.append("share_my_data_to_sponsor", "false");
	}
	if (!formData.has("retain_my_data_for_next_pycon")) {
		formData.append("retain_my_data_for_next_pycon", "false");
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
