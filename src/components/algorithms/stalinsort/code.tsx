import CodeBlock from "@/components/info-page/code-block";

export default function Code() {
	return (
		<section className="flex flex-col gap-6">
			<div className="flex flex-col gap-2">
				<div className="flex flex-row gap-2 items-center">
					<h3 className="text-lg font-semibold">Python Code</h3>{" "}
					<span className="text-sm text-gray-500 text-mono">stalin_sort()</span>
				</div>
				<CodeBlock language="python">
					{`def stalin_sort(arr):
	result = []
	for i in range(len(arr)):
		if i == 0 or arr[i] >= arr[i - 1]:
			result.append(arr[i])
`}
				</CodeBlock>
			</div>
		</section>
	);
}
