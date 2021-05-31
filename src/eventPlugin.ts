export class EventHandler {
    eventHandlers = {
        'click': [],
        'drag': []
    }

    on(eventName, eventHandler) {
        if(!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = []
            this.eventHandlers[eventName].push(eventHandler)
        } else {
            this.eventHandlers[eventName].push(eventHandler)
        }
    }
    
    emit(eventName, props) {
        this.eventHandlers[eventName].forEach((func)=>{
            func(props)
        })
    }
}