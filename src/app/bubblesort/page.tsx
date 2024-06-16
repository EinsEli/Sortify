"use client";

import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import NavHeader from "@/components/layout/nav-header";
import Simulation from "@/components/algorithms/bubblesort/simulation";
import Description from "@/components/algorithms/bubblesort/description";
import Complexity from "@/components/algorithms/bubblesort/complexity";
import Code from "@/components/algorithms/bubblesort/code";
import { useFullscreen } from "@/components/layout/context";


export default function Page() {
	const { isFullscreen } = useFullscreen();

	return (
		<NavHeader>
			<ResizablePanelGroup
				direction="horizontal"
				className="flex-grow gap-8"
			>
				<ResizablePanel minSize={25} defaultSize={35} className={isFullscreen ? "hidden" : ""} >
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
				<ResizableHandle withHandle  className={isFullscreen ? "hidden" : ""} />
				<ResizablePanel minSize={25} defaultSize={65}>
					{/* Animation */}
					<Simulation />
				</ResizablePanel>
			</ResizablePanelGroup>
		</NavHeader>
	);
}
