import emoji from "./assets/ginger_nerd.png";

import {useRef, useEffect} from "react";

export const OllieWasHere = () => {
    const ref = useRef<HTMLDivElement>(null);

    // trigger fade in after 5 minutes :troll:
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (ref.current) {
                ref.current.style.opacity = "1";
            }
        }, 5 * 60 * 1000);

        return () => clearTimeout(timeout);
    });

    return (
        <div
            ref={ref}
            style={{
                display: "flex",
                position: "absolute",
                bottom: "1vh",
                left: "1vw",
                alignItems: "center",
                gap: "0.25vw",
                fontSize: "0.75vw",
                opacity: 0,
                transition: "opacity 20s",
            }}
             aria-hidden="true"
        >
            <span>ollie was here</span>
            <img src={emoji} style={{width: "1.5vw"}} />
        </div>
    );
}
