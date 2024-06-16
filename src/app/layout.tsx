import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import { ThemeProvider } from "@/components/ui/theme-provider";
import "./globals.css";
import { FullscreenProvider } from "@/components/layout/fullscreen";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Sortutor",
	description: "A visual guide to sorting algorithms",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ViewTransitions>
			<html lang="en">
				<body className={inter.className}>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
					>
						<FullscreenProvider>{children}</FullscreenProvider>
					</ThemeProvider>
				</body>
			</html>
		</ViewTransitions>
	);
}
