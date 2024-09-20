import {useState} from "react";

interface GridSquareProps {
    row: number;
    col: number;

    highlight: boolean;
}

function GridSquare(props: GridSquareProps) {
    const [crossed, setCrossed] = useState<boolean>(false);

    let className = "grid-square";
    if (props.highlight) {
        className += " highlight";
    }
    if (crossed) {
        className += " crossed";
    }

    // when clicked, cross out the square
    const onClick = () => {
        setCrossed(!crossed);
    };

    return (
        <td className={className} onClick={onClick}/>
    );
}

export default GridSquare;
