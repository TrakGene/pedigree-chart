export function EventBusWrapper(classToWrap: Function) {
    this.eventHandlers = {
        'click': [],
        'drag': [],
        'dragend': []
    }
    classToWrap.prototype.on = (eventName, eventHandler) =>{
        if(!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = []
            console.log('1')
        }
        console.log('2')
        this.eventHandlers[eventName].push(eventHandler)
    }
}

// export default class EventPlugin {
//     pedigree: HTMLElement
//     eventHandlers = {
//         'click': [],
//         'drag': [],
//         'dragend': []
//     }
//     constructor(pedigree: HTMLElement) {
//         this.pedigree = pedigree
//         this.pedigree.addEventListener("click", ()=>{
//             this.emit("click")
//         })
//         this.pedigree.addEventListener("onmouseup", ()=>{
//             this.emit("dragend")
//         })
//     }
//     reattach(pedigree: HTMLElement) {
//         this.pedigree = pedigree
//     }
//     on(eventName, eventHandler) {
//         if(!this.eventHandlers[eventName]) {
//             this.eventHandlers[eventName] = []
//         }
//         this.eventHandlers[eventName].push(eventHandler)
//     }
//     off(eventName, eventHandler) {

//     }
//     emit(eventName) {
//         this.eventHandlers[eventName].forEach(func=>{
//             func('woof')
//         })
//     }
// }