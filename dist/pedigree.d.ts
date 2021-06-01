import { StyleConfig } from './interfaces';
import { PedigreeBuilderDirector } from "./builders/builder";
import DragPlugin from "./dragPlugin";
import { EventHandler } from './eventPlugin';
export default class Pedigree {
    container?: string;
    config: StyleConfig;
    builder: PedigreeBuilderDirector;
    pedigree: HTMLElement;
    event: EventHandler;
    dragPlugin: DragPlugin;
    constructor(userConfig: StyleConfig);
    trackPedigree(): void;
    insert(id: any): void;
    injectDependencies(): void;
    updateConfig(userConfig: StyleConfig): void;
    setAttribiute(prop: string, value: string | number): void;
}
