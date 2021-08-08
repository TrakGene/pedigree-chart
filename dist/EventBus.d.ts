declare class EventBus {
    private eventHandlers;
    on(eventName: any, eventHandler: any): void;
    emit(eventName: any, props?: {}): void;
    remove(eventName: any): void;
}
declare const eventBus: EventBus;
export default eventBus;
