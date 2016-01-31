Custom events in JavaScript

Author: Sergei Snegirev (s3rgeymgmail:.com)
 
Add event listener


```javascript
  .on(event, fn[, scope[, once]])
```

param: event {string}
param: fn {function}
param: scope {object}
param: once {boolean}
return: {this}
   
Add one-shot event listener


```javascript
  .once(event, fn[, scope])
```

param: event {string}
param: fn {function}
param: scope {object}
return: {this}
   
Remove event listeners


```javascript
  .off([event[, fn[, scope]]])
```

param: event {string}
param: fn {function}
param: scope {object}
return: {this}
   
Emit event


```javascript
  .emit(event[, arg1[, arg2[, ...]]])
```

param: event {string}
param: *args
   