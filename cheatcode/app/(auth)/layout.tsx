import { ReactNode } from "react";

export default function AuthLayout({children}:{children:ReactNode}){
    return(
        <div className="flex h-screen items-center justify-center bg-slate-100">
            {children}
        </div>
    )

}