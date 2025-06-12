
// Mathematical utility functions for function evaluation and derivative calculations

export const evaluateFunction = (expression: string, x: number): number => {
  // Replace mathematical constants and functions
  let expr = expression
    .replace(/\^/g, '**')
    .replace(/sin\(/g, 'Math.sin(')
    .replace(/cos\(/g, 'Math.cos(')
    .replace(/tan\(/g, 'Math.tan(')
    .replace(/ln\(/g, 'Math.log(')
    .replace(/log\(/g, 'Math.log10(')
    .replace(/sqrt\(/g, 'Math.sqrt(')
    .replace(/e\*\*/g, 'Math.E**')
    .replace(/e\^/g, 'Math.E**')
    .replace(/e(?!\*)/g, 'Math.E')
    .replace(/pi/g, 'Math.PI')
    .replace(/x/g, `(${x})`);

  // Handle implicit multiplication (e.g., "2x" -> "2*x")
  expr = expr.replace(/(\d)(\()/g, '$1*$2');
  expr = expr.replace(/(\))(\d)/g, '$1*$2');
  expr = expr.replace(/(\d)([a-zA-Z])/g, '$1*$2');

  try {
    // Use Function constructor for safe evaluation
    const func = new Function('return ' + expr);
    const result = func();
    return isFinite(result) ? result : NaN;
  } catch (error) {
    console.warn('Error evaluating expression:', expression, 'with x =', x, error);
    return NaN;
  }
};

export const calculateDerivative = (expression: string, x: number, h: number = 1e-8): number => {
  // Numerical derivative using central difference method
  try {
    const fx_plus_h = evaluateFunction(expression, x + h);
    const fx_minus_h = evaluateFunction(expression, x - h);
    
    if (isFinite(fx_plus_h) && isFinite(fx_minus_h)) {
      return (fx_plus_h - fx_minus_h) / (2 * h);
    }
    return NaN;
  } catch (error) {
    console.warn('Error calculating derivative:', error);
    return NaN;
  }
};

export const formatMathExpression = (expression: string): string => {
  return expression
    .replace(/\*\*/g, '^')
    .replace(/Math\.sin/g, 'sin')
    .replace(/Math\.cos/g, 'cos')
    .replace(/Math\.tan/g, 'tan')
    .replace(/Math\.log/g, 'ln')
    .replace(/Math\.sqrt/g, 'sqrt')
    .replace(/Math\.E/g, 'e')
    .replace(/Math\.PI/g, 'π');
};

export const generateFunctionPoints = (
  expression: string, 
  domain: [number, number], 
  numPoints: number = 1000
): Array<{x: number, y: number}> => {
  const [xMin, xMax] = domain;
  const step = (xMax - xMin) / numPoints;
  const points: Array<{x: number, y: number}> = [];

  for (let x = xMin; x <= xMax; x += step) {
    const y = evaluateFunction(expression, x);
    if (isFinite(y)) {
      points.push({ x, y });
    }
  }

  return points;
};
