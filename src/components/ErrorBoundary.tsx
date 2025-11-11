import React, { Component, ErrorInfo, ReactNode } from "react";
import { PixelPanel } from "./PixelPanel";
import { PixelButton } from "./PixelButton";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: _, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in ErrorBoundary:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center p-4">
          <PixelPanel className="text-center max-w-md w-full">
            <h1 className="font-pixel text-xl text-destructive pixel-text-shadow mb-4">
              ERRO INESPERADO
            </h1>
            <p className="font-pixel text-xs text-foreground mb-4">
              Algo deu errado. Por favor, tente recarregar a página.
            </p>
            <PixelButton onClick={() => window.location.reload()} variant="default">
              RECARREGAR PÁGINA
            </PixelButton>
            {this.state.error && (
              <details className="mt-4 text-left text-xs text-muted-foreground">
                <summary className="cursor-pointer font-pixel">Detalhes do Erro</summary>
                <pre className="whitespace-pre-wrap break-all p-2 bg-input pixel-border mt-2">
                  {this.state.error.toString()}
                  <br />
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </PixelPanel>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;