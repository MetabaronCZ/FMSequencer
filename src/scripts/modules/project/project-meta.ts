export interface ProjectMetaData {
    readonly name: string;
    readonly description: string;
    readonly tempo: number;
    readonly division: number; // default number of steps in one bar
}
