```javascript
function EventEmitter() {}
```

EventEmitter constructor

```javascript
on: function(event, fn, scope, once) {}
```

Add event listener

<br>&#64;param event {string}
<br>&#64;param fn {function}
<br>&#64;param scope {object} (optional)
<br>&#64;param once {boolean} (optional)
<br>&#64;return {this}

```javascript
once: function(event, fn, scope) {}
```

Add one-shot event listener

<br>&#64;param event {string}
<br>&#64;param fn {function}
<br>&#64;param scope {object} (optional)
<br>&#64;return {this}

```javascript
off: function(event, fn, scope) {}
```

Remove event listeners


<br>&#64;param event {string} (optional)
<br>&#64;param fn {function} (optional)
<br>&#64;param scope {object} (optional)
<br>&#64;return {this}

```javascript
emit: function(event, args) {}
```

Emit event

```javascript
.emit(event[, arg1[, arg2[, ...]]])
```

<br>&#64;param event {string}
<br>&#64;param *args

```javascript
EventEmitter.mixin = function(obj) {}
```

Add mixin to obj 

```javascript
function Foo() {}

EventEmitter.mixin(Foo);
var foo = new Foo();
foo.on("test", () => console.log("It's works!"));
foo.emit("test");
```

<br>&#64;param obj {object}
<br>&#64;return {object}
