import CodeBlock from "@/components/info-page/code-block";

export default function Code() {
	return (
		<section className="flex flex-col gap-6">
			<div className="flex flex-col gap-2">
				<div className="flex flex-row gap-2 items-center">
					<h3 className="text-lg font-semibold">Python Code</h3>{" "}
					<span className="text-sm text-gray-500 font-mono">quickSort()</span>
				</div>
				<CodeBlock language="python">
					{`def quickSort(array, low, high):
    if low < high:
        pivotIndex = partition(array, low, high)
		# Recursively sort elements before pivot
        quickSort(array, low, pivotIndex - 1)
		# Recursively sort elements after pivot
        quickSort(array, pivotIndex + 1, high)
`}
				</CodeBlock>
			</div>
			<div className="flex flex-col gap-2">
				<div className="flex flex-row gap-2 items-center">
					<h3 className="text-lg font-semibold">Helper Function</h3>{" "}
					<span className="text-sm text-gray-500 font-mono">partition()</span>
				</div>
				<CodeBlock language="python">
					{`def partition(array, low, high):
    pivot = array[high]
    i = low - 1
    for j in range(low, high):
        if array[j] <= pivot:
            i = i + 1
            (array[i], array[j]) = (array[j], array[i])
    (array[i + 1], array[high]) = (array[high], array[i + 1])
    return i + 1
`}
				</CodeBlock>
			</div>
		</section>
	);
}
