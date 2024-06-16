"use client";

import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import NavHeader from "@/components/navigation/nav-header";
import Simulation from "@/components/algorithms/bubblesort/simulation";
import Description from "@/components/algorithms/bubblesort/description";
import Complexity from "@/components/algorithms/bubblesort/complexity";
import Code from "@/components/algorithms/bubblesort/code";

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
						<Description />
						{/* Complexity */}
						<Complexity />
						{/* Code */}
						<Code />
					</div>
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel minSize={25} defaultSize={65}>
					{/* Animation */}
					<Simulation />
				</ResizablePanel>
			</ResizablePanelGroup>
		</NavHeader>
	);
}
