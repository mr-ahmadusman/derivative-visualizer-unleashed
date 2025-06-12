
import { useState, useCallback } from 'react';
import { FunctionPlotter } from './FunctionPlotter';
import { ControlPanel } from './ControlPanel';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export interface FunctionConfig {
  expression: string;
  derivative: string;
  domain: [number, number];
  color: string;
  name: string;
}

const presetFunctions: FunctionConfig[] = [
  {
    expression: 'x^2',
    derivative: '2*x',
    domain: [-5, 5],
    color: '#3b82f6',
    name: 'Quadratic: f(x) = x²'
  },
  {
    expression: 'x^3 - 3*x',
    derivative: '3*x^2 - 3',
    domain: [-3, 3],
    color: '#8b5cf6',
    name: 'Cubic: f(x) = x³ - 3x'
  },
  {
    expression: 'sin(x)',
    derivative: 'cos(x)',
    domain: [-6.28, 6.28],
    color: '#10b981',
    name: 'Sine: f(x) = sin(x)'
  },
  {
    expression: 'e^x',
    derivative: 'e^x',
    domain: [-2, 3],
    color: '#f59e0b',
    name: 'Exponential: f(x) = eˣ'
  }
];

export const DerivativeVisualizer = () => {
  const [selectedFunction, setSelectedFunction] = useState<FunctionConfig>(presetFunctions[0]);
  const [tangentPoint, setTangentPoint] = useState<number>(1);
  const [showDerivative, setShowDerivative] = useState<boolean>(true);
  const [showTangent, setShowTangent] = useState<boolean>(true);

  const handleFunctionChange = useCallback((func: FunctionConfig) => {
    setSelectedFunction(func);
    setTangentPoint(0);
  }, []);

  const handleTangentPointChange = useCallback((point: number) => {
    setTangentPoint(point);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <ControlPanel
            functions={presetFunctions}
            selectedFunction={selectedFunction}
            onFunctionChange={handleFunctionChange}
            tangentPoint={tangentPoint}
            onTangentPointChange={handleTangentPointChange}
            showDerivative={showDerivative}
            onShowDerivativeChange={setShowDerivative}
            showTangent={showTangent}
            onShowTangentChange={setShowTangent}
          />
        </div>
        
        <div className="lg:col-span-3">
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <FunctionPlotter
              functionConfig={selectedFunction}
              tangentPoint={tangentPoint}
              showDerivative={showDerivative}
              showTangent={showTangent}
              onPointClick={handleTangentPointChange}
            />
          </Card>
        </div>
      </div>

      <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <h3 className="text-2xl font-semibold text-foreground mb-4">Mathematical Analysis</h3>
        <Separator className="mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Function</h4>
              <p className="text-blue-700 font-mono text-lg">f(x) = {selectedFunction.expression}</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">Derivative</h4>
              <p className="text-purple-700 font-mono text-lg">f'(x) = {selectedFunction.derivative}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Point of Interest</h4>
              <p className="text-green-700 font-mono text-lg">x = {tangentPoint.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
              <h4 className="font-semibold text-orange-800 mb-2">Slope at Point</h4>
              <p className="text-orange-700 font-mono text-lg">
                m = {selectedFunction.derivative.replace(/x/g, `(${tangentPoint.toFixed(2)})`)}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
