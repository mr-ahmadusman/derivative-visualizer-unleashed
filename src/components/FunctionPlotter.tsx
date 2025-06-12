
import { useEffect, useRef, useState } from 'react';
import { FunctionConfig } from './DerivativeVisualizer';
import { evaluateFunction } from '@/utils/mathUtils';

interface FunctionPlotterProps {
  functionConfig: FunctionConfig;
  tangentPoint: number;
  showDerivative: boolean;
  showTangent: boolean;
  onPointClick: (x: number) => void;
}

export const FunctionPlotter = ({
  functionConfig,
  tangentPoint,
  showDerivative,
  showTangent,
  onPointClick
}: FunctionPlotterProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const handleResize = () => {
      const container = canvasRef.current?.parentElement;
      if (container) {
        const width = Math.min(container.clientWidth - 48, 800);
        const height = Math.min(width * 0.75, 600);
        setCanvasSize({ width, height });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Setup coordinate system
    const padding = 60;
    const plotWidth = canvas.width - 2 * padding;
    const plotHeight = canvas.height - 2 * padding;
    
    const [xMin, xMax] = functionConfig.domain;
    const yMin = -10;
    const yMax = 10;

    const xScale = plotWidth / (xMax - xMin);
    const yScale = plotHeight / (yMax - yMin);

    // Transform functions
    const xToCanvas = (x: number) => padding + (x - xMin) * xScale;
    const yToCanvas = (y: number) => padding + plotHeight - (y - yMin) * yScale;
    const canvasToX = (canvasX: number) => xMin + (canvasX - padding) / xScale;

    // Draw grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    
    // Vertical grid lines
    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
      if (x === 0) continue;
      ctx.beginPath();
      ctx.moveTo(xToCanvas(x), padding);
      ctx.lineTo(xToCanvas(x), canvas.height - padding);
      ctx.stroke();
    }

    // Horizontal grid lines
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
      if (y === 0) continue;
      ctx.beginPath();
      ctx.moveTo(padding, yToCanvas(y));
      ctx.lineTo(canvas.width - padding, yToCanvas(y));
      ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 2;

    // X-axis
    ctx.beginPath();
    ctx.moveTo(padding, yToCanvas(0));
    ctx.lineTo(canvas.width - padding, yToCanvas(0));
    ctx.stroke();

    // Y-axis
    ctx.beginPath();
    ctx.moveTo(xToCanvas(0), padding);
    ctx.lineTo(xToCanvas(0), canvas.height - padding);
    ctx.stroke();

    // Draw axis labels
    ctx.fillStyle = '#374151';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';

    // X-axis labels
    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
      if (x === 0) continue;
      ctx.fillText(x.toString(), xToCanvas(x), yToCanvas(0) + 20);
    }

    // Y-axis labels
    ctx.textAlign = 'right';
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
      if (y === 0) continue;
      ctx.fillText(y.toString(), xToCanvas(0) - 10, yToCanvas(y) + 4);
    }

    // Plot main function
    ctx.strokeStyle = functionConfig.color;
    ctx.lineWidth = 3;
    ctx.beginPath();

    let firstPoint = true;
    const step = (xMax - xMin) / plotWidth;

    for (let x = xMin; x <= xMax; x += step) {
      try {
        const y = evaluateFunction(functionConfig.expression, x);
        if (isFinite(y) && y >= yMin && y <= yMax) {
          if (firstPoint) {
            ctx.moveTo(xToCanvas(x), yToCanvas(y));
            firstPoint = false;
          } else {
            ctx.lineTo(xToCanvas(x), yToCanvas(y));
          }
        } else {
          firstPoint = true;
        }
      } catch {
        firstPoint = true;
      }
    }
    ctx.stroke();

    // Plot derivative function
    if (showDerivative) {
      ctx.strokeStyle = '#8b5cf6';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();

      firstPoint = true;
      for (let x = xMin; x <= xMax; x += step) {
        try {
          const y = evaluateFunction(functionConfig.derivative, x);
          if (isFinite(y) && y >= yMin && y <= yMax) {
            if (firstPoint) {
              ctx.moveTo(xToCanvas(x), yToCanvas(y));
              firstPoint = false;
            } else {
              ctx.lineTo(xToCanvas(x), yToCanvas(y));
            }
          } else {
            firstPoint = true;
          }
        } catch {
          firstPoint = true;
        }
      }
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw tangent line
    if (showTangent) {
      try {
        const fx = evaluateFunction(functionConfig.expression, tangentPoint);
        const slope = evaluateFunction(functionConfig.derivative, tangentPoint);
        
        if (isFinite(fx) && isFinite(slope)) {
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 2;
          ctx.setLineDash([10, 5]);
          
          const tangentRange = 3;
          const x1 = tangentPoint - tangentRange;
          const x2 = tangentPoint + tangentRange;
          const y1 = fx + slope * (x1 - tangentPoint);
          const y2 = fx + slope * (x2 - tangentPoint);

          ctx.beginPath();
          ctx.moveTo(xToCanvas(x1), yToCanvas(y1));
          ctx.lineTo(xToCanvas(x2), yToCanvas(y2));
          ctx.stroke();
          ctx.setLineDash([]);

          // Draw point
          ctx.fillStyle = '#ef4444';
          ctx.beginPath();
          ctx.arc(xToCanvas(tangentPoint), yToCanvas(fx), 6, 0, 2 * Math.PI);
          ctx.fill();
        }
      } catch (error) {
        console.log('Error drawing tangent line:', error);
      }
    }

    // Add legend
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'left';
    
    let legendY = padding + 20;
    
    // Main function legend
    ctx.fillStyle = functionConfig.color;
    ctx.fillRect(canvas.width - 200, legendY - 10, 20, 3);
    ctx.fillStyle = '#374151';
    ctx.fillText(`f(x) = ${functionConfig.expression}`, canvas.width - 170, legendY);
    legendY += 25;

    if (showDerivative) {
      ctx.fillStyle = '#8b5cf6';
      ctx.fillRect(canvas.width - 200, legendY - 10, 20, 3);
      ctx.fillStyle = '#374151';
      ctx.fillText(`f'(x) = ${functionConfig.derivative}`, canvas.width - 170, legendY);
      legendY += 25;
    }

    if (showTangent) {
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(canvas.width - 200, legendY - 10, 20, 3);
      ctx.fillStyle = '#374151';
      ctx.fillText('Tangent Line', canvas.width - 170, legendY);
    }

    // Click handler for canvas
    const handleCanvasClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const canvasX = event.clientX - rect.left;
      const x = canvasToX(canvasX);
      
      if (x >= xMin && x <= xMax) {
        onPointClick(x);
      }
    };

    canvas.addEventListener('click', handleCanvasClick);
    return () => canvas.removeEventListener('click', handleCanvasClick);

  }, [functionConfig, tangentPoint, showDerivative, showTangent, canvasSize, onPointClick]);

  return (
    <div className="w-full flex justify-center">
      <canvas
        ref={canvasRef}
        className="border border-gray-200 rounded-lg shadow-sm cursor-crosshair bg-white"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
};
