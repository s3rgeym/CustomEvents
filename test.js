var emitter = new EventEmitter();
console.log("Test .on and .once");
emitter.on("test", () => console.log("Я буду вызываться постоянно"));
emitter.once("test", () => console.log("Я вызовусь один раз"));
emitter.emit("test");
emitter.emit("test");
console.log("Remove all listeners");
emitter.off();

function test() {
  console.log("Scope: " + this.constructor.name);
  console.log("Arguments: " + JSON.stringify([].slice.call(arguments)));
}

emitter.on("test", test);
emitter.on("test", test, this);
console.log("Test scope and pass arguments");
emitter.emit("test", "foo", 42);
console.log("Remove test listeners in window scope");
emitter.off("test", test, this);
console.log(emitter._listeners.test);
console.log("Add foo listener");
emitter.on("foo", () => {});
console.log(emitter._listeners);
console.log("Remove test listeners");
emitter.off("test");
console.log(emitter._listeners);

function App() {}

App.prototype.login = function(username, password) {
  if (username === "tester" && password === "test123") {
    this.emit("loginSuccess");
  } else {
    this.emit("loginError", {
      error: "invalid_client", 
      message: "Invalid username or password"
    });
  }
};

EventEmitter.mixin(App);

var app = new App();

app.on("loginSuccess", () => {
  console.info("Login Succeeded");
});

app.on("loginError", (data) => {
  console.warn("%s: %s", data.error, data.message);
});

setTimeout(() => app.login("tester", "qwerty"), 1000);
setTimeout(() => app.login("tester", "test123"), 2000);
