var events = new Events();
console.log("Test .on and .once");
events.on("test", () => console.log("Я буду вызываться постоянно"));
events.once("test", () => console.log("Я вызовусь один раз"));
events.emit("test");
events.emit("test");
console.log("Remove all listeners");
events.off();

function test() {
  console.log("Scope: " + this.constructor.name);
  console.log("Arguments: " + JSON.stringify([].slice.call(arguments)));
}

events.on("test", test);
events.on("test", test, this);
console.log("Test scope and pass arguments");
events.emit("test", "foo", 42);
console.log("Remove test listeners in window scope");
events.off("test", test, this);
console.log(events._listeners.test);
console.log("Add foo listener");
events.on("foo", () => {});
console.log(events._listeners);
console.log("Remove test listeners");
events.off("test");
console.log(events._listeners);

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

Events.mixin(App);

var app = new App();

app.on("loginSuccess", () => {
  console.info("Login Succeeded");
});

app.on("loginError", (data) => {
  console.warn("%s: %s", data.error, data.message);
});

setTimeout(() => app.login("tester", "qwerty"), 1000);
setTimeout(() => app.login("tester", "test123"), 2000);
