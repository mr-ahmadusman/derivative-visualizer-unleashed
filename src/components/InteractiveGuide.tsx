
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, RotateCcw } from 'lucide-react';
import { useState } from 'react';

interface InteractiveGuideProps {
  onFunctionSelect: (index: number) => void;
  onPointChange: (point: number) => void;
}

export const InteractiveGuide = ({ onFunctionSelect, onPointChange }: InteractiveGuideProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Select a Function",
      description: "Choose from preset functions like quadratic, cubic, sine, or exponential",
      action: () => onFunctionSelect(0),
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Move the Point",
      description: "Click on the graph or use the slider to change where we calculate the derivative",
      action: () => onPointChange(2),
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Observe the Tangent",
      description: "Watch how the red tangent line changes its slope as you move the point",
      action: () => onPointChange(-1),
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Compare Functions",
      description: "Try different functions to see how derivatives behave differently",
      action: () => onFunctionSelect(2),
      color: "from-orange-500 to-red-500"
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

  return (
    <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 shadow-xl">
      <CardHeader className={`bg-gradient-to-r ${steps[currentStep].color} text-white rounded-t-lg`}>
        <CardTitle className="flex items-center justify-between">
          <span>Interactive Guide</span>
          <span className="text-sm bg-white/20 px-2 py-1 rounded">
            Step {currentStep + 1} of {steps.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {steps[currentStep].title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {steps[currentStep].description}
            </p>
          </div>

          <div className="flex gap-3">
            {currentStep < steps.length - 1 ? (
              <Button 
                onClick={nextStep}
                className={`bg-gradient-to-r ${steps[currentStep].color} hover:opacity-90 text-white flex items-center gap-2`}
              >
                <Play className="h-4 w-4" />
                Next Step
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button 
                onClick={resetGuide}
                className="bg-gradient-to-r from-gray-500 to-gray-600 hover:opacity-90 text-white flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Start Over
              </Button>
            )}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`bg-gradient-to-r ${steps[currentStep].color} h-2 rounded-full transition-all duration-500`}
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
