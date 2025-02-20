import { useEffect, useState } from "react";

export default function useResponsiveFontSize() {
    const getFontSize = () => 
        (typeof window !== "undefined" && window.innerWidth < 450 ? "16px" : "18px");

    const [fontSize, setFontSize] = useState(getFontSize());

    useEffect(() => {
        if (typeof window === "undefined") return; // Prevents errors in SSR

        const onResize = () => {
            setFontSize(getFontSize());
        };

        window.addEventListener("resize", onResize);
        
        return () => {
            window.removeEventListener("resize", onResize);
        };
    }, []); // Dependency array ensures it runs only once on mount

    return fontSize;
}
