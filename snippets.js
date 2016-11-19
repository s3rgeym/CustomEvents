((params, retType = null, indent = 2) => {
  const DEFAULT_TYPE = 'mixed';
  retType = retType || DEFAULT_TYPE;
  params = params.split(/\s*,\s*/);
  indent = ' '.repeat(indent);
  let out = [];
  out.push(indent + '/**');
  out.push(indent + ' * Description goes here.');
  for (const param of params) {
    const temp = param.split(/\s*:\s*/);
    const name = temp[0];
    const type = temp[1] || DEFAULT_TYPE;
    out.push(`${indent} * @param {${type}} ${name} - The ${name} value.`);
  }
  out.push(`${indent} * @return {${retType}} The ? value.`);
  out.push(indent + ' */');
  out = out.join('\n');
  console.log(out);
  prompt("Ctrl+C:", out);
})('a: string, b: number, c');

// Output:
  /**
   * Description goes here.
   * @param {string} a - The a value.
   * @param {number} b - The b value.
   * @param {mixed} c - The c value.
   * @return {mixed} The ? value.
   */
