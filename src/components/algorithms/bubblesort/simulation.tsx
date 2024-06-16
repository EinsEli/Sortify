import { Bar, BarChart, ResponsiveContainer } from "recharts";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const data = [
	{
		value: 241,
	},
	{
		value: 300,
	},
	{
		value: 200,
	},
	{
		value: 278,
	},
	{
		value: 189,
	},
	{
		value: 239,
	},
	{
		value: 278,
	},
	{
		value: 189,
	},
];

export default function Simulation() {
	return (
		<div className="w-full h-full">
			<Card className="w-full h-full flex flex-col">
				<CardHeader className="flex flex-col pb-2">
					<CardTitle className="text-xl font-semibold">
						Simulation
					</CardTitle>
					<CardDescription>
						Use the controls above to start, pause, or reset the
						simulation or adjust the speed of the sorting algorithm.
					</CardDescription>
				</CardHeader>
				<CardContent className="flex-grow flex flex-col">
					<div className="mt-4 flex-grow">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={data}>
								<Bar
									dataKey="value"
									style={
										{
											fill: "hsl(var(--primary))",
											opacity: 1,
										} as React.CSSProperties
									}
								/>
							</BarChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
