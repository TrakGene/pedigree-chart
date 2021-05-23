interface StyleConfig {
    type: string;
    sex: string;
    size?: number;
    border?: number;
}
export declare class Pedigree {
    pedigree: HTMLElement;
    id: string;
    container?: string;
    pedigreeStyleConfig: StyleConfig;
    constructor(config: StyleConfig);
    insert(id: any): void;
    changeSex(sex: string): void;
    style(style: Object): void;
}
export {};
