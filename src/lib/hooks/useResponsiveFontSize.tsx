import { useEffect, useState } from "react";

export default function useResponsiveFontSize() {
    const getWindowDimensions = () => {
        try {
            return {
                width: window?.innerWidth || 0,
                height: window?.innerHeight || 0
            };
        } catch (e) {
            console.log('Window dimensions access failed:', e);
            return { width: 0, height: 0 };
        }
    };

    const getFontSize = () => (getWindowDimensions().width < 450 ? "16px" : "18px");
    const [fontSize, setFontSize] = useState(getFontSize);

    useEffect(() => {
        const onResize = () => {
            setFontSize(getFontSize());
        };

        try {
            window?.addEventListener?.("resize", onResize);
            return () => {
                window?.removeEventListener?.("resize", onResize);
            };
        } catch (e) {
            console.log('Event listener failed:', e);
            return () => {};
        }
    }, []);

    return fontSize;
}
