/**
 * Event bus pattern to sync actions between other classes.
 *
 * Mostly emitted event is 'redraw'. Its purpose is to make diagram draw once again,
 * to apply any updates or changes.
 */
declare class EventBus {
    private eventHandlers;
    on(eventName: any, eventHandler: any): void;
    emit(eventName: any, props?: {}): void;
    remove(eventName: any): void;
}
declare const eventBus: EventBus;
export default eventBus;
