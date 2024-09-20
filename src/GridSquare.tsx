import {useState} from "react";
import {useGlobalAudioPlayer} from "react-use-audio-player";

interface GridSquareProps {
    row: number;
    col: number;

    highlight: boolean;
}

function GridSquare(props: GridSquareProps) {
    const [crossed, setCrossed] = useState<boolean>(false);
    const { play } = useGlobalAudioPlayer(); // global player will be loaded with pencil.mp3

    let className = "grid-square";
    if (props.highlight) {
        className += " highlight";
    }
    if (crossed) {
        className += " crossed";
    }

    // when clicked, cross out the square and play a sound
    const onClick = () => {
        setCrossed(!crossed);
        play();
    };

    return (
        <td className={className} onClick={onClick}/>
    );
}

export default GridSquare;
