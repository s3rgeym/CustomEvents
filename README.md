Custom events in JavaScript

Класс для работы с пользовательскими событиями.

```javascript
const emitter = new EventEmitter;
emitter.on('hello', name => console.log(`Hello, ${name}!`));
console.log('Must print "Hello, World!"');
emitter.emit('hello', 'World');
emitter.off(); // remove all listeners
console.log('Nothing will happen');
emitter.emit('hello', '...');
console.log('Finished');

// Output:
// Must print "Hello, World!"
// Hello, World!
// Nothing will happen
// Finished
```
Default listeners:

```javascript
const e=new EventEmitter
e.onstart=()=>console.log('Started');
()=>console.log('Started')
e.emit('start') // print "Started"
```
