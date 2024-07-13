export const navigationLinks = [
	{
		title: 'Overview',
		url: '/overview',
	},
	{
		title: "Comparison-based Algorithms",
		subLinks: [
			{
				title: 'Bubble Sort',
				url: '/bubblesort',
				description: 'Bubble Sort is a simple alorithm which swaps adjacent elements if they are in the wrong order.',
				icon: 'GitCompareArrows',
			}
		]
	},
	{
		title: "Divide and Conquer Algorithms",
		subLinks: [
			{
				title: 'Merge Sort',
				url: '/mergesort',
				description: 'Merge Sort divides the array into two halves, which are then merged later into a sorted array.',
				icon: 'Merge',
			},
			{
				title: 'Quick Sort',
				url: '/quicksort',
				description: 'Quick Sort picks a pivot element and partitions the given array around the picked pivot.',
				icon: 'Rabbit',
			}
		]
	},
	{
		title: "Fun Algorithms",
		subLinks: [
			{
				title: 'Stalin Sort',
				url: '/stalinsort',
				description: 'Stalin Sort is a simple algorithm which eliminates elements that are not in order.',
				icon: "Hammer"
			},
			{
				title: 'Bogo Sort',
				url: '/bogosort',
				description: 'Bogo Sort is a highly inefficient algorithm which shuffles the array randomly until it is sorted.',
				icon: "Shuffle"
			}
		]
	},
];
