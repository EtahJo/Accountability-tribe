import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Navbar from "@/components/Navbar/index";
import Footer from "@/components/Footer/index";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";

import { auth } from "@/auth";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Accountability website",
	description: "This is an accountability website",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();
	return (
		<SessionProvider session={session}>
			<html lang="en">
				<body className={inter.className}>
					<div className="bg-lightPink relative h-max pb-32 ">
						<Navbar />
						<div className="sm:pt-28 pt-10 min-h-screen">{children}</div>
						<Footer />
						<Toaster />
					</div>
				</body>
			</html>
		</SessionProvider>
	);
}
