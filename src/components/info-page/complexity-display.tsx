import "katex/dist/katex.min.css";
import Latex from "react-latex-next";

export default function ComplexityDisplay({best, worst, average} : {best: string, worst: string, average: string}) {
	return (
		<div className="flex flex-col gap-2">
			<div className="flex flex-row ">
				<label className="text-md text-muted-foreground w-36">
					Best Case
				</label>
				<Latex>{"$" + best + "$"}</Latex>
			</div>
			<div className="flex flex-row ">
				<label className="text-md text-muted-foreground w-36">
					Average Case
				</label>
				<Latex>{"$" + average + "$"}</Latex>
			</div>
			<div className="flex flex-row ">
				<label className="text-md text-muted-foreground w-36">
					Worst Case
				</label>
				<Latex>{"$" + worst + "$"}</Latex>
			</div>
		</div>
	);
}
