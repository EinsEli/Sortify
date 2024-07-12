import { BarChartBig } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
	return (
		<div className="group logo flex flex-row justify-start items-center gap-2 w-8 hover:w-20 transition-all duration-500">
			{/* Sortify Logo */}
			<Link href="/">
				<BarChartBig className="min-h-6 min-w-6 block" />
			</Link>
			{/* Separator Line */}
			<Image
				width={12}
				height={12}
				alt="Logo"
				className="transition-all duration-500 opacity-0 blur-md group-hover:opacity-100 group-hover:translate-x-0 group-hover:blur-0 transform -translate-x-10"
				src="https://gw.alipayobjects.com/zos/kitchen/qJ3l3EPsdW/split.svg"
			/>
			{/* DHBW-Logo */}
			<Link href="https://www.karlsruhe.dhbw.de">
				<Image
					width={24}
					height={24}
					alt="Logo"
					className="transition-all duration-500 opacity-0 blur-md group-hover:opacity-100 hidden dark:block group-hover:translate-x-0 group-hover:blur-0 transform -translate-x-10"
					src="https://raw.githubusercontent.com/TINF23B6/.github/main/profile/assets/icon_dark.svg"
				/>
				<Image
					width={24}
					height={24}
					alt="Logo"
					className="transition-all duration-500 opacity-0 blur-md group-hover:opacity-100 block dark:hidden group-hover:translate-x-0 group-hover:blur-0 transform -translate-x-10"
					src="https://raw.githubusercontent.com/TINF23B6/.github/main/profile/assets/icon_light.svg"
				/>
			</Link>
		</div>
	);
}
