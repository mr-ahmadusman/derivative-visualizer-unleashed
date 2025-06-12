
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
    color: '#1e40af',
    name: 'Quadratic Function: f(x) = x²'
  },
  {
    expression: 'x^3 - 3*x',
    derivative: '3*x^2 - 3',
    domain: [-3, 3],
    color: '#7c3aed',
    name: 'Cubic Function: f(x) = x³ - 3x'
  },
  {
    expression: 'sin(x)',
    derivative: 'cos(x)',
    domain: [-6.28, 6.28],
    color: '#059669',
    name: 'Trigonometric Function: f(x) = sin(x)'
  },
  {
    expression: 'e^x',
    derivative: 'e^x',
    domain: [-2, 3],
    color: '#d97706',
    name: 'Exponential Function: f(x) = eˣ'
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

  const currentSlope = evaluateFunction(selectedFunction.derivative, tangentPoint);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      <InteractiveGuide 
        onFunctionSelect={handleGuideFunctionSelect}
        onPointChange={handleGuidePointChange}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
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
          <Card className="p-8 bg-white/90 backdrop-blur-sm border border-slate-200 shadow-xl">
            <div className="bg-gradient-to-r from-slate-700 via-blue-700 to-indigo-700 text-white p-6 rounded-lg mb-6">
              <h3 className="text-2xl font-semibold text-center">
                Interactive Mathematical Visualization Platform
              </h3>
            </div>
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

      <Card className="p-8 bg-white/90 backdrop-blur-sm border border-slate-200 shadow-xl">
        <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-violet-700 text-white p-6 rounded-lg mb-6">
          <h3 className="text-3xl font-semibold text-center">
            Comprehensive Mathematical Analysis
          </h3>
        </div>
        <Separator className="mb-8 h-px bg-slate-200" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-3 text-lg">
                <span className="bg-blue-600 p-2 rounded-lg">
                  <span className="text-white text-sm">f</span>
                </span>
                Primary Function
              </h4>
              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <p className="text-slate-700 font-mono text-xl font-medium">f(x) = {selectedFunction.expression}</p>
              </div>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-3 text-lg">
                <span className="bg-purple-600 p-2 rounded-lg">
                  <span className="text-white text-sm">f'</span>
                </span>
                Derivative Function
              </h4>
              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <p className="text-slate-700 font-mono text-xl font-medium">f'(x) = {selectedFunction.derivative}</p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-3 text-lg">
                <span className="bg-emerald-600 p-2 rounded-lg">
                  <span className="text-white text-sm">x</span>
                </span>
                Analysis Point
              </h4>
              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <p className="text-slate-700 font-mono text-xl font-medium">x = {tangentPoint.toFixed(3)}</p>
              </div>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-3 text-lg">
                <span className="bg-rose-600 p-2 rounded-lg">
                  <span className="text-white text-sm">m</span>
                </span>
                Instantaneous Rate
              </h4>
              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <p className="text-slate-700 font-mono text-xl font-medium">
                  slope = {currentSlope.toFixed(4)}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-blue-50 border border-blue-200 p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <span className="text-white text-sm">∇</span>
            </div>
            <h4 className="font-semibold text-blue-800 text-lg">Mathematical Interpretation</h4>
          </div>
          <p className="text-blue-700 text-base leading-relaxed">
            The calculated slope value ({currentSlope.toFixed(4)}) represents the instantaneous rate of change of the function at x = {tangentPoint.toFixed(3)}. 
            This fundamental concept in differential calculus quantifies how rapidly the function value changes with respect to infinitesimal changes in the input variable.
          </p>
        </div>
      </Card>

      <EducationPanel 
        selectedFunction={selectedFunction.expression}
        tangentPoint={tangentPoint}
        slope={currentSlope}
      />
    </div>
  );
};
