
import { DerivativeVisualizer } from "@/components/DerivativeVisualizer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Visualization of Derivatives
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Interactive calculus visualization tool for understanding derivatives, tangent lines, and rate of change through beautiful geometric representations.
          </p>
        </header>
        <DerivativeVisualizer />
      </div>
    </div>
  );
};

export default Index;
