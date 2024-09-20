import React, {forwardRef} from "react";

import yes_gif from "./assets/yes.gif";
import no_gif from "./assets/no.gif";

interface BenDialogProps {
    text: string;

    onAccept: () => void;
    onReject: () => void;
}

const BenDialog = forwardRef((props: BenDialogProps, fwd_ref: React.ForwardedRef<HTMLDialogElement>) => {
    const own_ref = React.useRef<HTMLDialogElement>(null);

    // we need to copy our own ref to the forwarded ref so both may use it
    React.useImperativeHandle(fwd_ref, () => own_ref.current as HTMLDialogElement);

    console.log("render dialog!");

    // override handlers so they close the dialog first, then call the original handler
    const onAccept = () => {
        own_ref.current!.close();
        props.onAccept();
    };

    const onReject = () => {
        own_ref.current!.close();
        props.onReject();
    };

    // still too lazy for css modules 😎
    return <dialog ref={own_ref}>
        <h3 style={{textAlign: "center"}}>{props.text}</h3>

        <div style={{display: "flex", justifyContent: "space-around", gap: "1vw"}}>
            <button autoFocus onClick={onReject}>
                <img style={{width: "10vw"}} src={no_gif} alt="No" title="No" />
            </button>
            <button className="danger" onClick={onAccept}>
                <img style={{width: "10vw"}} src={yes_gif} alt="Yes" title="Yes" />
            </button>
        </div>
    </dialog>
});

export default BenDialog
