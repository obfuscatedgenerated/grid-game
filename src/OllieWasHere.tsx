import emoji from "./assets/ginger_nerd.png"

export const OllieWasHere = () => {
    return (
        <div style={{
            display: "flex",
            position: "absolute",
            bottom: "1vh",
            left: "1vw",
            alignItems: "center",
            gap: "0.25vw",
            fontSize: "0.75vw",
        }}
             aria-hidden="true"
        >
            <span>ollie was here</span>
            <img src={emoji} style={{width: "1.5vw"}} />
        </div>
    );
}
