import { StyleConfig } from './interfaces';
import { PedigreeCreator } from "./builders/pedigreeBuilder";
export default class Pedigree {
    pedigree: HTMLElement;
    id: string;
    container?: string;
    builder: PedigreeCreator;
    config: StyleConfig;
    handler: {
        get: (target: StyleConfig) => StyleConfig;
        set: (obj: any) => boolean;
    };
    styleProxy: any;
    constructor(userConfig: StyleConfig);
    insert(id: any): void;
    setAttribiute(prop: string, value: string | number): void;
}
