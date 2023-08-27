import "./global.css";

import { ReactNode } from "react";
import { Locale } from "../../../../i18n-config";
import NavbarComponent from "@/components/common/navbarComponent";
import Footer from "@/components/common/footer";
import Content from "@/components/page/containers/content";

export default function RootLayout({ children, params }: { children: ReactNode, params: { lang: Locale } }) {
    return (
        <html lang={params.lang}>
            <body>
                <NavbarComponent />
                <Content>
                    {children}
                </Content>
                <Footer />
            </body>
        </html>
    )
}