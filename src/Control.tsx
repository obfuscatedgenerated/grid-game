import {useAudioPlayer} from "react-use-audio-player";
import {useEffect, useRef, useState} from "react";
import BenDialog from "./BenDialog.tsx";
import SquareDialog from "./SquareDialog.tsx";
import {log_grid_clear} from "./util/log.ts";
import LogDialog from "./LogDialog.tsx";

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
                // remove highlight after 100ms (1ms off to prevent race condition)
                setTimeout(() => {
                    square.classList.remove("highlight");
                }, 99);
            }

            return `${String.fromCharCode(65 + j)}${i + 1}`;
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

const clear_all_crosses = () => {
    const squares = document.querySelectorAll(".grid-square.crossed");
    squares.forEach((square) => {
        square.classList.remove("crossed");
    });
    log_grid_clear();
}

function Control() {
    const do_randomise_ref = useRef(false);
    const clear_dialog_ref = useRef<HTMLDialogElement>(null);

    const square_dialog_ref = useRef<HTMLDialogElement>(null);
    const [square_dialog_text, set_square_dialog_text] = useState("unset!");

    const log_dialog_ref = useRef<HTMLDialogElement>(null);

    const {load, play} = useAudioPlayer(); // this is a local player loaded with itembox.mp3

    useEffect(() => {
        load("itembox.mp3", {autoplay: false});
    }, [load]);

    console.log("render control!");

    const onRandomClick = () => {
        if (do_randomise_ref.current) {
            return;
        }

        // sanity check, are there at least 2 non highlighted, non crossed squares left?
        const squares = document.querySelectorAll(".grid-square:not(.highlight):not(.crossed)");
        if (squares.length < 2) {
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

            // with a delay to further prevent a race condition. this isnt perfect, and i would do it differently if i cared more
            setTimeout(() => {
                // pick one last random square to highlight and dont clear it
                const grid_text = highlight_random(false);

                // show current grid ref after further delay
                setTimeout(() => {
                    set_square_dialog_text(`Cell ${grid_text}`);
                    square_dialog_ref.current!.showModal();
                }, 400);
            }, 100);

            console.log("done randomising");
            do_randomise_ref.current = false;
        }, 3500);
    }

    const onClearHighlightsClick = () => {
        clear_all_highlights();
    }

    const onClearCrossesClick = () => {
        if (clear_dialog_ref.current) {
            clear_dialog_ref.current.showModal();
        } else {
            console.error("clear dialog ref is null!");
        }
    }

    const onViewLogClick = () => {
        if (log_dialog_ref.current) {
            log_dialog_ref.current.showModal();
        } else {
            console.error("log dialog ref is null!");
        }
    }

    return (
        <div className="control">
            <button onClick={onRandomClick}>Choose random</button>
            <hr />
            <button onClick={onClearHighlightsClick}>Clear highlights</button>
            <button className="danger" onClick={onClearCrossesClick}>Clear crosses</button>
            <hr />
            <button onClick={onViewLogClick}>View log</button>

            <SquareDialog ref={square_dialog_ref} grid_text={square_dialog_text} />
            <BenDialog ref={clear_dialog_ref} text="Are you sure you want to clear all crosses?" onAccept={clear_all_crosses} onReject={() => {}} />
            <LogDialog ref={log_dialog_ref} />
        </div>
    );
}

export default Control
