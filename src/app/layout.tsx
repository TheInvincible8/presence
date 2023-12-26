import Footer from "@/components/footer";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sushil Kumar",
    description: "My Portfolio website",
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
