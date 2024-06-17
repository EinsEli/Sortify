import CodeBlock from "@/components/info-page/code-block";

export default function Code() {
	return (
		<section className="flex flex-col gap-6">
			<div className="flex flex-col gap-2">
				<div className="flex flex-row gap-2 items-center">
					<h3 className="text-lg font-semibold">Python Code</h3>{" "}
					<span className="text-sm text-gray-500 font-mono">bogoSort()</span>
				</div>
				<CodeBlock language="python">
					{`import random
def bogo_sort(arr):
	while not is_sorted(arr):
		random.shuffle(arr)
					`}
				</CodeBlock>
			</div>
			<div className="flex flex-col gap-2">
				<div className="flex flex-row gap-2 items-center">
					<h3 className="text-lg font-semibold">Python Code</h3>{" "}
					<span className="text-sm text-gray-500 font-mono">isSorted()</span>
				</div>
				<CodeBlock language="python">
					{`def is_sorted(arr):
	for i in range(1, len(arr)):
		if arr[i] < arr[i - 1]:
			return False
	return True
					`}
				</CodeBlock>
			</div>
		</section>
	);
}
