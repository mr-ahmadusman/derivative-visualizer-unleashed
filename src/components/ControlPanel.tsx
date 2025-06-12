
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { FunctionConfig } from './DerivativeVisualizer';

interface ControlPanelProps {
  functions: FunctionConfig[];
  selectedFunction: FunctionConfig;
  onFunctionChange: (func: FunctionConfig) => void;
  tangentPoint: number;
  onTangentPointChange: (point: number) => void;
  showDerivative: boolean;
  onShowDerivativeChange: (show: boolean) => void;
  showTangent: boolean;
  onShowTangentChange: (show: boolean) => void;
}

export const ControlPanel = ({
  functions,
  selectedFunction,
  onFunctionChange,
  tangentPoint,
  onTangentPointChange,
  showDerivative,
  onShowDerivativeChange,
  showTangent,
  onShowTangentChange
}: ControlPanelProps) => {
  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Control Panel
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Function Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">Select Function</Label>
          <div className="grid gap-2">
            {functions.map((func, index) => (
              <Button
                key={index}
                variant={selectedFunction.name === func.name ? "default" : "outline"}
                size="sm"
                onClick={() => onFunctionChange(func)}
                className="justify-start text-left h-auto p-3 transition-all duration-200"
                style={{
                  backgroundColor: selectedFunction.name === func.name ? func.color : undefined,
                  borderColor: func.color,
                }}
              >
                <div className="flex flex-col items-start">
                  <span className="font-medium text-sm">{func.name.split(':')[0]}</span>
                  <span className="text-xs opacity-70 font-mono">{func.expression}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Tangent Point Control */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">
            Tangent Point: x = {tangentPoint.toFixed(2)}
          </Label>
          <Slider
            value={[tangentPoint]}
            onValueChange={(value) => onTangentPointChange(value[0])}
            min={selectedFunction.domain[0]}
            max={selectedFunction.domain[1]}
            step={0.1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{selectedFunction.domain[0]}</span>
            <span>{selectedFunction.domain[1]}</span>
          </div>
        </div>

        <Separator />

        {/* Visibility Controls */}
        <div className="space-y-4">
          <Label className="text-sm font-medium text-foreground">Display Options</Label>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-1 bg-purple-500 rounded"></div>
              <Label htmlFor="show-derivative" className="text-sm">Show Derivative</Label>
            </div>
            <Switch
              id="show-derivative"
              checked={showDerivative}
              onCheckedChange={onShowDerivativeChange}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-1 bg-red-500 rounded"></div>
              <Label htmlFor="show-tangent" className="text-sm">Show Tangent Line</Label>
            </div>
            <Switch
              id="show-tangent"
              checked={showTangent}
              onCheckedChange={onShowTangentChange}
            />
          </div>
        </div>

        <Separator />

        {/* Instructions */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">How to Use</h4>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Select a function from the list above</li>
            <li>• Use the slider to move the tangent point</li>
            <li>• Click on the graph to set tangent point</li>
            <li>• Toggle derivative and tangent visibility</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
