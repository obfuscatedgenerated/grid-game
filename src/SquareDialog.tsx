import React, {forwardRef} from "react";
import MuseText from "./MuseText";

interface SquareDialogProps {
    grid_text: string;
}

const SquareDialog = forwardRef((props: SquareDialogProps, fwd_ref: React.ForwardedRef<HTMLDialogElement>) => {
    const own_ref = React.useRef<HTMLDialogElement>(null);

    // we need to copy our own ref to the forwarded ref so both may use it
    React.useImperativeHandle(fwd_ref, () => own_ref.current as HTMLDialogElement);

    console.log("render dialog!");

    const close = () => {
        own_ref.current!.close();
    }

    // still too lazy for css modules 😎
    return <dialog ref={own_ref}>
        <MuseText>{props.grid_text}</MuseText>

        <div style={{display: "flex", justifyContent: "space-around", gap: "1vw"}}>
            <button autoFocus onClick={close}>
                Close
            </button>
        </div>
    </dialog>
});

export default SquareDialog
