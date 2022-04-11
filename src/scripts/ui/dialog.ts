export const confirm = <T>(text: string, cb: (...args: T[]) => void) => (...args: T[]) => {
    if (!window.confirm(text)) {
        return;
    }
    cb(...args);
};

export const alert = (text: string): void => {
    window.alert(text);
};
