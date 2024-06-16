"use client";
import CodeBlock from "@/components/info-page/code-block";
import Complexity from "@/components/info-page/complexity";
import NavHeader from "@/components/navigation/nav-header";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { CardsStats } from "@/components/ui/stats";

export default function Page() {
	return (
		<NavHeader>
			<ResizablePanelGroup
				direction="horizontal"
				className="flex-grow gap-8"
			>
				<ResizablePanel minSize={25} defaultSize={35}>
					{/* Side Bar */}
					<div className="col-span-1 flex flex-col gap-10">
						{/* Description */}
						<section className="flex flex-col gap-1">
							<h1 className="text-xl font-semibold">
								Bubble Sort
							</h1>
							<p className="text-md text-muted-foreground">
								Bubble Sort is a simple sorting algorithm that
								repeatedly steps through the list, compares
								adjacent elements, and swaps them if they are in
								the wrong order. It can be optimized by stopping
								the algorithm if the inner loop didn&apos;t
								cause any swap, which means the list is already
								sorted.
							</p>
						</section>
						{/* Complexity */}
						<section className="flex flex-col gap-1">
							<h3 className="text-lg font-semibold">
								Time Complexity
							</h3>
							<Complexity
								best="\Omega (n)"
								worst="\Theta (n^2)"
								average="O(n^2)"
							/>
						</section>
						{/* Code */}
						<section className="flex flex-col gap-1">
							<h3 className="text-lg font-semibold">
								Python Code
							</h3>
							<CodeBlock language="python">
								{`def bubble_sort(arr):
	for i in range(len(arr)):
		for j in range(len(arr)-i-1):
			if arr[j] > arr[j+1]:
				arr[j], arr[j+1] = arr[j+1], arr[j]
	return arr`}
							</CodeBlock>
						</section>
					</div>
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel minSize={25} defaultSize={65}>
					{/* Animation */}
					<CardsStats />
				</ResizablePanel>
			</ResizablePanelGroup>
		</NavHeader>
	);
}
