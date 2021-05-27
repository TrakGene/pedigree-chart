import { StyleConfig } from './interfaces';
import { PedigreeBuilderDirector } from "./builders/builder";
export default class Pedigree {
    pedigree: HTMLElement;
    container?: string;
    builder: PedigreeBuilderDirector;
    config: StyleConfig;
    changesDetector: {
        get: (target: StyleConfig) => StyleConfig;
        set: (obj: any) => boolean;
    };
    styleProxy: any;
    constructor(userConfig: StyleConfig);
    insert(id: any): void;
    updateConfig(userConfig: StyleConfig): void;
    setAttribiute(prop: string, value: string | number): void;
}
