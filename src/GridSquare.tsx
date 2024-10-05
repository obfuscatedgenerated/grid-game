import {useGlobalAudioPlayer} from "react-use-audio-player";
import {useRef} from "react";
import {log_grid_cross, log_grid_uncross} from "./util/log.ts";

interface GridSquareProps {
    row: number;
    col: number;
}

function GridSquare(props: GridSquareProps) {
    const ref = useRef<HTMLTableCellElement>(null);
    const { play } = useGlobalAudioPlayer(); // global player will be loaded with pencil.mp3

    console.log("render grid square!")

    // note: the crossed state is stored within the classList of the element as other elements interact with it via querySelector
    // if there was its own useState, it would desync. this could be resolved with some crazy architecture shenanigans, or we could just do this (take a guess)

    // when clicked, cross out the square and play a sound
    const onClick = () => {
        const element = ref.current;
        if (!element) return;

        if (element.classList.contains("crossed")) {
            element.classList.remove("crossed");
            log_grid_uncross(props.row, props.col);
        } else {
            element.classList.add("crossed");
            element.classList.remove("highlight");
            log_grid_cross(props.row, props.col);
        }

        play();
    };

    return (
        <td ref={ref} data-row={props.row} data-col={props.col} className="grid-square" onClick={onClick}/>
    );
}

export default GridSquare;
