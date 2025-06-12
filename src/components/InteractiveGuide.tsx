
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, RotateCcw, BookOpen, Target, Calculator, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface InteractiveGuideProps {
  onFunctionSelect: (index: number) => void;
  onPointChange: (point: number) => void;
}

export const InteractiveGuide = ({ onFunctionSelect, onPointChange }: InteractiveGuideProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Function Selection",
      description: "Begin by selecting a mathematical function from our curated collection. Each function demonstrates unique derivative characteristics and behavioral patterns in calculus analysis.",
      action: () => onFunctionSelect(0),
      color: "from-slate-600 via-blue-600 to-indigo-600",
      icon: Target,
    },
    {
      title: "Point Manipulation",
      description: "Interact with the visualization by selecting points on the function curve. Observe real-time calculations of instantaneous rates of change at your chosen coordinates.",
      action: () => onPointChange(2),
      color: "from-blue-600 via-indigo-600 to-purple-600",
      icon: Calculator,
    },
    {
      title: "Tangent Analysis",
      description: "Examine the tangent line visualization which represents the linear approximation of the function at the selected point, demonstrating the geometric interpretation of derivatives.",
      action: () => onPointChange(-1),
      color: "from-indigo-600 via-purple-600 to-violet-600",
      icon: TrendingUp,
    },
    {
      title: "Comparative Study",
      description: "Explore different function types to understand how polynomial, trigonometric, and exponential functions exhibit distinct derivative behaviors and mathematical properties.",
      action: () => onFunctionSelect(2),
      color: "from-purple-600 via-violet-600 to-pink-600",
      icon: BookOpen,
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      steps[currentStep + 1].action();
    }
  };

  const resetGuide = () => {
    setCurrentStep(0);
    steps[0].action();
  };

  const IconComponent = steps[currentStep].icon;

  return (
    <Card className="bg-white/90 backdrop-blur-sm border border-slate-200 shadow-xl overflow-hidden">
      <CardHeader className={`bg-gradient-to-r ${steps[currentStep].color} text-white`}>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <IconComponent className="h-6 w-6" />
            </div>
            <span className="text-2xl font-semibold">Professional Tutorial</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm bg-white/20 px-3 py-1 rounded-full font-medium">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <div className="space-y-6">
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className={`bg-gradient-to-r ${steps[currentStep].color} p-3 rounded-lg shadow-sm`}>
                <IconComponent className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800">
                {steps[currentStep].title}
              </h3>
            </div>
            <p className="text-slate-600 leading-relaxed text-base">
              {steps[currentStep].description}
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            {currentStep < steps.length - 1 ? (
              <Button 
                onClick={nextStep}
                className={`bg-gradient-to-r ${steps[currentStep].color} hover:opacity-90 text-white flex items-center gap-3 px-6 py-2 font-medium`}
              >
                <Play className="h-4 w-4" />
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button 
                onClick={resetGuide}
                className="bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 hover:opacity-90 text-white flex items-center gap-3 px-6 py-2 font-medium"
              >
                <RotateCcw className="h-4 w-4" />
                Restart Tutorial
              </Button>
            )}
          </div>

          <div className="relative">
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className={`bg-gradient-to-r ${steps[currentStep].color} h-2 rounded-full transition-all duration-500`}
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-slate-500">
              <span>Introduction</span>
              <span>Progress: {Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
              <span>Completion</span>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="h-4 w-4 text-blue-600" />
              <h4 className="font-medium text-blue-800">Mathematical Insight</h4>
            </div>
            <p className="text-blue-700 text-sm">
              {currentStep === 0 && "Different function families exhibit unique derivative patterns - understanding these relationships is fundamental to calculus mastery."}
              {currentStep === 1 && "The ability to calculate instantaneous rates of change at any point revolutionized mathematics and physics in the 17th century."}
              {currentStep === 2 && "Tangent lines provide the best linear approximation to a curve at any given point, forming the basis of differential calculus."}
              {currentStep === 3 && "Comparative analysis reveals the elegant mathematical relationships between different function types and their derivatives."}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
