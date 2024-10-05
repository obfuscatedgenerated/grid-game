import React, {forwardRef} from "react";
import {get_log_string, set_callback} from "./util/log.ts";

const LogDialog = forwardRef((_, fwd_ref: React.ForwardedRef<HTMLDialogElement>) => {
    const own_ref = React.useRef<HTMLDialogElement>(null);

    // we need to copy our own ref to the forwarded ref so both may use it
    React.useImperativeHandle(fwd_ref, () => own_ref.current as HTMLDialogElement);

    console.log("render dialog!");

    const close = () => {
        own_ref.current!.close();
    }

    // if log updates, we need to update the textarea
    // could do some smart stuff with an effect but thats annoying, so we have a callback
    const update_log = (new_line: string) => {
        const textarea = own_ref.current!.querySelector("textarea");
        if (!textarea) return;

        textarea.value = textarea.value + "\n" + new_line;
    };
    set_callback(update_log);

    return <dialog ref={own_ref}>
        <textarea style={{width: "50vw", height: "50vh"}} readOnly defaultValue={get_log_string()} />

        <div style={{display: "flex", justifyContent: "space-around", gap: "1vw"}}>
            <button autoFocus onClick={close}>
                Close
            </button>
        </div>
    </dialog>
});

export default LogDialog
