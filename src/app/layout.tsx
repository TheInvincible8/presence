import Footer from "@/components/footer";
import "./globals.css";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
    title: "Sushil Kumar",
    description: "My Portfolio website",
};

const Analytic = dynamic(
    async () => {
        const Google = await import("@next/third-parties/google");
        return {
            default: Google.GoogleAnalytics,
        };
    },
    { ssr: true },
);

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
                {process.env.GTAG && <Analytic gaId={process.env.GTAG} />}
            </body>
        </html>
    );
}
