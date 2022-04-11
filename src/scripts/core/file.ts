type Data = Record<string, unknown>;

export const loadFile = (): Promise<Data> => {
    return new Promise((resolve, reject) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';

        input.onchange = () => {
            const file = (input.files ?? [])[0] ?? null;

            if (!file) {
                reject();
                return;
            }
            file.text()
                .then((data) => {
                    try {
                        const result = JSON.parse(data);
                        resolve(result);
                    } catch (err) {
                        reject(err as Error);
                    }
                })
                .catch(reject);
        };

        input.click();
    });
};

export const getSaveFileUrl = <T>(data: T): string => {
    const blobPart = JSON.stringify(data);
    const blobData = new Blob([blobPart], { type: 'application/json' });
    return window.URL.createObjectURL(blobData);
};

export const releaseSaveFileUrl = (url: string): void => {
    window.URL.revokeObjectURL(url);
};

export const saveFile = <T>(fileName: string, data: T): Promise<void> => {
    return new Promise((resolve, reject) => {
        try {
            const url = getSaveFileUrl(data);
            const link = document.createElement('a');
            link.style.display = 'none';
            link.href = url;
            link.download = fileName;

            document.body.appendChild(link);
            link.click();

            releaseSaveFileUrl(url);
            link.remove();

            resolve();
        } catch (err) {
            reject(err);
        }
    });
};
