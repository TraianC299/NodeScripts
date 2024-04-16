export function derivative(f, x, h = 0.0001) {
  return (f(x + h) - f(x)) / h;
}
export function partialDerivative(f, vars, index, h = 0.000001) {
  // vars is an array of variables, index is the position of the variable
  // with respect to which the derivative is calculated
  let varsPlusH = vars.slice(); // Copy the vars array
  varsPlusH[index] += h; // Increment the specific variable by h

  return (f(...varsPlusH) - f(...vars)) / h;
}
