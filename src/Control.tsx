import {useAudioPlayer} from "react-use-audio-player";
import {useEffect, useRef} from "react";

function Control() {
    const {load, play} = useAudioPlayer(); // this is a local player loaded with itembox.mp3
    const isRandomising = useRef<boolean>(false);

    useEffect(() => {
        load("public/itembox.mp3", {autoplay: false});
    }, [load]);

    const onRandomClick = () => {
        if (isRandomising.current) {
            return;
        }

        isRandomising.current = true;
        play();

        // keep highlighting random squares every 100ms
        // TODO

        // after 5000ms, stop shuffling, highlight, and toggle off isRandomising
        setTimeout(() => {
            isRandomising.current = false;
            // TODO
        }, 5000);
    }

    return <button onClick={onRandomClick}>Choose random</button>;
}

export default Control
