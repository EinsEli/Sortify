"use client";

import React from "react";
import { Link } from "next-view-transitions";
import { navigationLinks } from "@/lib/navigationLinks";
import { BarChartBig } from "lucide-react";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./dark-mode-toggle";

export default function NavHeader({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();

	return (
		<div className="flex min-h-screen w-full flex-col">
			<header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-md px-6 z-50">
				<nav className="flex flex-row w-full justify-between">
					<div className="font-medium flex flex-row items-center text-sm gap-7">
						<Link href="#" className="flex items-center gap-2">
							<BarChartBig className="h-6 w-6" />
						</Link>
						{navigationLinks.map((link) => {
							return (
								<Link
									key={link.url}
									href={link.url}
									className={`text-muted-foreground transition-colors hover:text-foreground ${
										link.url == pathname
											? "!text-black font-semibold dark:!text-white"
											: ""
									}`}
								>
									{link.title}
								</Link>
							);
						})}
					</div>
					<ModeToggle />
				</nav>
			</header>
			<main className="flex-grow flex-col flex bg-muted/40 gap-8 p-10">
				{children}
			</main>
		</div>
	);
}
