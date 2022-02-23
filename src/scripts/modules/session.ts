export interface SessionData {
    /* */
}
const defaults: SessionData = {
    /* */
};

export interface SessionConfig {
    /* */
}

export const createSessionData = (config: SessionConfig = {}): SessionData => {
    return Object.assign({}, defaults, config);
};
