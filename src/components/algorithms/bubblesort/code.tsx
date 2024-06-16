import CodeBlock from "@/components/info-page/code-block";

export default function Code() {
	return (
		<section className="flex flex-col gap-6">
			<div className="flex flex-col gap-2">
				<div className="flex flex-row gap-2 items-center">
					<h3 className="text-lg font-semibold">Python Code</h3>{" "}
					<span className="text-sm text-gray-500">Unoptimized</span>
				</div>
				<CodeBlock language="python">
					{`def bubble_sort_unoptimized(arr):
	for i in range(len(arr)):
		for j in range(len(arr)-i-1):
			if arr[j] > arr[j+1]:
				arr[j], arr[j+1] = arr[j+1], arr[j]
		return arr`}
				</CodeBlock>
			</div>
			<div className="flex flex-col gap-2">
				<div className="flex flex-row gap-2 items-center">
					<h3 className="text-lg font-semibold">Python Code</h3>{" "}
					<span className="text-sm text-gray-500">Optimized</span>
				</div>
				<CodeBlock language="python">
					{`def bubble_sort_optimized(arr):
	for i in range(len(arr)):
		swapped = False
		for j in range(n-i-1):
			if arr[j] > arr[j+1]:
				arr[j], arr[j+1] = arr[j+1], arr[j]
				swapped = True
		if not swapped:
			break
	return arr`}
				</CodeBlock>
			</div>
		</section>
	);
}
