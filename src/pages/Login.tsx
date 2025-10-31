import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { PixelCard } from "@/components/PixelCard";
import { PixelInput } from "@/components/PixelInput";
import { PixelButton } from "@/components/PixelButton";

const Login = () => {
  const navigate = useNavigate();
  const { signIn, user, loading } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user && !loading) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await signIn(email, password);

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro no login",
        description: error.message === "Invalid login credentials"
          ? "Email ou senha incorretos"
          : error.message,
      });
    } else {
      navigate("/dashboard");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 bg-background">
      <main className="w-full max-w-sm text-center">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-yellow text-outline">PIXEL REALMS</h1>
          <p className="text-sm text-muted-foreground mt-2">SUA AVENTURA AGUARDA</p>
        </div>
        <PixelCard>
          <form onSubmit={handleSubmit} className="space-y-6">
            <PixelInput
              label="EMAIL"
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <PixelInput
              label="SENHA"
              id="password"
              name="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <PixelButton
              className="w-full"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "ENTRANDO..." : "COMEÇAR AVENTURA"}
            </PixelButton>
          </form>
          <div className="mt-6 pt-6 border-t-2 border-border border-dashed space-y-4">
            <Link to="/forgot-password" className="text-foreground hover:text-accent transition-colors duration-200">
              ESQUECEU A SENHA?
            </Link>
            <p className="text-foreground">
              NÃO TEM CONTA?{" "}
              <Link to="/register" className="text-accent hover:text-yellow-300 transition-colors duration-200 underline">
                CADASTRE-SE
              </Link>
            </p>
          </div>
        </PixelCard>
      </main>
    </div>
  );
};

export default Login;