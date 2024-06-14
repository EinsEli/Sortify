"use client";
import MathFormula from "@/components/math/MathFormula";
import NavHeader from "@/components/navigation/nav-header";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import Image from "next/image";

export default function Page() {
	return (
		<NavHeader>
			<div className="w-full grid grid-cols-3 gap-24">
				{/* Side Bar */}
				<div className="col-span-1 flex flex-col gap-6">
					<div>
						<h1 className="text-xl font-semibold">Bubble Sort</h1>
						<p className="text-md text-muted-foreground">
							Bubble Sort is a simple sorting algorithm that
							repeatedly steps through the list, compares adjacent
							elements, and swaps them if they are in the wrong
							order.
						</p>
					</div>
					<div className="flex flex-col gap-1">
						<h3 className="text-lg font-semibold">
							Time Complexity
						</h3>
						<div className="flex flex-col gap-2">
							<div className="flex flex-row ">
								<label className="text-md text-muted-foreground w-36">
									Best Case
								</label>
								<MathFormula text="\Omega(n)" />
							</div>
							<div className="flex flex-row ">
								<label className="text-md text-muted-foreground w-36">
									Worst Case
								</label>
								<MathFormula text="O(n^2)" />
							</div>
							<div className="flex flex-row ">
								<label className="text-md text-muted-foreground w-36">
									Average Case
								</label>
								<MathFormula text="\Theta(n^2)" />
							</div>
						</div>
					</div>
				</div>
				{/* Animation */}
				<div className="col-span-2"></div>
			</div>
		</NavHeader>
	);
}
