export default function Description() {
	return (
		<section className="flex flex-col gap-1">
			<h1 className="text-xl font-semibold">Stalin Sort</h1>
			<p className="text-md text-muted-foreground">
				Sort an array by removing elements that are against your
				ideology, until the array is sorted. Political enemies are
				&quot;removed&quot; from the array. Political enemies are elements that are
				not in order.
			</p>
		</section>
	);
}
