export const divmod = (x, y) => [Math.floor(x / y), x % y];

export const isNumeric = (str) => {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

export const isLetter = (str) => {
  return str.length === 1 && str.match(/[a-z]/i);
}
