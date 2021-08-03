class EventBus {
  private eventHandlers = {};
  on(eventName, eventHandler) {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
      this.eventHandlers[eventName].push(eventHandler);
    } else {
      this.eventHandlers[eventName].push(eventHandler);
    }
  }
  emit(eventName, props = {}) {
    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName].forEach((func) => {
        func(props);
      });
    }
  }
}
const eventBus = new EventBus();
export default eventBus;
