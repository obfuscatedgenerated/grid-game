import Grid from "./Grid.tsx";
import Control from "./Control.tsx";
import {useEffect} from "react";
import {useGlobalAudioPlayer} from "react-use-audio-player";

function App() {
    const {load} = useGlobalAudioPlayer(); // global player will be loaded with pencil.mp3 (so we dont have 49 requests for the same file)

    useEffect(() => {
        load("pencil.mp3", {autoplay: false});
    }, [load]);

    console.log("render app!");

    // TODO: stress test what happens when we abuse corssing and highlighting

    return <main>
        <Grid />
        <Control />
    </main>
}

export default App
