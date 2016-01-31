/**
 * Custom events in JavaScript
 * @author Sergei Snegirev (yamldeveloper@proton.me)
 *
 * <code>
 * function App() {}
 * 
 * App.prototype.login = function(username, password) {
 *   if (username === "tester" && password === "test123") {
 *     this.emit("loginSuccess");
 *   } else {
 *     this.emit("loginError", {
 *       error: "invalid_client", 
 *       message: "Invalid username or password"
 *     });
 *   }
 * };
 * 
 * Events.mixin(App);
 * 
 * var app = new App();
 * 
 * app.on("loginSuccess", () => {
 *   console.info("Login Succeeded");
 * });
 * 
 * app.on("loginError", (data) => {
 *   console.warn("%s: %s", data.error, data.message);
 * });
 * 
 * setTimeout(() => app.login("tester", "qwerty"), 1000);
 * setTimeout(() => app.login("tester", "test123"), 2000);
 * </code>
 */
function Events() {
  this._listeners = {};
}

Events.prototype = {
  /**
   * Add event listener
   *
   * <code>.on(event, fn[, scope[, once]])</code>
   *
   * @param event {string}
   * @param fn {function}
   * @param scope {object}
   * @param once {boolean}
   * @return {this}
   */
  on: function(event, fn, scope, once) {
    (this._hasEvent(event) ? this._listeners[event] :
      this._listeners[event] = []).push({
      fn: fn,
      scope: scope != null ? scope : this,
      once: once
    });
    return this;
  },
  /**
   * Add one-shot event listener
   *
   * <code>.once(event, fn[, scope])</code>
   *
   * @param event {string}
   * @param fn {function}
   * @param scope {object}
   * @return {this}
   */
  once: function(event, fn, scope) {
    return this.on(event, fn, scope, true);
  },
  /**
   * Remove event listeners
   *
   * <code>.off([event[, fn[, scope]]])</code>
   *
   * @param event {string}
   * @param fn {function}
   * @param scope {object}
   * @return {this}
   */
  off: function(event, fn, scope) {
    if (!arguments.length) {
      // .off() remove all listeners
      this._listeners = {};
    } else if (arguments.length == 1) {
      // .off(event) remove all listeners for event
      if (this._hasEvent(event)) {
        delete this._listeners[event];
      }
    } else {
      // .off(event, fn[, scope]) remove all listeners fn for event or
      // remove all listeners fn for event in the scope
      if (this._hasEvent(event)) {
        var listeners = this._listeners[event];
        var i = 0;
        while (i < listeners.length) {
          var listener = listeners[i];
          if (fn === listener.fn &&
              (scope == null || scope === listener.scope)) {
            listeners.splice(i, 1);
          } else {
            ++i
          }
        }
        if (!listeners.length) {
          delete this._listeners[event];
        }
      }
    }
    return this;
  },
  /**
   * Emit event
   *
   * <code>.emit(event[, arg1[, arg2[, ...]]])</code>
   *
   * @param event {string}
   * @param *args
   */
  emit: function(event, args) {
    if (!this._hasEvent(event)) {
      return;
    }
    args = [].slice.call(arguments, 1);
    var listeners = this._listeners[event];
    var i = 0;
    while (i < listeners.length) {
      var listener = listeners[i];
      listener.fn.apply(listener.scope, args)
      if (listener.once) {
        listeners.splice(i, 1);
      } else {
        ++i
      }
    }
    if (!listeners.length) {
      delete this._listeners[event];
    }

  },
  _hasEvent: function(event) {
    return this._listeners.hasOwnProperty(event);
  }
};

Events.mixin = function(obj) {
  if (typeof obj == "function") {
    obj = obj.prototype;
  }
  var proto = new Events();
  for (var i in proto) {
    obj[i] = proto[i];
  }
  return obj;
};
