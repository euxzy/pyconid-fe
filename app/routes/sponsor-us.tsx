// routes/coc.tsx
import { redirect } from "react-router";

export function loader() {
	return redirect(
		"https://drive.google.com/file/d/1YVBx9KNewNCUyfgLhoNT9aM05sCaCvSG/view?usp=drivesdk",
	);
}

export default function CocRedirect() {
	return null;
}
