import {useAudioPlayer} from "react-use-audio-player";
import {useEffect, useRef} from "react";

const highlight_random = (clear_after: boolean) => {
    console.log("highlighting random!");
    // select a random i and j of a grid square not already highlighted or crossed (keep trying until we find one)
    // loop is bound as a safety measure
    for (let _ = 0; _ < (7 * 7); _++) {
        const i = Math.floor(Math.random() * 7);
        const j = Math.floor(Math.random() * 7);

        // scuffed, dont care
        // TODO: could it use :not(.highlight):not(.crossed), but then how would it choose random?
        const square = document.querySelector(`.grid-square[data-row="${i}"][data-col="${j}"]`);
        if (square && !square.classList.contains("highlight") && !square.classList.contains("crossed")) {
            square.classList.add("highlight");

            if (clear_after) {
                // remove highlight after 100ms
                setTimeout(() => {
                    square.classList.remove("highlight");
                }, 100);
            }

            break;
        }

        // if not, try again!
        // it's not all that smart or efficient, but it's good enough for this purpose
    }
}

const clear_all_highlights = () => {
    const squares = document.querySelectorAll(".grid-square.highlight");
    squares.forEach((square) => {
        square.classList.remove("highlight");
    });
}

function Control() {
    const do_randomise_ref = useRef(false);

    const {load, play} = useAudioPlayer(); // this is a local player loaded with itembox.mp3

    useEffect(() => {
        load("public/itembox.mp3", {autoplay: false});
    }, [load]);

    console.log("render control!");

    const onRandomClick = () => {
        if (do_randomise_ref.current) {
            return;
        }

        // sanity check, are there non highlighted, non crossed squares left?
        const squares = document.querySelectorAll(".grid-square:not(.highlight):not(.crossed)");
        if (squares.length === 0) {
            console.log("no squares left to randomise!")
            return;
        }

        do_randomise_ref.current = true;
        play();

        // keep highlighting random squares every 100ms
        const interval = setInterval(() => {
            highlight_random(true);
        }, 100);

        // after 3500ms, stop shuffling, highlight one last random, and toggle off
        setTimeout(() => {
            clearInterval(interval);

            // clear all highlighted squares as a precaution (in case the randomisation selects it again and there is a race condition to clear it)
            // again, this is dumb, but this is being cobbled together in a few hours
            clear_all_highlights();

            // with a delay to further prevent a race condition. this isnt perfect, and i would do it differently if i cared more
            setTimeout(() => {
                // pick one last random square to highlight and dont clear it
                highlight_random(false);
            }, 100);

            console.log("done randomising");
            do_randomise_ref.current = false;
        }, 3500);
    }

    const onClearHighlightsClick = () => {
        clear_all_highlights();
    }

    return (
        <div className="control">
            <button onClick={onRandomClick}>Choose random</button>
            <button onClick={onClearHighlightsClick}>Clear highlights</button>
            <button className="danger">Clear crosses</button>
        </div>
    );
}

export default Control
