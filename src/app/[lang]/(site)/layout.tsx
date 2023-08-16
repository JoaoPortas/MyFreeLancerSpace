import { ReactNode } from "react";
import { Locale } from "../../../../i18n-config";

export default function RootLayout({ children, params }: { children: ReactNode, params: { lang: Locale } }) {
    return (
      <html lang={params.lang}>
        <body>
          {children}
          <p>By JPortas | <a href="/pt/home">PT</a> | <a href="/en/home">EN</a> </p>
        </body>
      </html>
    )
}