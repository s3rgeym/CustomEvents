((params, retType = null, indent = 0) => {
  const DEFAULT_TYPE = 'mixed';
  retType = retType || DEFAULT_TYPE;
  params = params.split(/\s*,\s*/);
  indent = ' '.repeat(indent);
  let out = [];
  out.push(indent + '/**');
  // out.push(indent + ' * Description goes here.');
  out.push(indent + ' * ');
  for (const param of params) {
    const temp = param.split(/\s*:\s*/);
    const name = temp[0];
    const type = temp[1] || DEFAULT_TYPE;
    out.push(`${indent} * @param {${type}} ${name}`);
  }
  out.push(`${indent} * @return {${retType}}`);
  out.push(indent + ' */');
  out = out.join('\n');
  console.log(out);
  prompt("Ctrl+C:", out);
})('a: string, b: number, c');

// Output:
/**
 *
 * @param {string} a
 * @param {number} b
 * @param {mixed} c
 * @return {mixed}
 */
