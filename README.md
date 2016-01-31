Custom events in JavaScript
<br>&#64;author Sergei Snegirev (yamldeveloper@proton.me)

```javascript
function EventEmitter() {}
```

Add event listener

```javascript
.on(event, fn[, scope[, once]])
```

<br>&#64;param event {string}
<br>&#64;param fn {function}
<br>&#64;param scope {object}
<br>&#64;param once {boolean}
<br>&#64;return {this}

```javascript
on: function(event, fn, scope, once) {}
```

Add one-shot event listener

```javascript
.once(event, fn[, scope])
```

<br>&#64;param event {string}
<br>&#64;param fn {function}
<br>&#64;param scope {object}
<br>&#64;return {this}

```javascript
once: function(event, fn, scope) {}
```

Remove event listeners

```javascript
.off([event[, fn[, scope]]])
```

<br>&#64;param event {string}
<br>&#64;param fn {function}
<br>&#64;param scope {object}
<br>&#64;return {this}

```javascript
off: function(event, fn, scope) {}
```

Emit event

```javascript
.emit(event[, arg1[, arg2[, ...]]])
```

<br>&#64;param event {string}
<br>&#64;param *args

```javascript
emit: function(event, args) {}
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

```javascript
EventEmitter.mixin = function(obj) {}
```
