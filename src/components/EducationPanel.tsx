
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BookOpen, TrendingUp, Zap, Target } from 'lucide-react';

interface EducationPanelProps {
  selectedFunction: string;
  tangentPoint: number;
  slope: number;
}

export const EducationPanel = ({ selectedFunction, tangentPoint, slope }: EducationPanelProps) => {
  return (
    <Card className="bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-blue-200 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-xl">
          <BookOpen className="h-6 w-6" />
          Mathematical Concepts Explained
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        
        {/* What is a Derivative */}
        <div className="bg-gradient-to-r from-emerald-100 to-teal-100 p-4 rounded-lg border-l-4 border-emerald-500">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
            <h3 className="text-lg font-semibold text-emerald-800">What is a Derivative?</h3>
          </div>
          <p className="text-emerald-700 leading-relaxed">
            A <strong>derivative</strong> measures how fast a function is changing at any point. Think of it as the "slope" or "steepness" of the curve at that exact spot. If you're driving and your speedometer shows 60 mph, that's like the derivative of your position - it tells you how fast your position is changing.
          </p>
        </div>

        {/* Tangent Line Explanation */}
        <div className="bg-gradient-to-r from-rose-100 to-pink-100 p-4 rounded-lg border-l-4 border-rose-500">
          <div className="flex items-center gap-2 mb-3">
            <Target className="h-5 w-5 text-rose-600" />
            <h3 className="text-lg font-semibold text-rose-800">Tangent Line</h3>
          </div>
          <p className="text-rose-700 leading-relaxed">
            The <strong>tangent line</strong> is a straight line that just "touches" the curve at one point. It has the same slope as the curve at that point. Imagine a ball rolling down a hill - the tangent line shows the direction the ball would fly if it suddenly left the hill.
          </p>
        </div>

        {/* Current Analysis */}
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-4 rounded-lg border-l-4 border-amber-500">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="h-5 w-5 text-amber-600" />
            <h3 className="text-lg font-semibold text-amber-800">Current Analysis</h3>
          </div>
          <div className="space-y-2 text-amber-700">
            <p><strong>Function:</strong> f(x) = {selectedFunction}</p>
            <p><strong>Point of Interest:</strong> x = {tangentPoint.toFixed(2)}</p>
            <p><strong>Slope at this point:</strong> {slope.toFixed(3)}</p>
            <p className="text-sm">
              This means at x = {tangentPoint.toFixed(2)}, the function is {slope > 0 ? 'increasing' : slope < 0 ? 'decreasing' : 'neither increasing nor decreasing'} 
              {slope !== 0 && ` at a rate of ${Math.abs(slope).toFixed(3)} units`}.
            </p>
          </div>
        </div>

        <Separator />

        {/* Step by Step Process */}
        <div className="bg-gradient-to-r from-violet-100 to-purple-100 p-4 rounded-lg border-l-4 border-violet-500">
          <h3 className="text-lg font-semibold text-violet-800 mb-3">Step-by-Step Process</h3>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="bg-violet-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
              <p className="text-violet-700">Choose a function f(x) to analyze</p>
            </div>
            <div className="flex gap-3">
              <div className="bg-violet-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
              <p className="text-violet-700">Pick a point x where you want to find the slope</p>
            </div>
            <div className="flex gap-3">
              <div className="bg-violet-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
              <p className="text-violet-700">Calculate f'(x) - the derivative gives us the slope</p>
            </div>
            <div className="flex gap-3">
              <div className="bg-violet-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</div>
              <p className="text-violet-700">Draw the tangent line using this slope</p>
            </div>
          </div>
        </div>

        {/* Real World Applications */}
        <div className="bg-gradient-to-r from-cyan-100 to-sky-100 p-4 rounded-lg border-l-4 border-cyan-500">
          <h3 className="text-lg font-semibold text-cyan-800 mb-3">Real World Applications</h3>
          <ul className="space-y-2 text-cyan-700">
            <li>• <strong>Physics:</strong> Velocity (derivative of position), Acceleration (derivative of velocity)</li>
            <li>• <strong>Economics:</strong> Marginal cost, profit optimization</li>
            <li>• <strong>Engineering:</strong> Rate of heat transfer, electrical current flow</li>
            <li>• <strong>Biology:</strong> Population growth rates, enzyme reaction rates</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
