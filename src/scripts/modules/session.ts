export interface SessionData {
    /* */
}

export interface SessionConfig {
    /* */
}

export const createSessionData = (config: SessionConfig = {}): SessionData => {
    return {
        ...config,
    };
};
