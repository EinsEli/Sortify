import NavHeader from "@/components/layout/nav-header";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardTitle,
} from "@/components/ui/card";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { navigationLinks } from "@/lib/navigation-links";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Page() {
	return (
		<NavHeader>
			<ScrollArea>
				<div className="flex flex-col gap-6">
					<div>
						<h1 className="text-2xl font-semibold">
							Welcome back! 👋
						</h1>
						<p className="text-md text-muted-foreground">
							Start learning about sorting algorithms by selecting
							one from the list below or in the navbar.
						</p>
					</div>
					<div className="flex flex-col gap-8">
						{navigationLinks
							.filter((section) => section.url !== "/overview")
							.map((section) => (
								<div
									key={section.title}
									className="flex flex-col gap-2"
								>
									<h2 className="font-semibold text-lg">
										{section.title}
									</h2>
									<div className="grid grid-cols-3 gap-4">
										{section.subLinks?.map((subLink) => (
											<Link
												key={subLink.url}
												href={subLink.url}
											>
												<Card className="hover:shadow-xl transition-shadow duration-500 cursor-pointer min-h-96">
													<CardContent className="p-0 pb-6 rounded-md">
														<div className="relative w-full h-56">
															<Image
																src="https://placehold.co/600x400/png"
																alt={
																	subLink.title
																}
																className="rounded-t-md"
																fill={true}
															/>
														</div>
													</CardContent>
													<CardFooter className="flex-col items-start gap-2">
														<CardTitle>
															{subLink.title}
														</CardTitle>
														<CardDescription>
															{
																subLink.description
															}
														</CardDescription>
													</CardFooter>
												</Card>
											</Link>
										))}
									</div>
								</div>
							))}
					</div>
				</div>
			</ScrollArea>
		</NavHeader>
	);
}
