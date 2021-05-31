export function EventBus(classToWrap: Function) {
    this.eventHandlers = {
        'click': [],
        'drag': [],
        'dragend': []
    }
    classToWrap.prototype.on = (eventName: string, eventHandler: Function) =>{
        if(!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = []
        }
        this.eventHandlers[eventName].push(eventHandler)
        console.log(this.eventHandlers)
    }
    classToWrap.prototype.off = (eventName: string) =>{
        if(this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = []
        } else {
            return
        }
    }
    classToWrap.prototype.emit = (eventName: string, props = null) => {
        this.eventHandlers[eventName].forEach(func=>{
            func(props)
        })
    }
}