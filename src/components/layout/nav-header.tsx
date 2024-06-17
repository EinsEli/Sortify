"use client";

import React from "react";
import { Link } from "next-view-transitions";
import { navigationLinks } from "@/lib/navigation-Links";
import { BarChartBig } from "lucide-react";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./dark-mode-toggle";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	NavigationMenuViewport,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

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
													className={`text-muted-foreground transition-colors hover:text-foreground ${
														link.url == pathname
															? "!text-black font-semibold dark:!text-white"
															: ""
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
												<NavigationMenuTrigger>
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
																		className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
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
			<main className="flex-grow flex-col flex bg-muted/40 gap-8 p-10">
				{children}
			</main>
		</div>
	);
}
