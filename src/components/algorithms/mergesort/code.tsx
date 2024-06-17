import CodeBlock from "@/components/info-page/code-block";

export default function Code() {
	return (
		<section className="flex flex-col gap-6">
			<div className="flex flex-col gap-2">
				<div className="flex flex-row gap-2 items-center">
					<h3 className="text-lg font-semibold">Python Code</h3>{" "}
					<span className="text-sm text-gray-500 font-mono">
						mergeSort()
					</span>
				</div>
				<CodeBlock language="python">
					{`def mergeSort(arr, l, r):
    if l < r:
 
        # Same as (l+r)//2, but avoids overflow for
        # large l and h
        m = l+(r-l)//2
 
        # Sort first and second halves
        mergeSort(arr, l, m)
        mergeSort(arr, m+1, r)
        merge(arr, l, m, r)
`}
				</CodeBlock>
			</div>
			<div className="flex flex-col gap-2">
				<div className="flex flex-row gap-2 items-center">
					<h3 className="text-lg font-semibold">Helper Function</h3>{" "}
					<span className="text-sm text-gray-500 font-mono">
						merge()
					</span>
				</div>
				<CodeBlock language="python">
					{`def merge(arr, l, m, r):
    n1 = m - l + 1
    n2 = r - m
 
    # create temp arrays
    L = [0] * (n1)
    R = [0] * (n2)
 
    # Copy data to temp arrays L[] and R[]
    for i in range(0, n1):
        L[i] = arr[l + i]
 
    for j in range(0, n2):
        R[j] = arr[m + 1 + j]
 
    # Merge the temp arrays back into arr[l..r]
    i = 0     # Initial index of first subarray
    j = 0     # Initial index of second subarray
    k = l     # Initial index of merged subarray
 
    while i < n1 and j < n2:
        if L[i] <= R[j]:
            arr[k] = L[i]
            i += 1
        else:
            arr[k] = R[j]
            j += 1
        k += 1
 
    # Copy the remaining elements of L[], if there
    # are any
    while i < n1:
        arr[k] = L[i]
        i += 1
        k += 1
 
    # Copy the remaining elements of R[], if there
    # are any
    while j < n2:
        arr[k] = R[j]
        j += 1
        k += 1
`}
				</CodeBlock>
			</div>
		</section>
	);
}
