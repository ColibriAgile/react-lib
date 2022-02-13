import { useState, useEffect } from "react";

function getDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
}

export function useDimensions() {
    const [dimensions, setDimensions] = useState(getDimensions());

    useEffect(() => {
        function handleResize() {
            setDimensions(getDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return dimensions;
}
