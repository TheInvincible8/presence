import Footer from "@/components/footer";
import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/header";
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: "Sushil Kumar",
    description: "My Portfolio",
};

export default function RootLayout(props: {
    children: React.ReactNode;
    modal: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <div id="children">{props.children}</div>
                <div id="model">{props.modal}</div>
                <Footer />
            </body>
        </html>
    );
}
