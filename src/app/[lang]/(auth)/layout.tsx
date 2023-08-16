import { ReactNode } from "react";
import "./auth.css";
import { Locale } from "../../../../i18n-config";

export default function RootLayout({ children, params }: { children: ReactNode, params: { lang: Locale } }) {
    return (
      <html lang={params.lang}>
        <body>
          {children}
          <p>By JPortas | <a href="/pt/login">PT</a> | <a href="/en/login">EN</a> </p>
        </body>
      </html>
    )
}