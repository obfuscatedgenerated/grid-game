const log: string[] = [];
let callback: ((line: string) => void) | null = null;

export const get_log = () => log;
export const get_log_string = () => log.join("\n");

export const set_callback = (cb: (line: string) => void) => {
    callback = cb;
}

const push = (line: string) => {
    console.log(line);
    log.push(line);
    if (callback) {
        callback(line);
    }
}

export const log_grid_cross = (row: number, col: number) => {
    push(`cross ${String.fromCharCode(65 + col)}${row + 1}`);
}

export const log_grid_uncross = (row: number, col: number) => {
    push(`(!!!) uncross ${String.fromCharCode(65 + col)}${row + 1}`);
}

export const log_grid_clear = () => {
    push("(!!!) grid cleared ---------------------------------");
}
