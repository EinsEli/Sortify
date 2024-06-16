import MathFormula from "@/components/math/MathFormula";

export default function Complexity({best, worst, average} : {best: string, worst: string, average: string}) {
	return (
		<div className="flex flex-col gap-2">
			<div className="flex flex-row ">
				<label className="text-md text-muted-foreground w-36">
					Best Case
				</label>
				<MathFormula text={best} />
			</div>
			<div className="flex flex-row ">
				<label className="text-md text-muted-foreground w-36">
					Worst Case
				</label>
				<MathFormula text={worst} />
			</div>
			<div className="flex flex-row ">
				<label className="text-md text-muted-foreground w-36">
					Average Case
				</label>
				<MathFormula text={average} />
			</div>
		</div>
	);
}
