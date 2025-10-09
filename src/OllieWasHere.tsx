import emoji from "./assets/ginger_nerd.png";

import {useRef, useEffect, useState, useCallback} from "react";
import { useAudioPlayer } from "react-use-audio-player";

export const OllieWasHere = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [fully_visible, setFullyVisible] = useState(false);

    // local separate audio player for one off sound effect
    const { load } = useAudioPlayer();

    // trigger fade in after 5 minutes :troll:
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (ref.current) {
                ref.current.style.opacity = "1";
            }

            // after 10 seconds, it is fully visible, but its mostly visible by 10 seconds so use a 10 second delay
            setTimeout(() => {
                setFullyVisible(true);
            }, 10 * 1000);
        }, 5 * 60 * 1000);

        return () => clearTimeout(timeout);
    });

    const go_away = useCallback(() => {
        if (ref.current) {
            ref.current.style.display = "none";

            // load get out sound effect and play when loaded
            load("get_out.mp3", { initialVolume: 0.8, autoplay: true });
        }
    }, [load]);

    return (
        <div
            ref={ref}
            style={{
                display: "flex",
                position: "absolute",
                bottom: "1rem",
                left: "1rem",
                alignItems: "center",
                gap: "0.25rem",
                fontSize: "0.75rem",
                opacity: 0,
                transition: "opacity 20s",
                cursor: fully_visible ? "pointer" : "default",
            }}
            aria-hidden="true"
            onClick={fully_visible ? go_away : undefined}
            title={fully_visible ? "Click to make me go away :(" : undefined}
        >
            <span>ollie was here</span>
            <img src={emoji} style={{width: "1.5rem"}} />
        </div>
    );
}
