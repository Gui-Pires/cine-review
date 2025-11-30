import { useEffect, useState } from "react";

export default function PageTransition({ children }) {
    const [state, setState] = useState("fade-enter");

    useEffect(() => {
        const timeout = setTimeout(() => {
            setState("fade-enter-active");
        }, 10); // deixa o browser aplicar a classe inicial

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className={state}>
            {children}
        </div>
    )
}