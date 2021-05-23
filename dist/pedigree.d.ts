import { StyleConfig } from "./interfaces";
export declare class Pedigree {
    pedigree: HTMLElement;
    id: string;
    container?: string;
    pedigreeStyleConfig: StyleConfig;
    constructor(config: StyleConfig);
    insert(id: any): void;
    changeSex(sex: string): void;
}
