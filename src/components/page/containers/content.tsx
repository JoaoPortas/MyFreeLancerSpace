import { ReactNode } from "react";

export default function Content({ children }: { children: ReactNode}) {
    return <main style={{padding: "20px"}}>{children}</main>;
}