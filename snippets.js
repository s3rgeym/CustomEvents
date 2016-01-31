((params, indent) => {
  params = params.split(/\s*,\s*/);
  indent = " ".repeat(indent);
  var out = [];
  out.push(indent + "/**");
  out.push(indent + " * Description goes here");
  out.push(indent + " *");
  for (var i = 0; i < params.length; ++i) {
    out.push(indent + " * @param " + params[i] + " {type}");
  }
  out.push(indent + " * @return {type}");
  out.push(indent + " */")
  prompt("Ctrl+C:", out.join("\n"));
})("event, fn, scope, once", 2);

// Output:
  /**
   * Description goes here
   *
   * @param event {type}
   * @param fn {type}
   * @param scope {type}
   * @param once {type}
   * @return {type}
   */