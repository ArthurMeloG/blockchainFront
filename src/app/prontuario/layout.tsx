"use client"
import Sidebar from "@/components/sidebar";
import {DashboardProntuarioProvider} from "@/app/DashboardProntuarioProvider";
export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode; }>) {

    return (
        // <DashboardProntuarioProvider>
            <html lang="en">
            <body>
            <Sidebar/>
            {children}
            </body>
            </html>
        // </DashboardProntuarioProvider>
    );
}
