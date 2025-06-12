
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
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* Interactive Guide */}
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
          <Card className="p-8 bg-gradient-to-br from-white via-blue-50 to-purple-50 backdrop-blur-sm border-4 border-blue-300 shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-4 rounded-lg mb-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
              <h3 className="text-2xl font-bold text-center relative z-10 flex items-center justify-center gap-3">
                <span className="text-3xl">📊</span>
                Interactive Function Plotter
                <span className="text-3xl">📈</span>
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

      {/* Enhanced Mathematical Analysis with Spectacular Colors */}
      <Card className="p-8 bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 backdrop-blur-sm border-4 border-indigo-300 shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-6 rounded-lg mb-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
          <h3 className="text-3xl font-bold bg-clip-text relative z-10 flex items-center justify-center gap-4">
            <span className="text-4xl">🧮</span>
            Mathematical Analysis Dashboard
            <span className="text-4xl">📋</span>
          </h3>
        </div>
        <Separator className="mb-6 h-1 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-br from-blue-100 via-cyan-100 to-teal-100 rounded-xl border-l-8 border-blue-500 shadow-lg transform hover:scale-105 transition-all duration-300">
              <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-3 text-xl">
                <span className="bg-blue-500 p-2 rounded-full">
                  <span className="text-white text-lg">📊</span>
                </span>
                Function Expression
              </h4>
              <div className="bg-white/80 p-4 rounded-lg border-2 border-blue-300">
                <p className="text-blue-700 font-mono text-2xl font-bold">f(x) = {selectedFunction.expression}</p>
              </div>
            </div>
            <div className="p-6 bg-gradient-to-br from-purple-100 via-pink-100 to-rose-100 rounded-xl border-l-8 border-purple-500 shadow-lg transform hover:scale-105 transition-all duration-300">
              <h4 className="font-bold text-purple-800 mb-3 flex items-center gap-3 text-xl">
                <span className="bg-purple-500 p-2 rounded-full">
                  <span className="text-white text-lg">📈</span>
                </span>
                Derivative Function
              </h4>
              <div className="bg-white/80 p-4 rounded-lg border-2 border-purple-300">
                <p className="text-purple-700 font-mono text-2xl font-bold">f'(x) = {selectedFunction.derivative}</p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-br from-emerald-100 via-teal-100 to-cyan-100 rounded-xl border-l-8 border-emerald-500 shadow-lg transform hover:scale-105 transition-all duration-300">
              <h4 className="font-bold text-emerald-800 mb-3 flex items-center gap-3 text-xl">
                <span className="bg-emerald-500 p-2 rounded-full">
                  <span className="text-white text-lg">🎯</span>
                </span>
                Point of Interest
              </h4>
              <div className="bg-white/80 p-4 rounded-lg border-2 border-emerald-300">
                <p className="text-emerald-700 font-mono text-2xl font-bold">x = {tangentPoint.toFixed(2)}</p>
              </div>
            </div>
            <div className="p-6 bg-gradient-to-br from-rose-100 via-orange-100 to-amber-100 rounded-xl border-l-8 border-rose-500 shadow-lg transform hover:scale-105 transition-all duration-300">
              <h4 className="font-bold text-rose-800 mb-3 flex items-center gap-3 text-xl">
                <span className="bg-rose-500 p-2 rounded-full animate-pulse">
                  <span className="text-white text-lg">⚡</span>
                </span>
                Instantaneous Slope
              </h4>
              <div className="bg-white/80 p-4 rounded-lg border-2 border-rose-300">
                <p className="text-rose-700 font-mono text-2xl font-bold">
                  m = {currentSlope.toFixed(3)}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Fun Mathematical Fact */}
        <div className="mt-8 bg-gradient-to-r from-yellow-100 via-amber-100 to-orange-100 p-6 rounded-xl border-4 border-yellow-400 shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">🤯</span>
            <h4 className="font-bold text-yellow-800 text-xl">Mind-Blowing Math Fact!</h4>
            <span className="text-3xl">✨</span>
          </div>
          <p className="text-yellow-700 text-lg leading-relaxed">
            The slope you see ({currentSlope.toFixed(3)}) represents the exact rate of change at this precise point! 
            This is the power of calculus - we can know exactly how fast something is changing at any instant in time! 🚀
          </p>
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
