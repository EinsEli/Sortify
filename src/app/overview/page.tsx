import NavHeader from "@/components/navigation/nav-header";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Link } from "next-view-transitions";
import Image from "next/image";

export default function Page() {
	return (
		<NavHeader>
			<div>
				<h1 className="text-xl font-semibold">Overview</h1>
				<p className="text-md text-muted-foreground">
					See which sorting algorithms are available
					for visualization and learn how they work. 
				</p>
			</div>
			<div className="grid grid-cols-3 gap-4">
				{/* Card 1 */}
				<Link href="/bubblesort">
					<Card className="hover:shadow-xl transition-shadow duration-500 cursor-pointer min-h-96">
						<CardContent className="p-0 pb-6 rounded-md">
							<div className="relative w-full h-56">
								<Image
									src="https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?auto=compress&fm=pjpg"
									alt="Merge Sort"
									className="rounded-t-md"
									fill={true}
								/>
							</div>
						</CardContent>
						<CardFooter className="flex-col items-start gap-2">
							<CardTitle>Bubble Sort</CardTitle>
							<CardDescription>
								Bubble sort is a simple sorting algorithm that
								repeatedly steps through the list, compares
								adjacent elements, and swaps them if they are in
								the wrong order.
							</CardDescription>
						</CardFooter>
					</Card>
				</Link>
				{/* Card 2 */}
				<Link href="/mergesort">
					<Card className="hover:shadow-xl transition-shadow duration-500 cursor-pointer min-h-96">
						<CardContent className="p-0 pb-6 rounded-md">
							<div className="relative w-full h-56">
								<Image
									src="https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?auto=compress&fm=pjpg"
									alt="Merge Sort"
									className="rounded-t-md"
									fill={true}
								/>
							</div>
						</CardContent>
						<CardFooter className="flex-col items-start gap-2">
							<CardTitle>Merge Sort</CardTitle>
							<CardDescription>
								Merge sort is a sorting algorithm that sorts an
								array by dividing it into two halves, sorting
								the two halves independently, and then merging
								them back together.
							</CardDescription>
						</CardFooter>
					</Card>
				</Link>
				{/* Card 3 */}
				<Link href="/quicksort">
					<Card className="hover:shadow-xl transition-shadow duration-500 cursor-pointer min-h-96">
						<CardContent className="p-0 pb-6 rounded-md">
							<div className="relative w-full h-56">
								<Image
									src="https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?auto=compress&fm=pjpg"
									alt="Merge Sort"
									className="rounded-t-md"
									fill={true}
								/>
							</div>
						</CardContent>
						<CardFooter className="flex-col items-start gap-2">
							<CardTitle>Quick Sort</CardTitle>
							<CardDescription>
								Quick sort is a highly efficient sorting
								algorithm and is based on partitioning of array
								of data into smaller arrays.
							</CardDescription>
						</CardFooter>
					</Card>
				</Link>
			</div>
		</NavHeader>
	);
}
