
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BookOpen, TrendingUp, Zap, Target, Brain, Lightbulb, Calculator, Globe } from 'lucide-react';

interface EducationPanelProps {
  selectedFunction: string;
  tangentPoint: number;
  slope: number;
}

export const EducationPanel = ({ selectedFunction, tangentPoint, slope }: EducationPanelProps) => {
  return (
    <Card className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-2 border-purple-300 shadow-2xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white rounded-t-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-rose-400/20 animate-pulse"></div>
        <CardTitle className="flex items-center gap-3 text-2xl relative z-10">
          <BookOpen className="h-8 w-8 animate-bounce" />
          📚 Mathematical Concepts Explained
          <Brain className="h-6 w-6 ml-auto animate-pulse" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        
        {/* What is a Derivative - Enhanced */}
        <div className="bg-gradient-to-br from-emerald-100 via-teal-100 to-cyan-100 p-6 rounded-xl border-l-8 border-emerald-500 shadow-lg transform hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-emerald-500 p-2 rounded-full">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-emerald-800">🎯 What is a Derivative?</h3>
            <Lightbulb className="h-6 w-6 text-yellow-500 animate-pulse ml-auto" />
          </div>
          <div className="space-y-3">
            <p className="text-emerald-700 leading-relaxed text-lg">
              A <strong className="text-emerald-900 bg-emerald-200 px-2 py-1 rounded">derivative</strong> measures how fast a function is changing at any point. Think of it as the "slope" or "steepness" of the curve at that exact spot.
            </p>
            <div className="bg-white/70 p-4 rounded-lg border-2 border-emerald-300">
              <p className="text-emerald-800 font-semibold">🚗 Real Life Example:</p>
              <p className="text-emerald-700">If you're driving and your speedometer shows 60 mph, that's like the derivative of your position - it tells you how fast your position is changing!</p>
            </div>
          </div>
        </div>

        {/* Tangent Line Explanation - Enhanced */}
        <div className="bg-gradient-to-br from-rose-100 via-pink-100 to-red-100 p-6 rounded-xl border-l-8 border-rose-500 shadow-lg transform hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-rose-500 p-2 rounded-full">
              <Target className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-rose-800">📐 Tangent Line Magic</h3>
            <Calculator className="h-6 w-6 text-blue-500 animate-bounce ml-auto" />
          </div>
          <div className="space-y-3">
            <p className="text-rose-700 leading-relaxed text-lg">
              The <strong className="text-rose-900 bg-rose-200 px-2 py-1 rounded">tangent line</strong> is a straight line that just "kisses" the curve at one point. It has the exact same slope as the curve at that moment.
            </p>
            <div className="bg-white/70 p-4 rounded-lg border-2 border-rose-300">
              <p className="text-rose-800 font-semibold">⚽ Sports Example:</p>
              <p className="text-rose-700">Imagine a ball rolling down a curved hill - the tangent line shows the exact direction the ball would fly if it suddenly left the hill at that point!</p>
            </div>
          </div>
        </div>

        {/* Current Analysis - Super Enhanced */}
        <div className="bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100 p-6 rounded-xl border-l-8 border-amber-500 shadow-lg transform hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-amber-500 p-2 rounded-full animate-pulse">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-amber-800">⚡ Live Analysis Dashboard</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/80 p-4 rounded-lg border-2 border-amber-300 shadow-md">
              <p className="text-amber-800 font-bold text-lg">📊 Function:</p>
              <p className="text-amber-700 font-mono text-xl bg-amber-50 p-2 rounded">f(x) = {selectedFunction}</p>
            </div>
            <div className="bg-white/80 p-4 rounded-lg border-2 border-amber-300 shadow-md">
              <p className="text-amber-800 font-bold text-lg">🎯 Point:</p>
              <p className="text-amber-700 font-mono text-xl bg-amber-50 p-2 rounded">x = {tangentPoint.toFixed(2)}</p>
            </div>
            <div className="bg-white/80 p-4 rounded-lg border-2 border-amber-300 shadow-md">
              <p className="text-amber-800 font-bold text-lg">📈 Slope:</p>
              <p className="text-amber-700 font-mono text-xl bg-amber-50 p-2 rounded">{slope.toFixed(3)}</p>
            </div>
            <div className="bg-white/80 p-4 rounded-lg border-2 border-amber-300 shadow-md">
              <p className="text-amber-800 font-bold text-lg">📊 Behavior:</p>
              <p className="text-amber-700 font-semibold text-lg">
                {slope > 0 ? '📈 Increasing' : slope < 0 ? '📉 Decreasing' : '➡️ Constant'}
              </p>
            </div>
          </div>
          {slope !== 0 && (
            <div className="mt-4 bg-gradient-to-r from-amber-200 to-orange-200 p-4 rounded-lg border-2 border-amber-400">
              <p className="text-amber-800 font-semibold text-center">
                🚀 At x = {tangentPoint.toFixed(2)}, the function is changing at a rate of <span className="bg-amber-300 px-2 py-1 rounded font-bold">{Math.abs(slope).toFixed(3)} units per step</span>!
              </p>
            </div>
          )}
        </div>

        <Separator className="my-8 h-1 bg-gradient-to-r from-purple-300 via-pink-300 to-rose-300" />

        {/* Step by Step Process - Super Enhanced */}
        <div className="bg-gradient-to-br from-violet-100 via-purple-100 to-indigo-100 p-6 rounded-xl border-l-8 border-violet-500 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-violet-500 p-2 rounded-full">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-violet-800">🔢 Step-by-Step Process</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex gap-4 bg-white/70 p-4 rounded-lg border-2 border-violet-300 transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold animate-pulse">1</div>
              <div>
                <p className="text-violet-800 font-bold">Choose Function</p>
                <p className="text-violet-700">Pick f(x) to analyze</p>
              </div>
            </div>
            <div className="flex gap-4 bg-white/70 p-4 rounded-lg border-2 border-violet-300 transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold animate-pulse">2</div>
              <div>
                <p className="text-violet-800 font-bold">Select Point</p>
                <p className="text-violet-700">Choose x-coordinate</p>
              </div>
            </div>
            <div className="flex gap-4 bg-white/70 p-4 rounded-lg border-2 border-violet-300 transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold animate-pulse">3</div>
              <div>
                <p className="text-violet-800 font-bold">Calculate f'(x)</p>
                <p className="text-violet-700">Find the slope</p>
              </div>
            </div>
            <div className="flex gap-4 bg-white/70 p-4 rounded-lg border-2 border-violet-300 transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold animate-pulse">4</div>
              <div>
                <p className="text-violet-800 font-bold">Draw Tangent</p>
                <p className="text-violet-700">Create the line</p>
              </div>
            </div>
          </div>
        </div>

        {/* Real World Applications - Super Enhanced */}
        <div className="bg-gradient-to-br from-cyan-100 via-sky-100 to-blue-100 p-6 rounded-xl border-l-8 border-cyan-500 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-cyan-500 p-2 rounded-full">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-cyan-800">🌍 Real World Applications</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/80 p-4 rounded-lg border-2 border-cyan-300 shadow-md transform hover:scale-105 transition-all duration-300">
              <h4 className="text-cyan-800 font-bold text-lg mb-2">🚀 Physics</h4>
              <ul className="space-y-1 text-cyan-700">
                <li>• Velocity = derivative of position</li>
                <li>• Acceleration = derivative of velocity</li>
                <li>• Force calculations</li>
              </ul>
            </div>
            <div className="bg-white/80 p-4 rounded-lg border-2 border-cyan-300 shadow-md transform hover:scale-105 transition-all duration-300">
              <h4 className="text-cyan-800 font-bold text-lg mb-2">💰 Economics</h4>
              <ul className="space-y-1 text-cyan-700">
                <li>• Marginal cost analysis</li>
                <li>• Profit optimization</li>
                <li>• Market trends</li>
              </ul>
            </div>
            <div className="bg-white/80 p-4 rounded-lg border-2 border-cyan-300 shadow-md transform hover:scale-105 transition-all duration-300">
              <h4 className="text-cyan-800 font-bold text-lg mb-2">⚙️ Engineering</h4>
              <ul className="space-y-1 text-cyan-700">
                <li>• Heat transfer rates</li>
                <li>• Electrical current flow</li>
                <li>• Structural analysis</li>
              </ul>
            </div>
            <div className="bg-white/80 p-4 rounded-lg border-2 border-cyan-300 shadow-md transform hover:scale-105 transition-all duration-300">
              <h4 className="text-cyan-800 font-bold text-lg mb-2">🧬 Biology</h4>
              <ul className="space-y-1 text-cyan-700">
                <li>• Population growth rates</li>
                <li>• Enzyme reaction rates</li>
                <li>• Disease spread modeling</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mathematical Insights */}
        <div className="bg-gradient-to-br from-lime-100 via-green-100 to-emerald-100 p-6 rounded-xl border-l-8 border-lime-500 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-lime-500 p-2 rounded-full animate-spin">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-lime-800">🧮 Mathematical Insights</h3>
          </div>
          <div className="bg-white/80 p-4 rounded-lg border-2 border-lime-300">
            <p className="text-lime-700 text-lg leading-relaxed">
              <strong>Fun Fact:</strong> The derivative tells us the instantaneous rate of change! It's like having a super-powered microscope that can zoom into any point on a curve and tell us exactly how steep it is at that precise moment. This concept revolutionized mathematics and science! 🤯
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
