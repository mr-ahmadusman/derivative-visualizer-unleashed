
import { useState, useCallback } from 'react';
import { FunctionPlotter } from './FunctionPlotter';
import { ControlPanel } from './ControlPanel';
import { EducationPanel } from './EducationPanel';
import { InteractiveGuide } from './InteractiveGuide';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { evaluateFunction } from '@/utils/mathUtils';

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

  const handleGuidePointChange = useCallback((point: number) => {
    setTangentPoint(point);
  }, []);

  const handleGuideFunctionSelect = useCallback((index: number) => {
    setSelectedFunction(presetFunctions[index]);
    setTangentPoint(0);
  }, []);

  // Calculate current slope for educational panel
  const currentSlope = evaluateFunction(selectedFunction.derivative, tangentPoint);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Interactive Guide */}
      <InteractiveGuide 
        onFunctionSelect={handleGuideFunctionSelect}
        onPointChange={handleGuidePointChange}
      />

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
          <Card className="p-6 bg-gradient-to-br from-white to-gray-50 backdrop-blur-sm border-2 border-gray-200 shadow-xl">
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

      {/* Enhanced Mathematical Analysis with Better Colors */}
      <Card className="p-6 bg-gradient-to-br from-slate-50 to-indigo-50 backdrop-blur-sm border-2 border-indigo-200 shadow-xl">
        <h3 className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Mathematical Analysis
        </h3>
        <Separator className="mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="p-4 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg border-l-4 border-blue-500 shadow-sm">
              <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                📊 Function
              </h4>
              <p className="text-blue-700 font-mono text-lg">f(x) = {selectedFunction.expression}</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border-l-4 border-purple-500 shadow-sm">
              <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                📈 Derivative
              </h4>
              <p className="text-purple-700 font-mono text-lg">f'(x) = {selectedFunction.derivative}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="p-4 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-lg border-l-4 border-emerald-500 shadow-sm">
              <h4 className="font-semibold text-emerald-800 mb-2 flex items-center gap-2">
                🎯 Point of Interest
              </h4>
              <p className="text-emerald-700 font-mono text-lg">x = {tangentPoint.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-rose-100 to-orange-100 rounded-lg border-l-4 border-rose-500 shadow-sm">
              <h4 className="font-semibold text-rose-800 mb-2 flex items-center gap-2">
                ⚡ Slope at Point
              </h4>
              <p className="text-rose-700 font-mono text-lg">
                m = {currentSlope.toFixed(3)}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Educational Panel */}
      <EducationPanel 
        selectedFunction={selectedFunction.expression}
        tangentPoint={tangentPoint}
        slope={currentSlope}
      />
    </div>
  );
};
