declare class EventBus {
    eventHandlers: {};
    constructor();
    on(eventName: any, eventHandler: any): void;
    emit(eventName: any, props?: {}): void;
    initBuiltInEvents(): void;
}
declare const eventBus: EventBus;
export default eventBus;
