import type { FC } from "react";
import {
	Form,
	Link,
	type LoaderFunctionArgs,
	Outlet,
	redirect,
	useLocation,
	useMatches,
} from "react-router";
import { useMergeHanlde } from "~/hooks/use-merge-handle";
import { authenticator } from "~/services/auth/$.server";
import {
	commitMessageSession,
	getMessageSession,
} from "~/services/sessions/message.server";

export interface AuthLayoutHandleProps {
	title: string;
}

type LoginOAuthProps = {
	title: string;
	provider: string;
	icon: string;
};

const LoginOAuth: FC<LoginOAuthProps> = ({ title, provider, icon }) => {
	return (
		<Form action={`/auth/${provider}`} method="post" className="w-full">
			<button
				type="submit"
				className="flex items-center w-full justify-center gap-x-3 bg-surface text-white rounded-md h-12 cursor-pointer transition-all duration-150 hover:bg-surface/90"
			>
				<img alt={title} src={icon} className="h-5 w-5" />
				<span className="text-sm font-semibold">{title}</span>
			</button>
		</Form>
	);
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const credentials = await authenticator.isAuthenticated(request);
	const messageSession = await getMessageSession(request.headers.get("Cookie"));

	if (credentials) {
		messageSession.flash("toast", {
			title: "Success!",
			message: "You are already logged in!",
			type: "success",
		});

		return redirect("/", {
			headers: { "Set-Cookie": await commitMessageSession(messageSession) },
		});
	}

	return null;
};

const pathnames = ["/login", "/register"];

export default function AuthLayout() {
	const matches = useMatches();
	const handle: AuthLayoutHandleProps = useMergeHanlde({
		matches,
		options: { title: "PyCon 2026" },
	});

	const { pathname } = useLocation();

	return (
		<section className="min-h-screen flex items-center justify-center p-4 md:p-8 font-sans">
			{/* Main Split Container dengan Max-Width dan Border */}
			<div className="w-full max-w-[88rem] flex flex-col lg:flex-row bg-background overflow-hidden min-h-[80vh] lg:h-[85vh]">
				{/* Left Side - Dark Graphic Banner */}
				<div className="hidden lg:block w-[45%] bg-surface relative overflow-hidden">
					<img
						alt="PyCon 2026 abstract graphic"
						src="/images/bg-auth-2026.png"
						className="w-full h-full object-cover"
					/>
				</div>

				{/* Right Side - Form Container */}
				<div className="flex-1 flex flex-col relative bg-background">
					{/* Top Right Page Label */}
					<div className="absolute top-0 right-0 bg-surface text-white px-10 py-4 text-xl font-bold md:px-14">
						{handle.title}
					</div>

					{/* Form Content Wrapper */}
					<div className="flex-1 flex flex-col justify-center items-center px-6 py-16 md:px-12">
						<div className="w-full max-w-md">
							<div className="mb-10 flex justify-center">
								<img
									alt="PyCon ID dark logo"
									src="/images/PyCon ID 26 Logo@2x.png"
									className="h-14 w-auto lg:h-16"
								/>
							</div>

							<Outlet />

							{pathnames.includes(pathname) && (
								<>
									<div className="flex items-center w-full h-7 my-6">
										<div className="flex-grow border-t border-neutral-200"></div>
										<span className="px-4 text-neutral-400 text-sm">or</span>
										<div className="flex-grow border-t border-neutral-200"></div>
									</div>

									<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
										<LoginOAuth
											title="Continue with Google"
											icon="/svg/google-logo.svg"
											provider="google"
										/>
										<LoginOAuth
											title="Continue with Github"
											icon="/svg/github.svg"
											provider="github"
										/>

										<p className="col-span-full w-max mx-auto">
											{pathname === "/login" ? (
												<>
													Belum memiliki akun?{" "}
													<Link
														to="/register"
														className="underline text-secondary"
													>
														Register
													</Link>
												</>
											) : (
												<>
													Sudah memiliki akun?{" "}
													<Link
														to="/login"
														className="underline text-secondary"
													>
														Login
													</Link>
												</>
											)}
										</p>
									</div>

									<div className="text-xs mt-10 text-center font-medium text-gray-600 leading-relaxed">
										<p>By creating this account, you agree to our</p>
										<a
											href="/code-of-conduct"
											target="_blank"
											rel="noreferrer noopener"
											className="font-bold text-surface hover:underline"
										>
											Code of Conduct
										</a>
										.
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
