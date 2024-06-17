export default function Description() {
	return (
		<section className="flex flex-col gap-1">
			<h1 className="text-xl font-semibold">Bogo Sort</h1>
			<p className="text-md text-muted-foreground">
				Bogo Sort is a highly ineffective sorting algorithm based on
				the generate and test paradigm. The algorithm successively
				randomizes the order of the elements in the list and checks if
				the list is sorted.
			</p>
		</section>
	);
}
