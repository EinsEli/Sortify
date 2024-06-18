import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import { ThemeProvider } from "@/components/ui/theme-provider";
import "./globals.css";
import { ContextProvider } from "@/components/layout/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Sortify",
	description: "A visual guide to sorting algorithms",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ViewTransitions>
			<html lang="en" suppressHydrationWarning>
				<body className={inter.className}>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
					>
						<ContextProvider>{children}</ContextProvider>
					</ThemeProvider>
				</body>
			</html>
		</ViewTransitions>
	);
}
