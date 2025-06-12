
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, RotateCcw, Sparkles, Target, Zap, Rocket } from 'lucide-react';
import { useState } from 'react';

interface InteractiveGuideProps {
  onFunctionSelect: (index: number) => void;
  onPointChange: (point: number) => void;
}

export const InteractiveGuide = ({ onFunctionSelect, onPointChange }: InteractiveGuideProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "🎯 Select a Function",
      description: "Choose from amazing preset functions like quadratic, cubic, sine, or exponential. Each function has its own unique behavior and derivative pattern!",
      action: () => onFunctionSelect(0),
      color: "from-blue-500 via-cyan-500 to-teal-500",
      icon: Target,
      emoji: "🎯"
    },
    {
      title: "🎮 Move the Point",
      description: "Click anywhere on the graph or use the slider to change where we calculate the derivative. Watch the magic happen in real-time!",
      action: () => onPointChange(2),
      color: "from-green-500 via-emerald-500 to-lime-500",
      icon: Play,
      emoji: "🎮"
    },
    {
      title: "✨ Observe the Tangent",
      description: "Watch how the red tangent line changes its slope as you move the point. This is calculus in action - beautiful mathematics visualized!",
      action: () => onPointChange(-1),
      color: "from-purple-500 via-pink-500 to-rose-500",
      icon: Sparkles,
      emoji: "✨"
    },
    {
      title: "🚀 Compare Functions",
      description: "Try different functions to see how derivatives behave differently. Discover the patterns and beauty of mathematical relationships!",
      action: () => onFunctionSelect(2),
      color: "from-orange-500 via-red-500 to-pink-500",
      icon: Rocket,
      emoji: "🚀"
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
    <Card className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-4 border-purple-300 shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
      <CardHeader className={`bg-gradient-to-r ${steps[currentStep].color} text-white rounded-t-lg relative overflow-hidden`}>
        <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
        <CardTitle className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full animate-bounce">
              <IconComponent className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold">Interactive Guide</span>
            <span className="text-2xl">{steps[currentStep].emoji}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm bg-white/30 px-3 py-1 rounded-full font-semibold">
              Step {currentStep + 1} of {steps.length}
            </span>
            <Zap className="h-5 w-5 animate-pulse" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-white via-gray-50 to-white p-6 rounded-xl shadow-lg border-2 border-gray-200 transform hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className={`bg-gradient-to-r ${steps[currentStep].color} p-3 rounded-full shadow-lg`}>
                <IconComponent className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                {steps[currentStep].title}
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg bg-gradient-to-r from-gray-100 to-gray-50 p-4 rounded-lg border-l-4 border-purple-400">
              {steps[currentStep].description}
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            {currentStep < steps.length - 1 ? (
              <Button 
                onClick={nextStep}
                className={`bg-gradient-to-r ${steps[currentStep].color} hover:opacity-90 text-white flex items-center gap-3 px-8 py-3 text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300`}
              >
                <Play className="h-5 w-5 animate-pulse" />
                Next Step
                <ArrowRight className="h-5 w-5" />
              </Button>
            ) : (
              <Button 
                onClick={resetGuide}
                className="bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 hover:opacity-90 text-white flex items-center gap-3 px-8 py-3 text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <RotateCcw className="h-5 w-5 animate-spin" />
                Start Over
                <Sparkles className="h-5 w-5" />
              </Button>
            )}
          </div>

          {/* Enhanced Progress Bar */}
          <div className="relative">
            <div className="w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full h-4 shadow-inner">
              <div 
                className={`bg-gradient-to-r ${steps[currentStep].color} h-4 rounded-full transition-all duration-700 ease-out shadow-lg relative overflow-hidden`}
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
              </div>
            </div>
            <div className="flex justify-between mt-2 text-sm font-semibold text-gray-600">
              <span>Start</span>
              <span className="text-purple-600">Progress: {Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
              <span>Complete</span>
            </div>
          </div>

          {/* Fun Tips */}
          <div className="bg-gradient-to-r from-yellow-100 via-amber-100 to-orange-100 p-4 rounded-xl border-2 border-yellow-300 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">💡</span>
              <h4 className="font-bold text-amber-800">Pro Tip!</h4>
            </div>
            <p className="text-amber-700 text-sm">
              {currentStep === 0 && "Each function has different derivative behaviors - polynomials vs trigonometric vs exponential!"}
              {currentStep === 1 && "Try clicking directly on the graph to instantly move the point to that location!"}
              {currentStep === 2 && "The steeper the tangent line, the larger the derivative value!"}
              {currentStep === 3 && "Sine and cosine functions have beautiful, predictable derivative patterns!"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
