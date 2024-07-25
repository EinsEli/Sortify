"use client";

import React from "react";
import Link from "next/link";
import { navigationLinks } from "@/lib/navigation-links";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./dark-mode-toggle";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useFullscreen } from "./context";
import Logo from "../ui/logo";

export default function NavHeader({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const { isFullscreen } = useFullscreen();

	return (
		<div className="flex min-h-screen w-full flex-col">
			<header
				className={`sticky top-0 flex h-16 items-center gap-4 transition-all duration-300 ease-out border-b bg-background/80 backdrop-blur-md px-6 z-50 ${
					isFullscreen ? "opacity-0 -translate-y-16" : "opacity-100 translate-y-0"
				}`}
			>
				<nav className="flex flex-row w-full justify-between">
					<div className="font-medium flex flex-row items-center text-sm gap-7">
							<Logo />
						<NavigationMenu>
							<NavigationMenuList>
								{navigationLinks.map((link) => {
									if (link.url != null) {
										return (
											<NavigationMenuItem
												key={link.url}
												className="mr-4"
											>
												<Link
													href="/overview"
													className={`transition-colors hover:text-foreground ${
														link.url == pathname
															? "font-semibold text-foreground"
															: "text-muted-foreground"
													}`}
												>
													{link.title}
												</Link>
											</NavigationMenuItem>
										);
									} else if (link.subLinks != null) {
										return (
											<NavigationMenuItem
												key={link.title}
											>
												{/* "text-muted-foreground"> */}
												<NavigationMenuTrigger
													className={`transition-colors ${
														link.subLinks
															.map(
																(subLink) =>
																	subLink.url
															)
															.includes(pathname)
															? "font-semibold text-foreground"
															: "text-muted-foreground"
													}`}
												>
													{link.title}
												</NavigationMenuTrigger>
												<NavigationMenuContent>
													<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
														{link.subLinks.map(
															(subLink) => (
																<NavigationMenuItem
																	key={
																		subLink.title
																	}
																	title={
																		subLink.title
																	}
																>
																	<Link
																		href={
																			subLink.url
																		}
																		className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-muted-foreground"
																	>
																		<h1 className="text-md font-semibold">
																			{
																				subLink.title
																			}
																		</h1>
																		<p className="text-sm text-muted-foreground">
																			{
																				subLink.description
																			}
																		</p>
																	</Link>
																</NavigationMenuItem>
															)
														)}
													</ul>
												</NavigationMenuContent>
											</NavigationMenuItem>
										);
									}
								})}
							</NavigationMenuList>
						</NavigationMenu>
					</div>
					<ModeToggle />
				</nav>
			</header>
			<main
				className={`absolute h-screen flex-col flex bg-muted/40 gap-8 w-screen ${
					isFullscreen ? "" : "pt-16"
				}`}
			>
				{children}
			</main>
		</div>
	);
}
