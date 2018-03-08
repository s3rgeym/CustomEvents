const EVENT_LISTENERS = Symbol('EVENT LISTENERS GOES HERE')

class EventEmitter {
  constructor () {
    this[EVENT_LISTENERS] = new Map()
  }

  on (event, listener) {
    let listeners = this[EVENT_LISTENERS].get(event)
    if (typeof listensers === 'undefined') {
      this[EVENT_LISTENERS].set(event, (listeners = new Set())) 
    }
    listeners.add(listener)
    return this
  }

  off (event, listener) {
    // remove all events
    if (arguments.length === 0) {
      this[EVENT_LISTENERS].clear()
    } else if (arguments.length === 1) { 
      // remove all listeners for event
      this[EVENT_LISTENERS].delete(event)
    } else {
      // remove event listener
      const listeners = this[EVENT_LISTENERS].get(event)
      listeners.delete(listener)
      if (listeners.size === 0) {
        this[EVENT_LISTENERS].delete(event)
      }
    }
    return this
  }
  
  emit (event, ...args) {
    const listeners = this[EVENT_LISTENERS].get(event)
    if (typeof listeners !== 'undefined') {
      for (const listener of listeners) {
        listener(...args) 
      }
    }
    return this
  }
}
