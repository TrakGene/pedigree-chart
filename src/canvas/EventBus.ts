class EventBus {
    eventHandlers = {}
    on(eventName, eventHandler) {
        if(!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = []
            this.eventHandlers[eventName].push(eventHandler)
        } else {
            this.eventHandlers[eventName].push(eventHandler)
        }
    }
    emit(eventName) {
        if(this.eventHandlers[eventName]) {
            this.eventHandlers[eventName].forEach(func => {
                func()
            });
        }
    }
}
const eventBus = new EventBus()
export default eventBus