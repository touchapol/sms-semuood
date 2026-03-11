import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "SMS Simulation & Provider",
    description: "Advanced SMS Provider Simulation",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="antialiased font-display">
                {children}
            </body>
        </html>
    );
}
