export default function Description() {
	return (
		<section className="flex flex-col gap-1">
			<h1 className="text-xl font-semibold">Bubble Sort</h1>
			<p className="text-md text-muted-foreground">
				Bubble Sort is a simple sorting algorithm that repeatedly steps
				through a list, compares adjacent elements, and swaps them if
				they are in the wrong order. It can be optimized by stopping the
				algorithm if the inner loop didn&apos;t cause any swap, which
				means the list is already sorted.
			</p>
		</section>
	);
}
