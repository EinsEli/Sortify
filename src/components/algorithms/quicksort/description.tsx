export default function Description() {
	return (
		<section className="flex flex-col gap-1">
			<h1 className="text-xl font-semibold">Quick Sort</h1>
			<p className="text-md text-muted-foreground">
				Quick Sort is a divide and conquer algorithm that divides the
				input array into two subarrays and then recursively sorts the
				subarrays. A pivot element is chosen from the array and the
				elements are partitioned around the pivot such that all elements
				less than the pivot are on the left and all elements greater
				than the pivot are on the right.
			</p>
		</section>
	);
}
