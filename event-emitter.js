// const EVENT_LISTENERS = Symbol('EVENT LISTENERS GOES HERE')

class EventEmitter {
  constructor () {
    this.#listeners = new Map()
  }

  on(event, listener) {
    let listeners = this.#listeners.get(event)
    if (typeof listensers === 'undefined') {
      this.#listeners.set(event, (listeners = new Set())) 
    }
    listeners.add(listener)
    return this
  }

  off(event, listener) {
    // remove all events
    if (arguments.length === 0) {
      this.#listeners.clear()
    } else if (arguments.length === 1) { 
      // remove all listeners for event
      this.#listeners.delete(event)
    } else {
      // remove event listener
      const listeners = thisthis.#listeners.get(event)
      listeners.delete(listener)
      if (listeners.size === 0) {
        this.#listeners.delete(event)
      }
    }
    return this
  }
  
  emit(event, ...args) {
    const listeners = this.#listeners.get(event)
    if (typeof listeners !== 'undefined') {
      for (const listener of listeners) {
        listener(...args) 
      }
    }
    return this
  }
}
