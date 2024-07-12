"use client";

import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import NavHeader from "@/components/layout/nav-header";
import Description from "@/components/algorithms/mergesort/description";
import Complexity from "@/components/algorithms/mergesort/complexity";
import Code from "@/components/algorithms/mergesort/code";
import Simulation from "@/components/algorithms/mergesort/simulation";
import { useFullscreen } from "@/components/layout/context";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export default function Page() {
	const { isFullscreen } = useFullscreen();

	function onLayout(sizes: number[]) {
		document.cookie = `react-resizable-panels:layout=${JSON.stringify(
			sizes
		)}`;
	}

	return (
		<NavHeader>
			<ResizablePanelGroup
				direction="horizontal"
				className="flex-grow gap-8"
				onLayout={onLayout}
			>
				<ResizablePanel
					minSize={25}
					defaultSize={35}
					className={`!overflow-y-scroll hide-scrollbar ${
						isFullscreen ? "hidden" : ""
					}`}
				>
					{/* Side Bar */}
					<ScrollArea className="col-span-1 flex flex-col gap-10 ">
						{/* Description */}
						<Description />
						{/* Complexity */}
						<Complexity />
						{/* Code */}
						<Code />
					</ScrollArea>
				</ResizablePanel>
				<ResizableHandle
					withHandle
					className={isFullscreen ? "hidden" : ""}
				/>
				<ResizablePanel minSize={30} defaultSize={65}>
					{/* Animation */}
					<Simulation />
				</ResizablePanel>
			</ResizablePanelGroup>
		</NavHeader>
	);
}
