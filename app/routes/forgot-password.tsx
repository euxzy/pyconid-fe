import {
	type ActionFunctionArgs,
	Form,
	redirect,
	useNavigation,
} from "react-router";
import z from "zod";
import { forgotPassword } from "~/api/endpoint/.server/auth";
import { forgotPasswordSchema } from "~/api/schema/auth";
import {
	commitMessageSession,
	getMessageSession,
} from "~/services/sessions/message.server";

export function meta() {
	return [
		{ title: "PyCon ID 2026 Forgot Password" },
		{
			name: "PyCon ID 2026 Forgot Password Page",
			content: "Forgot Password page",
		},
	];
}

export const action = async ({ request }: ActionFunctionArgs) => {
	const referer = request.headers.get("referer");
	const messageSession = await getMessageSession(request.headers.get("Cookie"));

	const formData = await request.formData();
	const email = String(formData.get("email"));
	const body = { email };

	try {
		const validatedForm = forgotPasswordSchema.safeParse(body);
		if (!validatedForm.success) {
			const error = z.prettifyError(validatedForm.error);
			throw new Error(error);
		}

		const response = await forgotPassword({ body });
		const data: { message?: string } = await response.json();
		if (!response.ok) throw new Error(data?.message || response.statusText);

		messageSession.flash("toast", {
			title: "Success!",
			message: data?.message || "Check your email for password reset link!",
			type: "success",
		});

		return redirect("/login", {
			headers: {
				"Set-Cookie": await commitMessageSession(messageSession),
			},
		});
	} catch (error) {
		console.error("error", error);
		messageSession.flash("toast", {
			title: "Oops!",
			message: (error as Error)?.message,
			type: "error",
		});

		return redirect(referer ?? "/login", {
			headers: {
				"Set-Cookie": await commitMessageSession(messageSession),
			},
		});
	}
};

export default function ForgotPasswordPage() {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";

	return (
		<main className="w-full">
			<Form method="POST" className="space-y-4 w-full">
				<div className="flex flex-col w-full">
					<label
						htmlFor="email"
						className="text-xs font-bold mb-1.5 text-gray-800"
					>
						Email
					</label>
					<input
						id="email"
						name="email"
						placeholder="yourmail@example.com"
						type="email"
						className="border border-neutral-200 rounded bg-neutral-50/50 w-full h-12 text-gray-800 px-4 focus:outline-none focus:border-surface focus:ring-1 focus:ring-surface transition-all"
					/>
				</div>

				<button
					type="submit"
					className="bg-surface w-full h-12 rounded text-white font-bold mt-2 cursor-pointer transition-all duration-150 hover:bg-surface/90 disabled:bg-surface/50 disabled:cursor-not-allowed"
					disabled={isSubmitting}
				>
					{isSubmitting ? "Loading..." : "Send Reset Link"}
				</button>
			</Form>
		</main>
	);
}
