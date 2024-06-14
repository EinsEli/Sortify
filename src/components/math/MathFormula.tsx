import "katex/dist/katex.min.css";
import Latex from "react-latex-next";

export default function MathFormula({ text }: Readonly<{ text: string }>) {
	return (
		<div className="flex flex-row">
			<Latex>{"$" + text + "$"}</Latex>
		</div>
	);
}
