
import { DerivativeVisualizer } from "@/components/DerivativeVisualizer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-slate-700 via-blue-700 to-indigo-700 bg-clip-text text-transparent mb-6">
            Advanced Calculus Visualizer
          </h1>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Professional mathematical visualization platform for understanding derivatives, tangent lines, and instantaneous rates of change through interactive geometric analysis and computational exploration.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-slate-200 shadow-sm">
            <span className="text-sm font-medium text-slate-500">Powered by Advanced Mathematical Computing</span>
          </div>
        </header>
        <DerivativeVisualizer />
      </div>
    </div>
  );
};

export default Index;
