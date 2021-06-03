export class EventHandler {
    eventHandlers = {
        'click': [],
        'drag': []
    }

    on(eventName, eventHandler: Function) {
        this.eventHandlers[eventName].push(eventHandler)
    }

    emit(eventName, props = {}) {
        this.eventHandlers[eventName].forEach((func)=>{
            func(props)
        })
    }
}