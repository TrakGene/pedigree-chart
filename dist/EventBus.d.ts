declare class EventBus {
    private eventHandlers;
    on(eventName: any, eventHandler: any): void;
    emit(eventName: any, props?: {}): void;
}
declare const eventBus: EventBus;
export default eventBus;
