import "./global.css";

import { ReactNode } from "react";
import NavbarComponent from "@/components/common/navbarComponent";
import Footer from "@/components/common/footer";
import Content from "@/components/page/containers/content";
import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.min.css';

export default function RootLayout({ children }: { children: ReactNode}) {
    return (
        <html>
            <body>
                <ToastContainer />
                <NavbarComponent />
                <Content>
                    {children}
                </Content>
                <Footer />
            </body>
        </html>
    )
}