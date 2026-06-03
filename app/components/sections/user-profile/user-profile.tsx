import { Briefcase, Building2, MapPin, Search, User } from "lucide-react";
import type { ReactNode } from "react";
import { NavLink } from "react-router";
import type { GetUserProfileSchema } from "~/api/schema/user_profile";
import { Footer } from "~/components/layouts/navigation/footer";
import { parseProfileImage } from "~/lib/utils";
import { useRootLoaderData } from "~/root";

export const UserProfileSection = ({
	userProfile,
	me,
}: {
	userProfile: GetUserProfileSchema;
	me: { id: string; username: string; participant_type?: string | null };
}) => {
	const rootData = useRootLoaderData();

	const fullName = [userProfile.first_name, userProfile.last_name]
		.filter(Boolean)
		.join(" ");

	const initials =
		(userProfile.first_name?.charAt(0).toUpperCase() || "") +
		(userProfile.last_name?.charAt(0).toUpperCase() || "");

	const location = [
		userProfile.city?.name,
		userProfile.state?.name,
		userProfile.country?.name,
	]
		.filter(Boolean)
		.join(", ");

	const profileImg = userProfile.profile_picture
		? parseProfileImage({ token: rootData.credentials?.token })
		: null;

	return (
		<div className="min-h-[calc(100dvh-120px)]">
			{/* Jumbotron */}
			<div className="bg-[#282828] relative overflow-hidden">
				<div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-24 pb-16 lg:pt-32 lg:pb-24 relative">
					{/* Navigation tabs */}
					<div className="flex items-center gap-4 mb-8">
						<NavLink
							to="/auth/user-profile"
							className="flex items-center gap-3 px-4 py-2 relative"
						>
							<User className="w-5 h-5 text-[#FAFAFA]" />
							<span className="text-sm font-bold text-[#FAFAFA]">
								My Profile
							</span>
							<div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FAFAFA]" />
						</NavLink>
						<NavLink
							to="/auth/user-ticket"
							className="flex items-center gap-3 px-4 py-2 text-[#F1F2F3]/70 hover:text-white transition-colors"
						>
							<img
								src="/svg/user-profile/ticket-icon.svg"
								alt=""
								width="20"
								height="20"
								className="text-white"
							/>
							<span className="text-sm font-bold">My Tickets</span>
						</NavLink>
					</div>

					{/* Heading + Logo */}
					<div className="flex items-end justify-between">
						<h1 className="text-[60px] font-bold text-[#F1F2F3] leading-tight tracking-[-0.005em]">
							My Profile
						</h1>
						<img
							src="/images/logo-pycon-2026-light.png"
							alt="PyCon ID 2026"
							className="h-12 hidden lg:block"
						/>
					</div>

					{/* Decorative circle */}
					<div
						className="absolute rounded-full border-[75px] border-[#909090] opacity-20 pointer-events-none hidden lg:block"
						style={{ width: 522, height: 522, right: -80, top: 21 }}
					/>
				</div>
			</div>

			{/* Main Card */}
			<div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-9">
				<div className="bg-[#FAFAFA] border-2 border-[#282828] relative overflow-hidden">
					{/* Profile Header */}
					<div className="min-h-[208px] border-b-2 border-[#282828] px-8 lg:px-12 py-8 lg:py-10 relative">
						<div className="flex flex-col md:flex-row items-start gap-6">
							{/* Avatar */}
							<div className="w-[135px] h-[135px] rounded-full overflow-hidden bg-gray-400 flex-shrink-0">
								{profileImg ? (
									<img
										src={profileImg}
										alt={fullName}
										className="w-full h-full object-cover"
									/>
								) : (
									<div className="w-full h-full grid place-items-center text-3xl font-bold text-white">
										{initials}
									</div>
								)}
							</div>

							{/* Info */}
							<div className="flex flex-col gap-1">
								<h2 className="text-[34px] font-bold text-[#282828] leading-tight">
									{fullName || me.username || "User"}
								</h2>
								{userProfile.email && (
									<a
										href={`mailto:${userProfile.email}`}
										className="text-xl text-[#282828] underline hover:opacity-80"
									>
										{userProfile.email}
									</a>
								)}
								{userProfile.phone && (
									<p className="text-xl text-[#282828]">{userProfile.phone}</p>
								)}
								{location && (
									<div className="flex items-center gap-2">
										<MapPin className="w-5 h-5 text-[#282828]" />
										<span className="text-xl text-[#282828]">{location}</span>
									</div>
								)}
							</div>
						</div>

						{/* Decorative snake */}
						<div className="absolute right-8 top-8 opacity-10 hidden lg:block">
							<img
								src="/svg/user-profile/decorative-snake.svg"
								alt=""
								width="155"
								height="185"
							/>
						</div>
					</div>

					{/* Change Button */}
					<NavLink
						to="/auth/dashboard"
						className="absolute top-12 right-14 flex items-center gap-2 text-[#282828] hover:opacity-70 transition-opacity z-10"
					>
						<img
							src="/svg/user-profile/edit-profile.svg"
							alt=""
							width="20"
							height="20"
						/>
						<span className="font-bold text-xl">Change</span>
					</NavLink>

					{/* Profile Info */}
					<div className="px-8 lg:px-14 py-8 pb-10">
						<h2 className="text-[34px] font-bold text-[#282828] mb-6">
							Profile
						</h2>
						<div className="flex flex-wrap gap-x-[68px] gap-y-8">
							<InfoCard
								icon={<Briefcase className="w-6 h-6" />}
								label="Job Title"
								value={userProfile.job_title}
							/>
							<InfoCard
								icon={<Building2 className="w-6 h-6" />}
								label="Company Organization"
								value={userProfile.company}
							/>
							<InfoCard
								icon={<User className="w-6 h-6" />}
								label="Participant Type"
								value={userProfile.participant_type}
							/>
							<InfoCard
								icon={<Search className="w-6 h-6" />}
								label="Offering / Searching Expertise"
								value={
									userProfile.expertise !== null &&
									userProfile.expertise.length > 0
										? userProfile.expertise.join(", ")
										: userProfile.job_category
								}
							/>
							<InfoCard
								icon={<Search className="w-6 h-6" />}
								label="Looking for"
								value={userProfile.looking_for}
							/>
						</div>
					</div>

					{/* About */}
					<div className="px-8 lg:px-14 pt-4 pb-8 max-w-[1080px]">
						<h3 className="text-xl font-bold text-[#282828] mb-4">About</h3>
						<p className="text-xl text-[#282828] leading-relaxed">
							{userProfile.bio || "No bio available."}
						</p>
					</div>

					{/* Divider */}
					<div className="h-[1px] bg-[#282828] mx-8 lg:mx-14" />

					{/* Attendance */}
					{(userProfile.attendance_day_1 || userProfile.attendance_day_2) && (
						<div className="px-8 lg:px-14 py-8">
							<h2 className="text-[34px] font-bold text-[#282828] mb-6">
								Attendance
							</h2>
							<div className="flex flex-wrap gap-20">
								{userProfile.attendance_day_1 && (
									<div className="flex flex-col gap-2 min-w-[180px]">
										<span className="text-xl text-[#282828] font-bold">
											Day 1
										</span>
										<span className="text-2xl text-[#282828]">
											{userProfile.attendance_day_1_at
												? new Date(
														userProfile.attendance_day_1_at,
													).toLocaleString()
												: "Checked in"}
										</span>
									</div>
								)}
								{userProfile.attendance_day_2 && (
									<div className="flex flex-col gap-2 min-w-[180px]">
										<span className="text-xl text-[#282828] font-bold">
											Day 2
										</span>
										<span className="text-2xl text-[#282828]">
											{userProfile.attendance_day_2_at
												? new Date(
														userProfile.attendance_day_2_at,
													).toLocaleString()
												: "Checked in"}
										</span>
									</div>
								)}
							</div>
						</div>
					)}

					{/* Divider */}
					{(userProfile.attendance_day_1 || userProfile.attendance_day_2) && (
						<div className="h-[1px] bg-[#282828] mx-8 lg:mx-14" />
					)}

					{/* Social Media */}
					<div className="px-8 lg:px-14 py-8">
						<h2 className="text-[34px] font-bold text-[#282828] mb-6">
							Social Media
						</h2>
						<div className="flex flex-col gap-8">
							<div className="flex flex-wrap gap-20">
								<SocialCard
									icon={
										<img
											src="/svg/user-profile/portfolio.svg"
											alt=""
											width="32"
											height="32"
										/>
									}
									label="Portfolio"
									value={userProfile.website}
								/>
								<SocialCard
									icon={
										<img
											src="/svg/user-profile/github.svg"
											alt=""
											width="32"
											height="32"
										/>
									}
									label="Github"
									value={userProfile.github_username}
								/>
								<SocialCard
									icon={
										<img
											src="/svg/user-profile/linkedin.svg"
											alt=""
											width="32"
											height="32"
										/>
									}
									label="Linkedin"
									value={userProfile.linkedin_username}
								/>
								<SocialCard
									icon={
										<img
											src="/svg/user-profile/instagram.svg"
											alt=""
											width="32"
											height="32"
										/>
									}
									label="Instagram"
									value={userProfile.instagram_username}
								/>
							</div>
							<div className="flex flex-wrap gap-10">
								<SocialCard
									icon={
										<img
											src="/svg/user-profile/facebook.svg"
											alt=""
											width="32"
											height="32"
										/>
									}
									label="Facebook"
									value={userProfile.facebook_username}
								/>
								<SocialCard
									icon={
										<img
											src="/svg/user-profile/x-twitter.svg"
											alt=""
											width="32"
											height="32"
										/>
									}
									label="X/Twitter"
									value={userProfile.twitter_username}
								/>
							</div>
						</div>
					</div>

					{/* Decorative Accents */}
					<div className="absolute -left-36 bottom-0 opacity-20 pointer-events-none hidden lg:block">
						<img
							src="/svg/logo-bg.svg"
							alt=""
							width="386"
							height="412"
							className="opacity-20"
						/>
					</div>
					<div className="absolute -right-36 bottom-0 opacity-20 pointer-events-none hidden lg:block">
						<img
							src="/svg/logo-bg.svg"
							alt=""
							width="386"
							height="412"
							className="opacity-20"
						/>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

function InfoCard({
	icon,
	label,
	value,
}: {
	icon: ReactNode;
	label: string;
	value: string | null;
}) {
	return (
		<div className="flex flex-col gap-1 min-w-[180px]">
			<div className="flex items-center gap-2 text-[#282828]">
				{icon}
				<span className="text-base font-bold">{label}</span>
			</div>
			<span className="text-2xl font-normal text-[#282828]">
				{value || "-"}
			</span>
		</div>
	);
}

function SocialCard({
	icon,
	label,
	value,
}: {
	icon: ReactNode;
	label: string;
	value: string | null;
}) {
	return (
		<div className="flex flex-col gap-2 min-w-[180px]">
			<div className="flex items-center gap-4">
				{icon}
				<span className="text-xl text-[#282828]">{label}</span>
			</div>
			<span className="text-2xl text-[#282828]">{value || "-"}</span>
		</div>
	);
}
