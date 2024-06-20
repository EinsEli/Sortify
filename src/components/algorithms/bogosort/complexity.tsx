import ComplexityDisplay from "@/components/info-page/complexity-display";

export default function Complexity() {
	return (
		<section className="flex flex-col gap-1">
			<h3 className="text-lg font-semibold">Time Complexity</h3>
			<ComplexityDisplay
				best="Ω(n)"
				average="\Theta (n \cdot n!)"
				worst="O(\infty)"
			/>
		</section>
	);
}
