import { StyleConfig } from './interfaces';
export declare class PedigreeIcon {
    pedigree: HTMLElement;
    id: string;
    container?: string;
    pedigreeStyleConfig: StyleConfig;
    handler: {
        get: (target: any) => any;
        set: (obj: any) => boolean;
    };
    styleProxy: any;
    constructor(config: StyleConfig);
    insert(id: any): void;
    setAttribiute(prop: string, value: string | number): void;
}
