import GridSquare from "./GridSquare.tsx";

function Grid() {
    console.log("render grid!");

    // create a 7x7 grid of gridsquares. the top should display A - G and the left should display 1 - 7
    const rows = [];
    for (let i = 0; i < 7; i++) {
        const squares = [];
        for (let j = 0; j < 7; j++) {
            squares.push(<GridSquare row={i} col={j} key={j} />);
        }
        rows.push(<tr key={i}>
            <td className="label">{i + 1}</td>
            {squares}</tr>);
    }

    return <table className="grid">
        <thead>
        <tr>
            <td/>
            <td className="label">A</td>
            <td className="label">B</td>
            <td className="label">C</td>
            <td className="label">D</td>
            <td className="label">E</td>
            <td className="label">F</td>
            <td className="label">G</td>
        </tr>
        </thead>
        <tbody>{rows}</tbody>
    </table>;
}

export default Grid
