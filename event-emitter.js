//
// @author Sergei Snegirev (yamldeveloper@proton.me)
//

// Пользовательские события
// Частный случай реализации шаблона
// https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern
// Интересная реализация:
// https://fossies.org/linux/www/webkitgtk-2.15.1.tar.gz/webkitgtk-2.15.1/Source/WebInspectorUI/UserInterface/Base/Object.js#l_141
class EventEmitter {
  constructor() {
    this._listeners = {};
  }

  // !Помните, что объявление стрелочной функции вида (x) => {} аналогично
  // function (x) {}.bind(this), т.е. стрелочные функции захватывают контекст.
  /**
   * Add listener.
   * @param {string} type
   * @param {function} listener
   * @return {EventEmmiter}
   */
  on(type, listener) {
    if ('function' !== typeof listener) {
      throw new TypeError('listener must be a function');
    }
    if (!this._listeners.hasOwnProperty(type)) {
      this._listeners[type] = [];
    }
    this._listeners[type].push(listener);
    return this;
  }

  /**
    * Remove listener(s).
    * off() --> remove all listeners
    * off(type) --> remove all listeners of type
    * off(type, listener) --> remove listener of type
    * @param {string} type
    * @param {function} listener
    * @return {EventEmmiter}
    */
  off(type, listener) {
    // удаляем всех слушателей
    if (!arguments.length) {
      this._listeners = {};
    } else if (1 === arguments.length) { // удалям слушателей с типом `type`
      if (this._listeners.hasOwnProperty(type)) {
        delete this._listeners[type];
      }
    } else if (this._listeners.hasOwnProperty(type)) {
      // удаляем слушателя `listener` с типом `type`
      const listeners = this._listeners[type];
      let i = listeners.length;
      while (i--) {
        if (listener === listeners[i]) {
          listeners.splice(i, 1);
        }
      }
      if (!listeners.length) {
        delete this._listeners[type];
      }
    }
    return this;
  }

  /**
   * emit( type [, arg1 [, arg2 [, ...]]] )
   * @param {string} type
   * @param {mixed} ...args
   * @return {EventEmmiter}
   */
  emit(type, ...args) {
    // Типа браузерного onload, onclick и т.д.
    const onfunc = 'on' + type;
    if (this.hasOwnProperty(onfunc) && 'function' === typeof this[onfunc]) {
      this[onfunc](...args);
    }
    if (this._listeners.hasOwnProperty(type)) {
      for (const listener of this._listeners[type]) {
        listener.apply(this, args);
      }
    }
    return this;
  }
}
