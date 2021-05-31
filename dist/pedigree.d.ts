import { StyleConfig } from './interfaces';
import { PedigreeBuilderDirector } from "./builders/builder";
import DragPlugin from "./dragPlugin";
export default class Pedigree {
    container?: string;
    config: StyleConfig;
    builder: PedigreeBuilderDirector;
    pedigree: HTMLElement;
    dragPlugin: DragPlugin;
    pedigreeId: string;
    changesDetector: {
        get: (target: StyleConfig) => StyleConfig;
        set: (obj: any) => boolean;
    };
    styleProxy: any;
    constructor(userConfig: StyleConfig);
    trackPedigree(): void;
    insert(id: any): void;
    injectDependencies(): void;
    updateConfig(userConfig: StyleConfig): void;
    setAttribiute(prop: string, value: string | number): void;
}
