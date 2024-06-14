"use client";

import React from "react";
import Link from "next/link";
import { navigationLinks } from "@/lib/navigationLinks";
import { BarChartBig } from "lucide-react";
import { usePathname } from "next/navigation";

export default function NavHeader({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();

	return (
		<div className="flex min-h-screen w-full flex-col">
			<header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
				<nav className="font-medium flex flex-row items-center text-sm gap-6 lg:gap-7">
					<Link
						href="#"
						className="flex items-center gap-2 text-lg font-semibold md:text-base"
					>
						<BarChartBig className="h-6 w-6" />
					</Link>
					{navigationLinks.map((link) => {
						console.log("pathname:", pathname);
						console.log("link.url:", link.url);
						return (
							<Link
								key={link.url}
								href={link.url}
								className={`text-muted-foreground transition-colors hover:text-foreground ${
									link.url == pathname ? "text-foreground font-semibold" : ""
								}`}
							>
								{link.title}
							</Link>
						);
					})}
				</nav>
			</header>
			<main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col bg-muted/40 gap-8 p-10">
				{children}
			</main>
		</div>
	);
}
